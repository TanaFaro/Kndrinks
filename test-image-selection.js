console.log('🧪 Probando selección de imágenes...\n');

// Simular el estado del formulario
let formData = {
  name: '',
  price: '',
  category: 'Licores',
  stock: '',
  image: '',
  description: ''
};

// Simular imágenes disponibles
const availableImages = [
  { name: 'Logo Bebidas', path: '/images/Logo Bebidas.jpeg' },
  { name: 'Du con speed', path: '/images/Du con speed.jfif' },
  { name: 'fernet 750', path: '/images/fernet 750.jfif' },
  { name: 'skyy mas speed', path: '/images/skyy mas speed.jfif' },
  { name: 'Smirnoff mas 2 speed', path: '/images/Smirnoff mas 2 speed.png' }
];

console.log('📸 Imágenes disponibles:');
availableImages.forEach((img, index) => {
  console.log(`${index + 1}. ${img.name} -> ${img.path}`);
});

console.log('\n🎯 Simulando selección de imagen...');

// Simular selección de imagen
function selectImage(imagePath) {
  console.log(`\n🖱️ Seleccionando imagen: ${imagePath}`);
  
  // Actualizar formData
  formData.image = imagePath;
  
  console.log('✅ FormData actualizado:');
  console.log('formData:', formData);
  
  // Verificar que se guardó correctamente
  if (formData.image === imagePath) {
    console.log('✅ Imagen seleccionada correctamente');
  } else {
    console.log('❌ Error: La imagen no se guardó correctamente');
  }
}

// Probar selección
selectImage('/images/fernet 750.jfif');

console.log('\n🔧 Instrucciones para probar en el navegador:');
console.log('=====================================');
console.log('1. Ve a http://localhost:3000/admin/products/new');
console.log('2. Llena los campos requeridos (nombre, precio, stock)');
console.log('3. Haz clic en "Seleccionar imagen local"');
console.log('4. Selecciona una imagen de la lista');
console.log('5. Verifica que el campo de imagen se llene automáticamente');
console.log('6. El campo debería cambiar a verde con un ✓');
console.log('7. Haz clic en "Crear Producto"');

console.log('\n⚠️ Posibles problemas:');
console.log('=====================================');
console.log('• Si el campo no se llena, revisa la consola del navegador');
console.log('• Si hay errores de validación, asegúrate de llenar todos los campos');
console.log('• Si las imágenes no aparecen, ejecuta update-images.bat');
console.log('• Si el selector no se abre, verifica que la API /api/images funcione');

console.log('\n🚀 ¡Prueba la selección de imágenes ahora!');
