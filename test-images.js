console.log('🔍 Probando funcionalidad de imágenes...\n');

// Simular la API de imágenes
const mockApiResponse = {
  images: [
    { name: 'Logo Bebidas', path: '/images/Logo Bebidas.jpeg', filename: 'Logo Bebidas.jpeg' },
    { name: 'fernet 750', path: '/images/fernet 750.jfif', filename: 'fernet 750.jfif' },
    { name: 'Smirnoff mas 2 speed', path: '/images/Smirnoff mas 2 speed.png', filename: 'Smirnoff mas 2 speed.png' },
    { name: 'coca cola 2l', path: '/images/coca cola 2l.jpg', filename: 'coca cola 2l.jpg' }
  ]
};

// Simular la función loadAvailableImages
function loadAvailableImages() {
  try {
    console.log('🔄 Cargando imágenes desde la API...');
    
    // Simular respuesta de la API
    const data = mockApiResponse;
    const imagePaths = data.images.map(img => img.path);
    
    console.log('✅ Imágenes disponibles:', imagePaths.length);
    console.log('📋 Lista de imágenes:');
    imagePaths.forEach((path, index) => {
      console.log(`   ${index + 1}. ${path}`);
    });
    
    return imagePaths;
  } catch (error) {
    console.error('❌ Error cargando imágenes:', error);
    return [];
  }
}

// Simular la selección de imagen
function selectImage(imagePaths, selectedPath) {
  console.log('\n🎯 Seleccionando imagen...');
  console.log('📁 Imagen seleccionada:', selectedPath);
  
  if (imagePaths.includes(selectedPath)) {
    console.log('✅ Imagen válida seleccionada');
    return selectedPath;
  } else {
    console.log('❌ Imagen no encontrada en la lista');
    return '';
  }
}

// Probar el flujo completo
console.log('🎯 ESCENARIO 1: Cargar imágenes desde la API');
console.log('==============================================');
const availableImages = loadAvailableImages();

console.log('\n🎯 ESCENARIO 2: Seleccionar imagen del combo');
console.log('==============================================');
const selectedImage = selectImage(availableImages, '/images/fernet 750.jfif');

console.log('\n🎯 ESCENARIO 3: Verificar selección');
console.log('=====================================');
console.log('✅ Imágenes disponibles:', availableImages.length);
console.log('✅ Imagen seleccionada:', selectedImage);

console.log('\n🎯 Instrucciones para probar en el navegador:');
console.log('==============================================');
console.log('1. Ve a http://localhost:3000/admin/ofertas/new');
console.log('2. Abre las herramientas de desarrollador (F12)');
console.log('3. Ve a la pestaña "Console"');
console.log('4. Busca estos mensajes:');
console.log('   - "🔄 Cargando imágenes desde la API..."');
console.log('   - "✅ Imágenes disponibles: X"');
console.log('   - "📋 Lista de imágenes:"');
console.log('5. Verifica que aparezcan las imágenes en el selector');
console.log('6. Selecciona una imagen y verifica que se muestre el preview');

console.log('\n🔧 Posibles problemas:');
console.log('==============================================');
console.log('• Si no ves "✅ Imágenes disponibles:", hay un problema con la API');
console.log('• Si ves "❌ Error cargando imágenes:", hay un error en el servidor');
console.log('• Si no aparecen imágenes en el selector, verifica la carpeta public/images');
console.log('• Si el preview no funciona, verifica que la ruta de la imagen sea correcta');

console.log('\n📁 Verificar carpeta de imágenes:');
console.log('==============================================');
console.log('• Asegúrate de que exista la carpeta: public/images/');
console.log('• Verifica que contenga archivos de imagen (.jpg, .jpeg, .png, .gif, .jfif)');
console.log('• Si no hay imágenes, usa el script update-images.bat para copiarlas');

console.log('\n🚀 ¡Prueba completada!');
