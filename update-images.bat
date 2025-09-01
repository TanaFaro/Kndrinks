@echo off
echo ========================================
echo    ACTUALIZADOR DE IMAGENES KNDRINKS
echo ========================================
echo.
echo Este script copiara las imagenes de tu carpeta
echo "Fotos Bebidas" y actualizara el selector.
echo.

REM Cambiar al directorio del proyecto
cd /d "%~dp0"

REM Crear carpeta de imágenes si no existe
if not exist "public\images" mkdir "public\images"

REM Copiar imágenes de la carpeta "Fotos Bebidas"
echo Copiando imagenes de "Fotos Bebidas"...
copy "%USERPROFILE%\Desktop\Fotos Bebidas\*.*" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\Fotos Bebidas\*.jpg" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\Fotos Bebidas\*.jpeg" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\Fotos Bebidas\*.png" "public\images\" 2>nul
copy "%USERPROFILE%\Desktop\Fotos Bebidas\*.webp" "public\images\" 2>nul

REM Verificar si se copiaron imágenes
if exist "public\images\*.jpg" (
    echo ✅ Imagenes JPG copiadas exitosamente
) else (
    echo ⚠️  No se encontraron imagenes JPG
)

if exist "public\images\*.jpeg" (
    echo ✅ Imagenes JPEG copiadas exitosamente
) else (
    echo ⚠️  No se encontraron imagenes JPEG
)

if exist "public\images\*.png" (
    echo ✅ Imagenes PNG copiadas exitosamente
) else (
    echo ⚠️  No se encontraron imagenes PNG
)

if exist "public\images\*.webp" (
    echo ✅ Imagenes WebP copiadas exitosamente
) else (
    echo ⚠️  No se encontraron imagenes WebP
)

echo.
echo ========================================
echo    IMAGENES ACTUALIZADAS
echo ========================================
echo.
echo Las imagenes han sido copiadas a:
echo public\images\
echo.
echo Ahora puedes:
echo 1. Ir al panel de administracion
echo 2. Crear o editar un producto
echo 3. Usar el selector de imagenes locales
echo 4. Ver todas tus imagenes disponibles
echo.
echo 💡 Consejo: Si agregas mas imagenes a la carpeta
echo    "Fotos Bebidas", ejecuta este script nuevamente.
echo.
pause
