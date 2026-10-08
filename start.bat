@echo off
setlocal
cd /d "%~dp0"
title Vao Cornerstone - dev server

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js was not found.
  echo Install the LTS version from https://nodejs.org  ^(or run: winget install OpenJS.NodeJS.LTS^)
  echo Then close this window and double-click start.bat again.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing dependencies ^(first run only, needs internet^)...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. Scroll up to read the error.
    pause
    exit /b 1
  )
)

echo.
echo Starting the site at http://localhost:5173  ^(press Ctrl+C to stop^)
echo.
call npm run dev
pause
