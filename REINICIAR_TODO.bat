@echo off
echo ============================================
echo REINICIANDO TODO LIMPIAMENTE
echo Por Agustin
echo ============================================
echo.

echo [1/3] Matando procesos de Node y Angular...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM ng.exe 2>nul
timeout /t 2 /nobreak > nul

echo.
echo [2/3] Iniciando Backend...
start "Backend Server" cmd /k "cd Backend && npm start"
timeout /t 3 /nobreak > nul

echo.
echo [3/3] Iniciando Frontend...
start "Angular Frontend" cmd /k "cd Frontend && ng serve --port 4200"

echo.
echo ============================================
echo TODO REINICIADO!
echo ============================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:4200
echo.
echo Usuarios:
echo   admin@test.com / password123
echo   user@test.com / password123
echo.
echo Espera 30 segundos y abre: http://localhost:4200
echo ============================================
echo.
pause
