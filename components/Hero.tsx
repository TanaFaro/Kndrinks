'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Star, Truck, Shield, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Las Mejores Bebidas",
      subtitle: "Descubre nuestra selección premium de licores, vinos y cervezas",
      image: "/images/hero-1.jpg",
      cta: "Ver Productos",
      link: "/productos"
    },
    {
      title: "Ofertas Especiales",
      subtitle: "Hasta 30% de descuento en seleccionados",
      image: "/images/hero-2.jpg",
      cta: "Ver Ofertas",
      link: "/ofertas"
    },
    {
      title: "Envío Gratis",
      subtitle: "En compras superiores a $50.000",
      image: "/images/hero-3.jpg",
      cta: "Comprar Ahora",
      link: "/productos"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/80 to-secondary-900/90 z-10"></div>
      
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          opacity: 0.3
        }}
      ></div>

      {/* Contenido principal */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Badge destacado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2"
          >
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">Calidad Premium Garantizada</span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            {slides[currentSlide].title}
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            {slides[currentSlide].subtitle}
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href={slides[currentSlide].link} className="btn-primary text-lg px-8 py-4 group">
              {slides[currentSlide].cta}
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/categorias" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-600">
              Explorar Categorías
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicadores de slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Características destacadas */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-t border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Envío Rápido</span>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-secondary-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Pago Seguro</span>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">24/7 Disponible</span>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600 fill-current" />
              </div>
              <span className="text-sm font-medium text-gray-700">Calidad Premium</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero



