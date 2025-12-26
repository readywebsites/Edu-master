from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, CourseViewSet, CustomTokenObtainPairView, AssignmentViewSet, MessageViewSet, SubmissionViewSet, ProjectViewSet, ProjectMilestoneViewSet, ProjectFileViewSet, DashboardStatsView, AnnouncementViewSet, ExamViewSet, ExamSubmissionViewSet, BulkUserActionView, AssignCourseView

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'assignments', AssignmentViewSet)
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'submissions', SubmissionViewSet, basename='submission')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'project-milestones', ProjectMilestoneViewSet)
router.register(r'project-files', ProjectFileViewSet)
router.register(r'announcements', AnnouncementViewSet, basename='announcement')
router.register(r'exams', ExamViewSet, basename='exam')
router.register(r'exam-submissions', ExamSubmissionViewSet, basename='exam-submission')

urlpatterns = [
    path('admin/stats/', DashboardStatsView.as_view(), name='admin-stats'),
    path('admin/bulk-user-action/', BulkUserActionView.as_view(), name='bulk-user-action'),
    path('admin/assign-course/', AssignCourseView.as_view(), name='assign-course'),
    path('', include(router.urls)),
]