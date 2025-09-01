'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Filter, Star, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

// Datos de productos para búsqueda (en producción esto vendría de una API)
const searchProducts = [
  {
    id: '1',
    name: 'Johnnie Walker Black Label',
    category: 'Whisky',
    price: 45000,
    rating: 4.8,
    reviews: 127,
    stock: 15,
    image: '/images/products/johnnie-walker.jpg'
  },
  {
    id: '2',
    name: 'Grey Goose Vodka',
    category: 'Vodka',
    price: 38000,
    rating: 4.9,
    reviews: 89,
    stock: 8,
    image: '/images/products/grey-goose.jpg'
  },
  {
    id: '3',
    name: 'Bacardi Superior',
    category: 'Ron',
    price: 28000,
    rating: 4.6,
    reviews: 203,
    stock: 25,
    image: '/images/products/bacardi.jpg'
  },
  {
    id: '4',
    name: 'Hendrick\'s Gin',
    category: 'Gin',
    price: 52000,
    rating: 4.7,
    reviews: 156,
    stock: 12,
    image: '/images/products/hendricks.jpg'
  }
]

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredProducts, setFilteredProducts] = useState(searchProducts)
  const addToCart = useCartStore((state) => state.addItem)

  const categories = ['Todos', 'Whisky', 'Vodka', 'Ron', 'Gin', 'Vino', 'Cerveza', 'Champagne']

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    let results = searchProducts

    // Filtrar por búsqueda
    if (searchQuery) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtrar por categoría
    if (selectedCategory && selectedCategory !== 'Todos') {
      results = results.filter(product => product.category === selectedCategory)
    }

    setFilteredProducts(results)
  }, [searchQuery, selectedCategory])

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-4 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Search className="w-6 h-6 text-primary-600" />
                <h2 className="text-xl font-bold text-gray-900">Buscar Productos</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos, categorías..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  autoFocus
                />
              </div>

              {/* Filtros de categoría */}
              <div className="mt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filtrar por categoría:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="flex-1 overflow-y-auto p-6">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
                  <p className="text-gray-500">
                    Intenta con otros términos de búsqueda o categorías
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-gray-500 mb-4">
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                  </div>
                  
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      {/* Imagen del producto */}
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Imagen</span>
                      </div>

                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>

                      {/* Precio y stock */}
                      <div className="text-right">
                        <p className="font-semibold text-primary-600">
                          ${product.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Stock: {product.stock}
                        </p>
                      </div>

                      {/* Botón agregar al carrito */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="text-center text-sm text-gray-500">
                <p>Presiona <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">ESC</kbd> para cerrar</p>
                <p className="mt-1">O haz clic fuera del modal</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SearchModal



