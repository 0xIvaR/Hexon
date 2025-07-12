@echo off
cd /d "%~dp0.."
color 0B
title HEXON Project - TURN ON
echo.
echo ================================
echo     HEXON PROJECT - TURN ON
echo ================================
echo.
echo Choose startup option:
echo.
echo [1] Normal Start (Quick)
echo [2] Start with Rebuild (Slower, use if you made changes)
echo [3] Clean Start (Removes volumes and rebuilds)
echo.
set /p choice="Enter your choice (1, 2, or 3): "

if "%choice%"=="1" goto normal_start
if "%choice%"=="2" goto rebuild_start
if "%choice%"=="3" goto clean_start

echo Invalid choice. Using normal start...
goto normal_start

:normal_start
echo.
echo Starting HEXON with normal startup...
echo.
docker-compose up -d
goto check_result

:rebuild_start
echo.
echo Starting HEXON with rebuild (this may take a few minutes)...
echo.
docker-compose up -d --build
goto check_result

:clean_start
echo.
echo Performing clean start (removing volumes and rebuilding)...
echo.
docker-compose down -v
docker-compose up -d --build
goto check_result

:check_result
if %ERRORLEVEL% EQU 0 (
    color 0A
    echo.
    echo ================================
    echo     PROJECT STARTED SUCCESSFULLY
    echo ================================
    echo.
    echo ✓ HEXON containers are running
    echo ✓ Frontend + Backend: http://localhost:5000
    echo ✓ MongoDB: localhost:27017
    echo.
    echo Your HEXON PDF Tools are now ready to use!
    echo Open your browser and go to: http://localhost:5000
    echo.
    
    :: Check if browser should open automatically
    set /p open_browser="Open browser automatically? (y/n): "
    if /i "%open_browser%"=="y" start http://localhost:5000
    
) else (
    color 0C
    echo.
    echo ================================
    echo         ERROR OCCURRED
    echo ================================
    echo.
    echo ✗ Failed to start containers
    echo.
    echo Possible solutions:
    echo - Make sure Docker Desktop is running
    echo - Check if ports 5000 or 27017 are already in use
    echo - Try running as Administrator
    echo.
)

echo.
echo Press any key to exit...
pause >nul 