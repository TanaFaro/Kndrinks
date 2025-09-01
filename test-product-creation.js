console.log('🧪 Probando creación de productos...\n');

// Simular localStorage para pruebas
const mockLocalStorage = {
  data: {},
  getItem(key) {
    console.log(`🔍 Obteniendo: ${key}`);
    const value = this.data[key];
    console.log(`📦 Valor obtenido: ${value}`);
    return value;
  },
  setItem(key, value) {
    console.log(`💾 Guardando: ${key} = ${value}`);
    this.data[key] = value;
  },
  removeItem(key) {
    console.log(`🗑️ Eliminando: ${key}`);
    delete this.data[key];
  }
};

// Simular creación de producto
function testProductCreation() {
  console.log('📝 Simulando creación de producto...\n');
  
  // 1. Obtener productos existentes
  const savedProducts = mockLocalStorage.getItem('products');
  console.log('1. Productos existentes:', savedProducts);
  
  const products = savedProducts ? JSON.parse(savedProducts) : [];
  console.log('2. Lista de productos:', products);
  
  // 2. Crear nuevo producto
  const newProduct = {
    id: Date.now(),
    name: 'Test Product',
    price: 1000,
    category: 'Licores',
    stock: 5,
    image: '/images/Logo Bebidas.jpeg',
    description: 'Producto de prueba'
  };
  
  console.log('3. Nuevo producto:', newProduct);
  
  // 3. Agregar a la lista
  products.push(newProduct);
  console.log('4. Productos después de agregar:', products);
  
  // 4. Guardar en localStorage
  mockLocalStorage.setItem('products', JSON.stringify(products));
  
  // 5. Verificar que se guardó
  const verifyProducts = mockLocalStorage.getItem('products');
  console.log('5. Verificación - Productos guardados:', verifyProducts);
  
  const parsedVerify = JSON.parse(verifyProducts);
  console.log('6. Verificación - Productos parseados:', parsedVerify);
  
  console.log('\n✅ Prueba completada exitosamente!');
  console.log(`📊 Total de productos: ${parsedVerify.length}`);
}

// Ejecutar prueba
testProductCreation();

console.log('\n🎯 Instrucciones para probar en el navegador:');
console.log('=====================================');
console.log('1. Abre las herramientas de desarrollador (F12)');
console.log('2. Ve a la pestaña "Console"');
console.log('3. Ve a http://localhost:3000/admin/products/new');
console.log('4. Llena el formulario y crea un producto');
console.log('5. Revisa los mensajes en la consola');
console.log('6. Ve al dashboard para verificar que aparezca');

console.log('\n🔧 Si hay problemas:');
console.log('=====================================');
console.log('• Verifica que todos los campos estén llenos');
console.log('• Revisa que no haya errores en la consola');
console.log('• Asegúrate de estar logueado como admin');
console.log('• Intenta recargar la página si es necesario');
