@echo off
echo ============================================
echo INSTALANDO FIREBASE
echo Por Agustin
echo ============================================
echo.

cd Frontend

echo [1/2] Instalando Firebase...
call npm install firebase @angular/fire

echo.
echo [2/2] Limpiando cache...
call ng cache clean

echo.
echo ============================================
echo FIREBASE INSTALADO!
echo ============================================
echo.
echo Siguiente paso:
echo 1. Ve a: https://console.firebase.google.com/
echo 2. Crea un proyecto
echo 3. Habilita Authentication
echo 4. Copia la configuracion
echo 5. Pegala en: Frontend/src/environments/environment.ts
echo.
pause
