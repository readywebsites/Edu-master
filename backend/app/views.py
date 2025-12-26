from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Q
from .models import CustomUser, Course, Assignment, Message, Submission, Project, ProjectMilestone, ProjectFile, Announcement, Exam, Question, Choice, ExamSubmission
from .serializers import (
    CustomUserSerializer, 
    CourseSerializer, 
    CustomTokenObtainPairSerializer, 
    AssignmentSerializer,
    MessageSerializer,
    SubmissionSerializer,
    ProjectSerializer,
    ProjectMilestoneSerializer,
    ProjectFileSerializer,
    ProjectFileSerializer,
    AnnouncementSerializer,
    ExamSerializer,
    QuestionSerializer,
    ChoiceSerializer,
    ExamSubmissionSerializer
)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    
    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return CustomUser.objects.none()
        
        queryset = CustomUser.objects.none()
        if user.user_type == 'admin' or user.is_staff:
            queryset = CustomUser.objects.all()
        else:
            queryset = CustomUser.objects.filter(id=user.id)
        
        # Filter by user_type
        user_type_param = self.request.query_params.get('user_type')
        if user_type_param:
            queryset = queryset.filter(user_type=user_type_param)
        
        # Search by username or email
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(Q(username__icontains=search) | Q(email__icontains=search))
        
        # Filter by is_active
        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
            
        return queryset.order_by('-date_joined')

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class BulkUserActionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.user_type != 'admin' and not user.is_staff:
            return Response({'error': 'Unauthorized'}, status=403)

        user_ids = request.data.get('user_ids', [])
        action = request.data.get('action')  # 'activate', 'deactivate', 'delete'

        if not user_ids or not action:
            return Response({'error': 'user_ids and action are required'}, status=400)

        users = CustomUser.objects.filter(id__in=user_ids)
        
        if action == 'activate':
            users.update(is_active=True)
            return Response({'message': f'{users.count()} users activated'})
        elif action == 'deactivate':
            users.update(is_active=False)
            return Response({'message': f'{users.count()} users deactivated'})
        elif action == 'delete':
            count = users.count()
            users.delete()
            return Response({'message': f'{count} users permanently deleted'})
        else:
            return Response({'error': 'Invalid action'}, status=400)

class AssignCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if user.user_type != 'admin' and not user.is_staff:
            return Response({'error': 'Unauthorized'}, status=403)

        user_id = request.data.get('user_id')
        course_ids = request.data.get('course_ids', [])
        action = request.data.get('action', 'assign')  # 'assign' or 'remove'

        try:
            target_user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        courses = Course.objects.filter(id__in=course_ids)
        
        if target_user.user_type == 'student':
            if action == 'assign':
                for course in courses:
                    course.students.add(target_user)
            else:
                for course in courses:
                    course.students.remove(target_user)
        elif target_user.user_type == 'teacher':
            # For teachers, we set them as course teacher (one teacher per course)
            if action == 'assign':
                courses.update(teacher=target_user)
            # Remove teacher assignment not implemented (would need to set to null)
        
        return Response({'message': f'Course assignment updated for {target_user.username}'})

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [AllowAny]

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated] # Messages should be private

    def get_queryset(self):
        user = self.request.user
        # Filter messages where the user is either sender or receiver
        return Message.objects.filter(Q(sender=user) | Q(receiver=user))

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

class SubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'student':
            return Submission.objects.filter(student=user)
        # Teachers/Admins see all (or filtered by course, simplified for now)
        return Submission.objects.all()

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'student':
            return Project.objects.filter(student=user)
        # For teacher, return projects in courses they teach (or all for MVP simplicity)
        return Project.objects.all()

class ProjectMilestoneViewSet(viewsets.ModelViewSet):
    queryset = ProjectMilestone.objects.all()
    serializer_class = ProjectMilestoneSerializer
    permission_classes = [IsAuthenticated]

class ProjectFileViewSet(viewsets.ModelViewSet):
    queryset = ProjectFile.objects.all()
    serializer_class = ProjectFileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(uploader=self.request.user)

class AnnouncementViewSet(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        if user.user_type == 'student':
            # Students see global announcements + announcements from their enrolled courses
            enrolled_courses = user.courses_enrolled.all()
            return Announcement.objects.filter(
                Q(is_global=True) | Q(course__in=enrolled_courses)
            ).distinct()
        elif user.user_type == 'teacher':
            # Teachers see all announcements from courses they teach + global announcements
            teaching_courses = user.courses_taught.all()
            return Announcement.objects.filter(
                Q(is_global=True) | Q(author=user) | Q(course__in=teaching_courses)
            ).distinct()
        else:
            # Admins see all announcements
            return Announcement.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ExamViewSet(viewsets.ModelViewSet):
    serializer_class = ExamSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'teacher':
            return Exam.objects.filter(created_by=user)
        elif user.user_type == 'student':
            # Students can see exams from their enrolled courses or global mock tests (no course)
            enrolled_courses = user.courses_enrolled.all()
            return Exam.objects.filter(Q(course__in=enrolled_courses) | Q(course__isnull=True))
        return Exam.objects.all() # Admin

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def create(self, request, *args, **kwargs):
        # Custom create to handle nested questions
        questions_data = request.data.get('questions', [])
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        exam = serializer.save(created_by=self.request.user)

        for q_data in questions_data:
            choices_data = q_data.pop('choices', [])
            question = Question.objects.create(exam=exam, **q_data)
            for c_data in choices_data:
                Choice.objects.create(question=question, **c_data)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

class ExamSubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = ExamSubmissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'student':
            return ExamSubmission.objects.filter(student=user)
        elif user.user_type == 'teacher':
             # Teachers see submissions for their exams
            return ExamSubmission.objects.filter(exam__created_by=user)
        return ExamSubmission.objects.all()

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.user_type != 'admin' and not user.is_staff:
            return Response({'error': 'Unauthorized'}, status=403)

        total_students = CustomUser.objects.filter(user_type='student').count()
        total_teachers = CustomUser.objects.filter(user_type='teacher').count()
        total_courses = Course.objects.count()
        
        recent_users = CustomUser.objects.order_by('-date_joined')[:5]
        recent_users_data = CustomUserSerializer(recent_users, many=True).data

        return Response({
            'total_students': total_students,
            'total_teachers': total_teachers,
            'total_courses': total_courses,
            'recent_users': recent_users_data
        })