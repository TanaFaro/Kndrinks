@echo off
echo ========================================
echo    COPIADOR DE IMAGENES PARA KNDRINKS
echo ========================================
echo.
echo Este script copiara las imagenes de tu carpeta
echo de imagenes del escritorio al proyecto.
echo.

REM Cambiar al directorio del proyecto
cd /d "%~dp0"

REM Crear carpeta de imágenes si no existe
if not exist "public\images" mkdir "public\images"

REM Copiar imágenes de la carpeta "Fotos Bebidas"
echo Copiando imagenes de la carpeta "Fotos Bebidas"...
copy "%USERPROFILE%\Desktop\Fotos Bebidas\*.*" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\Fotos Bebidas\*.jpg" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\Fotos Bebidas\*.jpeg" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\Fotos Bebidas\*.png" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\Fotos Bebidas\*.webp" "public\images\" 2>nul

REM También buscar en otras carpetas comunes por si acaso
echo Buscando en otras carpetas...
copy "%USERPROFILE%\Desktop\imagenes\*.*" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\Imagenes\*.*" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\IMAGENES\*.*" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\*.jpg" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\*.jpeg" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\*.png" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\*.webp" "public\images\" 2>nul

echo.
echo ========================================
echo    IMAGENES COPIADAS EXITOSAMENTE
echo ========================================
echo.
echo Las imagenes han sido copiadas a la carpeta:
echo public\images\
echo.
echo Ahora puedes usarlas en el panel de administracion
echo cuando crees o edites productos.
echo.
pause
