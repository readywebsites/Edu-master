@echo off
echo Starting Edu-Master Development Environment...

:: Start Django Backend in a new window
echo Starting Backend Server...
start "Django Backend" cmd /k "cd backend && ..\env\Scripts\python.exe manage.py runserver"

:: Start React Frontend in a new window
echo Starting Frontend Server...
start "React Frontend" cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting in separate windows.
echo Keep those windows open while developing.
pause
