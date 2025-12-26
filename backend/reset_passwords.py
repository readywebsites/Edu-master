import os
import django
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'education.settings') 
django.setup()

from app.models import CustomUser

def reset_password(username, new_password):
    try:
        user = CustomUser.objects.get(username=username)
        user.set_password(new_password)
        user.save()
        print(f"Successfully reset password for {username} to '{new_password}'")
    except CustomUser.DoesNotExist:
        print(f"User {username} does not exist!")

try:
    reset_password('student1', 'password123')
    reset_password('teacher1', 'password123')
except Exception as e:
    print(f"Error: {e}")
