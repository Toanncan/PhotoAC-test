@echo off
title Photo-AC - Cai Dat Moi Truong Ban Dau
color 0E

echo ================================================================
echo    PHOTO-AC AUTOMATION - CAI DAT MOI TRUONG LAN DAU
echo ================================================================
echo.

cd /d "%~dp0"

:: 1. Kiem tra Node.js
echo [1/4] Kiem tra Node.js...
where node >nul 2>nul
if errorlevel 1 goto :no_node
echo [OK] Node.js da duoc cai dat.

:: 2. Cai dat npm packages
echo.
echo [2/4] Dang cai dat cac goi thu vien can thiet (npm install)...
call npm install

:: 3. Cai dat Playwright Browsers
echo.
echo [3/4] Dang tai trinh duyet kiem thu (Chromium ^& Firefox)...
call npx playwright install chromium firefox

:: 4. Kiem tra Java cho Allure Report
echo.
echo [4/4] Kiem tra Java Runtime cho Allure Report...
where java >nul 2>nul
if errorlevel 1 goto :install_java
echo [OK] Java da co san tren may.
goto :done

:install_java
echo [INFO] Dang tu dong cai dat Java OpenJDK 17 qua winget...
winget install --id EclipseAdoptium.Temurin.17.JRE -e --silent --accept-package-agreements --accept-source-agreements >nul 2>nul
if errorlevel 1 (
    echo [LUU Y] May chua co Java. Hay tai file cai dat Java tai:
    echo https://adoptium.net/temurin/releases/?version=17
) else (
    echo [OK] Da cai dat Java thanh cong!
)

:done
echo.
echo ================================================================
echo    CAI DAT HOAN TAT!
echo    Tu gio ban chi can click dup vao:
echo    Run-Test-App.bat de bat dau chay test.
echo ================================================================
echo.
pause
exit /b 0

:no_node
echo.
echo [ERROR] May cua ban chua co Node.js!
echo Vui long vao https://nodejs.org/ va tai ban LTS ve cai dat truoc nhe.
echo.
pause
exit /b 1
