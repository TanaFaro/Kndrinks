'use client'

import { useState, useEffect } from 'react'
import { normalizeImagePath, handleImageError, handleImageLoad } from '@/lib/imageUtils'
import dynamic from 'next/dynamic'

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
  active: boolean
  featured?: boolean
  priority?: number
}

function HomeContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const loadData = () => {
      // Verificar que estamos en el cliente antes de acceder a localStorage
      if (typeof window === 'undefined') return
      
      console.log('🔄 Cargando datos de la página principal...')
      
      // Cargar productos y ofertas desde localStorage
      const savedProducts = localStorage.getItem('products')
      const savedOfertas = localStorage.getItem('ofertas')
      
      console.log('📦 Productos guardados:', savedProducts)
      console.log('🎯 Ofertas guardadas:', savedOfertas)
      
      if (savedProducts) {
        try {
          const parsedProducts = JSON.parse(savedProducts)
          console.log('✅ Productos parseados:', parsedProducts)
          setProducts(parsedProducts)
        } catch (error) {
          console.error('❌ Error parsing products:', error)
        }
      } else {
        console.log('⚠️ No hay productos guardados, creando datos de ejemplo')
        // Datos de ejemplo si no hay productos guardados
        const exampleProducts = [
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
          }
        ]
        setProducts(exampleProducts)
        // Guardar los datos de ejemplo en localStorage
        localStorage.setItem('products', JSON.stringify(exampleProducts))
        console.log('💾 Productos de ejemplo guardados en localStorage')
      }
      
      if (savedOfertas) {
        try {
          const parsedOfertas = JSON.parse(savedOfertas)
          console.log('✅ Ofertas parseadas:', parsedOfertas)
          setOfertas(parsedOfertas)
        } catch (error) {
          console.error('❌ Error parsing ofertas:', error)
        }
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
          }
        ]
        setOfertas(exampleOfertas)
        // Guardar los datos de ejemplo en localStorage
        localStorage.setItem('ofertas', JSON.stringify(exampleOfertas))
        console.log('💾 Ofertas de ejemplo guardadas en localStorage')
      }
      
      setLoading(false)
    }

    loadData()

    // Escuchar cambios en localStorage (solo en el cliente)
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        console.log('🔄 Cambio detectado en localStorage, recargando datos...')
        loadData()
      }

      // Escuchar cambios en localStorage
      window.addEventListener('storage', handleStorageChange)
      
      // También recargar cuando se regrese a la página
      window.addEventListener('focus', loadData)
      
      // Escuchar cambios personalizados
      window.addEventListener('dataUpdated', loadData)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('focus', loadData)
        window.removeEventListener('dataUpdated', loadData)
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

  // Obtener productos con ofertas activas
  const getProductsWithOffers = () => {
    console.log('🔍 Ofertas cargadas:', ofertas)
    console.log('🔍 Total de ofertas:', ofertas.length)
    
    // Filtrar ofertas activas que tengan la estructura correcta
    const activeOfertas = ofertas.filter(oferta => {
      const isActive = oferta.active
      const hasValidPrice = oferta.finalPrice && oferta.finalPrice > 0
      const hasImage = oferta.image && oferta.image.trim() !== ''
      
      console.log('🔍 Oferta:', oferta.title, {
        isActive,
        hasValidPrice,
        hasImage,
        image: oferta.image,
        finalPrice: oferta.finalPrice,
        featured: oferta.featured,
        priority: oferta.priority
      })
      
      return isActive && hasValidPrice && hasImage
    })
    
    console.log('🔍 Ofertas activas encontradas:', activeOfertas.length)
    
    // Si no hay ofertas activas, mostrar productos destacados por defecto
    if (activeOfertas.length === 0) {
      console.log('⚠️ No hay ofertas activas, mostrando productos por defecto')
      return [
        { 
          name: 'Whisky Premium', 
          price: 15000,
          finalPrice: 15000,
          discount: 0,
          image: '/images/Logo Bebidas.jpeg',
          category: 'Licores Premium',
          hasOffer: false
        },
        { 
          name: 'Vino Tinto Reserva', 
          price: 8500,
          finalPrice: 8500,
          discount: 0,
          image: '/images/Logo Bebidas.jpeg',
          category: 'Vinos Especiales',
          hasOffer: false
        },
        { 
          name: 'Cerveza Artesanal', 
          price: 1200,
          finalPrice: 1200,
          discount: 0,
          image: '/images/Logo Bebidas.jpeg',
          category: 'Cervezas Craft',
          hasOffer: false
        }
      ]
    }

    // Ordenar ofertas por prioridad y destacados
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
    
    console.log('🎯 Ofertas ordenadas:', sortedOfertas.map(o => ({
      title: o.title,
      featured: o.featured,
      priority: o.priority,
      price: o.finalPrice
    })))
    
    // Tomar hasta 6 ofertas activas (más combos visibles)
    return sortedOfertas.slice(0, 6).map(oferta => {
      console.log('🎯 Procesando oferta:', oferta.title)
      console.log('🖼️ Imagen original:', oferta.image)
      
      // Normalizar la ruta de la imagen
      const imagePath = normalizeImagePath(oferta.image)
      
      console.log('✅ Imagen final:', imagePath)
      
      return {
        name: oferta.title,
        price: oferta.finalPrice,
        finalPrice: oferta.finalPrice,
        discount: 0,
        image: imagePath,
        category: oferta.category || 'Combos',
        hasOffer: true,
        description: oferta.description,
        featured: oferta.featured || false,
        priority: oferta.priority || 0,
        comboProducts: oferta.comboProducts || []
      }
    })
  }

  const featuredProducts = getProductsWithOffers()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Hero Section Moderno */}
      <section className="hero-section relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <h1 className="hero-title text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">
            ¡Bienvenido a KNDrinks!
          </h1>
          
          {/* Logo de KNDrinks */}
          <div className="mb-12 flex justify-center">
            <img 
              src="/images/Logo Bebidas.jpeg" 
              alt="KNDrinks Logo" 
              className="h-48 w-auto object-contain drop-shadow-2xl animate-pulse rounded-2xl"
            />
          </div>
          
          <p className="hero-subtitle text-2xl md:text-3xl text-slate-700 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
            Tu tienda de bebidas favorita con la mejor selección de licores, vinos y cervezas
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <a
              href="/productos"
              className="hero-button group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 w-full sm:w-auto text-center"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span>Ver Productos</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </span>
            </a>
            <a
              href="/ofertas"
              className="hero-button group bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 w-full sm:w-auto text-center"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Ofertas Especiales</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Productos Destacados Modernos */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8 sm:mb-12 lg:mb-16">
            Productos Destacados en Oferta
          </h2>
          <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((product) => (
              <div key={product.name} className="product-card group bg-violet-50/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200/20">
                <div className="h-48 sm:h-56 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => handleImageError(e)}
                    onLoad={handleImageLoad}
                  />
                </div>
                <div className="product-card p-4 sm:p-6 lg:p-8">
                  <div className="text-xs sm:text-sm text-violet-600 font-semibold mb-2 uppercase tracking-wide">
                    {product.category}
                  </div>
                  <h3 className="product-title text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mb-4 sm:mb-6">
                    <p className="product-price text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                      ${product.finalPrice ? product.finalPrice.toLocaleString() : product.price ? product.price.toLocaleString() : '0'}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      const message = `Hola! Me interesa el producto: ${product.name} - $${product.finalPrice ? product.finalPrice.toLocaleString() : product.price ? product.price.toLocaleString() : '0'}`
                      const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`
                      window.open(whatsappUrl, '_blank')
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 sm:py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span className="hidden sm:inline">Consultar por WhatsApp</span>
                      <span className="sm:hidden">WhatsApp</span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ofertas Especiales Modernas */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-200 via-purple-200 to-indigo-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Ofertas Especiales
          </h2>
          <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 rounded-3xl p-12 text-white text-center shadow-2xl transform hover:scale-105 transition-all duration-500">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              ¡Descuentos del 10%!
            </h3>
            <p className="text-xl mb-8 opacity-90 leading-relaxed max-w-2xl mx-auto">
              En productos seleccionados. ¡Oferta por tiempo limitado!
            </p>
            <a
              href="/ofertas"
              className="inline-flex items-center space-x-3 bg-white text-violet-600 px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:bg-gray-50"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Ver Ofertas</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonios Modernos */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "María G.", text: "Excelente servicio y productos de calidad. Muy recomendable!", rating: 5 },
              { name: "Carlos L.", text: "Los mejores precios. Envío rápido y seguro.", rating: 5 },
              { name: "Ana M.", text: "Gran variedad de bebidas. Super satisfecha!", rating: 5 }
            ].map((testimonial) => (
              <div key={testimonial.name} className="group bg-violet-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200/20">
                <div className="text-yellow-400 text-3xl mb-6 flex justify-center">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-slate-600 mb-6 italic text-lg leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <p className="font-bold text-slate-800 text-lg">- {testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Moderno */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            ¡Mantente informado!
          </h2>
          <p className="text-xl text-violet-100 mb-10 leading-relaxed">
            Recibe las mejores ofertas y novedades en tu email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-6 py-4 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
            />
            <button className="bg-white text-violet-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
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

// Exportar con dynamic import para evitar SSR
export default dynamic(() => Promise.resolve(HomeContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Cargando...</p>
      </div>
    </div>
  )
})
