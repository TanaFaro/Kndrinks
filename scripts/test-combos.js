/**
 * Script de prueba para verificar la funcionalidad de combos
 * Este script simula la creación de combos de prueba
 */

// Datos de ejemplo para productos
const sampleProducts = [
  {
    id: 1,
    name: 'Fernet Branca 750ml',
    price: 3500,
    category: 'Licores',
    stock: 50,
    image: '/images/fernet 750.jfif',
    description: 'Fernet Branca clásico 750ml'
  },
  {
    id: 2,
    name: 'Coca Cola 2.25L',
    price: 800,
    category: 'Gaseosas',
    stock: 100,
    image: '/images/cocacola.jfif',
    description: 'Coca Cola 2.25 litros'
  },
  {
    id: 3,
    name: 'Speed XL',
    price: 1200,
    category: 'Energizantes',
    stock: 30,
    image: '/images/Speed XL.webp',
    description: 'Speed XL energizante'
  }
]

// Datos de ejemplo para combos
const sampleCombos = [
  {
    id: 1,
    title: 'Fernet + Coca Cola',
    description: 'Combo clásico: Fernet Branca 750ml + Coca Cola 2.25L',
    comboProducts: [
      {
        productId: 1,
        productName: 'Fernet Branca 750ml',
        quantity: 1,
        price: 3500
      },
      {
        productId: 2,
        productName: 'Coca Cola 2.25L',
        quantity: 2,
        price: 800
      }
    ],
    finalPrice: 4500,
    image: '/images/fernet 750.jfif',
    category: 'Combos',
    active: true
  },
  {
    id: 2,
    title: 'Skyy + Speed',
    description: 'Combo energético: Skyy vodka + Speed XL',
    comboProducts: [
      {
        productId: 3,
        productName: 'Speed XL',
        quantity: 2,
        price: 1200
      }
    ],
    finalPrice: 2000,
    image: '/images/skyy mas speed.jfif',
    category: 'Combos',
    active: true
  },
  {
    id: 3,
    title: 'Smirnoff + Speed',
    description: 'Combo premium: Smirnoff vodka + Speed XL',
    comboProducts: [
      {
        productId: 3,
        productName: 'Speed XL',
        quantity: 2,
        price: 1200
      }
    ],
    finalPrice: 1800,
    image: '/images/Smirnoff mas 2 speed.png',
    category: 'Combos',
    active: true
  }
]

// Función para cargar datos de prueba
function loadTestData() {
  console.log('🔄 Cargando datos de prueba...')
  
  // Cargar productos
  localStorage.setItem('products', JSON.stringify(sampleProducts))
  console.log('✅ Productos de prueba cargados')
  
  // Cargar combos
  localStorage.setItem('ofertas', JSON.stringify(sampleCombos))
  console.log('✅ Combos de prueba cargados')
  
  console.log('🎉 Datos de prueba cargados exitosamente!')
  console.log('📦 Productos:', sampleProducts.length)
  console.log('🎯 Combos:', sampleCombos.length)
}

// Función para limpiar datos de prueba
function clearTestData() {
  console.log('🧹 Limpiando datos de prueba...')
  localStorage.removeItem('products')
  localStorage.removeItem('ofertas')
  console.log('✅ Datos de prueba eliminados')
}

// Función para verificar datos
function verifyData() {
  console.log('🔍 Verificando datos...')
  
  const products = JSON.parse(localStorage.getItem('products') || '[]')
  const ofertas = JSON.parse(localStorage.getItem('ofertas') || '[]')
  
  console.log('📦 Productos encontrados:', products.length)
  console.log('🎯 Combos encontrados:', ofertas.length)
  
  ofertas.forEach((combo, index) => {
    console.log(`Combo ${index + 1}:`, {
      title: combo.title,
      image: combo.image,
      products: combo.comboProducts?.length || 0,
      active: combo.active
    })
  })
}

// Exportar funciones para uso en consola del navegador
if (typeof window !== 'undefined') {
  window.loadTestData = loadTestData
  window.clearTestData = clearTestData
  window.verifyData = verifyData
  
  console.log('🛠️ Script de prueba cargado!')
  console.log('📝 Comandos disponibles:')
  console.log('  - loadTestData() - Cargar datos de prueba')
  console.log('  - clearTestData() - Limpiar datos de prueba')
  console.log('  - verifyData() - Verificar datos actuales')
}

module.exports = {
  loadTestData,
  clearTestData,
  verifyData,
  sampleProducts,
  sampleCombos
}
