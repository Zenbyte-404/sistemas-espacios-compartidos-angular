@echo off
echo ============================================
echo INSTALACION COMPLETA - Sistema de Login
echo Desarrollado por Agustin
echo ============================================
echo.

cd Frontend

echo [1/4] Instalando dependencias de Angular...
call npm install

echo.
echo [2/4] Instalando Google Auth Library...
call npm install google-auth-library

echo.
echo [3/4] Limpiando cache de Angular...
call ng cache clean

echo.
echo [4/4] Verificando instalacion...
call npm list zone.js

echo.
echo ============================================
echo INSTALACION COMPLETADA!
echo ============================================
echo.
echo Para ejecutar la aplicacion:
echo   cd Frontend
echo   ng serve
echo.
echo La aplicacion estara en: http://localhost:4200
echo.
echo NOTA IMPORTANTE:
echo - Para que Google OAuth funcione, configura tu Client ID en:
echo   Frontend/src/environments/environment.ts
echo.
pause
