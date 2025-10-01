@echo off
echo ============================================
echo INSTALANDO E INICIANDO BACKEND
echo Por Agustin
echo ============================================
echo.

cd Backend

echo [1/2] Instalando dependencias del backend...
call npm install

echo.
echo [2/2] Iniciando servidor...
echo.
echo ============================================
echo SERVIDOR BACKEND LISTO!
echo ============================================
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

call npm start
