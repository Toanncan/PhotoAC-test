@echo off
title Video-AC Status Checker
color 0B

cd /d "%~dp0"
node check-urls.js %*

echo.
pause
