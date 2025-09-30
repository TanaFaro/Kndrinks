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
  const [isAdmin, setIsAdmin] = useState(false)
  const { addItem } = useCartStore()

  // Función para eliminar una oferta
  const handleDeleteOferta = (id: number) => {
    const ofertaToDelete = ofertas.find(oferta => oferta.id === id)
    if (!ofertaToDelete) {
      console.error('❌ Oferta no encontrada:', id)
      return
    }

    if (window.confirm(`¿Estás seguro de que quieres eliminar la oferta "${ofertaToDelete.title}"?\n\nEsta acción no se puede deshacer.`)) {
      try {
        const updatedOfertas = ofertas.filter(oferta => oferta.id !== id)
        setOfertas(updatedOfertas)
        localStorage.setItem('ofertas', JSON.stringify(updatedOfertas))
        console.log('🗑️ Oferta eliminada:', ofertaToDelete.title, '(ID:', id, ')')
        
        // Mostrar mensaje de éxito
        alert(`✅ Oferta "${ofertaToDelete.title}" eliminada correctamente.`)
      } catch (error) {
        console.error('❌ Error eliminando oferta:', error)
        alert('❌ Error al eliminar la oferta. Inténtalo de nuevo.')
      }
    }
  }

  // Función para editar una oferta (redirigir a la página de edición)
  const handleEditOferta = (id: number) => {
    window.location.href = `/admin/ofertas/edit/${id}`
  }

  // Función para alternar el estado activo/inactivo de una oferta
  const handleToggleActive = (id: number) => {
    const ofertaToToggle = ofertas.find(oferta => oferta.id === id)
    if (!ofertaToToggle) {
      console.error('❌ Oferta no encontrada:', id)
      return
    }

    try {
      const updatedOfertas = ofertas.map(oferta => 
        oferta.id === id 
          ? { ...oferta, active: !oferta.active }
          : oferta
      )
      setOfertas(updatedOfertas)
      localStorage.setItem('ofertas', JSON.stringify(updatedOfertas))
      
      const newStatus = !ofertaToToggle.active ? 'activada' : 'desactivada'
      console.log(`🔄 Oferta ${newStatus}:`, ofertaToToggle.title, '(ID:', id, ')')
      alert(`✅ Oferta "${ofertaToToggle.title}" ${newStatus} correctamente.`)
    } catch (error) {
      console.error('❌ Error cambiando estado de oferta:', error)
      alert('❌ Error al cambiar el estado de la oferta. Inténtalo de nuevo.')
    }
  }

  // Función para cargar ofertas de ejemplo
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
      },
      {
        id: 3,
        title: "Combo DU + Speed",
        description: "DU Renaissance + Speed XL",
        comboProducts: [
          { productId: 10, productName: "DU Renaissance", quantity: 1, price: 5000 },
          { productId: 9, productName: "Speed XL", quantity: 1, price: 1500 }
        ],
        finalPrice: 6000,
        image: "/images/Duconspeed.jfif",
        category: "Combos",
        active: true,
        featured: false,
        priority: 2
      }
    ]
    
    setOfertas(exampleOfertas)
    localStorage.setItem('ofertas', JSON.stringify(exampleOfertas))
    console.log('✅ Ofertas de ejemplo cargadas:', exampleOfertas.length)
  }

  // Verificar si es administrador
  useEffect(() => {
    const checkAdminStatus = () => {
      const isAdminUser = localStorage.getItem('isAdmin') === 'true'
      console.log('🔍 Verificando estado de administrador:', isAdminUser)
      setIsAdmin(isAdminUser)
    }
    checkAdminStatus()
  }, [])

  useEffect(() => {
    // Cargar ofertas desde localStorage
    const loadOfertas = () => {
      try {
        const savedOfertas = localStorage.getItem('ofertas')
        if (savedOfertas) {
          const parsedOfertas: Oferta[] = JSON.parse(savedOfertas)
          console.log('📦 Ofertas cargadas desde localStorage:', parsedOfertas)
          
          // Corregir rutas de imágenes automáticamente
          const ofertasCorregidas = parsedOfertas.map(oferta => {
            let imagenCorregida = oferta.image
            
            // Mapeo de rutas incorrectas a correctas
            const correcciones: Record<string, string> = {
              '/images/fernet 750.jfif': '/images/fernetmas2cocas.jfif',
              '/images/vino toro mas pritty.jpg': '/images/vinotoromaspritty.jpg',
              '/images/sky mas speed.jfif': '/images/skyymasspeed.jfif',
              '/images/skyy mas speed.jfif': '/images/skyymasspeed.jfif',
              '/images/Du con speed.jfif': '/images/Duconspeed.jfif',
              '/images/viña de balbo mas pritty.png': '/images/balbomaspritty.png',
              '/images/vi%C3%B1a%20de%20balbo%20mas%20pritty.png': '/images/balbomaspritty.png'
            }
            
            if (correcciones[oferta.image]) {
              console.log('🔧 Corrigiendo ruta:', oferta.image, '→', correcciones[oferta.image])
              imagenCorregida = correcciones[oferta.image]
            }
            
            return {
              ...oferta,
              image: imagenCorregida
            }
          })
          
          // Si se hicieron correcciones, guardar las ofertas corregidas
          const hayCorrecciones = ofertasCorregidas.some((oferta, index) => 
            oferta.image !== parsedOfertas[index].image
          )
          
          if (hayCorrecciones) {
            console.log('💾 Guardando ofertas corregidas...')
            localStorage.setItem('ofertas', JSON.stringify(ofertasCorregidas))
          }
          
          setOfertas(ofertasCorregidas)
        } else {
          console.log('⚠️ No hay ofertas guardadas')
          // Si es administrador, cargar ofertas de ejemplo
          if (isAdmin) {
            console.log('🔄 Cargando ofertas de ejemplo para administrador...')
            loadExampleOfertas()
          } else {
            setOfertas([])
          }
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

  // Vista para administradores
  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        {/* Header Admin */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Ofertas</h1>
                <p className="text-gray-600">
                  Lista de todas las ofertas 
                  <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                    {ofertas.length} total
                  </span>
                  <span className="ml-2 bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                    {ofertas.filter(o => o.active).length} activas
                  </span>
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/admin/ofertas/new'}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Nueva Oferta
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Ofertas Admin */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {ofertas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ofertas.map((oferta) => {
                const individualPrice = calculateIndividualPrice(oferta.comboProducts)
                return (
                  <div key={oferta.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    {/* Imagen */}
                    <div className="h-48 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src={oferta.image} 
                        alt={oferta.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('❌ Error cargando imagen de oferta:', oferta.title, oferta.image)
                          e.currentTarget.src = '/images/LogoBebidas.jpeg'
                        }}
                        onLoad={() => {
                          console.log('✅ Imagen de oferta cargada:', oferta.title, oferta.image)
                        }}
                      />
                      {/* Badge de estado */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                          oferta.active 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {oferta.active ? '✅ Activa' : '❌ Inactiva'}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{oferta.title}</h3>
                        {oferta.priority && oferta.priority >= 2 && (
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {getPriorityStars(oferta.priority)} {getPopularityText(oferta.priority)}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{oferta.description}</p>
                      
                      {/* Categoría */}
                      <div className="mb-4">
                        <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                          {oferta.category}
                        </span>
                      </div>

                      {/* Precios */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">Precio individual:</span>
                          <span className="text-sm text-gray-600 line-through">
                            ${individualPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">Precio combo:</span>
                          <span className="text-2xl font-bold text-violet-600">
                            ${oferta.finalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-600 font-semibold">Ahorro:</span>
                          <span className="text-sm text-green-600 font-semibold">
                            ${(individualPrice - oferta.finalPrice).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Productos incluidos */}
                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-2">Incluye:</p>
                        <div className="space-y-1">
                          {oferta.comboProducts.slice(0, 2).map((product, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              {product.quantity}x {product.name}
                            </div>
                          ))}
                          {oferta.comboProducts.length > 2 && (
                            <div className="text-sm text-gray-500">
                              +{oferta.comboProducts.length - 2} más...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditOferta(oferta.id)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleToggleActive(oferta.id)}
                            className={`flex-1 font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${
                              oferta.active 
                                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                          >
                            {oferta.active ? 'Desactivar' : 'Activar'}
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteOferta(oferta.id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🍷</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No hay ofertas disponibles</h3>
              <p className="text-gray-500 mb-8">Crea tu primera oferta para comenzar</p>
              <button
                onClick={() => window.location.href = '/admin/ofertas/new'}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Crear Nueva Oferta
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Vista para clientes (vista original)
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
                          e.currentTarget.src = '/images/LogoBebidas.jpeg'
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