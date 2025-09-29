'use client'

import { motion } from 'framer-motion'
import { Star, Quote, ThumbsUp, Truck, Shield } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'María González',
    location: 'Las flores',
    rating: 5,
    comment: 'Excelente servicio y productos de primera calidad. El envío fue súper rápido y todo llegó perfectamente embalado.',
    avatar: '/images/avatars/maria.jpg',
    order: 'Pedido #1234',
    date: '2024-12-15'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    location: 'Kennedy',
    rating: 5,
    comment: 'La mejor tienda de bebidas online que he probado. Precios increíbles y atención al cliente excepcional.',
    avatar: '/images/avatars/carlos.jpg',
    order: 'Pedido #1235',
    date: '2024-12-14'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    location: 'Inaudi',
    rating: 5,
    comment: 'Compré para una fiesta y quedé encantada. Los productos son auténticos y el delivery fue puntual.',
    avatar: '/images/avatars/ana.jpg',
    order: 'Pedido #1236',
    date: '2024-12-13'
  },
  {
    id: 4,
    name: 'Luis Fernández',
    location: 'Villa el libertador',
    rating: 5,
    comment: 'Gran variedad de productos premium. El control de stock es preciso y las ofertas son reales.',
    avatar: '/images/avatars/luis.jpg',
    order: 'Pedido #1237',
    date: '2024-12-12'
  }
]

const stats = [
  {
    icon: ThumbsUp,
    number: '98%',
    label: 'Clientes Satisfechos'
  },
  {
    icon: Truck,
    number: '24h',
    label: 'Envío Express'
  },
  {
    icon: Shield,
    number: '100%',
    label: 'Productos Originales'
  }
]

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Lo Que Dicen Nuestros Clientes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Descubre por qué miles de clientes confían en Bebidas Santi para sus compras online
          </motion.p>
        </div>

        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header del testimonio */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <Quote className="w-6 h-6 text-primary-300" />
              </div>

              {/* Comentario */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                &quot;{testimonial.comment}&quot;
              </p>

              {/* Información adicional */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{testimonial.order}</span>
                <span>{new Date(testimonial.date).toLocaleDateString('es-AR')}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para Experimentar la Diferencia?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete a miles de clientes satisfechos que ya confían en Bebidas Santi para sus compras online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/productos" className="btn-primary">
                Comenzar a Comprar
              </a>
              <a href="/contacto" className="btn-outline">
                Contactar Soporte
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials



