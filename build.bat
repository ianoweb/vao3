@echo off
setlocal
cd /d "%~dp0"
title Vao Cornerstone - production build

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found. Install the LTS version from https://nodejs.org and try again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

call npm run build
if errorlevel 1 (
  echo.
  echo Build failed. Scroll up to read the error.
  pause
  exit /b 1
)

echo.
echo Build finished. Upload the contents of the "dist" folder to your host.
echo To preview it locally, run:  npm run preview   ^(http://localhost:4173^)
pause
