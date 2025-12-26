from django.contrib import admin
from .models import Course, CustomUser,Unit,Resource,Assignment,Announcement,DiscussionMessage,Message,Project,ProjectMilestone,ProjectFile   

# ,Quiz,Question,Choice,Answer
# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Course)
admin.site.register(Unit)
admin.site.register(Resource)
admin.site.register(Assignment)

admin.site.register(Announcement)
admin.site.register(DiscussionMessage)
admin.site.register(Message)
admin.site.register(Project)
admin.site.register(ProjectMilestone)
admin.site.register(ProjectFile)