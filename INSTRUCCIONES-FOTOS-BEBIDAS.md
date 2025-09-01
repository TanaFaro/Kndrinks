# 📸 Instrucciones para "Fotos Bebidas"

## 🎯 Cómo usar tus fotos de productos

### **Paso 1: Preparar las imágenes**
1. **Asegúrate** de que tus fotos estén en la carpeta `Fotos Bebidas` del escritorio
2. **Formatos soportados:** JPG, JPEG, PNG, WebP
3. **Nombres recomendados:** `whisky-premium.jpg`, `vino-tinto.png`, etc.

### **Paso 2: Copiar las imágenes al proyecto**
1. **Haz doble clic** en `update-images.bat`
2. **Espera** a que termine el proceso
3. **Verás mensajes** confirmando que las imágenes se copiaron

### **Paso 3: Usar las imágenes en el panel admin**
1. **Ve a:** `http://localhost:3000/admin`
2. **Inicia sesión** con:
   - Usuario: `KNDrinks`
   - Contraseña: `KNDrinks2025`
3. **Crea un producto** o **edita uno existente**
4. **En la sección de imagen:**
   - Haz clic en **"Seleccionar imagen local"**
   - **Elige** la imagen que quieres usar
   - **Verás una vista previa** automáticamente

## 🔄 Actualizar imágenes

### **Si agregas nuevas fotos:**
1. **Coloca** las nuevas imágenes en `Fotos Bebidas`
2. **Ejecuta** `update-images.bat` nuevamente
3. **Las nuevas imágenes** aparecerán en el selector

### **Si cambias fotos existentes:**
1. **Reemplaza** la imagen en `Fotos Bebidas`
2. **Ejecuta** `update-images.bat`
3. **La imagen actualizada** se reflejará en el sitio

## 📁 Estructura de carpetas

```
Tu Escritorio/
└── Fotos Bebidas/
    ├── whisky-premium.jpg
    ├── vino-tinto.png
    ├── cerveza-artesanal.jpeg
    └── ...

Proyecto/
└── public/
    └── images/
        ├── Logo Bebidas.jpeg
        ├── product-default.jpg
        ├── whisky-premium.jpg (copiada automáticamente)
        ├── vino-tinto.png (copiada automáticamente)
        └── ...
```

## 💡 Consejos importantes

### **Nombres de archivos:**
- ✅ **Usa nombres descriptivos:** `whisky-premium.jpg`
- ✅ **Sin espacios:** `whisky-premium.jpg` (no `whisky premium.jpg`)
- ✅ **Sin caracteres especiales:** Solo letras, números y guiones

### **Tamaños recomendados:**
- **Productos:** 400x400 píxeles
- **Logos:** 200x200 píxeles
- **Banners:** 1200x400 píxeles

### **Formatos recomendados:**
- **JPG/JPEG** - Para fotografías de productos
- **PNG** - Para imágenes con transparencia
- **WebP** - Formato moderno y eficiente

## 🚀 Funcionalidades disponibles

### **En el panel de administración:**
- ✅ **Selector visual** de imágenes
- ✅ **Vista previa** en tiempo real
- ✅ **Búsqueda** por nombre de imagen
- ✅ **Múltiples formatos** soportados
- ✅ **Actualización automática** al copiar nuevas imágenes

### **En el sitio web:**
- ✅ **Imágenes optimizadas** para web
- ✅ **Carga rápida** de imágenes
- ✅ **Fallback** a imagen por defecto si hay error
- ✅ **Responsive** en todos los dispositivos

## 🔧 Solución de problemas

### **La imagen no aparece en el selector:**
1. **Verifica** que esté en la carpeta `Fotos Bebidas`
2. **Ejecuta** `update-images.bat` nuevamente
3. **Revisa** que el formato sea compatible

### **La imagen se ve borrosa:**
1. **Usa imágenes** de mayor resolución
2. **Optimiza** las imágenes antes de copiarlas
3. **Mantén** la proporción original

### **El archivo es muy grande:**
1. **Comprime** la imagen antes de copiarla
2. **Usa formatos** más eficientes como WebP
3. **Reduce** la resolución si es necesario

## 📞 Soporte

Si tienes problemas:
1. **Revisa** esta guía
2. **Ejecuta** `node detect-images.js` para ver qué imágenes están disponibles
3. **Verifica** que la carpeta `Fotos Bebidas` existe en tu escritorio

---

**¡Listo!** Ahora puedes usar fácilmente todas tus fotos de bebidas en el sitio web.
