@echo off
cd /d "%~dp0.."
color 0E
title HEXON Project - STATUS CHECK

:main_menu
cls
echo.
echo ================================
echo    HEXON PROJECT - STATUS
echo ================================
echo.

:: Check if Docker is running
docker --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo ✗ Docker is not running or not installed
    echo Please start Docker Desktop first
    echo.
    pause
    goto end
)

echo Checking Docker containers status...
echo.

:: Show container status
echo Current HEXON containers:
echo ----------------------------------------
docker-compose ps

echo.
echo Detailed container information:
echo ----------------------------------------
docker ps --filter "name=hexon" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo ================================
echo         QUICK ACTIONS
echo ================================
echo.

:: Check if containers are running and show appropriate menu
docker ps --filter "name=hexon-app" --format "{{.Names}}" | findstr "hexon-app" >nul
if %ERRORLEVEL% EQU 0 (
    color 0A
    echo ✓ HEXON is RUNNING
    echo ✓ Access your app: http://localhost:5000
    color 0E
    echo.
    echo [1] Open in browser
    echo [2] View logs
    echo [3] Stop project
    echo [4] Restart project
    echo [5] Exit
    echo.
    set /p action="Choose action (1-5): "
    
    if "%action%"=="1" goto open_browser
    if "%action%"=="2" goto show_logs
    if "%action%"=="3" goto stop_project
    if "%action%"=="4" goto restart_project
    if "%action%"=="5" goto end
    
    echo Invalid choice. Please try again...
    timeout /t 2 >nul
    goto main_menu
    
) else (
    color 0C
    echo ✗ HEXON is NOT RUNNING
    color 0E
    echo.
    echo [1] Start project
    echo [2] Start with rebuild
    echo [3] Exit
    echo.
    set /p action="Choose action (1-3): "
    
    if "%action%"=="1" goto start_project
    if "%action%"=="2" goto start_rebuild
    if "%action%"=="3" goto end
    
    echo Invalid choice. Please try again...
    timeout /t 2 >nul
    goto main_menu
)

:open_browser
cls
echo.
echo Opening HEXON in browser...
echo ================================
echo.

:: Double-check if HEXON is still running
docker ps --filter "name=hexon-app" --format "{{.Names}}" | findstr "hexon-app" >nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo ✗ ERROR: HEXON is not running!
    echo.
    echo Please start HEXON first.
    color 0E
    echo.
    pause
    goto main_menu
)

echo Checking if application is ready...

:: Simple check - try to open browser directly
echo Attempting to open browser...
start "" "http://localhost:5000" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo ✓ Browser command sent successfully
    echo ✓ URL: http://localhost:5000
    echo.
    echo If browser didn't open, manually go to: http://localhost:5000
) else (
    echo Trying alternative method...
    rundll32 url.dll,FileProtocolHandler "http://localhost:5000" 2>nul
    echo ✓ Alternative browser command sent
    echo ✓ URL: http://localhost:5000
    echo.
    echo If browser still didn't open:
    echo • Manually open your browser
    echo • Go to: http://localhost:5000
)

echo.
echo Press any key to return to menu...
pause >nul
goto main_menu

:show_logs
cls
echo.
echo Viewing Application Logs...
echo ================================
echo (Press Ctrl+C to return to menu)
echo.
docker-compose logs -f hexon-app
echo.
echo Press any key to return to menu...
pause >nul
goto main_menu

:stop_project
cls
echo.
echo Stopping HEXON project...
echo ================================
echo.
docker-compose down
if %ERRORLEVEL% EQU 0 (
    color 0A
    echo ✓ Project stopped successfully
    color 0E
) else (
    color 0C
    echo ✗ Error stopping project
    color 0E
)
echo.
echo Press any key to return to menu...
pause >nul
goto main_menu

:restart_project
cls
echo.
echo Restarting HEXON project...
echo ================================
echo.
docker-compose restart
if %ERRORLEVEL% EQU 0 (
    color 0A
    echo ✓ Project restarted successfully
    echo ✓ Access: http://localhost:5000
    color 0E
) else (
    color 0C
    echo ✗ Error restarting project
    color 0E
)
echo.
echo Press any key to return to menu...
pause >nul
goto main_menu

:start_project
cls
echo.
echo Starting HEXON project...
echo ================================
echo.
docker-compose up -d
if %ERRORLEVEL% EQU 0 (
    color 0A
    echo ✓ Project started successfully
    echo ✓ Access: http://localhost:5000
    color 0E
) else (
    color 0C
    echo ✗ Error starting project
    color 0E
)
echo.
echo Press any key to return to menu...
pause >nul
goto main_menu

:start_rebuild
cls
echo.
echo Starting HEXON project with rebuild...
echo ==========================================
echo This may take several minutes...
echo.
docker-compose up -d --build
if %ERRORLEVEL% EQU 0 (
    color 0A
    echo ✓ Project started successfully
    echo ✓ Access: http://localhost:5000
    color 0E
) else (
    color 0C
    echo ✗ Error starting project
    color 0E
)
echo.
echo Press any key to return to menu...
pause >nul
goto main_menu

:end
cls
echo.
echo ================================
echo   Thanks for using HEXON! 👋
echo ================================
echo.
pause
exit 