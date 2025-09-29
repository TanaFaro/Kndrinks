// Script para probar la funcionalidad de actualización de imágenes
// Ejecutar en la consola del navegador

console.log('🧪 Probando funcionalidad de actualización de imágenes...');

// Función para probar la API de imágenes
async function testImageAPI() {
  try {
    console.log('🔄 Probando API de imágenes...');
    const response = await fetch(`/api/images?t=${Date.now()}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API funcionando correctamente');
      console.log('📊 Datos recibidos:', {
        count: data.count,
        timestamp: data.timestamp,
        images: data.images.length
      });
      
      console.log('🖼️ Imágenes encontradas:');
      data.images.forEach((img, index) => {
        console.log(`  ${index + 1}. ${img.filename} (${img.path})`);
      });
      
      return data;
    } else {
      console.error('❌ Error en la API:', response.status);
      return null;
    }
  } catch (error) {
    console.error('❌ Error probando API:', error);
    return null;
  }
}

// Función para simular agregar una nueva imagen
function simulateNewImage() {
  console.log('🎭 Simulando nueva imagen...');
  console.log('💡 Para probar:');
  console.log('1. Agrega una nueva imagen a la carpeta public/images/');
  console.log('2. Ve a /admin/ofertas/new');
  console.log('3. Haz clic en "Actualizar Imágenes"');
  console.log('4. Deberías ver la nueva imagen en la lista');
}

// Ejecutar pruebas
testImageAPI().then(data => {
  if (data) {
    simulateNewImage();
  }
});

console.log('✅ Script de prueba cargado!');
console.log('📝 Comandos disponibles:');
console.log('  - testImageAPI() - Probar la API de imágenes');
console.log('  - simulateNewImage() - Ver instrucciones para probar');
