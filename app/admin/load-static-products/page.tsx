'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'

export default function LoadStaticProducts() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const staticProducts = [
    {
      id: 1,
      name: "Coca Cola 2.25L",
      price: 2500,
      category: "Bebidas",
      stock: 50,
      image: "/images/cocacola.jfif",
      description: "Refresco clásico de Coca Cola"
    },
    {
      id: 2,
      name: "Fernet Branca 750ml",
      price: 4500,
      category: "Licores",
      stock: 30,
      image: "/images/fernet750.jfif",
      description: "Fernet italiano de alta calidad"
    },
    {
      id: 3,
      name: "Skyy Vodka 750ml",
      price: 3800,
      category: "Licores",
      stock: 25,
      image: "/images/skyy.png",
      description: "Vodka premium americano"
    },
    {
      id: 4,
      name: "Smirnoff Vodka 750ml",
      price: 3500,
      category: "Licores",
      stock: 20,
      image: "/images/Smirnoffsolo.jpeg",
      description: "Vodka ruso premium"
    },
    {
      id: 5,
      name: "Pritty Limón 2.25L",
      price: 1200,
      category: "Bebidas",
      stock: 40,
      image: "/images/pritty2250.jfif",
      description: "Gaseosa sabor limón"
    },
    {
      id: 6,
      name: "Pritty Limón 3L",
      price: 1800,
      category: "Bebidas",
      stock: 30,
      image: "/images/prittyde3lts.webp",
      description: "Gaseosa sabor limón 3 litros"
    },
    {
      id: 7,
      name: "Coca Cola Descartable 500ml",
      price: 800,
      category: "Bebidas",
      stock: 60,
      image: "/images/cocadescartable.jpg",
      description: "Coca Cola en botella descartable"
    },
    {
      id: 8,
      name: "Speed XL",
      price: 1500,
      category: "Bebidas",
      stock: 40,
      image: "/images/SpeedXL.webp",
      description: "Bebida energética XL"
    },
    {
      id: 9,
      name: "DU Renaissance",
      price: 5000,
      category: "Vinos",
      stock: 15,
      image: "/images/DURenaissance.jfif",
      description: "Vino DU Renaissance"
    },
    {
      id: 10,
      name: "Vino Toro 750ml",
      price: 2200,
      category: "Vinos",
      stock: 25,
      image: "/images/vinotoro.jfif",
      description: "Vino Toro tinto 750ml"
    },
    {
      id: 11,
      name: "Vino Viña de Balbo Tinto",
      price: 2200,
      category: "Vinos",
      stock: 25,
      image: "/images/balbomaspritty.png",
      description: "Vino tinto premium"
    },
    {
      id: 12,
      name: "Gancia",
      price: 8000,
      category: "Aperitivos",
      stock: 18,
      image: "/images/Gancia.jfif",
      description: "Gancia aperitivo"
    }
  ]

  const loadProducts = () => {
    setLoading(true)
    setMessage('')

    try {
      // Verificar si el admin está logueado
      if (!auth.isLoggedIn()) {
        router.push('/admin')
        return
      }

      // Cargar productos existentes
      const existingProducts = localStorage.getItem('products')
      let currentProducts = existingProducts ? JSON.parse(existingProducts) : []

      // Agregar productos estáticos que no existan
      let addedCount = 0
      staticProducts.forEach(staticProduct => {
        const exists = currentProducts.some((p: any) => p.id === staticProduct.id)
        if (!exists) {
          currentProducts.push(staticProduct)
          addedCount++
        }
      })

      // Guardar en localStorage
      localStorage.setItem('products', JSON.stringify(currentProducts))

      setMessage(`✅ Se cargaron ${addedCount} productos nuevos. Total: ${currentProducts.length} productos.`)
    } catch (error) {
      setMessage('❌ Error al cargar productos: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const clearProducts = () => {
    if (confirm('¿Estás seguro de que quieres eliminar TODOS los productos?')) {
      localStorage.removeItem('products')
      setMessage('🗑️ Todos los productos han sido eliminados.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🔄 Cargar Productos Estáticos</h1>
            <p className="text-gray-600">Sincroniza los productos estáticos con el panel de administración</p>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">📋 Productos que se cargarán:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {staticProducts.map(product => (
                  <div key={product.id} className="flex items-center space-x-3 bg-white rounded-lg p-3">
                    <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                    <div>
                      <div className="font-medium text-gray-800">{product.name}</div>
                      <div className="text-sm text-gray-500">${product.price.toLocaleString()} - {product.category}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={loadProducts}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Cargando...
                  </>
                ) : (
                  <>
                    📥 Cargar Productos
                  </>
                )}
              </button>

              <button
                onClick={clearProducts}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                🗑️ Limpiar Todo
              </button>
            </div>

            {message && (
              <div className={`p-4 rounded-xl text-center font-medium ${
                message.includes('✅') ? 'bg-green-100 text-green-800' : 
                message.includes('❌') ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {message}
              </div>
            )}

            <div className="text-center">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-violet-600 hover:bg-violet-700 transition-all duration-300"
              >
                ← Volver al Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
