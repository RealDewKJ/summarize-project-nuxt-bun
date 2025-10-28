@echo off
echo ========================================
echo   Setup - Nuxt Frontend
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo [2/3] Creating environment file...
if not exist .env (
    copy .env.example .env
    echo Created .env file
)

echo.
echo [3/3] Setup complete!
echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the frontend:
echo   npm run dev
echo.
echo Make sure backend is running first:
echo   cd ../backend && bun run dev
echo.
pause
