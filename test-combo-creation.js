console.log('🧪 Probando creación de combos...\n');

// Simular localStorage
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
      }
    ]),
    'ofertas': JSON.stringify([])
  },
  getItem(key) {
    console.log(`🔍 Obteniendo: ${key}`);
    return this.data[key];
  },
  setItem(key, value) {
    console.log(`💾 Guardando: ${key}`);
    this.data[key] = value;
    console.log(`📄 Contenido guardado:`, JSON.parse(value));
  }
};

// Simular datos del formulario
const formData = {
  title: 'Combo Fernet + Coca Cola 2L',
  description: 'El combo perfecto para disfrutar con amigos',
  finalPrice: '2800',
  validUntil: '2024-12-31',
  active: true
};

// Simular productos seleccionados
const selectedProducts = [
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
];

const selectedImage = '/images/fernet 750.jfif';

// Función para crear combo (simulando handleSubmit)
function createCombo() {
  console.log('🚀 Iniciando creación de combo...');
  console.log('📋 Datos del formulario:', formData);
  console.log('🛍️ Productos del combo:', selectedProducts);
  console.log('🖼️ Imagen seleccionada:', selectedImage);

  try {
    // Validar datos requeridos
    if (selectedProducts.length === 0) {
      console.error('❌ Error: Debes seleccionar al menos un producto para el combo');
      return false;
    }

    if (!formData.title || !formData.finalPrice || !formData.validUntil) {
      console.error('❌ Error: Por favor completa todos los campos requeridos');
      console.log('   - title:', formData.title);
      console.log('   - finalPrice:', formData.finalPrice);
      console.log('   - validUntil:', formData.validUntil);
      return false;
    }

    // Obtener ofertas existentes
    const savedOfertas = mockLocalStorage.getItem('ofertas');
    const ofertas = savedOfertas ? JSON.parse(savedOfertas) : [];
    console.log('📦 Ofertas existentes:', ofertas.length);

    // Crear nueva oferta (combo)
    const newOferta = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      comboProducts: selectedProducts,
      finalPrice: parseFloat(formData.finalPrice),
      image: selectedImage || '/images/Logo Bebidas.jpeg',
      category: 'Combos',
      validUntil: formData.validUntil,
      active: formData.active
    };

    console.log('✅ Nuevo combo creado:', newOferta);

    // Guardar en localStorage
    ofertas.push(newOferta);
    mockLocalStorage.setItem('ofertas', JSON.stringify(ofertas));
    console.log('💾 Combo guardado exitosamente');

    // Verificar que se guardó correctamente
    const savedOfertasAfter = mockLocalStorage.getItem('ofertas');
    const ofertasAfter = JSON.parse(savedOfertasAfter);
    console.log('🔍 Verificación - Ofertas después de guardar:', ofertasAfter.length);
    console.log('🎯 Último combo guardado:', ofertasAfter[ofertasAfter.length - 1]);

    return true;
  } catch (error) {
    console.error('❌ Error al crear combo:', error);
    return false;
  }
}

// Probar diferentes escenarios
console.log('🎯 ESCENARIO 1: Creación exitosa de combo');
console.log('=====================================');
const success = createCombo();
console.log(`Resultado: ${success ? '✅ ÉXITO' : '❌ FALLO'}`);

console.log('\n🎯 ESCENARIO 2: Validación de campos vacíos');
console.log('=====================================');
const formDataEmpty = {
  title: '',
  description: 'Descripción sin título',
  finalPrice: '',
  validUntil: '',
  active: true
};

console.log('📋 Datos con campos vacíos:', formDataEmpty);
if (!formDataEmpty.title || !formDataEmpty.finalPrice || !formDataEmpty.validUntil) {
  console.log('❌ Validación correcta: Campos requeridos faltantes');
} else {
  console.log('❌ Error en validación: Debería haber fallado');
}

console.log('\n🎯 ESCENARIO 3: Validación de productos vacíos');
console.log('=====================================');
const emptyProducts = [];
console.log('🛍️ Productos vacíos:', emptyProducts);
if (emptyProducts.length === 0) {
  console.log('❌ Validación correcta: No hay productos seleccionados');
} else {
  console.log('❌ Error en validación: Debería haber fallado');
}

console.log('\n🎯 ESCENARIO 4: Verificar estructura del combo');
console.log('=====================================');
const testCombo = {
  id: Date.now(),
  title: 'Test Combo',
  description: 'Combo de prueba',
  comboProducts: selectedProducts,
  finalPrice: 2800,
  image: '/images/test.jpg',
  category: 'Combos',
  validUntil: '2024-12-31',
  active: true
};

console.log('🔍 Estructura del combo:', testCombo);
console.log('✅ Tiene id:', !!testCombo.id);
console.log('✅ Tiene title:', !!testCombo.title);
console.log('✅ Tiene comboProducts:', !!testCombo.comboProducts);
console.log('✅ comboProducts es array:', Array.isArray(testCombo.comboProducts));
console.log('✅ comboProducts tiene elementos:', testCombo.comboProducts.length > 0);
console.log('✅ Tiene finalPrice:', !!testCombo.finalPrice);
console.log('✅ finalPrice es número:', typeof testCombo.finalPrice === 'number');

console.log('\n🎯 Instrucciones para debuggear en el navegador:');
console.log('=====================================');
console.log('1. Ve a http://localhost:3000/admin/ofertas/new');
console.log('2. Abre las herramientas de desarrollador (F12)');
console.log('3. Ve a la pestaña "Console"');
console.log('4. Completa el formulario y haz clic en "Crear Combo"');
console.log('5. Revisa los mensajes de console.log:');
console.log('   - "Iniciando creación de combo..."');
console.log('   - "Datos del formulario:"');
console.log('   - "Productos del combo:"');
console.log('   - "Nuevo combo creado:"');
console.log('   - "Combo guardado exitosamente"');
console.log('6. Si no ves estos mensajes, hay un problema en el formulario');
console.log('7. Si ves errores, compártelos para diagnosticar');

console.log('\n🔧 Posibles problemas comunes:');
console.log('=====================================');
console.log('• Formulario no se envía (event.preventDefault() no funciona)');
console.log('• Validaciones que fallan silenciosamente');
console.log('• localStorage no disponible o corrupto');
console.log('• Errores de JavaScript que detienen la ejecución');
console.log('• Problemas con el router.push()');

console.log('\n🚀 ¡Prueba completada!');
