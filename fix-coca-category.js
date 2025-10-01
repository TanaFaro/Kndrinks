// Script para corregir la categoría de Coca Cola en localStorage
// Ejecutar en la consola del navegador

console.log('🔧 Iniciando corrección de categoría de Coca Cola...')

// Obtener productos del localStorage
const savedProducts = localStorage.getItem('products')
if (savedProducts) {
  const products = JSON.parse(savedProducts)
  console.log('📦 Productos encontrados:', products.length)
  
  // Buscar y corregir Coca Cola de 2.25L
  let corrected = false
  const correctedProducts = products.map(product => {
    if (product.name && product.name.includes('Coca-cola x 2.25') && product.category === 'Licores') {
      console.log('🍾 Producto encontrado para corregir:', product.name)
      console.log('❌ Categoría actual:', product.category)
      corrected = true
      return {
        ...product,
        category: 'Sin Alcohol'
      }
    }
    return product
  })
  
  if (corrected) {
    // Guardar productos corregidos
    localStorage.setItem('products', JSON.stringify(correctedProducts))
    console.log('✅ Categoría de Coca Cola corregida a "Sin Alcohol"')
    console.log('💾 Productos guardados en localStorage')
    
    // Recargar la página para ver los cambios
    console.log('🔄 Recargando página...')
    window.location.reload()
  } else {
    console.log('ℹ️ No se encontró Coca Cola con categoría "Licores"')
  }
} else {
  console.log('❌ No se encontraron productos en localStorage')
}

console.log('🏁 Corrección completada')
