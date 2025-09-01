// Configuración de WhatsApp para KNDrinks
export const whatsappConfig = {
  // Número de WhatsApp (formato internacional sin +)
  phoneNumber: '5493517738174',
  
  // Mensajes predefinidos
  messages: {
    consulta: 'Hola! Me gustaría hacer una consulta sobre sus productos.',
    pedido: 'Hola! Quisiera hacer un pedido.',
    horarios: 'Hola! ¿Cuáles son sus horarios de atención?',
    envio: 'Hola! ¿Hacen envíos a mi zona?',
    stock: 'Hola! ¿Tienen stock del producto X?'
  },
  
  // Horarios de atención
  businessHours: {
    sunday: { open: '10:00', close: '23:00' },
    monday: { open: '10:00', close: '23:00' },
    tuesday: { open: '10:00', close: '23:00' },
    wednesday: { open: '10:00', close: '23:00' },
    thursday: { open: '10:00', close: '23:00' },
    friday: { open: '10:00', close: '23:00' },
    saturday: { open: '10:00', close: '23:00' }
  },
  
  // Tiempo de respuesta estimado
  responseTime: '5-10 minutos',
  
  // Información de contacto adicional
  contactInfo: {
    phone: '+54 9 351 773-8174',
    address: 'Rimini 343 - Córdoba, Argentina'
  }
}

// Función para generar URL de WhatsApp
export const generateWhatsAppUrl = (message: string, phone?: string) => {
  const phoneNumber = phone || whatsappConfig.phoneNumber
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}

// Función para verificar si está en horario de atención
export const isBusinessOpen = () => {
  const now = new Date()
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof whatsappConfig.businessHours
  const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
  
  const todayHours = whatsappConfig.businessHours[currentDay]
  if (!todayHours) return false
  
  return currentTime >= todayHours.open && currentTime <= todayHours.close
}

// Función para obtener mensaje de estado
export const getStatusMessage = () => {
  if (isBusinessOpen()) {
    return `Abierto • Responde en ${whatsappConfig.responseTime}`
  }
  return 'Cerrado • Abre mañana a las 10:00'
}
