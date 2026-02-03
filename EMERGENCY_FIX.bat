@echo off
echo ========================================
echo EMERGENCY FIX - Transport CMD
echo ========================================
echo.

echo [Step 1/6] Stopping any running processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo Done!
echo.

echo [Step 2/6] Removing old files...
if exist node_modules rmdir /s /q node_modules
if exist .next rmdir /s /q .next
if exist package-lock.json del /f /q package-lock.json
echo Done!
echo.

echo [Step 3/6] Clearing npm cache...
call npm cache clean --force
echo Done!
echo.

echo [Step 4/6] Installing dependencies...
echo This may take 2-3 minutes...
call npm install
echo Done!
echo.

echo [Step 5/6] Verifying critical packages...
call npm list tailwindcss
call npm list autoprefixer
call npm list next
echo.

echo [Step 6/6] Starting server...
echo.
echo ========================================
echo If you see errors, press Ctrl+C and run:
echo   npm install tailwindcss postcss autoprefixer --save-dev
echo ========================================
echo.
call npm run dev
