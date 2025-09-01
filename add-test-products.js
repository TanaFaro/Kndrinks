console.log('🚀 AGREGANDO PRODUCTOS DE PRUEBA AL LOCALSTORAGE\n');

// Productos de prueba
const testProducts = [
  {
    id: 1756679099327,
    name: "Fernet BRANCA",
    price: 13000,
    category: "Aperitivos",
    stock: 2,
    image: "/images/fernet 750.jfif",
    description: "x 750 ml"
  },
  {
    id: 1756679099328,
    name: "Smirnoff Vodka",
    price: 2800,
    category: "Licores",
    stock: 15,
    image: "/images/Smirnoff mas 2 speed.png",
    description: "Vodka 750ml"
  },
  {
    id: 1756679099329,
    name: "Speed Energy",
    price: 600,
    category: "Sin Alcohol",
    stock: 30,
    image: "/images/Logo Bebidas.jpeg",
    description: "Energy Drink 500ml"
  },
  {
    id: 1756679099330,
    name: "Coca Cola",
    price: 800,
    category: "Gaseosas",
    stock: 50,
    image: "/images/Logo Bebidas.jpeg",
    description: "Gaseosa 2L"
  },
  {
    id: 1756679099331,
    name: "Heineken",
    price: 1200,
    category: "Cervezas",
    stock: 25,
    image: "/images/Logo Bebidas.jpeg",
    description: "Cerveza 330ml"
  }
];

console.log('📦 PRODUCTOS A AGREGAR:');
console.log('=====================================');
testProducts.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name} - $${product.price}`);
});

// Función para agregar productos al localStorage
function addTestProducts() {
  try {
    // Obtener productos existentes
    const existingProducts = localStorage.getItem('products');
    let currentProducts = [];
    
    if (existingProducts) {
      currentProducts = JSON.parse(existingProducts);
      console.log('✅ Productos existentes encontrados:', currentProducts.length);
    } else {
      console.log('⚠️ No hay productos existentes, creando lista nueva');
    }
    
    // Agregar productos de prueba (evitando duplicados por ID)
    let addedCount = 0;
    testProducts.forEach(newProduct => {
      const exists = currentProducts.find(p => p.id === newProduct.id);
      if (!exists) {
        currentProducts.push(newProduct);
        addedCount++;
        console.log(`➕ Agregado: ${newProduct.name}`);
      } else {
        console.log(`⚠️ Ya existe: ${newProduct.name}`);
      }
    });
    
    // Guardar en localStorage
    localStorage.setItem('products', JSON.stringify(currentProducts));
    
    console.log('\n🎯 RESUMEN:');
    console.log('=====================================');
    console.log(`✅ Productos totales: ${currentProducts.length}`);
    console.log(`➕ Productos nuevos agregados: ${addedCount}`);
    console.log(`📦 Productos en localStorage: ${localStorage.getItem('products') ? 'SÍ' : 'NO'}`);
    
    // Verificar que se guardaron correctamente
    const verification = localStorage.getItem('products');
    if (verification) {
      const verified = JSON.parse(verification);
      console.log(`🔍 Verificación: ${verified.length} productos guardados`);
      
      console.log('\n📋 LISTA COMPLETA DE PRODUCTOS:');
      console.log('=====================================');
      verified.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - $${product.price} - ${product.category}`);
      });
    }
    
    console.log('\n🚀 ¡PRODUCTOS AGREGADOS EXITOSAMENTE!');
    console.log('💡 Ahora recarga la página de crear ofertas y deberías ver todos los productos');
    
  } catch (error) {
    console.error('❌ Error agregando productos:', error);
  }
}

// Función para limpiar productos (opcional)
function clearProducts() {
  if (confirm('¿Estás seguro de que quieres eliminar todos los productos?')) {
    localStorage.removeItem('products');
    console.log('🗑️ Todos los productos han sido eliminados');
  }
}

// Función para mostrar productos actuales
function showCurrentProducts() {
  const products = localStorage.getItem('products');
  if (products) {
    const parsed = JSON.parse(products);
    console.log('📦 PRODUCTOS ACTUALES EN LOCALSTORAGE:');
    console.log('=====================================');
    parsed.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price} - ${product.category}`);
    });
    console.log(`Total: ${parsed.length} productos`);
  } else {
    console.log('❌ No hay productos en localStorage');
  }
}

// Mostrar menú
console.log('\n🎯 OPCIONES DISPONIBLES:');
console.log('=====================================');
console.log('1. addTestProducts() - Agregar productos de prueba');
console.log('2. showCurrentProducts() - Mostrar productos actuales');
console.log('3. clearProducts() - Eliminar todos los productos');
console.log('4. localStorage.clear() - Limpiar todo el localStorage');

console.log('\n💡 RECOMENDACIÓN: Ejecuta addTestProducts() primero');

// Ejecutar automáticamente
console.log('\n🚀 EJECUTANDO AUTOMÁTICAMENTE...');
addTestProducts();
