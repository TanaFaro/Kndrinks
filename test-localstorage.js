console.log('🔍 Verificando localStorage y productos...\n');

// Simular localStorage
const mockLocalStorage = {
  data: {
    'products': JSON.stringify([
      {
        id: 1,
        name: 'Smirnoff',
        price: 2800,
        category: 'Licores',
        stock: 12,
        image: '/images/Smirnoff mas 2 speed.png',
        description: 'Smirnoff Vodka 750ml'
      },
      {
        id: 2,
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

// Simular la función loadProducts
function loadProducts() {
  try {
    console.log('🔄 Iniciando carga de productos...');
    const savedProducts = mockLocalStorage.getItem('products');
    console.log('📦 Productos en localStorage:', savedProducts);
    
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      console.log('✅ Productos parseados:', parsedProducts);
      console.log('📊 Cantidad de productos:', parsedProducts.length);
      return parsedProducts;
    } else {
      console.log('⚠️ No hay productos creados. Crea productos primero.');
      return [];
    }
  } catch (error) {
    console.error('❌ Error cargando productos:', error);
    return [];
  }
}

// Simular la función handleProductSelect
function handleProductSelect(product, selectedProducts) {
  console.log('🎯 Seleccionando producto:', product.name);
  console.log('📋 Producto completo:', product);
  console.log('🔍 Productos actualmente seleccionados:', selectedProducts);
  
  // Verificar si el producto ya está en el combo
  const existingProduct = selectedProducts.find(p => p.productId === product.id);
  console.log('🔍 Producto existente encontrado:', existingProduct);
  
  if (existingProduct) {
    console.log('➕ Incrementando cantidad del producto existente');
    const updated = selectedProducts.map(p => 
      p.productId === product.id 
        ? { ...p, quantity: p.quantity + 1 }
        : p
    );
    console.log('✅ Productos actualizados (incremento):', updated);
    return updated;
  } else {
    console.log('➕ Agregando nuevo producto al combo');
    const newComboProduct = {
      productId: product.id,
      productName: product.name,
      quantity: 1,
      price: product.price
    };
    console.log('🆕 Nuevo producto del combo:', newComboProduct);
    const updated = [...selectedProducts, newComboProduct];
    console.log('✅ Productos actualizados (nuevo):', updated);
    return updated;
  }
}

// Probar el flujo completo
console.log('🎯 ESCENARIO 1: Cargar productos');
console.log('=====================================');
const products = loadProducts();

console.log('\n🎯 ESCENARIO 2: Seleccionar producto');
console.log('=====================================');
let selectedProducts = [];

console.log('\n📦 Seleccionando Smirnoff...');
selectedProducts = handleProductSelect(products[0], selectedProducts);
console.log('✅ Estado final de selectedProducts:', selectedProducts);

console.log('\n🎯 ESCENARIO 3: Verificar validación');
console.log('=====================================');
const isFormValid = () => {
  const hasProducts = selectedProducts.length > 0;
  const hasTitle = true; // Simulado
  const hasPrice = true; // Simulado
  const hasDate = true; // Simulado
  const notLoading = true; // Simulado
  
  console.log('🔍 Validación del formulario:', {
    hasProducts,
    hasTitle,
    hasPrice,
    hasDate,
    notLoading,
    selectedProductsCount: selectedProducts.length,
    title: 'Smirnoff',
    price: '14500',
    date: '2025-10-05'
  });
  
  return hasProducts && hasTitle && hasPrice && hasDate && notLoading;
};

console.log('✅ Productos seleccionados:', selectedProducts.length);
console.log('✅ Formulario válido:', isFormValid());

console.log('\n🎯 Instrucciones para debuggear en el navegador:');
console.log('==============================================');
console.log('1. Recarga la página de crear ofertas');
console.log('2. Abre las herramientas de desarrollador (F12)');
console.log('3. Ve a la pestaña "Console"');
console.log('4. Busca estos mensajes:');
console.log('   - "🔄 Iniciando carga de productos..."');
console.log('   - "📦 Productos en localStorage:"');
console.log('   - "✅ Productos parseados:"');
console.log('   - "🎯 Seleccionando producto:"');
console.log('   - "🔄 selectedProducts cambió:"');
console.log('5. Si no ves productos, verifica que hayas creado productos primero');

console.log('\n🔧 Posibles problemas:');
console.log('==============================================');
console.log('• Si no hay productos en localStorage, ve a /admin/products y crea algunos');
console.log('• Si los productos se cargan pero no se seleccionan, hay un problema en handleProductSelect');
console.log('• Si selectedProducts no se actualiza, hay un problema con el estado de React');

console.log('\n🚀 ¡Prueba completada!');
