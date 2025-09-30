'use client'

import { useState, useEffect } from 'react'
import { normalizeImagePath, handleImageError } from '@/lib/imageUtils'

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

// Datos estáticos para garantizar que siempre funcionen
const STATIC_PRODUCTS = [
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
    image: "/images/fernet 750.jfif",
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
    image: "/images/Smirnoff solo.jpeg",
    description: "Vodka ruso premium"
  },
  {
    id: 5,
    name: "Pritty Limón 2.25L",
    price: 1200,
    category: "Bebidas",
    stock: 40,
    image: "/images/pritty 2.250.jfif",
    description: "Gaseosa sabor limón"
  },
  {
    id: 6,
    name: "Vino Toro Tinto 750ml",
    price: 1800,
    category: "Vinos",
    stock: 35,
    image: "/images/vino toro.jfif",
    description: "Vino tinto clásico"
  }
]

const STATIC_OFERTAS = [
  {
    id: 1,
    title: "Combo Fernet + Coca",
    description: "Fernet Branca 750ml + 2 Coca Cola 2.25L",
    finalPrice: 6500,
    image: "/images/fernet 750.jfif",
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
  },
  {
    id: 4,
    title: "Combo Du + Speed",
    description: "Du Vodka 750ml + Speed XL",
    finalPrice: 7500,
    image: "/images/Du con speed.jfif",
    active: true,
    featured: false,
    priority: 2,
    comboProducts: [
      { name: "Du Vodka 750ml", price: 6500, quantity: 1 },
      { name: "Speed XL", price: 1000, quantity: 1 }
    ]
  }
]

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

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Detectar tipo de dispositivo
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width <= 768) {
        console.log('📱 Móvil detectado')
      } else if (width <= 1024) {
        console.log('📱 Tablet detectada')
      } else {
        console.log('💻 Desktop detectado')
      }
    }
  }, [])

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

  return (
    <>
      {/* Meta tags para móviles */}
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
      
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Hero Section */}
      <section className="hero-section relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <h1 className="hero-title text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">
            KNDrinks
          </h1>
          <p className="hero-subtitle text-2xl md:text-3xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Tu tienda de bebidas favorita con la mejor selección de licores, vinos y más
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/productos"
              className="hero-button group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Ver Productos
            </a>
            <a
              href="/ofertas"
              className="hero-button group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Ver Ofertas
            </a>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
              Productos Destacados
          </h2>
            {/* Botón de actualización para móviles y tablets */}
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              🔄 Actualizar
            </button>
          </div>
          
          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {STATIC_PRODUCTS.map((product) => (
              <div key={product.id} className="product-card group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200/30">
                <div className="h-48 sm:h-56 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 relative overflow-hidden">
                  <img
                    src={`${normalizeImagePath(product.image)}?v=${Date.now()}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => handleImageError(e)}
                  />
                </div>
                <div className="p-8">
                  <div className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                    {product.category}
                  </div>
                  <h3 className="product-title text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm">
                    {product.description}
                    </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="product-price text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-500">Stock: {product.stock}</span>
                  </div>
                  <button 
                    onClick={() => {
                      const message = `Hola! Me interesa el producto: ${product.name} - $${product.price.toLocaleString()}`
                      const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`
                      window.open(whatsappUrl, '_blank')
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
            ))}
          </div>
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Ofertas Especiales
          </h2>
          
          <div className="ofertas-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {STATIC_OFERTAS.map((oferta) => (
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
                    src={`${normalizeImagePath(oferta.image)}?v=${Date.now()}`}
                    alt={oferta.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => handleImageError(e)}
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
                      <p className="line-through">Individual: ${oferta.comboProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toLocaleString()}</p>
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
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
            ))}
          </div>
        </div>
      </section>
          </div>
    </>
  )
} 