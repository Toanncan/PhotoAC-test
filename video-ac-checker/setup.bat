@echo off
title Setup Video-AC Status Checker
color 0A
cd /d "%~dp0"

echo ================================================================
echo       CAI DAT MOI TRUONG CHO VIDEO-AC STATUS CHECKER
echo ================================================================
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] May cua ban chua cai dat Node.js!
    echo Vui long cai dat Node.js tu: https://nodejs.org/ (Chon ban LTS)
    echo Sau khi cai xong Node.js, vui long chay lai file setup.bat nay.
    echo.
    pause
    exit /b 1
)

echo [1/2] Dang cai dat thu vien Playwright...
call npm install

echo.
echo [2/2] Dang kiem tra va tai trinh duyet Chromium...
call npx playwright install chromium

echo.
echo ================================================================
echo [THANH CONG] Cai dat hoan tat!
echo Bay gio ban chi can click dup vao file run.bat de su dung.
echo ================================================================
echo.
pause
