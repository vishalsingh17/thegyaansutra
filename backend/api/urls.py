from django.urls import path
from . import views

urlpatterns = [
    path('csrf-token/', views.get_csrf_token),
    path('feedback-form/', views.add_contact, name='add_contact'),
    path('google-login/', views.google_login, name='google_login'),
    path('logout/', views.Logout),
    path('cookiecheck/', views.cookiecheck),
    path('navcourse/', views.navcourse),
    path('course/<str:course_id>/', views.course_detail),
    path('course/<str:course_id>/<str:num>/', views.Semester_detail),
    path('isenrolled/',views.isenrolled),
    path('issubjectenrolled/',views.issubjectenrolled),
    path('orderfetch', views.payment_view, name='initiate_payment'),
    path('payment_success', views.payment_success, name='payment_success'),
    path('allcourse/', views.allcourses),
    path('enrolled/',views.enrolledcourses),
    path('explore/',views.explorecourses),
    path('video/<str:subjectId>/', views.subjectvideo),
    path('markviewed/', views.mark_video_as_viewed, name='mark_video_as_viewed'),
    path('banner/', views.get_banner, name='get_banner'),
    path('getprofile/', views.profile),
    path('updateprofile/',views.updateprofile),
]