'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

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
  const addToCart = useCartStore((state) => state.addItem)
  
  const products = categoryProducts[categoryId as keyof typeof categoryProducts] || []
  const categoryName = categoryNames[categoryId as keyof typeof categoryNames] || 'Categoría'

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.category,
      stock: product.stock
    })
    toast.success(`${product.name} agregado al carrito`)
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
                  
                  {/* Botón agregar al carrito */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors duration-300"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Agregar al Carrito</span>
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



