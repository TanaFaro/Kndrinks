

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

interface Oferta {
  id: number
  productId: number
  productName: string
  title: string
  description: string
  discount: number
  originalPrice: number
  finalPrice: number
  image: string
  category: string
  validUntil: string
  active: boolean
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar productos y ofertas desde localStorage
    const savedProducts = localStorage.getItem('products')
    const savedOfertas = localStorage.getItem('ofertas')
    
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
    
    if (savedOfertas) {
      setOfertas(JSON.parse(savedOfertas))
    }
    
    setLoading(false)
  }, [])

  // Obtener productos con ofertas activas
  const getProductsWithOffers = () => {
    const activeOfertas = ofertas.filter(oferta => oferta.active && new Date(oferta.validUntil) >= new Date())
    
    // Si no hay ofertas activas, mostrar productos destacados por defecto
    if (activeOfertas.length === 0) {
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

    // Tomar hasta 3 ofertas activas
    return activeOfertas.slice(0, 3).map(oferta => ({
      name: oferta.productName,
      price: oferta.originalPrice,
      finalPrice: oferta.finalPrice,
      discount: oferta.discount,
      image: oferta.image,
      category: oferta.category,
      hasOffer: true
    }))
  }

  const featuredProducts = getProductsWithOffers()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Hero Section Moderno */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto">
          {/* Logo de KNDrinks */}
          <div className="mb-12 flex justify-center">
            <img 
              src="/images/Logo Bebidas.jpeg" 
              alt="KNDrinks Logo" 
              className="h-48 w-auto object-contain drop-shadow-2xl animate-pulse rounded-2xl"
            />
          </div>
          
          <p className="text-2xl md:text-3xl text-slate-700 mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
            Tu tienda de bebidas favorita con la mejor selección de licores, vinos y cervezas
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/productos"
              className="group bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span>Ver Productos</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </span>
            </a>
            <a
              href="/ofertas"
              className="group bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
      <section className="py-24 px-4 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Productos Destacados en Oferta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.name} className="group bg-violet-50/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200/20">
                <div className="h-56 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/images/Logo Bebidas.jpeg'
                    }}
                  />
                  {product.hasOffer && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="text-sm text-violet-600 font-semibold mb-2 uppercase tracking-wide">
                    {product.category}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                    {product.name}
                  </h3>
                  <div className="mb-6">
                    {product.hasOffer ? (
                      <div className="space-y-2">
                        <p className="text-lg line-through text-slate-400">
                          ${product.price ? product.price.toLocaleString() : '0'}
                        </p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                          ${product.finalPrice ? product.finalPrice.toLocaleString() : '0'}
                        </p>
                      </div>
                    ) : (
                      <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        ${product.price ? product.price.toLocaleString() : '0'}
                      </p>
                    )}
                  </div>
                  <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                      <span>Agregar al Carrito</span>
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
              { name: 'María G.', text: 'Excelente servicio y productos de calidad. Muy recomendable!', rating: 5 },
              { name: 'Carlos L.', text: 'Los mejores precios. Envío rápido y seguro.', rating: 5 },
              { name: 'Ana M.', text: 'Gran variedad de bebidas. Super satisfecha!', rating: 5 }
            ].map((testimonial) => (
              <div key={testimonial.name} className="group bg-violet-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200/20">
                <div className="text-yellow-400 text-3xl mb-6 flex justify-center">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-slate-600 mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
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
