@echo off
cd /d "%~dp0.."
color 0C
title HEXON Project - TURN OFF
echo.
echo ================================
echo    HEXON PROJECT - TURN OFF
echo ================================
echo.
echo Stopping HEXON Docker containers...
echo.

:: Stop the Docker containers
docker-compose down

if %ERRORLEVEL% EQU 0 (
    color 0A
    echo.
    echo ================================
    echo     PROJECT STOPPED SUCCESSFULLY
    echo ================================
    echo.
    echo ✓ All HEXON containers stopped
    echo ✓ Network removed
    echo ✓ Project is now offline
    echo.
    echo You can now close this window.
) else (
    color 0C
    echo.
    echo ================================
    echo         ERROR OCCURRED
    echo ================================
    echo.
    echo ✗ Failed to stop containers
    echo Please check if Docker is running
    echo.
)

echo.
echo Press any key to exit...
pause >nul 