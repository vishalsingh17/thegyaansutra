from django import forms
import ast
from bson import ObjectId
from django.contrib import admin
from .models import Course, Semester, Subject, Videos, Banner, User
from PIL import Image
import io
import base64

def process_image_upload(image_field):
    if not image_field:
        return None

    image = Image.open(image_field)
    image_io = io.BytesIO()
    image.save(image_io, format=image.format)
    return image_io.getvalue()

class CourseAdminForm(forms.ModelForm):
    learn = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3, 'cols': 40}),
        help_text="Enter multiple learning points separated by commas.",
        required=False,
    )
    skills = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3, 'cols': 40}),
        help_text="Enter multiple skills separated by commas.",
        required=False,
    )
    image = forms.ImageField(
        required=False,
        help_text="Upload an image for the course.",
        label="Course Image"
    )

    def clean_image(self):
        image = self.cleaned_data.get('image')
        return process_image_upload(image)
    
    def clean_learn(self):
        learn_data = self.cleaned_data.get('learn', '')

        # If the input is a string representation of a list or dictionary, parse it safely
        if isinstance(learn_data, str):
            try:
                # Use ast.literal_eval for safely evaluating string representations of Python objects
                parsed_data = ast.literal_eval(learn_data)
                if isinstance(parsed_data, list) and all(isinstance(item, dict) and 'item' in item for item in parsed_data):
                    return parsed_data  # Return directly if the structure is already correct
            except (ValueError, SyntaxError):
                # Treat as plain text if parsing fails
                pass

            # Split comma-separated text into a list of dictionaries
            return [{'item': item.strip()} for item in learn_data.split(',') if item.strip()]

        # Ensure the result is always a list of dictionaries
        if isinstance(learn_data, list):
            return [{'item': item['item']} for item in learn_data if isinstance(item, dict) and 'item' in item]

        return []  # Default to an empty list for invalid data


    def clean_skills(self):
        skills_data = self.cleaned_data.get('skills', '')

        # If the input is a string representation of a list or dictionary, parse it safely
        if isinstance(skills_data, str):
            try:
                # Use ast.literal_eval for safely evaluating string representations of Python objects
                parsed_data = ast.literal_eval(skills_data)
                if isinstance(parsed_data, list) and all(isinstance(skill, dict) and 'name' in skill for skill in parsed_data):
                    return parsed_data  # Return directly if the structure is already correct
            except (ValueError, SyntaxError):
                # Treat as plain text if parsing fails
                pass

            # Split comma-separated text into a list of dictionaries
            return [{'name': name.strip()} for name in skills_data.split(',') if name.strip()]

        # Ensure the result is always a list of dictionaries
        if isinstance(skills_data, list):
            return [{'name': skill['name']} for skill in skills_data if isinstance(skill, dict) and 'name' in skill]

        return []  # Default to an empty list for invalid data


# Custom form for Semester to handle learn and skills
class SemesterAdminForm(forms.ModelForm):
    learn = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3, 'cols': 40}),
        help_text="Enter multiple learning points separated by commas.",
        required=False,
    )
    skills = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 3, 'cols': 40}),
        help_text="Enter multiple skills separated by commas.",
        required=False,
    )

    class Meta:
        model = Semester
        fields = '__all__'
        
    def clean_learn(self):
        learn_data = self.cleaned_data.get('learn', '')

        # If the input is a string representation of a list or dictionary, parse it safely
        if isinstance(learn_data, str):
            try:
                # Use ast.literal_eval for safely evaluating string representations of Python objects
                parsed_data = ast.literal_eval(learn_data)
                if isinstance(parsed_data, list) and all(isinstance(item, dict) and 'item' in item for item in parsed_data):
                    return parsed_data  # Return directly if the structure is already correct
            except (ValueError, SyntaxError):
                # Treat as plain text if parsing fails
                pass

            # Split comma-separated text into a list of dictionaries
            return [{'item': item.strip()} for item in learn_data.split(',') if item.strip()]

        # Ensure the result is always a list of dictionaries
        if isinstance(learn_data, list):
            return [{'item': item['item']} for item in learn_data if isinstance(item, dict) and 'item' in item]

        return []  # Default to an empty list for invalid data


    def clean_skills(self):
        skills_data = self.cleaned_data.get('skills', '')

        # If the input is a string representation of a list or dictionary, parse it safely
        if isinstance(skills_data, str):
            try:
                # Use ast.literal_eval for safely evaluating string representations of Python objects
                parsed_data = ast.literal_eval(skills_data)
                if isinstance(parsed_data, list) and all(isinstance(skill, dict) and 'name' in skill for skill in parsed_data):
                    return parsed_data  # Return directly if the structure is already correct
            except (ValueError, SyntaxError):
                # Treat as plain text if parsing fails
                pass

            # Split comma-separated text into a list of dictionaries
            return [{'name': name.strip()} for name in skills_data.split(',') if name.strip()]

        # Ensure the result is always a list of dictionaries
        if isinstance(skills_data, list):
            return [{'name': skill['name']} for skill in skills_data if isinstance(skill, dict) and 'name' in skill]

        return []  # Default to an empty list for invalid data
    

