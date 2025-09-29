'use client'

import { useState, useEffect } from 'react'
import { normalizeImagePath, handleImageError, handleImageLoad } from '@/lib/imageUtils'
import dynamic from 'next/dynamic'
import ClientOnly from '@/components/ClientOnly'

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
  id: number
  name: string
  quantity: number
  price: number
  category: string
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

export default function Ofertas() {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadOfertas()
    
    // Escuchar cambios en localStorage
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        console.log('🔄 Cambio detectado en localStorage, recargando ofertas...')
        loadOfertas()
      }

      // Escuchar cambios en localStorage
      window.addEventListener('storage', handleStorageChange)
      
      // También recargar cuando se regrese a la página
      window.addEventListener('focus', loadOfertas)
      
      // Escuchar cambios personalizados
      window.addEventListener('dataUpdated', loadOfertas)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('focus', loadOfertas)
        window.removeEventListener('dataUpdated', loadOfertas)
      }
    }
  }, [])

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

  const loadOfertas = () => {
    // Verificar que estamos en el cliente
    if (typeof window === 'undefined') return
    
    console.log('🔄 Cargando ofertas...')
    
    try {
      const savedOfertas = localStorage.getItem('ofertas')
      console.log('🎯 Ofertas guardadas:', savedOfertas)
      
      if (savedOfertas) {
        const parsedOfertas: Oferta[] = JSON.parse(savedOfertas)
        
        // Filtrar solo ofertas activas que tengan la estructura correcta
        const activeOfertas = parsedOfertas.filter(oferta => 
          oferta.active && 
          oferta.finalPrice > 0 &&
          oferta.image && 
          oferta.image.trim() !== ''
        )
        
        // Ordenar por destacados y prioridad
        const sortedOfertas = activeOfertas.sort((a, b) => {
          // Primero los destacados
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          
          // Luego por prioridad (mayor prioridad primero)
          if (a.priority && b.priority) {
            return b.priority - a.priority
          }
          if (a.priority && !b.priority) return -1
          if (!a.priority && b.priority) return 1
          
          // Finalmente por precio (menor precio primero para ofertas)
          return a.finalPrice - b.finalPrice
        })
        
        setOfertas(sortedOfertas)
        console.log('✅ Combos cargados:', activeOfertas)
      } else {
        console.log('⚠️ No hay ofertas guardadas, creando datos de ejemplo')
        // Datos de ejemplo si no hay ofertas guardadas
        const exampleOfertas = [
          {
            id: 1,
            title: "Combo Fernet + Coca",
            description: "Fernet Branca 750ml + 2 Coca Cola 2.25L",
            finalPrice: 6500,
            image: "/images/fernet mas 2 cocas.jfif",
            active: true,
            featured: true,
            priority: 5,
            comboProducts: [
              { name: "Fernet Branca 750ml", price: 4500, quantity: 1 },
              { name: "Coca Cola 2.25L", price: 1000, quantity: 2 }
            ]
          },
          {
            id: 2,
            title: "Combo Skyy + Speed",
            description: "Skyy Vodka 750ml + Speed XL",
            finalPrice: 4800,
            image: "/images/skyy mas speed.jfif",
            active: true,
            featured: true,
            priority: 4,
            comboProducts: [
              { name: "Skyy Vodka 750ml", price: 3800, quantity: 1 },
              { name: "Speed XL", price: 1000, quantity: 1 }
            ]
          },
          {
            id: 3,
            title: "Combo Smirnoff + Speed",
            description: "Smirnoff Vodka 750ml + 2 Speed XL",
            finalPrice: 5500,
            image: "/images/Smirnoff mas 2 speed.png",
            active: true,
            featured: false,
            priority: 3,
            comboProducts: [
              { name: "Smirnoff Vodka 750ml", price: 3500, quantity: 1 },
              { name: "Speed XL", price: 1000, quantity: 2 }
            ]
          }
        ]
        setOfertas(exampleOfertas)
        // Guardar los datos de ejemplo en localStorage
        localStorage.setItem('ofertas', JSON.stringify(exampleOfertas))
        console.log('💾 Ofertas de ejemplo guardadas en localStorage')
      }
    } catch (error) {
      console.error('❌ Error cargando combos:', error)
      setOfertas([])
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

  // Evitar renderizado hasta que esté montado en el cliente
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    )
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
            <div className="ofertas-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getActiveOfertas().map((oferta) => {
                // Validar que la oferta tiene la estructura correcta
                if (!oferta.comboProducts || !Array.isArray(oferta.comboProducts)) {
                  return null
                }
                
                const individualPrice = calculateIndividualPrice(oferta.comboProducts)
                return (
                  <div key={oferta.id} className={`oferta-card group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border ${oferta.featured ? 'border-yellow-400/50 shadow-yellow-200/50' : 'border-violet-200/30'}`}>
                    {/* Badge de destacado */}
                    {oferta.featured && (
                      <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ⭐ DESTACADO
                      </div>
                    )}
                    
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
                        src={normalizeImagePath(oferta.image)} 
                        alt={oferta.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => handleImageError(e)}
                        onLoad={handleImageLoad}
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
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-sm text-slate-500">
                          <p className="line-through">Individual: ${individualPrice.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <span className="oferta-price text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                            ${oferta.finalPrice.toLocaleString()}
                          </span>
                          <p className="text-xs text-slate-500">Precio combo</p>
                        </div>
                      </div>
                      
                      
                      <button 
                        onClick={() => {
                          const message = `Hola! Me interesa el combo: ${oferta.title} - $${oferta.finalPrice.toLocaleString()}`
                          const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`
                          window.open(whatsappUrl, '_blank')
                        }}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                          </svg>
                          <span>Consultar por WhatsApp</span>
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

