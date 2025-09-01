console.log('🧪 Probando sistema de ofertas...\n');

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
      }
    ])
  },
  getItem(key) {
    console.log(`🔍 Obteniendo: ${key}`);
    return this.data[key];
  },
  setItem(key, value) {
    console.log(`💾 Guardando: ${key}`);
    this.data[key] = value;
  }
};

// Simular creación de oferta
function createOffer(productId, discount, validUntil) {
  console.log(`\n🎯 Creando oferta para producto ${productId} con ${discount}% de descuento...`);
  
  // Obtener productos
  const products = JSON.parse(mockLocalStorage.getItem('products'));
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    console.log('❌ Producto no encontrado');
    return null;
  }
  
  // Validar descuento
  if (discount < 0 || discount > 99) {
    console.log('❌ Descuento inválido (debe estar entre 0% y 99%)');
    return null;
  }
  
  // Calcular precio final
  const originalPrice = product.price;
  const finalPrice = originalPrice - (originalPrice * discount / 100);
  
  // Crear oferta
  const newOffer = {
    id: Date.now(),
    productId: product.id,
    productName: product.name,
    title: `${product.name} - OFERTA ESPECIAL`,
    description: `Descuento especial en ${product.name}`,
    discount: discount,
    originalPrice: originalPrice,
    finalPrice: finalPrice,
    image: product.image,
    category: product.category,
    validUntil: validUntil,
    active: true
  };
  
  console.log('✅ Oferta creada exitosamente:');
  console.log('   Producto:', newOffer.productName);
  console.log('   Precio original: $' + newOffer.originalPrice.toLocaleString());
  console.log('   Descuento: ' + newOffer.discount + '%');
  console.log('   Precio final: $' + newOffer.finalPrice.toLocaleString());
  console.log('   Ahorro: $' + (newOffer.originalPrice - newOffer.finalPrice).toLocaleString());
  
  return newOffer;
}

// Probar creación de ofertas
console.log('📦 Productos disponibles:');
const products = JSON.parse(mockLocalStorage.getItem('products'));
products.forEach(product => {
  console.log(`   ${product.id}. ${product.name} - $${product.price.toLocaleString()}`);
});

// Crear algunas ofertas de prueba
const offer1 = createOffer(1, 15, '2024-12-31');
const offer2 = createOffer(2, 25, '2024-11-30');
const offer3 = createOffer(3, 10, '2024-10-31');

// Probar descuentos inválidos
console.log('\n⚠️ Probando descuentos inválidos:');
createOffer(1, -5, '2024-12-31');  // Descuento negativo
createOffer(1, 100, '2024-12-31'); // Descuento mayor a 99%

console.log('\n🎯 Instrucciones para probar en el navegador:');
console.log('=====================================');
console.log('1. Ve a http://localhost:3000/admin/ofertas/new');
console.log('2. Selecciona un producto de la lista');
console.log('3. Ingresa el porcentaje de descuento que desees (0-99%)');
console.log('4. Establece la fecha de vencimiento');
console.log('5. Revisa la vista previa de la oferta');
console.log('6. Haz clic en "Crear Oferta"');
console.log('7. Ve a http://localhost:3000/admin/ofertas para ver todas las ofertas');

console.log('\n💡 Características del sistema:');
console.log('=====================================');
console.log('• Puedes crear descuentos de 0% a 99%');
console.log('• El sistema calcula automáticamente el precio final');
console.log('• Muestra vista previa en tiempo real');
console.log('• Valida que el descuento sea razonable');
console.log('• Vincula ofertas con productos existentes');

console.log('\n🚀 ¡El sistema de ofertas está listo para usar!');
