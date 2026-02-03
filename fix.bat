@echo off
echo ========================================
echo Transport CMD - Quick Fix Script
echo ========================================
echo.

echo [1/4] Cleaning old files...
if exist .next rmdir /s /q .next
if exist node_modules rmdir /s /q node_modules
echo Done!
echo.

echo [2/4] Installing dependencies...
call npm install
echo Done!
echo.

echo [3/4] Checking .env.local...
if exist .env.local (
    echo .env.local found!
    type .env.local
) else (
    echo .env.local NOT found - using mock data mode
)
echo.

echo [4/4] Starting development server...
echo Open http://localhost:3000 in your browser
echo.
call npm run dev
