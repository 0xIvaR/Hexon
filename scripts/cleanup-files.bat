@echo off
cd /d "%~dp0.."
color 0D
title HEXON Project - FILE CLEANUP
echo.
echo ================================
echo    HEXON PROJECT - FILE CLEANUP
echo ================================
echo.
echo This tool helps you manage uploaded files
echo Location: %CD%\uploads\
echo.

:: Check if uploads directory exists
if not exist "uploads\" (
    color 0C
    echo ✗ Uploads directory not found!
    echo Make sure you're running this from the HEXON project folder
    goto end
)

:: Show current files
echo Current files in uploads folder:
echo ----------------------------------------
dir uploads\ /b /a-d 2>nul | find /c /v "" > temp_count.txt
set /p file_count=<temp_count.txt
del temp_count.txt

if %file_count% EQU 0 (
    color 0A
    echo ✓ No files found - uploads folder is clean!
    goto end
)

echo Found %file_count% files:
dir uploads\ /b /a-d
echo.

:: Calculate total size
for /f "tokens=3" %%a in ('dir uploads\ /s /-c ^| find "File(s)"') do set total_size=%%a
echo Total size: %total_size% bytes
echo.

echo ================================
echo       CLEANUP OPTIONS
echo ================================
echo.
echo [1] View file details (sizes and dates)
echo [2] Delete files older than 7 days
echo [3] Delete files older than 30 days
echo [4] Delete all PDF files (merged_*, converted_*, imagepdf_*)
echo [5] Delete ALL files (DANGEROUS!)
echo [6] Delete specific file types
echo [0] Exit without changes
echo.
set /p choice="Choose cleanup option (0-6): "

if "%choice%"=="0" goto end
if "%choice%"=="1" goto view_details
if "%choice%"=="2" goto delete_7days
if "%choice%"=="3" goto delete_30days
if "%choice%"=="4" goto delete_pdfs
if "%choice%"=="5" goto delete_all
if "%choice%"=="6" goto delete_specific

echo Invalid choice. Exiting...
goto end

:view_details
echo.
echo File details:
echo ----------------------------------------
dir uploads\ /od /ta
goto end

:delete_7days
echo.
echo This will delete files older than 7 days...
echo.
forfiles /p uploads /m *.* /d -7 /c "cmd /c echo @path - @fdate" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo No files older than 7 days found.
    goto end
)
echo.
set /p confirm="Are you sure? (y/n): "
if /i "%confirm%"=="y" (
    forfiles /p uploads /m *.* /d -7 /c "cmd /c del @path" 2>nul
    echo ✓ Old files deleted successfully
) else (
    echo Operation cancelled.
)
goto end

:delete_30days
echo.
echo This will delete files older than 30 days...
echo.
forfiles /p uploads /m *.* /d -30 /c "cmd /c echo @path - @fdate" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo No files older than 30 days found.
    goto end
)
echo.
set /p confirm="Are you sure? (y/n): "
if /i "%confirm%"=="y" (
    forfiles /p uploads /m *.* /d -30 /c "cmd /c del @path" 2>nul
    echo ✓ Old files deleted successfully
) else (
    echo Operation cancelled.
)
goto end

:delete_pdfs
echo.
echo This will delete all PDF output files:
echo - merged_*.pdf
echo - converted_*.pdf  
echo - imagepdf_*.pdf
echo.
dir uploads\merged_*.pdf uploads\converted_*.pdf uploads\imagepdf_*.pdf 2>nul
echo.
set /p confirm="Delete these PDF files? (y/n): "
if /i "%confirm%"=="y" (
    del uploads\merged_*.pdf 2>nul
    del uploads\converted_*.pdf 2>nul
    del uploads\imagepdf_*.pdf 2>nul
    echo ✓ PDF files deleted successfully
) else (
    echo Operation cancelled.
)
goto end

:delete_all
color 0C
echo.
echo ⚠️  WARNING: This will delete ALL files in uploads!
echo This action cannot be undone!
echo.
set /p confirm1="Type 'DELETE' to confirm: "
if not "%confirm1%"=="DELETE" (
    echo Operation cancelled.
    goto end
)
set /p confirm2="Are you absolutely sure? (y/n): "
if /i "%confirm2%"=="y" (
    del uploads\*.* /q 2>nul
    color 0A
    echo ✓ All files deleted successfully
) else (
    echo Operation cancelled.
)
goto end

:delete_specific
echo.
echo Enter file extension to delete (e.g., pdf, png, jpg, txt):
set /p ext="Extension: "
if "%ext%"=="" goto end
echo.
echo Files with .%ext% extension:
dir uploads\*.%ext% 2>nul
echo.
set /p confirm="Delete all .%ext% files? (y/n): "
if /i "%confirm%"=="y" (
    del uploads\*.%ext% /q 2>nul
    echo ✓ .%ext% files deleted successfully
) else (
    echo Operation cancelled.
)
goto end

:end
echo.
echo Press any key to exit...
pause >nul 