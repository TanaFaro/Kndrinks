// Script para cargar datos de prueba con imágenes correctas
// Ejecutar en la consola del navegador

console.log('🔄 Cargando datos de prueba con imágenes correctas...');

// Productos de prueba
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
];

// Combos de prueba con imágenes que SÍ existen
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
];

// Cargar en localStorage
localStorage.setItem('products', JSON.stringify(sampleProducts));
localStorage.setItem('ofertas', JSON.stringify(sampleCombos));

console.log('✅ Datos de prueba cargados exitosamente!');
console.log('📦 Productos:', sampleProducts.length);
console.log('🎯 Combos:', sampleCombos.length);
console.log('🖼️ Imágenes de combos:');
sampleCombos.forEach((combo, i) => {
  console.log(`  ${i+1}. ${combo.title}: ${combo.image}`);
});

console.log('🔄 Recarga la página para ver los combos con imágenes correctas');
