const fs = require('fs');
const path = require('path');

// Función para obtener todas las imágenes de la carpeta public/images
function getAvailableImages() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const images = [];
  
  try {
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
          images.push({
            name: path.parse(file).name,
            path: `/images/${file}`,
            filename: file
          });
        }
      });
    }
  } catch (error) {
    console.error('Error leyendo la carpeta de imágenes:', error);
  }
  
  return images;
}

// Función para generar el código JavaScript con las imágenes disponibles
function generateImagesCode() {
  const images = getAvailableImages();
  
  const imagesArray = images.map(img => ({
    name: img.name,
    path: img.path
  }));
  
  return `// Imágenes detectadas automáticamente
const availableImages = ${JSON.stringify(imagesArray, null, 2)};

// Función para obtener imágenes por nombre
function getImageByName(name) {
  return availableImages.find(img => 
    img.name.toLowerCase().includes(name.toLowerCase())
  );
}

// Función para obtener todas las imágenes
function getAllImages() {
  return availableImages;
}`;
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const images = getAvailableImages();
  console.log('📸 Imágenes detectadas en public/images/:');
  console.log('=====================================');
  
  if (images.length === 0) {
    console.log('❌ No se encontraron imágenes');
    console.log('💡 Ejecuta copy-images.bat para copiar imágenes de tu carpeta "Fotos Bebidas"');
  } else {
    images.forEach((img, index) => {
      console.log(`${index + 1}. ${img.name} (${img.filename})`);
    });
    console.log(`\n✅ Total: ${images.length} imágenes encontradas`);
  }
  
  console.log('\n📝 Código JavaScript generado:');
  console.log('=====================================');
  console.log(generateImagesCode());
}

module.exports = { getAvailableImages, generateImagesCode };
