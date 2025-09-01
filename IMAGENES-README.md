# 📸 Guía de Imágenes para KNDrinks

## 🎯 Cómo agregar imágenes a tus productos

### **Opción 1: Usar el script automático (Recomendado)**

1. **Coloca tus imágenes** en la carpeta "Fotos Bebidas" del escritorio
2. **Ejecuta el script** `update-images.bat` haciendo doble clic
3. **Las imágenes se copiarán** automáticamente al proyecto
4. **Usa el selector** en el panel de administración

### **Opción 2: Copiar manualmente**

1. **Ve a la carpeta** `public/images/` del proyecto
2. **Copia tus imágenes** directamente a esta carpeta
3. **Formatos soportados:** JPG, JPEG, PNG, WebP
4. **Tamaño recomendado:** 400x400 píxeles

### **Opción 3: Usar el script original**

1. **Ejecuta** `copy-images.bat` si tienes imágenes en otras carpetas
2. **Busca automáticamente** en múltiples ubicaciones
3. **Copia todas las imágenes** encontradas

### **Opción 4: Usar URLs de internet**

1. **Busca la URL** de la imagen que quieres usar
2. **Pégala** en el campo "URL de la Imagen"
3. **Ejemplo:** `https://ejemplo.com/imagen.jpg`

## 🖼️ Cómo usar las imágenes en el panel admin

### **Al crear un producto:**

1. **Ve a:** `http://localhost:3000/admin/products/new`
2. **Llena los datos** del producto
3. **En la sección de imagen:**
   - **Opción A:** Pega una URL de internet
   - **Opción B:** Haz clic en "Seleccionar imagen local"
   - **Selecciona** la imagen que quieres usar
4. **Verás una vista previa** de la imagen
5. **Guarda el producto**

### **Al editar un producto:**

1. **Ve a la tabla** de productos en el dashboard
2. **Haz clic en "Editar"**
3. **Cambia la imagen** usando el mismo proceso
4. **Guarda los cambios**

## 📁 Estructura de carpetas

```
proyecto/
├── public/
│   └── images/
│       ├── Logo Bebidas.jpeg
│       ├── product-default.jpg
│       ├── tu-imagen-1.jpg
│       ├── tu-imagen-2.png
│       └── ...
```

## 💡 Consejos importantes

### **Formatos recomendados:**
- ✅ **JPG/JPEG** - Para fotografías
- ✅ **PNG** - Para imágenes con transparencia
- ✅ **WebP** - Formato moderno y eficiente

### **Tamaños recomendados:**
- **Productos:** 400x400 píxeles
- **Logos:** 200x200 píxeles
- **Banners:** 1200x400 píxeles

### **Nombres de archivos:**
- ✅ **Usa nombres descriptivos:** `whisky-premium.jpg`
- ✅ **Sin espacios:** `whisky-premium.jpg` (no `whisky premium.jpg`)
- ✅ **Sin caracteres especiales:** Solo letras, números y guiones

## 🔧 Solución de problemas

### **La imagen no se muestra:**
1. **Verifica** que el archivo existe en `public/images/`
2. **Revisa** el nombre del archivo (sensible a mayúsculas/minúsculas)
3. **Asegúrate** de que el formato es compatible

### **La imagen se ve borrosa:**
1. **Usa imágenes** de mayor resolución
2. **Optimiza** las imágenes antes de subirlas
3. **Mantén** la proporción original

### **El archivo es muy grande:**
1. **Comprime** la imagen antes de subirla
2. **Usa formatos** más eficientes como WebP
3. **Reduce** la resolución si es necesario

## 🚀 Próximas mejoras

- [ ] **Subida directa** de archivos
- [ ] **Optimización automática** de imágenes
- [ ] **Galería de imágenes** por producto
- [ ] **Integración con Cloudinary**

---

**¿Necesitas ayuda?** Revisa esta guía o contacta al administrador del sistema.
