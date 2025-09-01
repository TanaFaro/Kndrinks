'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Wine, 
  Beer, 
  Coffee, 
  Droplets, 
  Sparkles, 
  Star,
  TrendingUp,
  Gift,
  Heart
} from 'lucide-react'

const categories = [
  {
    id: 'whisky',
    name: 'Whisky',
    description: 'Single malt, blended y premium',
    icon: Coffee,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    count: 45,
    discount: 'Hasta 21% OFF'
  },
  {
    id: 'vodka',
    name: 'Vodka',
    description: 'Premium y artesanales',
    icon: Droplets,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    count: 32,
    discount: 'Hasta 13% OFF'
  },
  {
    id: 'ron',
    name: 'Ron y Tequila',
    description: 'Caribeño y mexicano',
    icon: Star,
    color: 'from-yellow-500 to-orange-600',
    bgColor: 'bg-yellow-50',
    count: 28,
    discount: 'Hasta 15% OFF'
  },
  {
    id: 'gin',
    name: 'Gin',
    description: 'London Dry y artesanales',
    icon: Sparkles,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    count: 25,
    discount: 'Hasta 16% OFF'
  },
  {
    id: 'vino',
    name: 'Vinos',
    description: 'Tintos, blancos y rosados',
    icon: Wine,
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50',
    count: 67,
    discount: 'Hasta 13% OFF'
  },
  {
    id: 'cerveza',
    name: 'Cervezas',
    description: 'Artesanales y premium',
    icon: Beer,
    color: 'from-yellow-400 to-amber-600',
    bgColor: 'bg-yellow-50',
    count: 89,
    discount: 'Hasta 8% OFF'
  },
  {
    id: 'champagne',
    name: 'Champagne',
    description: 'Espumantes y champagne',
    icon: Gift,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    count: 23,
    discount: 'Hasta 19% OFF'
  },
  {
    id: 'perfumes',
    name: 'Perfumes Árabes',
    description: 'Fragancias exclusivas',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    count: 34,
    discount: 'Hasta 15% OFF'
  },
  {
    id: 'ofertas',
    name: 'Ofertas Especiales',
    description: 'Descuentos increíbles',
    icon: TrendingUp,
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50',
    count: 156,
    discount: 'Hasta 30% OFF',
    special: true
  }
]

const CategoryGrid = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Explora Nuestras Categorías
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Descubre la mejor selección de bebidas premium organizadas por categorías
          </motion.p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/categorias/${category.id}`}>
                <div className={`${category.bgColor} rounded-2xl p-6 h-full transition-all duration-300 group-hover:shadow-xl border border-transparent group-hover:border-gray-200`}>
                  {/* Header de la categoría */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    {category.special && (
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        HOT
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Información adicional */}
                    <div className="flex items-center justify-between pt-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{category.count} productos</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-primary-600">
                          {category.discount}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Indicador de hover */}
                  <div className="mt-4 flex items-center text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
                    Explorar categoría
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/categorias" className="btn-outline text-lg px-8 py-4">
            Ver Todas las Categorías
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CategoryGrid
