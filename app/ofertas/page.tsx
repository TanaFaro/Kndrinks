'use client'

import { useState, useEffect } from 'react'
// import { normalizeImagePath, handleImageError } from '@/lib/imageUtils'
import { useCartStore } from '@/store/cartStore'

interface ComboProduct {
  name: string
  price: number
  quantity: number
}

interface Oferta {
  id: number
  title: string
  description: string
  comboProducts: ComboProduct[]
  finalPrice: number
  image: string
  category: string
  active: boolean
  featured?: boolean
  priority?: number
}

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
  const { addItem } = useCartStore()

  useEffect(() => {
    // Cargar ofertas desde localStorage
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

  const getActiveOfertas = () => {
    // Filtrar solo ofertas activas y mostrar máximo 6
    return ofertas.filter(oferta => oferta.active).slice(0, 6)
  }

  const calculateIndividualPrice = (comboProducts: ComboProduct[]) => {
    // Validar que comboProducts existe y es un array
    if (!comboProducts || !Array.isArray(comboProducts)) {
      return 0
    }
    return comboProducts.reduce((total, product) => {
      // Validar que product tiene las propiedades necesarias
      if (!product || typeof product.price !== 'number' || typeof product.quantity !== 'number') {
        return total
      }
      return total + (product.price * product.quantity)
    }, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando combos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Header Moderno */}
      <section className="py-24 px-4 text-center bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">
            Combos Especiales
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            ¡No te pierdas nuestros increíbles combos! Paquetes especiales con productos premium
          </p>
        </div>
      </section>

      {/* Productos en Oferta */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Combos Destacados
          </h2>
          
          {ofertas.length > 0 ? (
            <div className="ofertas-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {getActiveOfertas().map((oferta) => {
                // Validar que la oferta tiene la estructura correcta
                if (!oferta.comboProducts || !Array.isArray(oferta.comboProducts)) {
                  return null
                }
                
                const individualPrice = calculateIndividualPrice(oferta.comboProducts)
                return (
                  <div key={oferta.id} className={`oferta-card group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border ${oferta.featured ? 'border-yellow-400/50 shadow-yellow-200/50' : 'border-violet-200/30'}`}>
                    {/* Badge de popularidad con estrellas */}
                    {oferta.priority && oferta.priority >= 2 && (
                      <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        <div className="priority-stars flex items-center space-x-1">
                          <span>{getPriorityStars(oferta.priority)}</span>
                          <span>{getPopularityText(oferta.priority)}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="h-48 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 relative overflow-hidden">
                      <img 
                        src={oferta.image} 
                        alt={oferta.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.error('❌ Error cargando imagen de oferta:', oferta.title, oferta.image)
                          e.currentTarget.src = '/images/Logo Bebidas.jpeg'
                        }}
                        onLoad={() => {
                          console.log('✅ Imagen de oferta cargada:', oferta.title, oferta.image)
                        }}
                      />
                    </div>
                    <div className="p-8">
                      <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                        COMBO
                      </div>
                      <h3 className="oferta-title text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                        {oferta.title}
                      </h3>
                      <p className="text-slate-600 mb-4 text-sm">
                        {oferta.description}
                      </p>
                      
                      {/* Productos incluidos */}
                      <div className="bg-slate-50 rounded-lg p-3 mb-4">
                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Incluye:</h4>
                        <div className="space-y-1">
                          {oferta.comboProducts.map((product, index) => (
                            <p key={index} className="text-xs text-slate-600">
                              • {product.name} x{product.quantity}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      {/* Precio destacado centrado */}
                      <div className="text-center mb-6">
                        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-200">
                          <p className="text-sm text-slate-500 mb-2">Precio individual: <span className="line-through">${individualPrice.toLocaleString()}</span></p>
                          <div className="oferta-price text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1">
                            ${oferta.finalPrice.toLocaleString()}
                          </div>
                          <p className="text-sm font-semibold text-green-600">Precio combo especial</p>
                          <div className="text-xs text-slate-500 mt-1">
                            Ahorras: ${(individualPrice - oferta.finalPrice).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => {
                          addItem({
                            id: oferta.id + 1000, // ID único para combos
                            name: oferta.title,
                            price: oferta.finalPrice,
                            category: 'Combo',
                            image: oferta.image,
                            type: 'combo'
                          })
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        title="Agregar al carrito"
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
                )
              })}
            </div>
          ) : (
            <p className="text-center text-slate-600 text-lg">No hay combos disponibles en este momento.</p>
          )}
        </div>
      </section>
    </div>
  )
}