console.log('🧪 Probando productos destacados con ofertas...\n');

// Simular localStorage con productos y ofertas
const mockLocalStorage = {
  data: {
    'products': JSON.stringify([
      {
        id: 1,
        name: 'Whisky Premium',
        price: 15000,
        category: 'Licores',
        stock: 10,
        image: '/images/Logo Bebidas.jpeg',
        description: 'Whisky de alta calidad'
      },
      {
        id: 2,
        name: 'Vino Tinto Reserva',
        price: 8500,
        category: 'Vinos',
        stock: 15,
        image: '/images/fernet 750.jfif',
        description: 'Vino tinto reserva especial'
      },
      {
        id: 3,
        name: 'Cerveza Artesanal',
        price: 1200,
        category: 'Cervezas',
        stock: 50,
        image: '/images/skyy mas speed.jfif',
        description: 'Cerveza artesanal premium'
      }
    ]),
    'ofertas': JSON.stringify([
      {
        id: 1,
        productId: 1,
        productName: 'Whisky Premium',
        title: 'Whisky Premium - OFERTA ESPECIAL',
        description: 'Descuento especial en Whisky Premium',
        discount: 15,
        originalPrice: 15000,
        finalPrice: 12750,
        image: '/images/Logo Bebidas.jpeg',
        category: 'Licores',
        validUntil: '2024-12-31',
        active: true
      },
      {
        id: 2,
        productId: 2,
        productName: 'Vino Tinto Reserva',
        title: 'Vino Tinto - DESCUENTO LIMITADO',
        description: 'Oferta especial en vinos',
        discount: 25,
        originalPrice: 8500,
        finalPrice: 6375,
        image: '/images/fernet 750.jfif',
        category: 'Vinos',
        validUntil: '2024-11-30',
        active: true
      },
      {
        id: 3,
        productId: 3,
        productName: 'Cerveza Artesanal',
        title: 'Cerveza - OFERTA FLASH',
        description: 'Oferta flash en cervezas',
        discount: 10,
        originalPrice: 1200,
        finalPrice: 1080,
        image: '/images/skyy mas speed.jfif',
        category: 'Cervezas',
        validUntil: '2024-10-31',
        active: false
      }
    ])
  },
  getItem(key) {
    console.log(`🔍 Obteniendo: ${key}`);
    return this.data[key];
  }
};

// Simular la lógica de la página principal
function getProductsWithOffers() {
  const ofertas = JSON.parse(mockLocalStorage.getItem('ofertas'));
  const activeOfertas = ofertas.filter(oferta => oferta.active && new Date(oferta.validUntil) >= new Date());
  
  console.log('📊 Ofertas totales:', ofertas.length);
  console.log('✅ Ofertas activas:', activeOfertas.length);
  
  // Si no hay ofertas activas, mostrar productos destacados por defecto
  if (activeOfertas.length === 0) {
    console.log('⚠️ No hay ofertas activas, mostrando productos por defecto');
    return [
      { 
        name: 'Whisky Premium', 
        price: 15000,
        finalPrice: 15000,
        discount: 0,
        image: '/images/Logo Bebidas.jpeg',
        category: 'Licores Premium',
        hasOffer: false
      },
      { 
        name: 'Vino Tinto Reserva', 
        price: 8500,
        finalPrice: 8500,
        discount: 0,
        image: '/images/Logo Bebidas.jpeg',
        category: 'Vinos Especiales',
        hasOffer: false
      },
      { 
        name: 'Cerveza Artesanal', 
        price: 1200,
        finalPrice: 1200,
        discount: 0,
        image: '/images/Logo Bebidas.jpeg',
        category: 'Cervezas Craft',
        hasOffer: false
      }
    ];
  }

  // Tomar hasta 3 ofertas activas
  const featuredProducts = activeOfertas.slice(0, 3).map(oferta => ({
    name: oferta.productName,
    price: oferta.originalPrice,
    finalPrice: oferta.finalPrice,
    discount: oferta.discount,
    image: oferta.image,
    category: oferta.category,
    hasOffer: true
  }));

  console.log('🎯 Productos destacados generados:', featuredProducts.length);
  return featuredProducts;
}

// Probar la funcionalidad
console.log('📦 Productos disponibles:');
const products = JSON.parse(mockLocalStorage.getItem('products'));
products.forEach(product => {
  console.log(`   ${product.id}. ${product.name} - $${product.price.toLocaleString()}`);
});

console.log('\n🎯 Ofertas disponibles:');
const ofertas = JSON.parse(mockLocalStorage.getItem('ofertas'));
ofertas.forEach(oferta => {
  const status = oferta.active ? '✅ Activa' : '❌ Inactiva';
  const valid = new Date(oferta.validUntil) >= new Date() ? '✅ Válida' : '❌ Expirada';
  console.log(`   ${oferta.id}. ${oferta.productName} - ${oferta.discount}% OFF - ${status} - ${valid}`);
});

console.log('\n🚀 Generando productos destacados...');
const featuredProducts = getProductsWithOffers();

console.log('\n📋 Productos destacados finales:');
console.log('=====================================');
featuredProducts.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name}`);
  console.log(`   Categoría: ${product.category}`);
  console.log(`   Imagen: ${product.image}`);
  
  if (product.hasOffer) {
    console.log(`   💰 Precio original: $${product.price.toLocaleString()}`);
    console.log(`   🔥 Precio con descuento: $${product.finalPrice.toLocaleString()}`);
    console.log(`   📉 Descuento: ${product.discount}%`);
    console.log(`   💵 Ahorro: $${(product.price - product.finalPrice).toLocaleString()}`);
  } else {
    console.log(`   💰 Precio: $${product.price.toLocaleString()}`);
    console.log(`   ℹ️ Sin oferta activa`);
  }
  console.log('');
});

console.log('\n🎯 Instrucciones para probar en el navegador:');
console.log('=====================================');
console.log('1. Ve a http://localhost:3000');
console.log('2. En la sección "Productos Destacados en Oferta" deberías ver:');
console.log('   • Productos con ofertas activas (si las hay)');
console.log('   • Imágenes de los productos');
console.log('   • Precios originales tachados');
console.log('   • Precios con descuento en rojo/naranja');
console.log('   • Badges de descuento en las imágenes');
console.log('3. Si no hay ofertas activas, verás productos por defecto');

console.log('\n🔧 Para crear ofertas:');
console.log('=====================================');
console.log('1. Ve a http://localhost:3000/admin/ofertas/new');
console.log('2. Selecciona un producto existente');
console.log('3. Configura el descuento y fecha de vencimiento');
console.log('4. Crea la oferta');
console.log('5. Regresa a la página principal para ver los cambios');

console.log('\n🗑️ Para eliminar ofertas por categoría:');
console.log('=====================================');
console.log('1. Ve a http://localhost:3000/admin/ofertas');
console.log('2. En la columna "Categoría" verás un ícono de papelera');
console.log('3. Haz clic en el ícono para eliminar todas las ofertas de esa categoría');
console.log('4. Confirma la eliminación');

console.log('\n📊 Resumen de la prueba:');
console.log('=====================================');
console.log(`✅ Total de productos: ${products.length}`);
console.log(`✅ Total de ofertas: ${ofertas.length}`);
console.log(`✅ Ofertas activas: ${ofertas.filter(o => o.active && new Date(o.validUntil) >= new Date()).length}`);
console.log(`✅ Productos destacados mostrados: ${featuredProducts.length}`);
console.log(`✅ Productos con ofertas: ${featuredProducts.filter(p => p.hasOffer).length}`);

console.log('\n🚀 ¡La funcionalidad está lista para usar!');
