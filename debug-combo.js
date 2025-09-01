console.log('🔍 DIAGNÓSTICO DEL BOTÓN BLOQUEADO\n');

// Función para simular el estado del formulario
function simulateFormState() {
  console.log('📋 SIMULANDO ESTADO DEL FORMULARIO');
  console.log('=====================================');
  
  // Estado simulado del formulario
  const formData = {
    title: 'Smirnoff',
    description: 'De Frutos rojos o Manzana más 2 Speed XL',
    finalPrice: '14500',
    validUntil: '2025-10-05',
    active: true
  };
  
  const selectedProducts = [
    {
      productId: 1,
      productName: 'Smirnoff',
      quantity: 1,
      price: 2800
    }
  ];
  
  const loading = false;
  
  console.log('📝 FormData:', formData);
  console.log('🛍️ SelectedProducts:', selectedProducts);
  console.log('⏳ Loading:', loading);
  
  return { formData, selectedProducts, loading };
}

// Función para validar el formulario (copia exacta del componente)
function isFormValid(formData, selectedProducts, loading) {
  const hasProducts = selectedProducts.length > 0;
  const hasTitle = formData.title.trim() !== '';
  const hasPrice = formData.finalPrice.trim() !== '';
  const hasDate = formData.validUntil.trim() !== '';
  const notLoading = !loading;
  
  console.log('\n🔍 VALIDACIÓN DEL FORMULARIO');
  console.log('=====================================');
  console.log('✅ hasProducts (productos > 0):', hasProducts, `(${selectedProducts.length} productos)`);
  console.log('✅ hasTitle (título no vacío):', hasTitle, `("${formData.title}")`);
  console.log('✅ hasPrice (precio no vacío):', hasPrice, `("${formData.finalPrice}")`);
  console.log('✅ hasDate (fecha no vacía):', hasDate, `("${formData.validUntil}")`);
  console.log('✅ notLoading (no cargando):', notLoading, `(${loading})`);
  
  const result = hasProducts && hasTitle && hasPrice && hasDate && notLoading;
  console.log('\n🎯 RESULTADO FINAL:', result);
  console.log('🔢 Cálculo:', `${hasProducts} && ${hasTitle} && ${hasPrice} && ${hasDate} && ${notLoading} = ${result}`);
  
  return result;
}

// Función para verificar localStorage
function checkLocalStorage() {
  console.log('\n📦 VERIFICANDO LOCALSTORAGE');
  console.log('=====================================');
  
  try {
    // Simular localStorage del navegador
    const mockLocalStorage = {
      data: {
        'products': JSON.stringify([
          {
            id: 1,
            name: 'Smirnoff',
            price: 2800,
            category: 'Licores',
            stock: 12,
            image: '/images/Smirnoff mas 2 speed.png',
            description: 'Smirnoff Vodka 750ml'
          }
        ])
      },
      getItem(key) {
        return this.data[key];
      }
    };
    
    const products = mockLocalStorage.getItem('products');
    console.log('📦 Productos en localStorage:', products ? 'SÍ' : 'NO');
    
    if (products) {
      const parsedProducts = JSON.parse(products);
      console.log('✅ Productos parseados:', parsedProducts.length, 'productos');
      console.log('📋 Primer producto:', parsedProducts[0]);
    } else {
      console.log('❌ NO HAY PRODUCTOS EN LOCALSTORAGE');
    }
    
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error('❌ Error verificando localStorage:', error);
    return [];
  }
}

// Función para simular la selección de productos
function simulateProductSelection() {
  console.log('\n🎯 SIMULANDO SELECCIÓN DE PRODUCTOS');
  console.log('=====================================');
  
  const products = checkLocalStorage();
  
  if (products.length === 0) {
    console.log('❌ No hay productos para seleccionar');
    return [];
  }
  
  const selectedProducts = [];
  
  // Simular selección del primer producto
  const product = products[0];
  console.log('🎯 Seleccionando producto:', product.name);
  
  const newComboProduct = {
    productId: product.id,
    productName: product.name,
    quantity: 1,
    price: product.price
  };
  
  selectedProducts.push(newComboProduct);
  console.log('✅ Producto agregado al combo:', newComboProduct);
  console.log('📊 Total de productos seleccionados:', selectedProducts.length);
  
  return selectedProducts;
}

// Función principal de diagnóstico
function runDiagnostic() {
  console.log('🚀 INICIANDO DIAGNÓSTICO COMPLETO\n');
  
  // 1. Verificar localStorage
  const products = checkLocalStorage();
  
  // 2. Simular selección de productos
  const selectedProducts = simulateProductSelection();
  
  // 3. Simular estado del formulario
  const { formData, loading } = simulateFormState();
  
  // 4. Validar formulario
  const isValid = isFormValid(formData, selectedProducts, loading);
  
  // 5. Resultado final
  console.log('\n🎯 DIAGNÓSTICO COMPLETO');
  console.log('=====================================');
  console.log('📦 Productos en localStorage:', products.length > 0 ? '✅ SÍ' : '❌ NO');
  console.log('🛍️ Productos seleccionados:', selectedProducts.length > 0 ? '✅ SÍ' : '❌ NO');
  console.log('📝 Formulario válido:', isValid ? '✅ SÍ' : '❌ NO');
  console.log('🔓 Botón desbloqueado:', isValid ? '✅ SÍ' : '❌ NO');
  
  if (!isValid) {
    console.log('\n🔧 PROBLEMAS IDENTIFICADOS:');
    console.log('=====================================');
    
    if (products.length === 0) {
      console.log('❌ PROBLEMA 1: No hay productos en localStorage');
      console.log('💡 SOLUCIÓN: Ve a /admin/products y crea productos primero');
    }
    
    if (selectedProducts.length === 0) {
      console.log('❌ PROBLEMA 2: No hay productos seleccionados');
      console.log('💡 SOLUCIÓN: Haz clic en un producto para seleccionarlo');
    }
    
    if (!formData.title.trim()) {
      console.log('❌ PROBLEMA 3: Título vacío');
      console.log('💡 SOLUCIÓN: Completa el campo "Título del Combo"');
    }
    
    if (!formData.finalPrice.trim()) {
      console.log('❌ PROBLEMA 4: Precio vacío');
      console.log('💡 SOLUCIÓN: Completa el campo "Precio del Combo"');
    }
    
    if (!formData.validUntil.trim()) {
      console.log('❌ PROBLEMA 5: Fecha vacía');
      console.log('💡 SOLUCIÓN: Selecciona una fecha en "Válido hasta"');
    }
    
    if (loading) {
      console.log('❌ PROBLEMA 6: Formulario cargando');
      console.log('💡 SOLUCIÓN: Espera a que termine la carga');
    }
  }
  
  console.log('\n🎯 INSTRUCCIONES PARA EL NAVEGADOR:');
  console.log('=====================================');
  console.log('1. Abre la página de crear ofertas en el navegador');
  console.log('2. Presiona F12 para abrir las herramientas de desarrollador');
  console.log('3. Ve a la pestaña "Console"');
  console.log('4. Busca mensajes que empiecen con:');
  console.log('   - 🔄 (carga de productos)');
  console.log('   - 📦 (localStorage)');
  console.log('   - 🎯 (selección de productos)');
  console.log('   - 🔍 (validación)');
  console.log('5. Si ves "❌", ese es tu problema');
  
  console.log('\n🚀 ¡DIAGNÓSTICO COMPLETADO!');
}

// Ejecutar diagnóstico
runDiagnostic();
