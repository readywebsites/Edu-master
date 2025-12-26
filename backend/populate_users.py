import os
import django
import sys

# Add the project directory to the sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'education.settings') 
django.setup()

from app.models import CustomUser, Message

def create_user(username, email, password, user_type):
    if not CustomUser.objects.filter(username=username).exists():
        print(f"Creating {user_type}: {username}...")
        user = CustomUser.objects.create_user(username=username, email=email, password=password, user_type=user_type)
        print(f"Successfully created {username}")
        return user
    else:
        print(f"User {username} already exists")
        return CustomUser.objects.get(username=username)

try:
    print("Starting data population...")
    student = create_user('student1', 'student1@example.com', 'password123', 'student')
    teacher = create_user('teacher1', 'teacher1@example.com', 'password123', 'teacher')

    # Create some messages if none exist between them
    if not Message.objects.filter(sender=student, receiver=teacher).exists():
        Message.objects.create(sender=student, receiver=teacher, content="Hello Teacher, I have a question about the assignment.")
        Message.objects.create(sender=teacher, receiver=student, content="Hi Student1, sure. What do you need help with?")
        print("Created dummy conversation between student1 and teacher1.")
    else:
        print("Conversation already exists.")

    print("\n--- CREDENTIALS ---")
    print("Student: student1 / password123")
    print("Teacher: teacher1 / password123")
    print("-------------------")

except Exception as e:
    print(f"Error creating data: {e}")
