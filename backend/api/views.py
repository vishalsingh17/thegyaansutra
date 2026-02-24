# Create your views here.
from google.oauth2 import id_token
from google.auth.transport import requests
from pymongo import MongoClient
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import logging
from django.shortcuts import get_object_or_404
from .models import Course, Semester, Subject, User, Videos, Banner
import datetime
from bson import Decimal128
import razorpay
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
import os
from django.core.serializers.json import DjangoJSONEncoder
from bson.binary import Binary
import base64
import traceback

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')
logger = logging.getLogger(__name__)

SERVICE_ACCOUNT_FILE = 'config/credentials.json'

GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

SPREADSHEET_ID= "1O-FOdUy8hRpvGuKwJVoVc7PQS4vB_I-2TSaZJUPkdFM"


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({"message": "CSRF cookie set"})


def add_contact(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('fullName')
            email = data.get('email')
            phone = data.get('phone')
            course = data.get('course')

            if not all([name, email, phone, course]):
                return JsonResponse({'status': 'error', 'message': 'Missing required fields'})

            credentials = Credentials.from_service_account_file(
                SERVICE_ACCOUNT_FILE, scopes=SCOPES
            )
            service = build('sheets', 'v4', credentials=credentials)
            sheet = service.spreadsheets()

            values = [[name, email, phone, course]]
            body = {'values': values}
            result = sheet.values().append(
                spreadsheetId=SPREADSHEET_ID,
                range="Sheet1!A2:D2",
                valueInputOption='RAW',
                insertDataOption='INSERT_ROWS',
                body=body
            ).execute()

            print(f"Append Result: {result}")
            return JsonResponse({'status': 'success', 'message': 'Contact added'})

        except Exception as e:
            import traceback
            print(traceback.format_exc())
            return JsonResponse({'status': 'error', 'message': str(e)})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})


def google_login(request):
    if request.method == "POST":
        logger.info("Received POST request for Google login.")
        token = request.POST.get("token")
        
        if not token:
            logger.error("No token provided in the request.")
            return JsonResponse({"status": "error", "message": "Token is required"}, status=400)

        try:
            logger.info("Verifying the provided token.")
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID, clock_skew_in_seconds=10)
            
            email = idinfo.get("email")
            name = idinfo.get("name")
            picture = idinfo.get("picture")
            sub = idinfo.get("sub")
            logger.info(f"Token verified. User details: email={email}, name={name}")

            user, created = User.objects.update_or_create(
                email=email,
                defaults={"name": name},
            )
            if created:
                user.subject_id = []
                user.save()
                logger.info(f"New user created: {email}")
            else:
                logger.info(f"Existing user updated: {email}")

            token_validity = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=1)).isoformat()
            response = JsonResponse({'message': 'Login successful'})
            response['Access-Control-Allow-Origin'] = 'http://localhost:5173'
            response['Access-Control-Allow-Credentials'] = 'true'
            response.set_cookie('email', email, httponly=True, secure=True, samesite='Lax', expires=token_validity)
            logger.info("Login successful. Response prepared and cookies set.")
            return response

        except ValueError as e:
            logger.error(f"Token verification failed: {e}")
            return JsonResponse({"status": "error", "message": "Invalid token"}, status=400)
    
    logger.warning("Non-POST request received for Google login.")
    return JsonResponse({"status": "error", "message": "Invalid request method"}, status=405)


def cookiecheck(request):
    if request.method=="POST":
        email = request.COOKIES.get('email')
        if not email:
            return JsonResponse({"status": "error", "message": "You are not logged in"}, status=204)
        try:
            user = User.objects.get(email__iexact=email)
            return JsonResponse({'isValid': True, 'name': user.name}, status=200)
        except User.DoesNotExist:
            return JsonResponse({"status": "error", "message": "User not found"}, status=404)
    else:
        return JsonResponse({'error': 'Invalid Method'}, status=400)


def Logout(request):
    if request.method=='GET':
        try:
            email = request.COOKIES.get('email')
            response = JsonResponse({'is_successful':True}, status=200)
            response.delete_cookie('email', samesite='None')
            return response
        except KeyError:
            return JsonResponse("You are not logged in.",status=401)
    else:
        return JsonResponse({'error':'Method Not Allowed'}, status=405)


