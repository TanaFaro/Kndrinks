'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { ComboProduct, Oferta } from '@/lib/types'

// Función para convertir prioridad a estrellas
const getPriorityStars = (priority?: number): string => {
  if (!priority) return ''
  
  if (priority >= 5) return '⭐⭐⭐⭐⭐'
  if (priority >= 4) return '⭐⭐⭐⭐'
  if (priority >= 3) return '⭐⭐⭐'
  if (priority >= 2) return '⭐⭐'
  return '⭐'
}

// Función para obtener el texto de popularidad
const getPopularityText = (priority?: number): string => {
  if (!priority) return ''
  
  if (priority >= 5) return 'MÁS PEDIDO'
  if (priority >= 4) return 'MUY POPULAR'
  if (priority >= 3) return 'POPULAR'
  if (priority >= 2) return 'RECOMENDADO'
  return 'NUEVO'
}

export default function Ofertas() {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    const loadOfertas = () => {
      try {
        const savedOfertas = localStorage.getItem('ofertas')
        if (savedOfertas) {
          const parsedOfertas: Oferta[] = JSON.parse(savedOfertas)
          console.log('📦 Ofertas cargadas desde localStorage:', parsedOfertas)
          setOfertas(parsedOfertas)
        } else {
          console.log('⚠️ No hay ofertas guardadas')
          setOfertas([])
        }
      } catch (error) {
        console.error('❌ Error cargando ofertas:', error)
        setOfertas([])
      } finally {
        setLoading(false)
      }
    }

    loadOfertas()
  }, [])

  useEffect(() => {
    const isAdminUser = localStorage.getItem('isAdmin') === 'true'
    setIsAdmin(isAdminUser)
  }, [])

  const handleAddToCart = (oferta: Oferta) => {
    addItem({
      id: oferta.id,
      name: oferta.title,
      price: oferta.finalPrice,
      category: oferta.category,
      image: oferta.image,
      type: 'combo'
    })
    console.log('✅ Oferta agregada al carrito:', oferta.title)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando ofertas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <section className="py-24 px-4 text-center bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-800 via-red-800 to-yellow-800 bg-clip-text text-transparent mb-8">
            Ofertas Especiales
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestras increíbles ofertas y combos especiales. 
            Ahorra más comprando en paquetes.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-orange-800 via-red-800 to-yellow-800 bg-clip-text text-transparent mb-16">
            Combos Destacados
          </h2>
          
          {ofertas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ofertas.map((oferta) => (
                <div key={oferta.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-yellow-200">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={oferta.image}
                      alt={oferta.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.error('❌ Error cargando imagen de oferta:', oferta.title, oferta.image)
                        e.currentTarget.src = '/images/LogoBebidas.jpeg'
                      }}
                      onLoad={() => {
                        console.log('✅ Imagen de oferta cargada:', oferta.title, oferta.image)
                      }}
                    />
                    {oferta.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ⭐ DESTACADO
                      </div>
                    )}
                    {oferta.priority && (
                      <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {getPriorityStars(oferta.priority)}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{oferta.title}</h3>
                    <p className="text-gray-600 mb-4">{oferta.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Incluye:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {oferta.comboProducts.map((product, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{product.quantity}x {product.name}</span>
                            <span>${product.price.toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-orange-600">${oferta.finalPrice.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">Combo</span>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(oferta)}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                        <span>Agregar al carrito</span>
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍷</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No hay ofertas disponibles</h3>
              <p className="text-gray-600">Vuelve pronto para ver nuestras increíbles ofertas.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}