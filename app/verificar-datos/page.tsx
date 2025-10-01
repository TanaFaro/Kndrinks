'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VerificarDatos() {
  const [products, setProducts] = useState<any[]>([])
  const [ofertas, setOfertas] = useState<any[]>([])
  const [status, setStatus] = useState('Cargando...')
  const router = useRouter()

  // Forzar redeploy v3.11

  useEffect(() => {
    const loadData = () => {
      try {
        // Cargar productos
        const savedProducts = localStorage.getItem('products')
        const productsData = savedProducts ? JSON.parse(savedProducts) : []
        setProducts(productsData)

        // Cargar ofertas
        const savedOfertas = localStorage.getItem('ofertas')
        const ofertasData = savedOfertas ? JSON.parse(savedOfertas) : []
        setOfertas(ofertasData)

        setStatus(`Productos: ${productsData.length}, Ofertas: ${ofertasData.length}`)
      } catch (error) {
        setStatus(`Error: ${error}`)
      }
    }

    loadData()
  }, [])

  const fixCocaCategory = () => {
    try {
      const updatedProducts = products.map(product => {
        if (product.name && product.name.includes('Coca-cola x 2.25') && product.category === 'Licores') {
          return { ...product, category: 'Sin Alcohol' }
        }
        return product
      })

      localStorage.setItem('products', JSON.stringify(updatedProducts))
      setProducts(updatedProducts)
      setStatus('✅ Categoría de Coca Cola corregida')
    } catch (error) {
      setStatus(`❌ Error: ${error}`)
    }
  }

  const clearAllData = () => {
    try {
      localStorage.removeItem('products')
      localStorage.removeItem('ofertas')
      setProducts([])
      setOfertas([])
      setStatus('🗑️ Todos los datos limpiados')
    } catch (error) {
      setStatus(`❌ Error: ${error}`)
    }
  }

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🔍 Verificar Datos</h1>
          <p className="text-gray-600 mb-4">Estado: {status}</p>
          
          <div className="flex gap-4 mb-6">
            <button
              onClick={fixCocaCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              🍾 Corregir Coca Cola
            </button>
            <button
              onClick={clearAllData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🗑️ Limpiar Todo
            </button>
            <button
              onClick={reloadPage}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              🔄 Recargar
            </button>
          </div>
        </div>

        {/* Productos */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📦 Productos ({products.length})</h2>
          <div className="max-h-96 overflow-y-auto">
            {products.map((product, index) => (
              <div key={index} className="border-b border-gray-200 py-3 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className={`px-2 py-1 rounded ${
                        product.category === 'Sin Alcohol' ? 'bg-green-100 text-green-800' :
                        product.category === 'Licores' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {product.category}
                      </span>
                      <span className="text-violet-600 font-bold">${product.price?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ofertas */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎁 Ofertas ({ofertas.length})</h2>
          <div className="max-h-96 overflow-y-auto">
            {ofertas.map((oferta, index) => (
              <div key={index} className="border-b border-gray-200 py-3 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{oferta.title}</h3>
                    <p className="text-sm text-gray-600">{oferta.description}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="px-2 py-1 rounded bg-purple-100 text-purple-800">
                        {oferta.category}
                      </span>
                      <span className="text-violet-600 font-bold">${oferta.finalPrice?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