def navcourse(request):
    if request.method == 'GET':
        courses = Course.objects.all()
        grouped_courses = {
            "University Courses": [],
            "Job Oriented Courses": [],
        }
        for course in courses:
            if course.course_type == "university":
                grouped_courses["University Courses"].append(
                    {"name": course.name, "course_id": course.course_id}
                )
            elif course.course_type == "job":
                grouped_courses["Job Oriented Courses"].append(
                    {"name": course.name, "course_id": course.course_id}
                )
        data = [
            {"name": "University Courses", "courses": grouped_courses["University Courses"]},
            {"name": "Job Oriented Courses", "courses": grouped_courses["Job Oriented Courses"]},
        ]
        return JsonResponse(data, safe=False, status=200)

class CustomJSONEncoder(DjangoJSONEncoder):
    """Custom JSON Encoder to handle binary data."""
    def default(self, obj):
        if isinstance(obj, Binary):
            return base64.b64encode(obj).decode('utf-8')  # Encode binary as base64
        return super().default(obj)
    
def allcourses(request):
    if request.method == 'GET':
        courses = Course.objects.all()
        data = []
        for course in courses:
            data.append({"id":course.course_id,"name": course.name, "description": course.description, "image": base64.b64encode(course.image).decode('utf-8') if course.image else None, "filterCategory": course.course_type,})
        return JsonResponse(data, safe=False, encoder=CustomJSONEncoder, status=200)

def course_detail(request, course_id):
    course = get_object_or_404(Course, course_id__iexact=course_id)
    if isinstance(course.review, Decimal128):
        course.review = float(course.review.to_decimal())
    course_data = {
        "course_id": course.course_id,
        "name": course.name,
        "description": course.description,
        "type": course.type,
        "course_type": course.course_type,
        "time_need": course.time_need,
        "review": course.review,
        "level": course.level,
        "price": course.price,
        "learn": [learn.get("item") for learn in (course.learn or [])],
        "skills": [skill.get("name") for skill in (course.skills or [])],
        "semesters": [
            {
                "num": semester.Semester_num,
                "name": semester.name,
                "description": semester.description,
                "learn": [learn.get("item") for learn in (semester.learn or [])],
                "skills": [skill.get("name") for skill in (semester.skills or [])],
            }
            for semester in course.semesters.all()
        ],
    }
    return JsonResponse(course_data, status=200)


def Semester_detail(request, course_id, num):
    course = get_object_or_404(Course, course_id__iexact=course_id)
    semester = get_object_or_404(Semester, course=course.id, Semester_num=num)
    subjects = Subject.objects.filter(semester=semester)
    if isinstance(semester.review, Decimal128):
        semester.review = float(semester.review.to_decimal())
    data = {
        "course": course.course_id,
        "type": course.type,
        "course_type": course.course_type,
        "level": course.level,
        "time_need": semester.time_need,
        "review": semester.review,
        "semester": semester.name,
        "num": semester.Semester_num,
        "description": semester.description,
        "price": semester.price,
        "learn": [learn.get("item") for learn in (semester.learn or [])],
        "skills": [skill.get("name") for skill in (semester.skills or [])],
        "subjects": [
            {"name": subject.name, "sub_id": subject.sub_id, "price": subject.price} for subject in subjects
        ],
    }
    return JsonResponse(data, safe=False)


def isenrolled(request):
    if request.method == "POST":
        email = request.COOKIES.get("email", None)
        course_id = request.POST.get("course_id", None)
        semester_num = request.POST.get("semester_num", None)
        subject_id = request.POST.get("subject_id", None)

        if not email or not course_id:
            return JsonResponse({"error": "Missing required parameters"}, status=400)

        try:
            user = get_object_or_404(User, email__iexact=email)
            user_subject_ids = {sub["id"] for sub in user.subject_id}
            required_subject_ids = set()

            if subject_id:
                subject = get_object_or_404(Subject, sub_id__iexact=subject_id)
                required_subject_ids.add(subject.sub_id)
            elif course_id and semester_num:
                semester = get_object_or_404(Semester, course__course_id__iexact=course_id, Semester_num=semester_num)
                required_subject_ids.update([subject.sub_id for subject in semester.subjects.all()])
            else:
                course = get_object_or_404(Course, course_id__iexact=course_id)
                for semester in Semester.objects.filter(course=course):
                    required_subject_ids.update([subject.sub_id for subject in semester.subjects.all()])

            if required_subject_ids.issubset(user_subject_ids):
                return JsonResponse({"message": "Enrolled"}, status=200)
            else:
                return JsonResponse({"message": "Not Enrolled"}, status=400)

        except Exception as e:
            logger.error(f"Error in isenrolled view: {str(e)}")
            return JsonResponse({"error": "An unexpected error occurred"}, status=500)


