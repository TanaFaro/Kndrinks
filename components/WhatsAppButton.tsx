'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Phone, Mail, MapPin } from 'lucide-react'
import { whatsappConfig, generateWhatsAppUrl, getStatusMessage } from '@/config/whatsapp'

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Mostrar el botón después de 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleWhatsAppClick = () => {
    const message = whatsappConfig.messages.consulta
    const whatsappUrl = generateWhatsAppUrl(message)
    window.open(whatsappUrl, '_blank')
  }

  const contactOptions = [
    {
      icon: Phone,
      label: 'Llamar',
      action: () => window.open(`tel:${whatsappConfig.contactInfo.phone}`, '_self'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Mail,
      label: 'Email',
      action: () => window.open(`mailto:${whatsappConfig.contactInfo.email}`, '_self'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      action: () => window.open(`https://maps.google.com/?q=${encodeURIComponent(whatsappConfig.contactInfo.address)}`, '_blank'),
      color: 'bg-red-500 hover:bg-red-600'
    }
  ]

  if (!isVisible) return null

  return (
    <>
      {/* Botón principal de WhatsApp */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white transition-colors duration-200"
        >
          {isOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <MessageCircle className="w-8 h-8" />
          )}
        </motion.button>
      </motion.div>

      {/* Panel de opciones de contacto */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-200 min-w-[200px]">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">¿Cómo te ayudamos?</h3>
                <p className="text-sm text-gray-500">Elige tu método preferido</p>
              </div>

              {/* Opciones de contacto */}
              <div className="space-y-2">
                {contactOptions.map((option, index) => (
                  <motion.button
                    key={option.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={option.action}
                    className={`w-full ${option.color} text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-3 transition-all duration-200 hover:shadow-lg`}
                  >
                    <option.icon className="w-5 h-5" />
                    <span className="font-medium">{option.label}</span>
                  </motion.button>
                ))}
              </div>

                             {/* Mensajes predefinidos */}
               <div className="mt-3 space-y-2">
                 <p className="text-xs text-gray-500 text-center">Mensajes rápidos:</p>
                 <div className="grid grid-cols-2 gap-2">
                   <button
                     onClick={() => window.open(generateWhatsAppUrl(whatsappConfig.messages.pedido), '_blank')}
                     className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                   >
                     Hacer Pedido
                   </button>
                   <button
                     onClick={() => window.open(generateWhatsAppUrl(whatsappConfig.messages.horarios), '_blank')}
                     className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                   >
                     Horarios
                   </button>
                   <button
                     onClick={() => window.open(generateWhatsAppUrl(whatsappConfig.messages.envio), '_blank')}
                     className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                   >
                     Envíos
                   </button>
                   <button
                     onClick={() => window.open(generateWhatsAppUrl(whatsappConfig.messages.stock), '_blank')}
                     className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                   >
                     Consultar Stock
                   </button>
                 </div>
               </div>

               {/* Botón principal de WhatsApp */}
               <motion.button
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
                 onClick={handleWhatsAppClick}
                 className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-3 flex items-center justify-center space-x-3 transition-all duration-200 hover:shadow-lg mt-3 font-semibold"
               >
                 <MessageCircle className="w-5 h-5" />
                 <span>Chat WhatsApp</span>
               </motion.button>

                             {/* Información adicional */}
               <div className="mt-4 pt-3 border-t border-gray-200">
                 <div className="text-center">
                   <p className="text-xs text-gray-500 mb-2">Estado actual:</p>
                   <p className="text-xs text-gray-600 font-medium">{getStatusMessage()}</p>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay para cerrar al hacer clic fuera */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/20"
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default WhatsAppButton
