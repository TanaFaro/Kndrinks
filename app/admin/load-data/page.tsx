'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'

export default function LoadData() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = auth.isLoggedIn()
    if (!isLoggedIn) {
      router.push('/admin')
      return
    }
  }, [router])

  const loadProductsToAPI = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      // Productos base que siempre estarán disponibles
      const baseProducts = [
        {
          name: "Fernet BRANCA",
          price: 13500,
          category: "Aperitivos",
          stock: 6,
          image: "/images/fernet750.jfif",
          description: "Fernet italiano de alta calidad"
        },
        {
          name: "Skyy saborizado",
          price: 9500,
          category: "Licores",
          stock: 12,
          image: "/images/skyy.png",
          description: "Vodka premium americano"
        },
        {
          name: "Smirnoff Saborizado",
          price: 8000,
          category: "Licores",
          stock: 12,
          image: "/images/Smirnoffsolo.jpeg",
          description: "Vodka ruso premium"
        },
        {
          name: "Gancia",
          price: 8000,
          category: "Aperitivos",
          stock: 6,
          image: "/images/Gancia.jfif",
          description: "Aperitivo italiano clásico"
        }
      ]

      // Cargar cada producto en la API
      for (const product of baseProducts) {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product)
        })
        
        if (!response.ok) {
          throw new Error(`Error cargando ${product.name}`)
        }
      }

      setMessage('✅ Productos base cargados correctamente en la API')
    } catch (error) {
      setMessage('❌ Error: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const loadOffersToAPI = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      // Ofertas base que siempre estarán disponibles
      const baseOffers = [
        {
          title: "Fernet + 2 Cocas",
          description: "Fernet BRANCA 750ml + 2 Coca Cola 2.25L",
          comboProducts: [
            { name: "Fernet BRANCA", quantity: 1, price: 13500 },
            { name: "Coca Cola 2.25L", quantity: 2, price: 4200 }
          ],
          finalPrice: 21900,
          image: "/images/fernetmas2cocas.jfif",
          category: "Combos",
          active: true,
          priority: 5
        }
      ]

      // Cargar cada oferta en la API
      for (const offer of baseOffers) {
        const response = await fetch('/api/offers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(offer)
        })
        
        if (!response.ok) {
          throw new Error(`Error cargando ${offer.title}`)
        }
      }

      setMessage('✅ Ofertas base cargadas correctamente en la API')
    } catch (error) {
      setMessage('❌ Error: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const loadAllData = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      await loadProductsToAPI()
      await new Promise(resolve => setTimeout(resolve, 1000)) // Esperar 1 segundo
      await loadOffersToAPI()
      setMessage('✅ Todos los datos base cargados correctamente')
    } catch (error) {
      setMessage('❌ Error: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cargar Datos Base</h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Esta página te permite cargar los productos y ofertas base en la API. 
            Úsala cuando la lista se vacíe después de un deploy de Vercel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={loadProductsToAPI}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Cargando...' : '📦 Cargar Productos'}
          </button>
          
          <button
            onClick={loadOffersToAPI}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Cargando...' : '🎁 Cargar Ofertas'}
          </button>
          
          <button
            onClick={loadAllData}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Cargando...' : '🚀 Cargar Todo'}
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="flex justify-between">
          <Link 
            href="/admin" 
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            ← Volver al Admin
          </Link>
          
          <Link 
            href="/admin/items" 
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Ver Productos →
          </Link>
        </div>
      </div>
    </div>
  )
}
