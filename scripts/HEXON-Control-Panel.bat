@echo off
cd /d "%~dp0.."
color 0F
title HEXON Project - Control Panel
mode con: cols=60 lines=30

:main_menu
cls
color 0F
echo.
echo  ======================================================
echo  ==             HEXON CONTROL PANEL                 ==
echo  ==             PDF Tools Manager                   ==
echo  ======================================================
echo.
echo  Current Status: Checking...
echo.

:: Quick status check
docker ps --filter "name=hexon-app" --format "{{.Names}}" | findstr "hexon-app" >nul
if %ERRORLEVEL% EQU 0 (
    color 0A
    echo  [RUNNING] HEXON is ACTIVE - Ready to use!
    echo  [ACCESS]  http://localhost:5000
    color 0F
) else (
    color 0C
    echo  [STOPPED] HEXON is NOT RUNNING
    color 0F
)

echo.
echo  ======================================================
echo  ==                 MAIN MENU                       ==
echo  ======================================================
echo.
echo   [1] START Project           [2] STOP Project
echo.
echo   [3] CHECK Status             [4] MANAGE Files
echo.
echo   [5] OPEN Browser             [6] VIEW Logs
echo.
echo   [7] RESTART Project          [8] CLEAN Rebuild
echo.
echo   [9] HELP and Info            [0] EXIT
echo.
echo  ------------------------------------------------------
echo.
set /p choice="  Select option (0-9): "

if "%choice%"=="1" goto start_project
if "%choice%"=="2" goto stop_project
if "%choice%"=="3" goto check_status
if "%choice%"=="4" goto manage_files
if "%choice%"=="5" goto open_browser
if "%choice%"=="6" goto view_logs
if "%choice%"=="7" goto restart_project
if "%choice%"=="8" goto clean_rebuild
if "%choice%"=="9" goto help_info
if "%choice%"=="0" goto exit_program

echo  Invalid choice. Please try again...
timeout /t 2 >nul
goto main_menu

:start_project
cls
echo.
echo  Starting HEXON Project...
echo  ===========================
echo.
call "%~dp0turn-on.bat"
pause
goto main_menu

:stop_project
cls
echo.
echo  Stopping HEXON Project...
echo  ===========================
echo.
call "%~dp0turn-off.bat"
pause
goto main_menu

:check_status
cls
echo.
echo  Checking Project Status...
echo  ============================
echo.
call "%~dp0project-status.bat"
pause
goto main_menu

:manage_files
cls
echo.
echo  File Management Tool...
echo  =========================
echo.
call "%~dp0cleanup-files.bat"
pause
goto main_menu

:open_browser
cls
echo.
echo  Opening HEXON in browser...
echo  ==============================
echo.

:: Check if HEXON is running first
docker ps --filter "name=hexon-app" --format "{{.Names}}" | findstr "hexon-app" >nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo  [ERROR] HEXON is not running!
    echo.
    echo  Please start HEXON first using option 1.
    color 0F
    echo.
    pause
    goto main_menu
)

echo  Attempting to open browser...
start "" "http://localhost:5000" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo  [SUCCESS] Browser command sent
    echo  [URL] http://localhost:5000
    echo.
    echo  If browser didn't open automatically:
    echo  - Manually open your browser
    echo  - Go to: http://localhost:5000
) else (
    echo  Trying alternative method...
    rundll32 url.dll,FileProtocolHandler "http://localhost:5000" 2>nul
    echo  [SENT] Alternative browser command
    echo  [URL] http://localhost:5000
)

echo.
pause
goto main_menu

:view_logs
cls
echo.
echo  Viewing Application Logs...
echo  ==============================
echo  (Press Ctrl+C to return to menu)
echo.
docker-compose logs -f hexon-app
goto main_menu

:restart_project
cls
echo.
echo  Restarting HEXON Project...
echo  ==============================
echo.
docker-compose restart
if %ERRORLEVEL% EQU 0 (
    echo  [SUCCESS] Project restarted successfully
    echo  [ACCESS] http://localhost:5000
) else (
    echo  [ERROR] Error restarting project
)
echo.
pause
goto main_menu

:clean_rebuild
cls
echo.
echo  Clean Rebuild (This may take several minutes)...
echo  ===================================================
echo.
docker-compose down -v
docker-compose up -d --build
if %ERRORLEVEL% EQU 0 (
    echo  [SUCCESS] Clean rebuild completed successfully
    echo  [ACCESS] http://localhost:5000
) else (
    echo  [ERROR] Error during clean rebuild
)
echo.
pause
goto main_menu

:help_info
cls
echo.
echo  ======================================================
echo  ==               HEXON HELP and INFO              ==
echo  ======================================================
echo.
echo  PROJECT LOCATION:
echo    %CD%
echo.
echo  ACCESS URLS:
echo    Main App: http://localhost:5000
echo    Database: localhost:27017
echo.
echo  IMPORTANT FOLDERS:
echo    Scripts: %CD%\scripts\
echo    Uploads: %CD%\uploads\
echo.
echo  QUICK COMMANDS:
echo    Start: scripts\turn-on.bat
echo    Stop:  scripts\turn-off.bat
echo    Status: scripts\project-status.bat
echo.
echo  PRO TIPS:
echo    - Create desktop shortcuts for quick access
echo    - Use option 8 if containers behave strangely
echo    - Check Docker Desktop is running before starting
echo.
echo  REQUIREMENTS:
echo    - Docker Desktop must be running
echo    - Ports 5000 and 27017 must be available
echo.
pause
goto main_menu

:exit_program
cls
echo.
echo  ======================================================
echo  ==          Thanks for using HEXON!               ==
echo  ======================================================
echo.
echo  TIP: Create a desktop shortcut of this file 
echo       for easy access anytime!
echo.
pause
exit

:: Error handling
:error
color 0C
echo.
echo  [ERROR] An error occurred. Please check:
echo    - Docker Desktop is running
echo    - You have proper permissions
echo    - Network connection is stable
echo.
pause
goto main_menu 