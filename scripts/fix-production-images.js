/**
 * Script para arreglar las imágenes en producción
 * Ejecutar en la consola del navegador en https://kndrinks.vercel.app
 */

console.log('🔧 Iniciando arreglo de imágenes en producción...');

// Función para verificar si una imagen existe
async function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Función para cargar datos de prueba con imágenes verificadas
async function loadTestDataWithVerifiedImages() {
  console.log('📸 Verificando imágenes disponibles...');
  
  // Lista de imágenes que sabemos que existen
  const availableImages = [
    '/images/cocacola.jfif',
    '/images/fernet 750.jfif',
    '/images/skyy.png',
    '/images/Smirnoff solo.jpeg',
    '/images/Speed XL.webp',
    '/images/pritty 2.250.jfif',
    '/images/skyy mas speed.jfif',
    '/images/Smirnoff mas 2 speed.png',
    '/images/viña de balbo mas pritty.png',
    '/images/vino toro mas pritty.jpg',
    '/images/Logo Bebidas.jpeg'
  ];
  
  // Verificar qué imágenes están disponibles
  const verifiedImages = [];
  for (const imageUrl of availableImages) {
    const exists = await checkImageExists(imageUrl);
    if (exists) {
      verifiedImages.push(imageUrl);
      console.log('✅ Imagen disponible:', imageUrl);
    } else {
      console.log('❌ Imagen no disponible:', imageUrl);
    }
  }
  
  console.log(`📊 ${verifiedImages.length} imágenes verificadas de ${availableImages.length}`);
  
  // Crear productos con imágenes verificadas
  const testProducts = [
    {
      id: 1,
      name: "Coca Cola 2.25L",
      price: 2500,
      category: "Bebidas",
      stock: 50,
      image: verifiedImages.find(img => img.includes('cocacola')) || '/images/Logo Bebidas.jpeg',
      description: "Refresco clásico de Coca Cola"
    },
    {
      id: 2,
      name: "Fernet Branca 750ml",
      price: 4500,
      category: "Licores",
      stock: 30,
      image: verifiedImages.find(img => img.includes('fernet')) || '/images/Logo Bebidas.jpeg',
      description: "Fernet italiano de alta calidad"
    },
    {
      id: 3,
      name: "Skyy Vodka 750ml",
      price: 3800,
      category: "Licores",
      stock: 25,
      image: verifiedImages.find(img => img.includes('skyy') && !img.includes('speed')) || '/images/Logo Bebidas.jpeg',
      description: "Vodka premium americano"
    },
    {
      id: 4,
      name: "Smirnoff Vodka 750ml",
      price: 4200,
      category: "Licores",
      stock: 20,
      image: verifiedImages.find(img => img.includes('Smirnoff') && !img.includes('speed')) || '/images/Logo Bebidas.jpeg',
      description: "Vodka ruso de renombre mundial"
    },
    {
      id: 5,
      name: "Speed XL 500ml",
      price: 1800,
      category: "Energizantes",
      stock: 100,
      image: verifiedImages.find(img => img.includes('Speed')) || '/images/Logo Bebidas.jpeg',
      description: "Bebida energética para mantenerte activo"
    },
    {
      id: 6,
      name: "Pritty 2.25L",
      price: 1200,
      category: "Bebidas",
      stock: 80,
      image: verifiedImages.find(img => img.includes('pritty')) || '/images/Logo Bebidas.jpeg',
      description: "Bebida cola argentina"
    }
  ];

  // Crear ofertas con imágenes verificadas
  const testOffers = [
    {
      id: 1,
      title: "Fernet + Coca Cola",
      description: "Combo perfecto para disfrutar con amigos",
      finalPrice: 5999,
      active: true,
      image: verifiedImages.find(img => img.includes('fernet')) || '/images/Logo Bebidas.jpeg',
      comboProducts: [
        { id: 2, name: "Fernet Branca 750ml", quantity: 1, price: 4500, category: "Licores" },
        { id: 1, name: "Coca Cola 2.25L", quantity: 1, price: 2500, category: "Bebidas" }
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
      image: verifiedImages.find(img => img.includes('skyy') && img.includes('speed')) || '/images/Logo Bebidas.jpeg',
      comboProducts: [
        { id: 3, name: "Skyy Vodka 750ml", quantity: 1, price: 3800, category: "Licores" },
        { id: 5, name: "Speed XL 500ml", quantity: 2, price: 1800, category: "Energizantes" }
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
      image: verifiedImages.find(img => img.includes('Smirnoff') && img.includes('speed')) || '/images/Logo Bebidas.jpeg',
      comboProducts: [
        { id: 4, name: "Smirnoff Vodka 750ml", quantity: 1, price: 4200, category: "Licores" },
        { id: 5, name: "Speed XL 500ml", quantity: 2, price: 1800, category: "Energizantes" }
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
      image: verifiedImages.find(img => img.includes('viña') || img.includes('vino')) || '/images/Logo Bebidas.jpeg',
      comboProducts: [
        { id: 7, name: "Viña de Balbo Tinto", quantity: 1, price: 6000, category: "Vinos" },
        { id: 6, name: "Pritty 2.25L", quantity: 1, price: 1200, category: "Bebidas" }
      ],
      featured: true,
      priority: 5
    }
  ];

  // Guardar en localStorage
  try {
    localStorage.setItem('products', JSON.stringify(testProducts));
    localStorage.setItem('ofertas', JSON.stringify(testOffers));
    
    console.log('✅ Datos cargados exitosamente!');
    console.log('📦 Productos:', testProducts.length);
    console.log('🎯 Ofertas:', testOffers.length);
    console.log('⭐ Ofertas destacadas:', testOffers.filter(o => o.featured).length);
    
    // Mostrar resumen de imágenes
    console.log('🖼️ Resumen de imágenes:');
    testProducts.forEach(product => {
      console.log(`  ${product.name}: ${product.image}`);
    });
    
    testOffers.forEach(offer => {
      console.log(`  ${offer.title}: ${offer.image}`);
    });
    
    // Recargar la página
    console.log('🔄 Recargando página en 2 segundos...');
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    
  } catch (error) {
    console.error('❌ Error guardando datos:', error);
  }
}

// Ejecutar el script
loadTestDataWithVerifiedImages();
