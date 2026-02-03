@echo off
echo ========================================
echo FINAL FIX - Module not found: fs
echo ========================================
echo.

echo Problem: Next.js upgraded to v16 (Turbopack)
echo Solution: Downgrade to v15.1.0 + Fix webpack config
echo.

echo [1/5] Stopping processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo.

echo [2/5] Cleaning...
if exist node_modules rmdir /s /q node_modules
if exist .next rmdir /s /q .next
if exist package-lock.json del /f /q package-lock.json
echo.

echo [3/5] Updating package.json...
copy /Y package-FIXED.json package.json
echo.

echo [4/5] Installing (this will take 2-3 min)...
call npm install
echo.

echo [5/5] Verifying...
call npm list next
echo.
echo ========================================
echo Expected: next@15.1.0
echo If you see 16.x.x, run this again!
echo ========================================
echo.

pause
call npm run dev
