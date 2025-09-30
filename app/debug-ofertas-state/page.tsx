'use client'

import { useState, useEffect } from 'react'

export default function DebugOfertasState() {
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    const checkState = () => {
      const isAdmin = localStorage.getItem('isAdmin')
      const ofertas = localStorage.getItem('ofertas')
      const productos = localStorage.getItem('productos')
      
      setDebugInfo({
        isAdmin,
        isAdminBoolean: isAdmin === 'true',
        ofertas: ofertas ? JSON.parse(ofertas) : null,
        ofertasCount: ofertas ? JSON.parse(ofertas).length : 0,
        productos: productos ? JSON.parse(productos) : null,
        productosCount: productos ? JSON.parse(productos).length : 0,
        localStorageKeys: Object.keys(localStorage)
      })
    }
    
    checkState()
  }, [])

  const loadExampleOfertas = () => {
    const exampleOfertas = [
      {
        id: 1,
        title: "Combo Fernet + Coca",
        description: "Fernet Branca 750ml + 2 Coca Cola 2.25L",
        comboProducts: [
          { productId: 2, productName: "Fernet Branca 750ml", quantity: 1, price: 4500 },
          { productId: 1, productName: "Coca Cola 2.25L", quantity: 2, price: 1000 }
        ],
        finalPrice: 6500,
        image: "/images/fernetmas2cocas.jfif",
        category: "Combos",
        active: true,
        featured: true,
        priority: 5
      },
      {
        id: 2,
        title: "Combo Skyy + Speed",
        description: "Skyy Vodka + Speed XL",
        comboProducts: [
          { productId: 3, productName: "Skyy Vodka", quantity: 1, price: 9500 },
          { productId: 9, productName: "Speed XL", quantity: 1, price: 1500 }
        ],
        finalPrice: 10000,
        image: "/images/skyymasspeed.jfif",
        category: "Combos",
        active: true,
        featured: false,
        priority: 3
      }
    ]
    
    localStorage.setItem('ofertas', JSON.stringify(exampleOfertas))
    window.location.reload()
  }

  const setAdmin = () => {
    localStorage.setItem('isAdmin', 'true')
    window.location.reload()
  }

  const clearAll = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Debug Estado de Ofertas</h1>
        
        <div className="space-y-6">
          {/* Estado actual */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Estado Actual</h2>
            <pre className="text-sm text-gray-700 overflow-auto">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>

          {/* Acciones */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Acciones</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={setAdmin}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg"
              >
                Establecer como Admin
              </button>
              
              <button
                onClick={loadExampleOfertas}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg"
              >
                Cargar Ofertas de Ejemplo
              </button>
              
              <button
                onClick={clearAll}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg"
              >
                Limpiar Todo
              </button>
            </div>
          </div>

          {/* Enlaces */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Enlaces de Prueba</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/ofertas"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg text-center"
              >
                Ir a Ofertas
              </a>
              
              <a
                href="/admin/ofertas/new"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg text-center"
              >
                Crear Nueva Oferta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
