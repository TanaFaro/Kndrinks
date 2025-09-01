'use client'

import { motion } from 'framer-motion'
import { Tag, Clock, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const specialOffers = [
  {
    id: '1',
    title: 'Pack Premium Whisky',
    description: '3 botellas de whisky premium con 25% de descuento',
    originalPrice: 150000,
    discountPrice: 112500,
    discount: 25,
    image: '/images/offers/whisky-pack.jpg',
    validUntil: '2024-12-31',
    stock: 8,
    category: 'Whisky',
    isHot: true
  },
  {
    id: '2',
    title: 'Combo Fiesta',
    description: 'Vodka + Gin + Ron + Mixers con 30% OFF',
    originalPrice: 120000,
    discountPrice: 84000,
    discount: 30,
    image: '/images/offers/party-combo.jpg',
    validUntil: '2024-12-25',
    stock: 15,
    category: 'Combos',
    isHot: true
  },
  {
    id: '3',
    title: 'Vinos Seleccionados',
    description: 'Pack de 6 vinos tintos premium con 20% de descuento',
    originalPrice: 80000,
    discountPrice: 64000,
    discount: 20,
    image: '/images/offers/wine-pack.jpg',
    validUntil: '2024-12-28',
    stock: 12,
    category: 'Vinos',
    isHot: false
  }
]

const SpecialOffers = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full mb-4"
          >
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium">OFERTAS ESPECIALES</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Ofertas Imperdibles
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Aprovecha nuestros descuentos especiales y combos exclusivos por tiempo limitado
          </motion.p>
        </div>

        {/* Grid de ofertas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {specialOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Imagen */}
                <div className="relative">
                  <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Imagen de oferta</span>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {offer.isHot && (
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        HOT
                      </div>
                    )}
                    <div className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      -{offer.discount}%
                    </div>
                  </div>
                  
                  {/* Stock */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      {offer.stock} disponibles
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-medium mb-2">
                    {offer.category}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {offer.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4">
                    {offer.description}
                  </p>
                  
                  {/* Precios */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      ${offer.discountPrice.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${offer.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Válido hasta */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Válido hasta: {new Date(offer.validUntil).toLocaleDateString('es-AR')}</span>
                  </div>
                  
                  {/* Botón */}
                  <Link href={`/ofertas/${offer.id}`} className="btn-primary w-full text-center">
                    Ver Oferta
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/ofertas" className="btn-outline text-lg px-8 py-4">
            Ver Todas las Ofertas
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default SpecialOffers



