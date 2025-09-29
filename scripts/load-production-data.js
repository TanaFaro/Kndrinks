/**
 * Script para cargar datos de prueba en producción
 * Ejecutar en la consola del navegador en la URL de producción
 */

// Datos de productos de prueba
const testProducts = [
  {
    id: 1,
    name: "Coca Cola 2.25L",
    price: 2500,
    category: "Bebidas",
    image: "/images/cocacola.jfif"
  },
  {
    id: 2,
    name: "Fernet Branca 750ml",
    price: 4500,
    category: "Licores",
    image: "/images/fernet 750.jfif"
  },
  {
    id: 3,
    name: "Skyy Vodka 750ml",
    price: 3800,
    category: "Licores",
    image: "/images/skyy.png"
  },
  {
    id: 4,
    name: "Smirnoff Vodka 750ml",
    price: 4200,
    category: "Licores",
    image: "/images/Smirnoff solo.jpeg"
  },
  {
    id: 5,
    name: "Speed XL 500ml",
    price: 1800,
    category: "Energizantes",
    image: "/images/Speed XL.webp"
  },
  {
    id: 6,
    name: "Pritty 2.25L",
    price: 1200,
    category: "Bebidas",
    image: "/images/pritty 2.250.jfif"
  }
];

// Datos de ofertas de prueba
const testOffers = [
  {
    id: 1,
    title: "Fernet + Coca Cola",
    description: "Combo perfecto para disfrutar con amigos",
    finalPrice: 5999,
    active: true,
    image: "/images/fernet 750.jfif",
    comboProducts: [
      { name: "Fernet Branca 750ml", quantity: 1 },
      { name: "Coca Cola 2.25L", quantity: 1 }
    ],
    featured: true,
    priority: 5
  },
  {
    id: 2,
    title: "Skyy + Speed",
    description: "Combo energético para la noche",
    finalPrice: 4999,
    active: true,
    image: "/images/skyy mas speed.jfif",
    comboProducts: [
      { name: "Skyy Vodka 750ml", quantity: 1 },
      { name: "Speed XL 500ml", quantity: 2 }
    ],
    featured: true,
    priority: 4
  },
  {
    id: 3,
    title: "Smirnoff + Speed",
    description: "Combo premium para celebrar",
    finalPrice: 6999,
    active: true,
    image: "/images/Smirnoff mas 2 speed.png",
    comboProducts: [
      { name: "Smirnoff Vodka 750ml", quantity: 1 },
      { name: "Speed XL 500ml", quantity: 2 }
    ],
    featured: false,
    priority: 3
  },
  {
    id: 4,
    title: "Vino + Pritty",
    description: "Combo para una cena especial",
    finalPrice: 7999,
    active: true,
    image: "/images/viña de balbo mas pritty.png",
    comboProducts: [
      { name: "Viña de Balbo Tinto", quantity: 1 },
      { name: "Pritty 2.25L", quantity: 1 }
    ],
    featured: true,
    priority: 5
  }
];

// Función para cargar datos
function loadTestData() {
  try {
    // Cargar productos
    localStorage.setItem('products', JSON.stringify(testProducts));
    console.log('✅ Productos cargados:', testProducts.length);
    
    // Cargar ofertas
    localStorage.setItem('ofertas', JSON.stringify(testOffers));
    console.log('✅ Ofertas cargadas:', testOffers.length);
    
    // Mostrar resumen
    console.log('🎉 Datos de prueba cargados exitosamente!');
    console.log('📦 Productos:', testProducts.length);
    console.log('🎯 Ofertas:', testOffers.length);
    console.log('⭐ Ofertas destacadas:', testOffers.filter(o => o.featured).length);
    
    // Recargar la página para ver los cambios
    console.log('🔄 Recargando página...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    
  } catch (error) {
    console.error('❌ Error cargando datos:', error);
  }
}

// Ejecutar automáticamente
loadTestData();
