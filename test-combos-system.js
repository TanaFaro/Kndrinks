console.log('🧪 Probando sistema de combos independientes...\n');

// Simular localStorage con productos y combos
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
        name: 'Skyy Vodka',
        price: 3500,
        category: 'Licores',
        stock: 15,
        image: '/images/skyy mas speed.jfif',
        description: 'Skyy Vodka 750ml'
      },
      {
        id: 4,
        name: 'Speed Energy',
        price: 600,
        category: 'Sin Alcohol',
        stock: 30,
        image: '/images/Logo Bebidas.jpeg',
        description: 'Speed Energy 500ml'
      },
      {
        id: 5,
        name: 'Smirnoff',
        price: 2800,
        category: 'Licores',
        stock: 12,
        image: '/images/Logo Bebidas.jpeg',
        description: 'Smirnoff Vodka 750ml'
      }
    ]),
    'ofertas': JSON.stringify([
      {
        id: 1,
        title: 'Combo Fernet + Coca Cola 2L',
        description: 'El combo perfecto para disfrutar con amigos',
        comboProducts: [
          {
            productId: 1,
            productName: 'Fernet Branca',
            quantity: 1,
            price: 2500
          },
          {
            productId: 2,
            productName: 'Coca Cola 2L',
            quantity: 1,
            price: 800
          }
        ],
        finalPrice: 2800, // Precio independiente del combo
        image: '/images/fernet 750.jfif',
        category: 'Combos',
        validUntil: '2024-12-31',
        active: true
      },
      {
        id: 2,
        title: 'Combo Skyy + Speed',
        description: 'Vodka premium con energía para la fiesta',
        comboProducts: [
          {
            productId: 3,
            productName: 'Skyy Vodka',
            quantity: 1,
            price: 3500
          },
          {
            productId: 4,
            productName: 'Speed Energy',
            quantity: 1,
            price: 600
          }
        ],
        finalPrice: 3500, // Precio independiente del combo
        image: '/images/skyy mas speed.jfif',
        category: 'Combos',
        validUntil: '2024-11-30',
        active: true
      },
      {
        id: 3,
        title: 'Combo Smirnoff + 2 Speed',
        description: 'Vodka con doble energía para la noche',
        comboProducts: [
          {
            productId: 5,
            productName: 'Smirnoff',
            quantity: 1,
            price: 2800
          },
          {
            productId: 4,
            productName: 'Speed Energy',
            quantity: 2,
            price: 600
          }
        ],
        finalPrice: 3200, // Precio independiente del combo
        image: '/images/Logo Bebidas.jpeg',
        category: 'Combos',
        validUntil: '2024-10-31',
        active: false // Este combo está inactivo
      }
    ])
  },
  getItem(key) {
    console.log(`🔍 Obteniendo: ${key}`);
    return this.data[key];
  }
};

// Función para calcular precio individual de productos
function calculateIndividualPrice(comboProducts) {
  return comboProducts.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);
}

// Función para mostrar información de combos
function displayComboInfo(combo) {
  const individualPrice = calculateIndividualPrice(combo.comboProducts);
  const savings = individualPrice - combo.finalPrice;
  
  console.log(`\n🎯 Combo: ${combo.title}`);
  console.log(`   Descripción: ${combo.description}`);
  console.log(`   Productos incluidos:`);
  
  combo.comboProducts.forEach(product => {
    console.log(`     • ${product.productName} x${product.quantity} ($${product.price} c/u)`);
  });
  
  console.log(`   Precio individual: $${individualPrice.toLocaleString()}`);
  console.log(`   Precio combo: $${combo.finalPrice.toLocaleString()}`);
  console.log(`   Ahorro: $${savings.toLocaleString()}`);
  console.log(`   Válido hasta: ${combo.validUntil}`);
  console.log(`   Estado: ${combo.active ? '✅ Activo' : '❌ Inactivo'}`);
  
  return {
    individualPrice,
    savings,
    savingsPercentage: ((savings / individualPrice) * 100).toFixed(1)
  };
}

// Probar el sistema de combos
console.log('🚀 Analizando combos disponibles...\n');

const products = JSON.parse(mockLocalStorage.getItem('products'));
const combos = JSON.parse(mockLocalStorage.getItem('ofertas'));

console.log('📦 Productos individuales disponibles:');
products.forEach(product => {
  console.log(`   ${product.id}. ${product.name} - $${product.price.toLocaleString()}`);
});

console.log('\n🎯 Combos disponibles:');
combos.forEach(combo => {
  displayComboInfo(combo);
});

// Filtrar combos activos y válidos
const currentDate = new Date().toISOString().split('T')[0];
const activeCombos = combos.filter(combo => 
  combo.active && combo.validUntil >= currentDate
);

console.log(`\n📊 Resumen:`);
console.log(`   Total de combos: ${combos.length}`);
console.log(`   Combos activos y válidos: ${activeCombos.length}`);

// Mostrar ahorros por combo
console.log('\n💰 Análisis de ahorros:');
activeCombos.forEach(combo => {
  const info = displayComboInfo(combo);
  console.log(`   ${combo.title}: ${info.savingsPercentage}% de ahorro`);
});

console.log('\n🎯 Instrucciones para probar en el navegador:');
console.log('=====================================');
console.log('1. Ve a http://localhost:3000/admin/ofertas/new');
console.log('2. Crea un nuevo combo:');
console.log('   • Selecciona productos (ej: Fernet + Coca Cola)');
console.log('   • Establece cantidades (ej: 1 Fernet + 1 Coca Cola)');
console.log('   • Define precio del combo (ej: $2800)');
console.log('   • Agrega título y descripción');
console.log('   • Selecciona imagen');
console.log('3. Ve a http://localhost:3000/ofertas para ver los combos');
console.log('4. Verás:');
console.log('   • Lista de productos incluidos');
console.log('   • Precio individual vs precio combo');
console.log('   • Ahorro calculado automáticamente');

console.log('\n🔧 Características del sistema:');
console.log('=====================================');
console.log('• Combos independientes de productos individuales');
console.log('• Precios de combos independientes');
console.log('• Múltiples productos por combo');
console.log('• Cantidades personalizables');
console.log('• Cálculo automático de ahorros');
console.log('• Fechas de vencimiento');
console.log('• Estados activo/inactivo');
console.log('• Imágenes personalizadas');

console.log('\n📊 Ejemplos de combos:');
console.log('=====================================');
console.log('• Fernet + Coca Cola 2L = $2800 (ahorro $500)');
console.log('• Skyy + Speed = $3500 (ahorro $600)');
console.log('• Smirnoff + 2 Speed = $3200 (ahorro $800)');

console.log('\n🚀 ¡El sistema de combos está listo para usar!');