def issubjectenrolled(request):
    if request.method == "POST":
        email = request.COOKIES.get("email", None)
        subject_ids = request.POST.getlist("subject_ids[]", [])  # Accepts multiple subject IDs

        if not email or not subject_ids:
            return JsonResponse({"error": "Missing required parameters"}, status=400)

        try:
            user = get_object_or_404(User, email__iexact=email)
            user_subject_ids = {sub["id"] for sub in user.subject_id}

            enrollment_status = []
            for sub_id in subject_ids:
                enrollment_status.append({
                    "sub_id": sub_id,
                    "enrolled": sub_id in user_subject_ids,
                })

            return JsonResponse(enrollment_status, safe=False, status=200)

        except Exception as e:
            logger.error(f"Error in isenrolled view: {str(e)}")
            return JsonResponse({"error": "An unexpected error occurred"}, status=500)


def initiate_payment(price, currency='INR'):
   data = {
       'amount': int(price * 100),
       'currency': currency,
       'payment_capture': '1'
   }
   response = client.order.create(data=data)
   return response['id']


def payment_view(request):
    logger.info("payment_view called")
    if request.method == "POST":
        email = request.COOKIES.get("email",None)
        course_id = request.POST.get("Course_Id", None)
        semester_num = request.POST.get("Semester_Num", None)
        subject_id = request.POST.get("Subject_Id", None)
        subject_ids = []
        price = None
        if (subject_id):
            subject = get_object_or_404(Subject, sub_id__iexact=subject_id)
            price = subject.price
            subject_ids = [subject.sub_id]
        elif (course_id and semester_num):
            semester = get_object_or_404(Semester, course__course_id__iexact=course_id, Semester_num=semester_num)
            price = semester.price
            subject_ids = list(semester.subjects.values_list('sub_id', flat=True))
        elif (course_id):
            course = get_object_or_404(Course, course_id__iexact=course_id)
            price = course.price
            semesters = course.semesters.all()
            for sem in semesters:
                subject_ids.extend(list(sem.subjects.values_list('sub_id', flat=True)))

        key = settings.RAZORPAY_KEY_ID
        user = get_object_or_404(User, email__iexact=email)
        if user.phone:
            contact=user.phone
        else:
            contact=None
        try:
            razorpay_order_id = initiate_payment(price)
            response_data = {
                'razorpay_order_id': razorpay_order_id,
                'Razorpay_Key': key,
                'contact':contact,
                'price':price,
                'subject_ids':subject_ids,
                'user':email
            }
            return JsonResponse(response_data, status=200)
        except Exception as e:
            logger.error(f"Error in payment_view: {str(e)}")
            return JsonResponse({'error': str(e)}, status=507)
    else:
        logger.warning("Method not allowed")
        return JsonResponse({'error': 'Method not allowed'}, status=405)


def payment_success(request):
    if request.method == 'POST':
        json_data = request.POST.get('jsonData')
        if json_data:
            data = json.loads(json_data)
            payment_id = data.get("payment_id")
            order_id = data.get("order_id")
            signature = data.get("signature")
        
        logger.info(f"Payment success request received. Order ID: {order_id}, Payment ID: {payment_id}, Signature: {signature}")

        params_dict = {
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        }
        try:
            expected_signature = client.utility.verify_payment_signature(params_dict)
            if expected_signature:
                logger.info(f"Payment signature verified successfully. Order ID: {order_id}")
                data = request.POST
                Email = request.COOKIES.get('email')
                subject_ids = data.get("subject_ids")
                print(subject_ids)
                user = get_object_or_404(User, email__iexact=Email)

                if user.subject_id is None:
                    user.subject_id = []

                subject_ids = subject_ids.split(',')

                existing_ids = {sub["id"] for sub in user.subject_id}

                new_ids = {subject_id for subject_id in subject_ids}

                merged_ids = existing_ids | new_ids

                user.subject_id = [{"id": id_} for id_ in merged_ids]
                user.save()

                return JsonResponse({'redirect': f'/dashboard/enrolledcourses'}, status=200)
            else:
                return JsonResponse({'error': 'Payment verification failed.'}, status=400)
        except Exception as e:
            logger.error(f"Error verifying payment signature: {str(e)}")
            return JsonResponse({'error': f'Error verifying payment signature: {str(e)}'}, status=500)
        

def enrolledcourses(request):
    if request.method=='GET':
        Email = request.COOKIES.get('email')
        try:
            user = get_object_or_404(User, email__iexact=Email)
            if not Email or not user:
                return JsonResponse({"error": "User not found"}, status=404)
            subject_ids = [sub["id"] for sub in user.subject_id]
            subjects = Subject.objects.filter(sub_id__in=subject_ids)
            subject_details = [
                {
                    "id": subject.sub_id,
                    "name": subject.name,
                    "description": subject.description,
                    "image": base64.b64encode(subject.image).decode('utf-8') if subject.image else None,
                }
                for subject in subjects
            ]
            return JsonResponse({"subjects": subject_details}, encoder=CustomJSONEncoder, status=200)
        except Exception as e:
            return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
    return JsonResponse({"error": "Invalid request method"}, status=405)


