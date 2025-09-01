'use client'

import { useState, useEffect } from 'react'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  image: string
  description: string
}

interface ComboProduct {
  productId: number
  productName: string
  quantity: number
  price: number
}

interface Oferta {
  id: number
  title: string
  description: string
  comboProducts: ComboProduct[]
  finalPrice: number
  image: string
  category: string
  validUntil: string
  active: boolean
}

export default function Ofertas() {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOfertas()
  }, [])

  const loadOfertas = () => {
    try {
      const savedOfertas = localStorage.getItem('ofertas')
      if (savedOfertas) {
        const parsedOfertas: Oferta[] = JSON.parse(savedOfertas)
        
        // Filtrar solo ofertas activas, válidas y que tengan la estructura correcta
        const currentDate = new Date().toISOString().split('T')[0]
        const activeOfertas = parsedOfertas.filter(oferta => 
          oferta.active && 
          oferta.validUntil >= currentDate &&
          oferta.comboProducts && 
          Array.isArray(oferta.comboProducts) &&
          oferta.comboProducts.length > 0
        )
        
        setOfertas(activeOfertas)
        console.log('Combos cargados:', activeOfertas)
      }
    } catch (error) {
      console.error('Error cargando combos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getActiveOfertas = () => {
    return ofertas.slice(0, 6) // Mostrar máximo 6 combos
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando combos...</p>
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

      {/* Banner Principal de Ofertas */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-3xl p-16 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-500">
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  <circle cx="8" cy="10" r="1" fill="currentColor"/>
                  <circle cx="16" cy="12" r="1" fill="currentColor"/>
                  <circle cx="12" cy="8" r="1" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              ¡Combos Exclusivos!
            </h2>
            <p className="text-2xl mb-10 opacity-90 leading-relaxed max-w-3xl mx-auto">
              Productos combinados a precios especiales. ¡Oferta por tiempo limitado!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/productos"
                className="inline-flex items-center space-x-3 bg-white text-violet-600 px-12 py-6 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:bg-gray-50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  <circle cx="8" cy="10" r="1" fill="currentColor"/>
                  <circle cx="16" cy="12" r="1" fill="currentColor"/>
                  <circle cx="12" cy="8" r="1" fill="currentColor"/>
                </svg>
                <span>Ver Productos</span>
                <span>→</span>
              </a>
              <button className="inline-flex items-center space-x-3 bg-violet-400/20 text-white px-12 py-6 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:bg-violet-400/30 border border-white/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  <circle cx="8" cy="10" r="1" fill="currentColor"/>
                  <circle cx="16" cy="12" r="1" fill="currentColor"/>
                  <circle cx="12" cy="8" r="1" fill="currentColor"/>
                </svg>
                <span>¡Aprovechar!</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Productos en Oferta */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Combos Destacados
          </h2>
          
          {ofertas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getActiveOfertas().map((oferta) => {
                // Validar que la oferta tiene la estructura correcta
                if (!oferta.comboProducts || !Array.isArray(oferta.comboProducts)) {
                  return null
                }
                
                const individualPrice = calculateIndividualPrice(oferta.comboProducts)
                return (
                  <div key={oferta.id} className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200/30">
                    <div className="h-48 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500">
                      <img 
                        src={oferta.image} 
                        alt={oferta.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/Logo Bebidas.jpeg'
                        }}
                      />
                    </div>
                    <div className="p-8">
                      <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                        COMBO
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
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
                              • {product.productName} x{product.quantity}
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-sm text-slate-500">
                          <p className="line-through">Individual: ${individualPrice.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            ${oferta.finalPrice.toLocaleString()}
                          </span>
                          <p className="text-xs text-slate-500">Precio combo</p>
                        </div>
                      </div>
                      
                      <div className="text-xs text-slate-500 mb-4">
                        Válido hasta: {new Date(oferta.validUntil).toLocaleDateString()}
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        <span className="flex items-center justify-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                          </svg>
                          <span>Agregar al Carrito</span>
                        </span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-violet-200/30">
                <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  No hay combos activos
                </h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Actualmente no tenemos combos disponibles. ¡Vuelve pronto para encontrar increíbles paquetes!
                </p>
                <a
                  href="/productos"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Ver Productos</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Moderno */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            ¡No te pierdas nada!
          </h2>
          <p className="text-xl text-violet-100 mb-10 leading-relaxed">
            Suscríbete para recibir los mejores combos y novedades en tu email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-6 py-4 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
            />
            <button className="bg-white text-violet-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Suscribirse</span>
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
