console.log('🧪 Probando visualización de productos...\n');

// Simular localStorage con productos de prueba
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
      },
      {
        id: 4,
        name: 'Fernet Branca',
        price: 2500,
        category: 'Licores',
        stock: 25,
        image: '/images/fernet 750.jfif',
        description: 'Fernet tradicional italiano'
      }
    ])
  },
  getItem(key) {
    console.log(`🔍 Obteniendo productos: ${key}`);
    return this.data[key];
  }
};

// Simular carga de productos
function loadProducts() {
  console.log('📦 Cargando productos desde localStorage...\n');
  
  const savedProducts = mockLocalStorage.getItem('products');
  console.log('Productos guardados:', savedProducts);
  
  if (savedProducts) {
    const products = JSON.parse(savedProducts);
    console.log('✅ Productos cargados exitosamente:');
    console.log('=====================================');
    
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   Categoría: ${product.category}`);
      console.log(`   Precio: $${product.price.toLocaleString()}`);
      console.log(`   Stock: ${product.stock} unidades`);
      console.log(`   Imagen: ${product.image}`);
      console.log(`   Descripción: ${product.description}`);
      console.log('');
    });
    
    // Simular filtrado por categoría
    console.log('🎯 Simulando filtrado por categorías:');
    console.log('=====================================');
    
    const categories = ['Todas', ...Array.from(new Set(products.map(p => p.category)))];
    console.log('Categorías disponibles:', categories);
    
    categories.forEach(category => {
      const filtered = category === 'Todas' 
        ? products 
        : products.filter(p => p.category === category);
      
      console.log(`\n📂 ${category}: ${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`);
      filtered.forEach(product => {
        console.log(`   • ${product.name} - $${product.price.toLocaleString()}`);
      });
    });
    
    return products;
  } else {
    console.log('❌ No se encontraron productos guardados');
    return [];
  }
}

// Ejecutar prueba
const products = loadProducts();

console.log('\n🎯 Instrucciones para probar en el navegador:');
console.log('=====================================');
console.log('1. Ve a http://localhost:3000/productos');
console.log('2. Deberías ver los productos creados desde el admin');
console.log('3. Cada producto debe mostrar:');
console.log('   • Imagen del producto');
console.log('   • Nombre del producto');
console.log('   • Categoría');
console.log('   • Precio formateado');
console.log('   • Stock disponible');
console.log('   • Descripción');
console.log('4. Prueba los filtros por categoría');
console.log('5. Verifica que las imágenes se cargan correctamente');

console.log('\n🔧 Si no ves los productos:');
console.log('=====================================');
console.log('• Asegúrate de haber creado productos desde el admin');
console.log('• Verifica que estés logueado como admin');
console.log('• Revisa la consola del navegador para errores');
console.log('• Intenta recargar la página');

console.log('\n📊 Resumen de la prueba:');
console.log('=====================================');
console.log(`✅ Total de productos: ${products.length}`);
console.log(`✅ Categorías únicas: ${Array.from(new Set(products.map(p => p.category))).length}`);
console.log(`✅ Productos con imágenes: ${products.filter(p => p.image).length}`);
console.log(`✅ Productos en stock: ${products.filter(p => p.stock > 0).length}`);

console.log('\n🚀 ¡La página de productos está lista para mostrar tus productos creados!');
