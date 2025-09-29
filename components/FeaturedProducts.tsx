'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react'

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

  const handleWhatsApp = () => {
    const message = `Hola! Me interesa el producto: ${product.name} - $${product.price.toLocaleString()}`
    const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }
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

        {/* Botón de WhatsApp */}
        <button
          onClick={handleWhatsApp}
          disabled={product.stock === 0}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            {product.stock === 0 ? 'Sin Stock' : 'Consultar por WhatsApp'}
          </span>
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



