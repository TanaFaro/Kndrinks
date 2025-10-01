// Utilidades para sincronización móvil y manejo de errores

export interface SyncData {
  products: any[]
  ofertas: any[]
  lastSync: number
}

// Función para verificar si localStorage está funcionando
export function isLocalStorageWorking(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false
    }
    
    const testKey = 'test_' + Date.now()
    const testValue = 'test'
    
    localStorage.setItem(testKey, testValue)
    const retrieved = localStorage.getItem(testKey)
    localStorage.removeItem(testKey)
    
    return retrieved === testValue
  } catch (error) {
    console.error('❌ localStorage no funciona:', error)
    return false
  }
}

// Función para obtener datos con fallback
export function getDataWithFallback(): Promise<SyncData> {
  return new Promise((resolve) => {
    try {
      // Intentar cargar desde localStorage primero
      if (isLocalStorageWorking()) {
        const products = localStorage.getItem('products')
        const ofertas = localStorage.getItem('ofertas')
        
        let parsedProducts: any[] = []
        let parsedOfertas: any[] = []
        
        try {
          if (products) {
            parsedProducts = JSON.parse(products)
            if (!Array.isArray(parsedProducts)) {
              console.warn('⚠️ Productos no es un array válido, usando array vacío')
              parsedProducts = []
            }
          }
        } catch (e) {
          console.error('❌ Error parseando productos:', e)
          parsedProducts = []
        }
        
        try {
          if (ofertas) {
            parsedOfertas = JSON.parse(ofertas)
            if (!Array.isArray(parsedOfertas)) {
              console.warn('⚠️ Ofertas no es un array válido, usando array vacío')
              parsedOfertas = []
            }
          }
        } catch (e) {
          console.error('❌ Error parseando ofertas:', e)
          parsedOfertas = []
        }
        
        const result: SyncData = {
          products: parsedProducts,
          ofertas: parsedOfertas,
          lastSync: Date.now()
        }
        
        console.log('✅ Datos cargados desde localStorage:', {
          products: parsedProducts.length,
          ofertas: parsedOfertas.length
        })
        resolve(result)
        return
      }
      
      // Si localStorage no funciona, usar arrays vacíos
      console.warn('⚠️ localStorage no funciona, usando arrays vacíos')
      
      const emptyData: SyncData = {
        products: [],
        ofertas: [],
        lastSync: Date.now()
      }
      
      resolve(emptyData)
      
    } catch (error) {
      console.error('❌ Error cargando datos:', error)
      resolve({
        products: [],
        ofertas: [],
        lastSync: Date.now()
      })
    }
  })
}

// Función para detectar el tipo de dispositivo
export function getDeviceInfo() {
  const userAgent = navigator.userAgent
  const platform = navigator.platform
  
  return {
    isIOS: /iPad|iPhone|iPod/.test(userAgent),
    isAndroid: /Android/.test(userAgent),
    isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
    isChrome: /Chrome/.test(userAgent),
    platform,
    userAgent
  }
}

// Función para diagnosticar problemas
export function diagnoseMobileIssues() {
  const deviceInfo = getDeviceInfo()
  const localStorageWorking = isLocalStorageWorking()
  
  const diagnosis = {
    device: deviceInfo,
    localStorage: {
      available: typeof window !== 'undefined' && !!window.localStorage,
      working: localStorageWorking
    },
    memory: 'memory' in performance ? (performance as any).memory : null,
    connection: 'connection' in navigator ? (navigator as any).connection : null,
    timestamp: Date.now()
  }
  
  console.log('🔍 Diagnóstico móvil:', diagnosis)
  return diagnosis
}

// Función para limpiar y reinicializar datos
export function resetData() {
  try {
    if (isLocalStorageWorking()) {
      localStorage.removeItem('products')
      localStorage.removeItem('ofertas')
      console.log('✅ Datos limpiados')
      return true
    }
    return false
  } catch (error) {
    console.error('❌ Error limpiando datos:', error)
    return false
  }
}
