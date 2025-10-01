'use client'

import { useState, useEffect } from 'react'

export default function Check() {
  const [data, setData] = useState<any>({})

  useEffect(() => {
    try {
      const products = localStorage.getItem('products')
      const ofertas = localStorage.getItem('ofertas')
      
      setData({
        products: products ? JSON.parse(products) : [],
        ofertas: ofertas ? JSON.parse(ofertas) : []
      })
    } catch (error) {
      setData({ error: error instanceof Error ? error.message : String(error) })
    }
  }, [])

  const fixCoca = () => {
    try {
      const products = localStorage.getItem('products')
      if (products) {
        const parsed = JSON.parse(products)
        const fixed = parsed.map((p: any) => 
          p.name?.includes('Coca-cola x 2.25') && p.category === 'Licores' 
            ? { ...p, category: 'Sin Alcohol' }
            : p
        )
        localStorage.setItem('products', JSON.stringify(fixed))
        setData((prev: any) => ({ ...prev, products: fixed }))
        alert('✅ Coca Cola corregida')
      }
    } catch (error) {
      alert('❌ Error: ' + error)
    }
  }

  const fixPrices = () => {
    try {
      const products = localStorage.getItem('products')
      if (products) {
        const parsed = JSON.parse(products)
        const fixed = parsed.map((p: any) => {
          // Corregir precios específicos
          if (p.name?.includes('Coca-cola x 2.25') && p.price === 2500) {
            return { ...p, price: 4200 }
          }
          if (p.name?.includes('Fernet') && p.price === 4500) {
            return { ...p, price: 13500 }
          }
          if (p.name?.includes('Smirnoff') && p.price === 3800) {
            return { ...p, price: 8000 }
          }
          if (p.name?.includes('Skyy') && p.price === 3800) {
            return { ...p, price: 9500 }
          }
          return p
        })
        localStorage.setItem('products', JSON.stringify(fixed))
        setData((prev: any) => ({ ...prev, products: fixed }))
        alert('✅ Precios corregidos: Coca Cola $4,200, Fernet $13,500, Smirnoff $8,000, Skyy $9,500')
      }
    } catch (error) {
      alert('❌ Error: ' + error)
    }
  }

  const fixAllData = () => {
    try {
      const products = localStorage.getItem('products')
      if (products) {
        const parsed = JSON.parse(products)
        const fixed = parsed.map((p: any) => {
          // Corregir precios específicos
          if (p.name?.includes('Coca-cola x 2.25')) {
            return { 
              ...p, 
              price: 4200, 
              category: 'Sin Alcohol',
              image: '/images/cocacola.jfif'
            }
          }
          if (p.name?.includes('Fernet')) {
            return { 
              ...p, 
              price: 13500,
              image: '/images/fernet750.jfif'
            }
          }
          if (p.name?.includes('Smirnoff')) {
            return { 
              ...p, 
              price: 8000,
              image: '/images/Smirnoffsolo.jpeg'
            }
          }
          if (p.name?.includes('Skyy')) {
            return { 
              ...p, 
              price: 9500,
              image: '/images/skyy.png'
            }
          }
          return p
        })
        localStorage.setItem('products', JSON.stringify(fixed))
        setData((prev: any) => ({ ...prev, products: fixed }))
        alert('✅ Datos corregidos: Precios, categorías e imágenes actualizadas')
      }
    } catch (error) {
      alert('❌ Error: ' + error)
    }
  }

  const clearAndResetProducts = () => {
    try {
      // Limpiar localStorage de productos
      localStorage.removeItem('products')
      
      // Crear productos correctos desde cero
      const correctProducts = [
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
        },
        {
          id: 3,
          name: "Smirnoff Saborizado",
          price: 8000,
          category: "Licores",
          stock: 12,
          image: "/images/Smirnoffsolo.jpeg",
          description: "Vodka ruso premium"
        },
        {
          id: 4,
          name: "Gancia",
          price: 8000,
          category: "Aperitivos",
          stock: 6,
          image: "/images/Gancia.jfif",
          description: "Aperitivo italiano clásico"
        },
        {
          id: 5,
          name: "Coca-cola x 2.25 lt",
          price: 4200,
          category: "Sin Alcohol",
          stock: 12,
          image: "/images/cocacola.jfif",
          description: "Refresco clásico de Coca Cola"
        },
        {
          id: 6,
          name: "Speed XL",
          price: 2800,
          category: "Sin Alcohol",
          stock: 12,
          image: "/images/SpeedXL.webp",
          description: "Bebida energética"
        }
      ]
      
      // Guardar productos correctos
      localStorage.setItem('products', JSON.stringify(correctProducts))
      setData((prev: any) => ({ ...prev, products: correctProducts }))
      alert('✅ Productos limpiados y restablecidos con precios correctos')
    } catch (error) {
      alert('❌ Error: ' + error)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🔍 Verificar Datos</h1>
      
      <div className="mb-6">
        <button 
          onClick={fixCoca}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
        >
          🍾 Corregir Coca Cola
        </button>
        <button 
          onClick={fixPrices}
          className="bg-red-600 text-white px-4 py-2 rounded mr-4"
        >
          💰 Corregir Precios
        </button>
        <button 
          onClick={fixAllData}
          className="bg-purple-600 text-white px-4 py-2 rounded mr-4"
        >
          🔧 Corregir Todo
        </button>
        <button 
          onClick={clearAndResetProducts}
          className="bg-orange-600 text-white px-4 py-2 rounded mr-4"
        >
          🗑️ Limpiar y Restablecer
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          🔄 Recargar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">📦 Productos ({data.products?.length || 0})</h2>
          <div className="max-h-96 overflow-y-auto">
            {data.products?.map((p: any, i: number) => (
              <div key={i} className="border-b py-2">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-600">
                  <span className={`px-2 py-1 rounded text-xs ${
                    p.category === 'Sin Alcohol' ? 'bg-green-100 text-green-800' :
                    p.category === 'Licores' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {p.category}
                  </span>
                  <span className="ml-2 font-bold text-blue-600">${p.price?.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">🎁 Ofertas ({data.ofertas?.length || 0})</h2>
          <div className="max-h-96 overflow-y-auto">
            {data.ofertas?.map((o: any, i: number) => (
              <div key={i} className="border-b py-2">
                <div className="font-semibold">{o.title}</div>
                <div className="text-sm text-gray-600">
                  <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
                    {o.category}
                  </span>
                  <span className="ml-2 font-bold text-blue-600">${o.finalPrice?.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {data.error && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {data.error}
        </div>
      )}
    </div>
  )
}
