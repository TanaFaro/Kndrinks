'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Gift, Bell, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor ingresa un email válido')
      return
    }

    setIsLoading(true)
    
    // Simular envío (en producción esto sería una API call)
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      toast.success('¡Te has suscrito exitosamente!')
      setEmail('')
    }, 1000)
  }

  const benefits = [
    {
      icon: Gift,
      title: 'Ofertas Exclusivas',
      description: 'Recibe descuentos especiales solo para suscriptores'
    },
    {
      icon: Bell,
      title: 'Nuevos Productos',
      description: 'Sé el primero en conocer nuestras novedades'
    },
    {
      icon: CheckCircle,
      title: 'Envío Prioritario',
      description: 'Acceso a envíos express y promociones especiales'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-6"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm font-medium">NEWSLETTER EXCLUSIVO</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Únete a KNDrinks
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-2xl mx-auto"
          >
            Suscríbete y recibe ofertas exclusivas, nuevos productos y promociones especiales directamente en tu email
          </motion.p>
        </div>

        {/* Beneficios */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Formulario de suscripción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email aquí..."
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-400 focus:outline-none text-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Suscribiendo...' : 'Suscribirse'}
                </button>
              </div>
              <p className="text-sm text-gray-300 text-center">
                Al suscribirte aceptas recibir emails promocionales. Puedes cancelar en cualquier momento.
              </p>
            </form>
          ) : (
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">¡Suscripción Exitosa!</h3>
              <p className="text-gray-300 mb-4">
                Gracias por unirte a KNDrinks. Pronto recibirás nuestras mejores ofertas.
              </p>
              <button
                onClick={() => setIsSubscribed(false)}
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-600"
              >
                Suscribir Otro Email
              </button>
            </div>
          )}
        </motion.div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h4 className="text-lg font-semibold mb-2">¿Por qué suscribirse?</h4>
            <p className="text-gray-300 text-sm">
              • Ofertas exclusivas con hasta 50% de descuento • Acceso anticipado a nuevos productos • 
              Envíos gratis en compras superiores a $50.000 • Contenido exclusivo sobre cócteles y bebidas
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter



