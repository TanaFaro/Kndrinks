'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

// Datos de ejemplo para productos por categoría
const categoryProducts = {
  whisky: [
    {
      id: 'whisky-1',
      name: 'Johnnie Walker Black Label',
      description: 'Whisky escocés blended premium',
      price: 45000,
      originalPrice: 52000,
      image: '/images/whisky-1.jpg',
      rating: 4.8,
      stock: 15,
      category: 'Whisky'
    },
    {
      id: 'whisky-2',
      name: 'Jack Daniel\'s Old No. 7',
      description: 'Whisky americano Tennessee',
      price: 38000,
      originalPrice: 42000,
      image: '/images/whisky-2.jpg',
      rating: 4.6,
      stock: 22,
      category: 'Whisky'
    }
  ],
  vodka: [
    {
      id: 'vodka-1',
      name: 'Grey Goose',
      description: 'Vodka premium francés',
      price: 35000,
      originalPrice: 40000,
      image: '/images/vodka-1.jpg',
      rating: 4.7,
      stock: 18,
      category: 'Vodka'
    }
  ],
  ron: [
    {
      id: 'ron-1',
      name: 'Bacardi Superior',
      description: 'Ron blanco caribeño',
      price: 28000,
      originalPrice: 32000,
      image: '/images/ron-1.jpg',
      rating: 4.5,
      stock: 25,
      category: 'Ron'
    }
  ]
}

const categoryNames = {
  whisky: 'Whisky',
  vodka: 'Vodka',
  ron: 'Ron y Tequila',
  gin: 'Gin',
  vino: 'Vinos',
  cerveza: 'Cervezas',
  champagne: 'Champagne',
  perfumes: 'Perfumes Árabes',
  ofertas: 'Ofertas Especiales'
}

export default function CategoriaPage() {
  const params = useParams()
  const categoryId = params.id as string
  const products = categoryProducts[categoryId as keyof typeof categoryProducts] || []
  const categoryName = categoryNames[categoryId as keyof typeof categoryNames] || 'Categoría'

  const handleWhatsApp = (product: any) => {
    const message = `Hola! Me interesa el producto: ${product.name} - $${product.price.toLocaleString()}`
    const whatsappUrl = `https://wa.me/5493517738174?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/categorias" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Categorías
          </Link>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            {categoryName}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Descubre nuestra selección premium de {categoryName.toLowerCase()}
          </motion.p>
        </div>

        {/* Productos */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Imagen del producto */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="text-6xl mb-2">🍷</div>
                    <p className="text-sm">Imagen del producto</p>
                  </div>
                  
                  {/* Badges */}
                  {product.originalPrice > product.price && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                  
                  {product.stock < 10 && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Stock bajo
                    </div>
                  )}
                </div>

                {/* Contenido del producto */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-sm text-primary-600 font-medium">{product.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  
                  {/* Precios */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toLocaleString('es-AR')}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice.toLocaleString('es-AR')}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
                  </div>
                  
                  {/* Botón WhatsApp */}
                  <button
                    onClick={() => handleWhatsApp(product)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>Consultar por WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🍷</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Productos próximamente
            </h3>
            <p className="text-gray-600 mb-6">
              Estamos preparando una increíble selección de {categoryName.toLowerCase()}
            </p>
            <Link
              href="/categorias"
              className="btn-primary"
            >
              Ver Otras Categorías
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}



