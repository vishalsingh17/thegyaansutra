from djongo import models
from bson import Binary, ObjectId
from django.utils.encoding import force_bytes

class Learn(models.Model):
    item = models.CharField(max_length=255)

    class Meta:
        abstract = True


class Skill(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        abstract = True

COURSE_TYPE_CHOICES = [
        ('university', 'University Course'),
        ('job', 'Job-Oriented Course'),
    ]
LEVEL_CHOICES = [
    ('beginner', 'Beginner'),
    ('intermediate', 'Intermediate'),
    ('advanced', 'Advanced'),
]
TYPE = [
    ('Live Classes', 'Live Classes'),
    ('Self-Paced', 'Self-Paced'),
]

class Course(models.Model):
    course_id = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE, default='self_paced')
    course_type = models.CharField(max_length=20, choices=COURSE_TYPE_CHOICES, default='university')
    learn = models.ArrayField(model_container=Learn, blank=True, null=True)
    skills = models.ArrayField(model_container=Skill, blank=True, null=True)
    time_need = models.IntegerField(default=24)
    review = models.DecimalField(decimal_places=1,max_digits=2, null=True)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner')
    price = models.IntegerField()
    image = models.BinaryField(blank=True, null=True)  # Use BinaryField for storing images in MongoDB

    def save_image(self, image_file):
        """
        Convert the image file to binary and save it in the image field.
        """
        with image_file.open('rb') as img:
            self.image = Binary(img.read())


    def __str__(self):
        return self.name


class Semester(models.Model):
    course = models.ForeignKey(Course, related_name='semesters', on_delete=models.CASCADE)
    Semester_num = models.IntegerField()
    name = models.CharField(max_length=255)
    description = models.TextField()
    learn = models.ArrayField(model_container=Learn, blank=True, null=True)
    skills = models.ArrayField(model_container=Skill, blank=True, null=True)
    time_need = models.IntegerField(default=24)
    review = models.DecimalField(decimal_places=1,max_digits=2, null=True)
    price = models.IntegerField()
    id = models.CharField(max_length=15, unique=True, editable=False, primary_key=True)  # Adding the id attribute

    def save(self, *args, **kwargs):
        # Dynamically set the id as course_id + Semester_num
        if not self.id:
            self.id = f"{self.course.course_id}{self.Semester_num}"
        super(Semester, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.Semester_num} ({self.course.name})"

    class Meta:
        verbose_name = "Semester"
        verbose_name_plural = "Semesters"
        unique_together = ('course', 'Semester_num')


class Subject(models.Model):
    semester = models.ForeignKey(Semester, related_name='subjects', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=1000)
    sub_id = models.CharField(max_length=10, unique=True, primary_key=True)
    price = models.IntegerField()
    image = models.BinaryField(blank=True, null=True)  # BinaryField for image storage

    def save_image(self, image_file):
        """
        Convert the image file to binary and save it in the image field.
        """
        with image_file.open('rb') as img:
            self.image = Binary(img.read())

    def __str__(self):
        return f"{self.name} ({self.semester.name} - {self.semester.course.name})"
    
    class Meta:
        verbose_name = "Subject"
        verbose_name_plural = "Subjects"

class Videos(models.Model):
    subject = models.ForeignKey(Subject, related_name='videoss', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    duration = models.IntegerField()
    videoUrl = models.URLField()
    driveLink = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        
    def __str__(self):
        return self.title

class Sub(models.Model):
    id = models.CharField(max_length=10)

    class Meta:
        abstract = True


class User(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    phone = models.IntegerField()
    subject_id = models.ArrayField(model_container=Sub, blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    viewed_videos = models.ManyToManyField(Videos, blank=True)  # ManyToManyField for viewed videos

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"


class Banner(models.Model):
    _id = models.ObjectIdField(default=ObjectId, primary_key=True)
    message = models.CharField(max_length=255, help_text="Enter the banner message")
    is_active = models.BooleanField(default=True, help_text="Check to display the banner")

    def __str__(self):
        return self.message