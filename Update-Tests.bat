@echo off
title Photo-AC - Cap Nhat Testcase Moi
color 0A

echo ================================================================
echo    PHOTO-AC AUTOMATION - DONG BO TESTCASE MOI NHAT
echo ================================================================
echo.

cd /d "%~dp0"

:: Kiem tra Git
where git >nul 2>nul
if errorlevel 1 goto :no_git

echo [1/2] Dang tai ve cac testcase va kich ban moi nhat tu Github...
git pull
if errorlevel 1 goto :pull_error

echo.
echo [2/2] Kiem tra thu vien moi...
call npm install --no-audit --no-fund

echo.
echo ================================================================
echo    HOAN TAT! TOAN BO TESTCASE MOI DA SAN SANG.
echo    Bay gio ban co the mo file 'Run-Test-App.bat' de chay test!
echo ================================================================
echo.
pause
exit /b 0

:no_git
echo [CANH BAO] Khong tim thay Git trong he thong.
echo Neu ban nhan code tu file ZIP, hay nho truong nhom gui ban ZIP moi nhat nhe!
echo.
pause
exit /b 1

:pull_error
echo.
echo [LOI] Khong the dong bo tu dong. Vui long kiem tra ket noi mang hoac lien he Automation Lead.
echo.
pause
exit /b 1
