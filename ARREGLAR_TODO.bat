@echo off
echo ============================================
echo ARREGLANDO TODO - Por Agustin
echo ============================================
echo.

cd Frontend

echo [1/3] Limpiando cache...
call ng cache clean

echo.
echo [2/3] Reinstalando dependencias...
call npm install

echo.
echo [3/3] Compilando...
call ng build

echo.
echo ============================================
echo TODO ARREGLADO!
echo ============================================
echo.
echo Ahora ejecuta: ng serve
echo.
pause
