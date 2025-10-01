'use client'

import { useState, useEffect } from 'react'

export default function DebugMobile() {
  const [debugInfo, setDebugInfo] = useState<any>({})
  const [localStorageData, setLocalStorageData] = useState<any>({})
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    const runDiagnostics = () => {
      const info: any = {}
      const errorsList: string[] = []

      try {
        // Información del navegador
        info.userAgent = navigator.userAgent
        info.platform = navigator.platform
        info.cookieEnabled = navigator.cookieEnabled
        info.onLine = navigator.onLine
        
        // Información de localStorage
        try {
          info.localStorageSupported = typeof Storage !== 'undefined'
          info.localStorageAvailable = !!window.localStorage
          
          if (window.localStorage) {
            // Probar escritura y lectura
            const testKey = 'debug_test_' + Date.now()
            const testValue = 'test_value'
            
            try {
              localStorage.setItem(testKey, testValue)
              const retrieved = localStorage.getItem(testKey)
              localStorage.removeItem(testKey)
              
              info.localStorageWorking = retrieved === testValue
            } catch (e) {
              info.localStorageWorking = false
              errorsList.push(`Error en localStorage: ${e}`)
            }
            
            // Verificar datos existentes
            const products = localStorage.getItem('products')
            const ofertas = localStorage.getItem('ofertas')
            
            info.productsExists = !!products
            info.ofertasExists = !!ofertas
            
            if (products) {
              try {
                const parsedProducts = JSON.parse(products)
                info.productsCount = parsedProducts.length
                info.productsValid = Array.isArray(parsedProducts)
                setLocalStorageData((prev: any) => ({ ...prev, products: parsedProducts }))
              } catch (e) {
                info.productsValid = false
                errorsList.push(`Error parseando productos: ${e}`)
              }
            }
            
            if (ofertas) {
              try {
                const parsedOfertas = JSON.parse(ofertas)
                info.ofertasCount = parsedOfertas.length
                info.ofertasValid = Array.isArray(parsedOfertas)
                setLocalStorageData((prev: any) => ({ ...prev, ofertas: parsedOfertas }))
              } catch (e) {
                info.ofertasValid = false
                errorsList.push(`Error parseando ofertas: ${e}`)
              }
            }
          }
        } catch (e) {
          errorsList.push(`Error accediendo localStorage: ${e}`)
        }
        
        // Información de pantalla
        info.screenWidth = window.screen.width
        info.screenHeight = window.screen.height
        info.innerWidth = window.innerWidth
        info.innerHeight = window.innerHeight
        info.devicePixelRatio = window.devicePixelRatio
        
        // Información de memoria (si está disponible)
        if ('memory' in performance) {
          info.memory = (performance as any).memory
        }
        
        // Información de conexión (si está disponible)
        if ('connection' in navigator) {
          info.connection = (navigator as any).connection
        }
        
      } catch (e) {
        errorsList.push(`Error general: ${e}`)
      }
      
      setDebugInfo(info)
      setErrors(errorsList)
    }

    runDiagnostics()
  }, [])

  const clearData = () => {
    try {
      localStorage.removeItem('products')
      localStorage.removeItem('ofertas')
      setLocalStorageData({})
      alert('Datos limpiados. Recarga la página.')
    } catch (e) {
      alert(`Error limpiando datos: ${e}`)
    }
  }

  const reloadData = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🔍 Debug Móvil</h1>
          <p className="text-gray-600 mb-6">
            Herramienta para diagnosticar problemas de compatibilidad entre dispositivos
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={reloadData}
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
            >
              🔄 Recargar
            </button>
            <button
              onClick={clearData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🗑️ Limpiar Datos
            </button>
          </div>
        </div>

        {/* Errores */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Errores Detectados</h3>
            <ul className="list-disc list-inside text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Información del dispositivo */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📱 Información del Dispositivo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(debugInfo).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium text-gray-600">{key}:</span>
                <span className={`text-sm ${
                  typeof value === 'boolean' 
                    ? value ? 'text-green-600' : 'text-red-600'
                    : 'text-gray-800'
                }`}>
                  {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Datos de localStorage */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💾 Datos de localStorage</h3>
          
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Productos ({localStorageData.products?.length || 0})</h4>
            {localStorageData.products ? (
              <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded-lg">
                <pre className="text-xs text-gray-600">
                  {JSON.stringify(localStorageData.products, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-gray-500">No hay productos cargados</p>
            )}
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Ofertas ({localStorageData.ofertas?.length || 0})</h4>
            {localStorageData.ofertas ? (
              <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded-lg">
                <pre className="text-xs text-gray-600">
                  {JSON.stringify(localStorageData.ofertas, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-gray-500">No hay ofertas cargadas</p>
            )}
          </div>
        </div>

        {/* Instrucciones */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">📋 Instrucciones</h3>
          <ol className="list-decimal list-inside text-blue-700 space-y-1">
            <li>Comparte esta información con el desarrollador</li>
            <li>Si hay errores, intenta limpiar los datos y recargar</li>
            <li>Verifica que localStorage esté funcionando correctamente</li>
            <li>Si el problema persiste, puede ser un problema de memoria o compatibilidad</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