def explorecourses(request):
    if request.method == 'GET':
        try:
            email = request.COOKIES.get("email")
            user = get_object_or_404(User, email__iexact=email)
            if not email or not user:
                return JsonResponse({"error": "User not found"}, status=404)
            Courses = Course.objects.all()
            course_details = [
                {
                    "id":course.course_id,
                    "name": course.name,
                    "description": course.description,
                    "image": base64.b64encode(course.image).decode('utf-8') if course.image else None,
                }
                for course in Courses
            ]
            return JsonResponse({'courses': course_details}, encoder=CustomJSONEncoder, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
def subjectvideo(request, subjectId):
    if request.method == 'GET':
        try:
            email = request.COOKIES.get('email')
            user = User.objects.get(email=email)
            if not email or not user:
                return JsonResponse({"error": "User not found"}, status=204)
            
            if not any(sub['id'] == subjectId for sub in user.subject_id):
                return JsonResponse({"error": "Access to this subject is not allowed"}, status=403)
            
            subject = get_object_or_404(Subject, sub_id__iexact=subjectId)
            videos = Videos.objects.filter(subject=subject)
            viewed_videos = set(user.viewed_videos.all())
            video_details = []

            for video in videos:
                completed = video in viewed_videos
                video_details.append({
                    'title': video.title,
                    'duration': f"{video.duration} min",
                    'completed': completed,
                    'videoUrl': video.videoUrl,
                    'documentUrl': video.driveLink,
                })

            return JsonResponse({'videos': video_details}, status=200)

        except Subject.DoesNotExist:
            return JsonResponse({'error': 'Subject not found'}, status=401)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        

def mark_video_as_viewed(request):
    if request.method == 'POST':
        try:
            email = request.COOKIES.get('email')
            if not email:
                return JsonResponse({'error': 'User not authenticated.'}, status=401)

            user = User.objects.get(email=email)

            video_url = request.POST.get('videoUrl')  # Fetch videoUrl from POST data
            if not video_url:
                return JsonResponse({'error': 'No video URL provided.'}, status=400)

            print(f"Received videoUrl: {video_url}")  # Debugging

            # Check if the video exists
            video = Videos.objects.get(videoUrl=video_url)
            print(f"Found video: {video}")  # Debugging

            # Check if the video is already marked as viewed
            if video not in user.viewed_videos.all():  # Use .all() to get all related videos
                user.viewed_videos.add(video)  # Add video to the user's viewed list
                user.save()

            return JsonResponse({'message': 'Video marked as completed.'}, status=200)

        except Videos.DoesNotExist:
            print(f"Video not found for URL: {video_url}")  # Debugging
            return JsonResponse({'error': 'Video not found'}, status=404)

        except Exception as e:
            print(f"Error: {str(e)}")  # Debugging
            return JsonResponse({'error': str(e)}, status=500)


def get_banner(request):
    try:
        active_banners = Banner.objects.all()  
        for banner in active_banners:
            if banner.is_active:  # Perform the filtering in Python
                return JsonResponse({"message": banner.message}, status=200)
        return JsonResponse({"message": "No active banners found."}, status=204)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

def profile(request):
    try:
        email = request.COOKIES.get('email')
        if not email:
            return JsonResponse({'error': 'User not authenticated.'}, status=401)
        user = User.objects.get(email=email)
        data = {"name": user.name, "email": user.email, "phone": user.phone, "github": user.github, "linkedin": user.linkedin}
        return JsonResponse({"data": data}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@csrf_exempt
def updateprofile(request):
    if request.method == 'POST':
        try:
            email = request.COOKIES.get('email')
            if not email:
                return JsonResponse({'error': 'User not authenticated.'}, status=401)

            user = User.objects.get(email=email)

            body = json.loads(request.body)
            profile = body.get('profile')

            print(profile)
            user.name = profile.get('name', user.name)
            user.email = profile.get('email', user.email)
            user.phone = profile.get('phone', user.phone)
            user.github = profile.get('github', user.github)
            user.linkedin = profile.get('linkedin', user.linkedin)

            user.save()

            return JsonResponse({"message": "Profile updated successfully"}, status=200)
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid HTTP method. Only POST is allowed."}, status=405)