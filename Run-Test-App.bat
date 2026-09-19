@echo off
title Photo-AC Automation Test Portal
color 0B

echo ================================================================
echo    PHOTO-AC AUTOMATION TEST PORTAL - WINDOWS LAUNCHER
echo ================================================================
echo.

cd /d "%~dp0"

:: 1. Kiem tra Node.js
where node >nul 2>nul
if errorlevel 1 goto :no_node

:: 2. Kiem tra dependencies node_modules
if not exist "node_modules\" (
    echo [INFO] Dang cai dat thu vien lan dau tien...
    call npm install
    echo [INFO] Dang cai dat Playwright browsers...
    call npx playwright install chromium
)

:: 3. Kiem tra Java Runtime cho Allure Report
where java >nul 2>nul
if errorlevel 1 goto :check_java_install

:start_server
:: 4. Khoi dong Test Portal Server
echo [INFO] Dang khoi dong Test Portal tai http://localhost:4000 ...
echo Trinh duyet se tu dong mo len trong giay lat.
echo.
echo [Luu y] De dung server, hay dong cua so nay hoac nhan Ctrl + C.
echo.

node dashboard/server.js
goto :end

:check_java_install
echo [CANH BAO] May chua co Java Runtime. Allure Report can Java de bien dich.
echo Dang thu tu dong cai dat Java OpenJDK 17 qua winget...
winget install --id EclipseAdoptium.Temurin.17.JRE -e --silent --accept-package-agreements --accept-source-agreements >nul 2>nul
if errorlevel 1 (
    echo [LUU Y] Khong the tu dong cai Java qua winget.
    echo Ban van co the chay test, nhung de xem Allure Report hay tai Java tai:
    echo https://adoptium.net/temurin/releases/?version=17
) else (
    echo [OK] Da cai dat Java thanh cong!
)
goto :start_server

:no_node
echo.
echo [ERROR] May tinh cua ban chua cai dat Node.js!
echo Vui long vao trang https://nodejs.org/ de tai ban LTS ve cai dat nhe.
echo.
pause
exit /b 1

:end
if errorlevel 1 (
    echo.
    echo [THONG BAO] Server da dung.
    pause
)
