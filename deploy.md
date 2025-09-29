# 🚀 Guía de Despliegue en Vercel

## Pasos para desplegar la aplicación:

### 1. Preparar el proyecto
- ✅ Verificar que no hay errores de compilación
- ✅ Asegurar que todas las dependencias estén instaladas
- ✅ Verificar configuración de Vercel

### 2. Opciones de despliegue:

#### Opción A: Despliegue desde GitHub (Recomendado)
1. Subir el código a GitHub
2. Conectar con Vercel
3. Despliegue automático

#### Opción B: Despliegue directo con Vercel CLI
1. Instalar Vercel CLI
2. Hacer login
3. Desplegar

### 3. Configuraciones necesarias:
- Variables de entorno (si las hay)
- Dominio personalizado (opcional)
- Configuración de build

## Comandos para preparar:

```bash
# 1. Instalar dependencias
npm install

# 2. Verificar que compila
npm run build

# 3. Instalar Vercel CLI (si usas opción B)
npm i -g vercel

# 4. Desplegar
vercel
```

## Notas importantes:
- La aplicación usa localStorage, así que los datos se guardan en el navegador del usuario
- No necesita base de datos externa
- Las imágenes se sirven desde la carpeta public/
- El admin puede gestionar todo desde la interfaz web
