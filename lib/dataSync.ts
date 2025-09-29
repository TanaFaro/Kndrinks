/**
 * Utilidades para sincronizar datos entre páginas
 */

// Función para notificar cambios en los datos
export function notifyDataChange() {
  if (typeof window !== 'undefined') {
    console.log('📢 Notificando cambio de datos a todas las páginas...')
    window.dispatchEvent(new CustomEvent('dataUpdated'))
  }
}

// Función para guardar productos y notificar cambios
export function saveProducts(products: any[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('products', JSON.stringify(products))
    notifyDataChange()
    console.log('💾 Productos guardados y notificados')
  }
}

// Función para guardar ofertas y notificar cambios
export function saveOfertas(ofertas: any[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ofertas', JSON.stringify(ofertas))
    notifyDataChange()
    console.log('💾 Ofertas guardadas y notificadas')
  }
}

// Función para obtener productos
export function getProducts(): any[] {
  if (typeof window === 'undefined') return []
  
  try {
    const saved = localStorage.getItem('products')
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error getting products:', error)
    return []
  }
}

// Función para obtener ofertas
export function getOfertas(): any[] {
  if (typeof window === 'undefined') return []
  
  try {
    const saved = localStorage.getItem('ofertas')
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error getting ofertas:', error)
    return []
  }
}
