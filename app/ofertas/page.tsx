'use client'

// Versión actualizada con precios corregidos - v2.2
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

// Función helper robusta para localStorage en móviles
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window === 'undefined') return null
      if (!window.localStorage) return null
      return window.localStorage.getItem(key)
    } catch (error) {
      console.warn('⚠️ Error accediendo a localStorage:', error)
      return null
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window === 'undefined') return false
      if (!window.localStorage) return false
      window.localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.warn('⚠️ Error guardando en localStorage:', error)
      return false
    }
  }
}

export default function Ofertas() {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    const loadOfertas = () => {
      try {
        console.log('🔄 Cargando ofertas...')
        
        // Cargar ofertas desde localStorage de forma segura
        const savedOfertas = safeLocalStorage.getItem('ofertas')
        let ofertasToShow: Oferta[] = []
        
        if (savedOfertas) {
          try {
            ofertasToShow = JSON.parse(savedOfertas)
          } catch (parseError) {
            console.warn('⚠️ Error parseando ofertas:', parseError)
            ofertasToShow = []
          }
        }
        
        setOfertas(ofertasToShow)
        
        console.log('🎁 Ofertas cargadas:', ofertasToShow.length)
        
        // Si no hay ofertas, cargar ofertas básicas correctas
        if (ofertasToShow.length === 0) {
          console.warn('⚠️ No hay ofertas en localStorage, cargando ofertas básicas...')
          
          // Ofertas básicas con precios correctos
          const basicOfertas = [
            {
              id: 1,
              title: "Fernet + Coca Cola",
              description: "Combo perfecto para disfrutar con amigos",
              finalPrice: 17000,
              active: true,
              image: "/images/fernetmas2cocas.jfif",
              category: "Combos",
              comboProducts: [
                { name: "Fernet Branca 750ml", quantity: 1, price: 13500 },
                { name: "Coca Cola 2.25L", quantity: 1, price: 4200 }
              ],
              featured: true,
              priority: 5
            },
            {
              id: 2,
              title: "Skyy + Speed",
              description: "Combo energético para la noche",
              finalPrice: 15500,
              active: true,
              image: "/images/skyymasspeed.jfif",
              category: "Combos",
              comboProducts: [
                { name: "Skyy Vodka 750ml", quantity: 1, price: 9500 },
                { name: "Speed XL", quantity: 2, price: 3000 }
              ],
              featured: true,
              priority: 4
            }
          ]
          
          console.log('✅ Ofertas básicas cargadas:', basicOfertas.length)
          setOfertas(basicOfertas)
          // Guardar en localStorage para futuras visitas
          safeLocalStorage.setItem('ofertas', JSON.stringify(basicOfertas))
        }
        
      } catch (error) {
        console.error('❌ Error cargando ofertas:', error)
        setOfertas([])
      } finally {
        setLoading(false)
      }
    }

    // Delay más largo para móviles con conexión lenta
    const timer = setTimeout(loadOfertas, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const isAdminUser = safeLocalStorage.getItem('isAdmin') === 'true'
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
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando ofertas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      <section className="py-24 px-4 text-center bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">
            Ofertas Especiales
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestras increíbles ofertas y combos especiales. 
            Ahorra más comprando en paquetes.
          </p>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Combos Destacados
          </h2>
          
          {ofertas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ofertas.map((oferta) => (
                <div key={oferta.id} className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200">
                  <div className="relative h-48 sm:h-64 overflow-hidden bg-gradient-to-br from-violet-100 to-purple-100">
                    <img
                      src={oferta.image}
                      alt={oferta.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('❌ Error cargando imagen de oferta:', oferta.title, oferta.image)
                        e.currentTarget.style.display = 'none'
                        const container = e.currentTarget.parentElement
                        if (container) {
                          container.innerHTML = `
                            <div class="w-full h-full flex flex-col items-center justify-center text-violet-600 p-4">
                              <div class="text-3xl mb-3">🎁</div>
                              <div class="text-lg font-bold text-center mb-2">${oferta.title}</div>
                              <div class="text-sm text-violet-700 text-center mb-2">${oferta.description}</div>
                              <div class="text-2xl font-bold text-violet-800">$${oferta.finalPrice.toLocaleString()}</div>
                              <div class="text-xs text-violet-500 mt-2">Combo especial</div>
                            </div>
                          `
                        }
                      }}
                      loading="lazy"
                    />
                    {oferta.priority && (
                      <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {getPriorityStars(oferta.priority)}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{oferta.title}</h3>
                    <p className="text-gray-600 mb-4">{oferta.description}</p>
                    
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-violet-600">${oferta.finalPrice.toLocaleString()}</span>
                      <span className="text-sm text-gray-500">Combo</span>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(oferta)}
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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