@echo off
echo ============================================
echo PROBANDO BACKEND
echo ============================================
echo.
echo Probando si el backend esta corriendo...
echo.

curl http://localhost:3000

echo.
echo.
echo Si ves un mensaje JSON arriba, el backend esta funcionando.
echo Si ves un error, ejecuta INICIAR_BACKEND.bat primero.
echo.
pause