class SubjectAdminForm(forms.ModelForm):

    image = forms.ImageField(
        required=False,
        help_text="Upload an image for the course.",
        label="Course Image"
    )

    def clean_image(self):
        image = self.cleaned_data.get('image')
        return process_image_upload(image)
    
    class Meta:
        model = Subject
        fields = '__all__'

    def clean_semester(self):
        semester = self.cleaned_data.get('semester')
        if not Semester.objects.filter(id=semester.id).exists():
            raise forms.ValidationError("Select a valid choice.")
        return semester


class SubjectInline(admin.TabularInline):
    model = Subject
    extra = 1


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    form = CourseAdminForm
    list_display = ('course_id', 'name')
    search_fields = ('course_id', 'name')
    exclude = ('image',)
    def save_model(self, request, obj, form, change):
        image_data = form.cleaned_data.get('image')
        if image_data:
            obj.image = image_data  # Save binary data to the `image` field
        super().save_model(request, obj, form, change)


@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    form = SemesterAdminForm
    list_display = ('Semester_num','name', 'course')
    list_filter = ('course',)
    search_fields = ('Semester_num','name', 'course__name')
    inlines = [SubjectInline]

class VideosInline(admin.TabularInline):
    """
    Inline admin for videos related to a subject.
    """
    model = Videos
    extra = 1
    fields = ('title', 'duration', 'videoUrl', 'driveLink', 'order')
    verbose_name = "Video"
    verbose_name_plural = "Videos"
    ordering = ('order',)


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    form = SubjectAdminForm
    list_display = ('name', 'semester', 'price')
    list_filter = ('semester',)
    search_fields = ('name', 'description')
    exclude = ('image',)
    def save_model(self, request, obj, form, change):
        image_data = form.cleaned_data.get('image')
        if image_data:
            obj.image = image_data
        super().save_model(request, obj, form, change)
    inlines = [VideosInline]


@admin.register(Videos)
class VideosAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Videos model.
    """
    list_display = ('title', 'subject', 'duration', 'driveLink')
    list_filter = ('subject',)
    search_fields = ('title',)
    ordering = ('subject', 'title')


class SubForm(forms.Form):
    """
    A simple form to manage Sub objects for the ArrayField.
    """
    id = forms.CharField(max_length=10, required=True)


class UserAdminForm(forms.ModelForm):
    """
    Custom admin form for the User model to handle the ArrayField.
    """
    subject_id = forms.JSONField(required=False, help_text="Enter a list of subjects as JSON.")

    class Meta:
        model = User
        fields = '__all__'

    def clean_subject_id(self):
        """
        Parse JSON input into a list of dictionaries.
        """
        data = self.cleaned_data['subject_id']
        if not isinstance(data, list):
            raise forms.ValidationError("Subject IDs must be a list of objects.")
        for item in data:
            if not isinstance(item, dict) or 'id' not in item:
                raise forms.ValidationError("Each subject must be an object with an 'id' key.")
        return data

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    """
    Admin interface for the User model with custom handling for subject_id.
    """
    form = UserAdminForm
    list_display = ('email', 'name', 'phone', 'github', 'linkedin')
    search_fields = ('email', 'name')
    list_filter = ('email',)

    fieldsets = (
        (None, {
            'fields': ('email', 'name', 'phone', 'github', 'linkedin', 'subject_id'),
        }),
    )

    # filter_horizontal = ('subject_id',)


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('message', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('message',)
