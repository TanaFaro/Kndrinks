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
        
        const result: SyncData = {
          products: products ? JSON.parse(products) : [],
          ofertas: ofertas ? JSON.parse(ofertas) : [],
          lastSync: Date.now()
        }
        
        console.log('✅ Datos cargados desde localStorage')
        resolve(result)
        return
      }
      
      // Si localStorage no funciona, intentar cargar datos por defecto
      console.warn('⚠️ localStorage no funciona, usando datos por defecto')
      
      // Datos por defecto para casos de emergencia
      const defaultData: SyncData = {
        products: [
          {
            id: 1,
            name: "Fernet BRANCA",
            price: 13500,
            category: "Aperitivos",
            stock: 6,
            image: "/images/fernet750.jfif",
            description: "Fernet italiano de alta calidad"
          },
          {
            id: 2,
            name: "Skyy saborizado",
            price: 9500,
            category: "Licores",
            stock: 12,
            image: "/images/skyy.png",
            description: "Vodka premium americano"
          }
        ],
        ofertas: [],
        lastSync: Date.now()
      }
      
      resolve(defaultData)
      
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
