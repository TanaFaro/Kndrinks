console.log('🔍 Diagnosticando problema con productos...\n');

// Simular localStorage
const mockLocalStorage = {
  data: {
    'products': JSON.stringify([
      {
        id: 1,
        name: 'Fernet Branca',
        price: 2500,
        category: 'Licores',
        stock: 20,
        image: '/images/fernet 750.jfif',
        description: 'Fernet Branca 750ml'
      },
      {
        id: 2,
        name: 'Coca Cola 2L',
        price: 800,
        category: 'Sin Alcohol',
        stock: 50,
        image: '/images/Logo Bebidas.jpeg',
        description: 'Coca Cola 2 litros'
      },
      {
        id: 3,
        name: 'Smirnoff',
        price: 2800,
        category: 'Licores',
        stock: 12,
        image: '/images/Smirnoff mas 2 speed.png',
        description: 'Smirnoff Vodka 750ml'
      },
      {
        id: 4,
        name: 'Speed Energy',
        price: 600,
        category: 'Sin Alcohol',
        stock: 30,
        image: '/images/Logo Bebidas.jpeg',
        description: 'Speed Energy 500ml'
      }
    ])
  },
  getItem(key) {
    console.log(`🔍 Obteniendo: ${key}`);
    return this.data[key];
  }
};

// Función para simular loadProducts
function loadProducts() {
  console.log('🔄 Cargando productos...');
  const savedProducts = mockLocalStorage.getItem('products');
  console.log('📦 Productos en localStorage:', savedProducts);
  
  if (savedProducts) {
    try {
      const parsedProducts = JSON.parse(savedProducts);
      console.log('✅ Productos cargados exitosamente:', parsedProducts.length);
      console.log('📋 Lista de productos:');
      parsedProducts.forEach((product, index) => {
        console.log(`   ${index + 1}. ${product.name} - $${product.price} (ID: ${product.id})`);
      });
      return parsedProducts;
    } catch (error) {
      console.error('❌ Error parseando productos:', error);
      return [];
    }
  } else {
    console.log('⚠️ No hay productos en localStorage');
    return [];
  }
}

// Función para simular handleProductSelect
function handleProductSelect(product, selectedProducts) {
  console.log('🎯 Seleccionando producto:', product.name);
  console.log('📋 Productos actualmente seleccionados:', selectedProducts.length);
  
  // Verificar si el producto ya está en el combo
  const existingProduct = selectedProducts.find(p => p.productId === product.id);
  
  if (existingProduct) {
    console.log('➕ Incrementando cantidad del producto existente');
    return selectedProducts.map(p => 
      p.productId === product.id 
        ? { ...p, quantity: p.quantity + 1 }
        : p
    );
  } else {
    console.log('➕ Agregando nuevo producto al combo');
    const newComboProduct = {
      productId: product.id,
      productName: product.name,
      quantity: 1,
      price: product.price
    };
    return [...selectedProducts, newComboProduct];
  }
}

// Probar el flujo completo
console.log('🎯 ESCENARIO 1: Cargar productos');
console.log('=====================================');
const products = loadProducts();

console.log('\n🎯 ESCENARIO 2: Seleccionar productos');
console.log('=====================================');
let selectedProducts = [];

// Seleccionar Smirnoff
console.log('\n📦 Seleccionando Smirnoff...');
selectedProducts = handleProductSelect(products[2], selectedProducts);
console.log('✅ Productos seleccionados:', selectedProducts);

// Seleccionar Speed Energy
console.log('\n📦 Seleccionando Speed Energy...');
selectedProducts = handleProductSelect(products[3], selectedProducts);
console.log('✅ Productos seleccionados:', selectedProducts);

// Incrementar cantidad de Speed Energy
console.log('\n📦 Incrementando cantidad de Speed Energy...');
selectedProducts = handleProductSelect(products[3], selectedProducts);
console.log('✅ Productos seleccionados:', selectedProducts);

console.log('\n🎯 ESCENARIO 3: Verificar validación');
console.log('=====================================');
const isFormValid = () => {
  return (
    selectedProducts.length > 0 &&
    true && // title
    true && // finalPrice
    true && // validUntil
    false // loading
  );
};

console.log('✅ Productos seleccionados:', selectedProducts.length);
console.log('✅ Formulario válido:', isFormValid());

console.log('\n🎯 Instrucciones para debuggear en el navegador:');
console.log('=====================================');
console.log('1. Ve a http://localhost:3000/admin/ofertas/new');
console.log('2. Abre las herramientas de desarrollador (F12)');
console.log('3. Ve a la pestaña "Console"');
console.log('4. Busca estos mensajes:');
console.log('   - "🔄 Cargando productos..."');
console.log('   - "📦 Productos en localStorage:"');
console.log('   - "✅ Productos cargados exitosamente:"');
console.log('5. Si no ves estos mensajes, hay un problema de carga');
console.log('6. Si ves "⚠️ No hay productos en localStorage", necesitas crear productos primero');

console.log('\n🔧 Posibles soluciones:');
console.log('=====================================');
console.log('• Verificar que hay productos creados en /admin/products');
console.log('• Verificar que localStorage funciona correctamente');
console.log('• Verificar que no hay errores de JavaScript');
console.log('• Recargar la página si es necesario');

console.log('\n📋 Productos de ejemplo para crear:');
console.log('=====================================');
console.log('• Smirnoff - $2800 - Licores');
console.log('• Speed Energy - $600 - Sin Alcohol');
console.log('• Fernet Branca - $2500 - Licores');
console.log('• Coca Cola 2L - $800 - Sin Alcohol');

console.log('\n🚀 ¡Diagnóstico completado!');
