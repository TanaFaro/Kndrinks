'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

// Datos de productos destacados (en producción esto vendría de una API)
const featuredProducts = [
  {
    id: '1',
    name: 'Johnnie Walker Black Label',
    category: 'Whisky',
    price: 45000,
    originalPrice: 52000,
    image: '/images/products/johnnie-walker.jpg',
    rating: 4.8,
    reviews: 127,
    stock: 15,
    isNew: false,
    isHot: true,
    description: 'Whisky escocés blended premium con notas de vainilla y especias'
  },
  {
    id: '2',
    name: 'Grey Goose Vodka',
    category: 'Vodka',
    price: 38000,
    originalPrice: 42000,
    image: '/images/products/grey-goose.jpg',
    rating: 4.9,
    reviews: 89,
    stock: 8,
    isNew: true,
    isHot: false,
    description: 'Vodka premium francesa con sabor suave y elegante'
  },
  {
    id: '3',
    name: 'Bacardi Superior',
    category: 'Ron',
    price: 28000,
    originalPrice: 32000,
    image: '/images/products/bacardi.jpg',
    rating: 4.6,
    reviews: 203,
    stock: 25,
    isNew: false,
    isHot: false,
    description: 'Ron blanco caribeño perfecto para cócteles'
  },
  {
    id: '4',
    name: 'Hendrick\'s Gin',
    category: 'Gin',
    price: 52000,
    originalPrice: 58000,
    image: '/images/products/hendricks.jpg',
    rating: 4.7,
    reviews: 156,
    stock: 12,
    isNew: false,
    isHot: true,
    description: 'Gin artesanal con notas de pepino y rosa'
  },
  {
    id: '5',
    name: 'Patrón Silver Tequila',
    category: 'Tequila',
    price: 65000,
    originalPrice: 72000,
    image: '/images/products/patron.jpg',
    rating: 4.9,
    reviews: 98,
    stock: 6,
    isNew: true,
    isHot: true,
    description: 'Tequila premium 100% agave azul'
  },
  {
    id: '6',
    name: 'Moët & Chandon',
    category: 'Champagne',
    price: 89000,
    originalPrice: 98000,
    image: '/images/products/moet.jpg',
    rating: 4.8,
    reviews: 67,
    stock: 4,
    isNew: false,
    isHot: false,
    description: 'Champagne francés con burbujas finas y elegantes'
  }
]

const ProductCard = ({ product }: { product: typeof featuredProducts[0] }) => {
  const [isHovered, setIsHovered] = useState(false)
  const addToCart = useCartStore((state) => state.addItem)
  const getItemQuantity = useCartStore((state) => state.getItemQuantity)

  const handleAddToCart = () => {
    if (product.stock > 0) {
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
    } else {
      toast.error('Producto sin stock disponible')
    }
  }

  const currentQuantity = getItemQuantity(product.id)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Imagen del producto */}
      <div className="relative overflow-hidden">
        <div className="aspect-square bg-gray-100">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Imagen del producto</span>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="badge badge-new">NUEVO</span>
          )}
          {product.isHot && (
            <span className="badge badge-discount">HOT</span>
          )}
          {discount > 0 && (
            <span className="badge badge-discount">-{discount}%</span>
          )}
        </div>

        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          <span className={`badge ${product.stock > 5 ? 'badge-stock' : 'badge-discount'}`}>
            {product.stock > 5 ? 'En Stock' : `${product.stock} disponibles`}
          </span>
        </div>

        {/* Botones de acción */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Contenido del producto */}
      <div className="p-6">
        {/* Categoría */}
        <div className="text-sm text-primary-600 font-medium mb-2">
          {product.category}
        </div>

        {/* Nombre */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
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
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Precios */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Botón de agregar al carrito */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {currentQuantity > 0 ? (
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Agregado ({currentQuantity})
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </span>
          )}
        </button>
      </div>
    </motion.div>
  )
}

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Productos Destacados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Descubre nuestras bebidas más populares y mejor valoradas por nuestros clientes
          </motion.p>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a href="/productos" className="btn-outline text-lg px-8 py-4">
            Ver Todos los Productos
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts



