from rest_framework import serializers
from .models import CustomUser, Course, Assignment, Message, Submission, Project, ProjectMilestone, ProjectFile, Announcement, Exam, Question, Choice, ExamSubmission
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'user_type': self.user.user_type,
        })
        return data

class CustomUserSerializer(serializers.ModelSerializer):
    courses_enrolled_count = serializers.SerializerMethodField()
    courses_taught_count = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'user_type', 'is_active', 'date_joined', 'last_login', 'courses_enrolled_count', 'courses_taught_count']
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def get_courses_enrolled_count(self, obj):
        return obj.courses_enrolled.count() if hasattr(obj, 'courses_enrolled') else 0

    def get_courses_taught_count(self, obj):
        return obj.courses_taught.count() if hasattr(obj, 'courses_taught') else 0

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            user_type=validated_data.get('user_type', 'student')
        )
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

class CourseSerializer(serializers.ModelSerializer):
    teacher = CustomUserSerializer(read_only=True)
    teacher_id = serializers.IntegerField(write_only=True, required=False)
    students = CustomUserSerializer(many=True, read_only=True)
    students_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'teacher', 'teacher_id', 'students', 'students_count']

    def get_students_count(self, obj):
        return obj.students.count()

    def create(self, validated_data):
        teacher_id = validated_data.pop('teacher_id', None)
        course = Course.objects.create(**validated_data)
        if teacher_id:
            course.teacher_id = teacher_id
            course.save()
        return course

    def update(self, instance, validated_data):
        teacher_id = validated_data.pop('teacher_id', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if teacher_id:
            instance.teacher_id = teacher_id
        instance.save()
        return instance

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['id', 'course', 'title', 'description', 'due_date', 'file', 'created_at']
        read_only_fields = ['created_at']

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)
    receiver_name = serializers.CharField(source='receiver.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_name', 'receiver', 'receiver_name', 'content', 'timestamp', 'is_read']
        read_only_fields = ['sender', 'timestamp', 'is_read']

class SubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    assignment_title = serializers.CharField(source='assignment.title', read_only=True)

    class Meta:
        model = Submission
        fields = ['id', 'assignment', 'assignment_title', 'student', 'student_name', 'file', 'submitted_at', 'grade', 'feedback']
        read_only_fields = ['student', 'submitted_at', 'student_name', 'assignment_title']

class ProjectMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMilestone
        fields = ['id', 'project', 'title', 'date', 'status', 'description']

class ProjectFileSerializer(serializers.ModelSerializer):
    uploader_name = serializers.CharField(source='uploader.username', read_only=True)

    class Meta:
        model = ProjectFile
        fields = ['id', 'project', 'uploader', 'uploader_name', 'file', 'created_at']
        read_only_fields = ['uploader', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)
    milestones = ProjectMilestoneSerializer(many=True, read_only=True)
    files = ProjectFileSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'student', 'student_name', 'course', 'course_title', 'status', 'deadline', 'grade', 'feedback', 'created_at', 'milestones', 'files']
        read_only_fields = ['created_at', 'student_name', 'course_title']

class AnnouncementSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    author_type = serializers.CharField(source='author.user_type', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True, allow_null=True)

    class Meta:
        model = Announcement
        fields = ['id', 'title', 'content', 'author', 'author_name', 'author_type', 'course', 'course_title', 'is_global', 'priority', 'created_at']
        read_only_fields = ['created_at', 'author_name', 'author_type', 'course_title']

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'marks', 'question_type', 'choices']

class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True, allow_null=True)

    class Meta:
        model = Exam
        fields = ['id', 'title', 'description', 'course', 'course_title', 'created_by', 'created_by_name', 'duration_minutes', 'total_marks', 'created_at', 'questions']
        read_only_fields = ['created_at', 'created_by', 'created_by_name', 'course_title']

class ExamSubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.username', read_only=True)
    exam_title = serializers.CharField(source='exam.title', read_only=True)

    class Meta:
        model = ExamSubmission
        fields = ['id', 'exam', 'exam_title', 'student', 'student_name', 'score', 'submitted_at']
        read_only_fields = ['student', 'submitted_at', 'student_name', 'exam_title']
