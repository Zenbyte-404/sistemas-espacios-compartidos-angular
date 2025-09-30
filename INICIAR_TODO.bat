@echo off
echo ============================================
echo INICIANDO APLICACION COMPLETA
echo Frontend + Backend
echo Por Agustin
echo ============================================
echo.

echo [INFO] Abriendo Backend en nueva ventana...
start "Backend Server" cmd /k "cd Backend && npm install && npm start"

timeout /t 3 /nobreak > nul

echo [INFO] Abriendo Frontend en nueva ventana...
start "Angular Frontend" cmd /k "cd Frontend && npm install && ng serve"

echo.
echo ============================================
echo APLICACION INICIADA!
echo ============================================
echo.
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:4200
echo.
echo Usuarios de prueba:
echo   Email: admin@test.com
echo   Pass:  password123
echo.
echo   Email: user@test.com  
echo   Pass:  password123
echo.
echo ============================================
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause > nul
