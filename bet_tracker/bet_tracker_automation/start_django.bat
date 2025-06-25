@echo off
cd /d C:\Users\micla\backend-bet-tracker-tool\bet_tracker
call ..\venv\Scripts\activate.bat
python manage.py runserver
pause