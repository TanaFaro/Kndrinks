console.log('🔍 VERIFICANDO LOCALSTORAGE REAL DEL NAVEGADOR\n');

console.log('📋 INSTRUCCIONES:');
console.log('=====================================');
console.log('1. Abre tu navegador y ve a la página de crear ofertas');
console.log('2. Presiona F12 para abrir las herramientas de desarrollador');
console.log('3. Ve a la pestaña "Console"');
console.log('4. Copia y pega este código en la consola:');
console.log('');

const testCode = `
// Verificar localStorage
console.log('🔍 VERIFICANDO LOCALSTORAGE...');

// 1. Verificar si hay productos
const products = localStorage.getItem('products');
console.log('📦 Productos en localStorage:', products ? 'SÍ' : 'NO');

if (products) {
  try {
    const parsedProducts = JSON.parse(products);
    console.log('✅ Productos parseados:', parsedProducts);
    console.log('📊 Cantidad de productos:', parsedProducts.length);
    
    if (parsedProducts.length > 0) {
      console.log('📋 Primer producto:', parsedProducts[0]);
    }
  } catch (error) {
    console.error('❌ Error parseando productos:', error);
  }
} else {
  console.log('❌ NO HAY PRODUCTOS EN LOCALSTORAGE');
  console.log('💡 SOLUCIÓN: Ve a /admin/products y crea productos primero');
}

// 2. Verificar si hay ofertas
const ofertas = localStorage.getItem('ofertas');
console.log('🎯 Ofertas en localStorage:', ofertas ? 'SÍ' : 'NO');

if (ofertas) {
  try {
    const parsedOfertas = JSON.parse(ofertas);
    console.log('✅ Ofertas parseadas:', parsedOfertas);
    console.log('📊 Cantidad de ofertas:', parsedOfertas.length);
  } catch (error) {
    console.error('❌ Error parseando ofertas:', error);
  }
}

// 3. Simular la función isFormValid
function testIsFormValid() {
  const formData = {
    title: 'Smirnoff',
    finalPrice: '14500',
    validUntil: '2025-10-05'
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
  
  const hasProducts = selectedProducts.length > 0;
  const hasTitle = formData.title.trim() !== '';
  const hasPrice = formData.finalPrice.trim() !== '';
  const hasDate = formData.validUntil.trim() !== '';
  const notLoading = !loading;
  
  console.log('\\n🔍 PRUEBA DE VALIDACIÓN:');
  console.log('=====================================');
  console.log('✅ hasProducts:', hasProducts, \`(\${selectedProducts.length} productos)\`);
  console.log('✅ hasTitle:', hasTitle, \`("\${formData.title}")\`);
  console.log('✅ hasPrice:', hasPrice, \`("\${formData.finalPrice}")\`);
  console.log('✅ hasDate:', hasDate, \`("\${formData.validUntil}")\`);
  console.log('✅ notLoading:', notLoading, \`(\${loading})\`);
  
  const result = hasProducts && hasTitle && hasPrice && hasDate && notLoading;
  console.log('\\n🎯 RESULTADO:', result);
  console.log('🔢 Cálculo:', \`\${hasProducts} && \${hasTitle} && \${hasPrice} && \${hasDate} && \${notLoading} = \${result}\`);
  
  return result;
}

// 4. Ejecutar prueba
testIsFormValid();

// 5. Verificar estado del botón
const button = document.querySelector('button[type="submit"]');
if (button) {
  console.log('\\n🔘 ESTADO DEL BOTÓN:');
  console.log('=====================================');
  console.log('✅ Botón encontrado:', button.textContent?.trim());
  console.log('🔒 Botón deshabilitado:', button.disabled);
  console.log('🎨 Clases CSS:', button.className);
} else {
  console.log('\\n❌ BOTÓN NO ENCONTRADO');
}

console.log('\\n🚀 ¡VERIFICACIÓN COMPLETADA!');
`;

console.log(testCode);
console.log('\n🎯 PASOS ADICIONALES:');
console.log('=====================================');
console.log('5. Después de ejecutar el código, verifica:');
console.log('   - Si hay productos en localStorage');
console.log('   - Si la validación retorna true');
console.log('   - Si el botón está deshabilitado');
console.log('6. Si el botón sigue bloqueado, el problema está en React');
console.log('7. Si no hay productos, crea algunos primero');

console.log('\n🔧 SOLUCIONES POSIBLES:');
console.log('=====================================');
console.log('• PROBLEMA 1: No hay productos → Ve a /admin/products');
console.log('• PROBLEMA 2: Productos no se cargan → Recarga la página');
console.log('• PROBLEMA 3: Validación falla → Verifica los campos');
console.log('• PROBLEMA 4: React no actualiza → Limpia caché del navegador');
console.log('• PROBLEMA 5: Estado no sincroniza → Verifica la consola');

console.log('\n🚀 ¡LISTO PARA PROBAR!');
