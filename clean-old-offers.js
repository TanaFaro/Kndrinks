console.log('🧹 Limpiando ofertas antiguas del localStorage...\n');

// Función para verificar si una oferta tiene la estructura correcta de combo
function isValidComboOffer(oferta) {
  return (
    oferta &&
    typeof oferta === 'object' &&
    oferta.id &&
    oferta.title &&
    oferta.comboProducts &&
    Array.isArray(oferta.comboProducts) &&
    oferta.comboProducts.length > 0 &&
    oferta.finalPrice &&
    typeof oferta.finalPrice === 'number'
  );
}

// Función para verificar si una oferta tiene la estructura antigua (sin comboProducts)
function isOldOfferStructure(oferta) {
  return (
    oferta &&
    typeof oferta === 'object' &&
    oferta.id &&
    oferta.title &&
    !oferta.comboProducts && // No tiene comboProducts
    (oferta.productId || oferta.productName || oferta.originalPrice || oferta.discount) // Tiene campos antiguos
  );
}

// Simular localStorage para la limpieza
const mockLocalStorage = {
  data: {
    'ofertas': JSON.stringify([
      // Ofertas válidas (nuevas)
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
        finalPrice: 2800,
        image: '/images/fernet 750.jfif',
        category: 'Combos',
        validUntil: '2024-12-31',
        active: true
      },
      // Oferta antigua (sin comboProducts)
      {
        id: 2,
        title: 'Oferta Antigua',
        description: 'Esta oferta tiene estructura antigua',
        productId: 1,
        productName: 'Fernet Branca',
        originalPrice: 2500,
        discount: 10,
        finalPrice: 2250,
        image: '/images/fernet 750.jfif',
        category: 'Licores',
        validUntil: '2024-12-31',
        active: true
      },
      // Oferta con estructura corrupta
      {
        id: 3,
        title: 'Oferta Corrupta',
        description: 'Esta oferta no tiene comboProducts',
        finalPrice: 1000,
        image: '/images/Logo Bebidas.jpeg',
        category: 'Combos',
        validUntil: '2024-12-31',
        active: true
      },
      // Oferta válida (nueva)
      {
        id: 4,
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
        finalPrice: 3500,
        image: '/images/skyy mas speed.jfif',
        category: 'Combos',
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

// Función para limpiar ofertas
function cleanOldOffers() {
  try {
    console.log('🔍 Analizando ofertas existentes...\n');
    
    const savedOfertas = mockLocalStorage.getItem('ofertas');
    if (!savedOfertas) {
      console.log('✅ No hay ofertas en localStorage');
      return;
    }

    const ofertas = JSON.parse(savedOfertas);
    console.log(`📊 Total de ofertas encontradas: ${ofertas.length}`);

    // Separar ofertas válidas e inválidas
    const validOffers = [];
    const invalidOffers = [];

    ofertas.forEach(oferta => {
      if (isValidComboOffer(oferta)) {
        validOffers.push(oferta);
        console.log(`✅ Oferta válida: ${oferta.title}`);
      } else {
        invalidOffers.push(oferta);
        if (isOldOfferStructure(oferta)) {
          console.log(`❌ Oferta antigua: ${oferta.title} (estructura sin comboProducts)`);
        } else {
          console.log(`❌ Oferta corrupta: ${oferta.title || 'Sin título'} (estructura inválida)`);
        }
      }
    });

    console.log(`\n📊 Resumen:`);
    console.log(`   Ofertas válidas: ${validOffers.length}`);
    console.log(`   Ofertas a eliminar: ${invalidOffers.length}`);

    if (invalidOffers.length > 0) {
      console.log('\n🗑️ Ofertas que serán eliminadas:');
      invalidOffers.forEach(oferta => {
        console.log(`   • ${oferta.title || 'Sin título'} (ID: ${oferta.id})`);
      });

      // Guardar solo las ofertas válidas
      mockLocalStorage.setItem('ofertas', JSON.stringify(validOffers));
      console.log('\n✅ Limpieza completada. Solo se mantienen las ofertas válidas.');
    } else {
      console.log('\n✅ No se encontraron ofertas para eliminar.');
    }

    console.log(`\n🎯 Ofertas válidas restantes:`);
    validOffers.forEach(oferta => {
      console.log(`   • ${oferta.title} (${oferta.comboProducts.length} productos)`);
    });

  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
  }
}

// Ejecutar la limpieza
cleanOldOffers();

console.log('\n🎯 Instrucciones para limpiar en el navegador:');
console.log('=====================================');
console.log('1. Abre las herramientas de desarrollador (F12)');
console.log('2. Ve a la pestaña "Console"');
console.log('3. Ejecuta este código:');
console.log('');
console.log('// Limpiar ofertas antiguas');
console.log('const savedOfertas = localStorage.getItem("ofertas");');
console.log('if (savedOfertas) {');
console.log('  const ofertas = JSON.parse(savedOfertas);');
console.log('  const validOffers = ofertas.filter(oferta => ');
console.log('    oferta && oferta.comboProducts && Array.isArray(oferta.comboProducts)');
console.log('  );');
console.log('  localStorage.setItem("ofertas", JSON.stringify(validOffers));');
console.log('  console.log("✅ Limpieza completada");');
console.log('}');
console.log('');
console.log('4. Recarga la página /ofertas');
console.log('5. El error debería desaparecer');

console.log('\n🚀 ¡Sistema de combos optimizado!');
