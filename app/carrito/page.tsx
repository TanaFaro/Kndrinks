'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react'

export default function Carrito() {
  const [mounted, setMounted] = useState(false)
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando carrito...</p>
        </div>
      </div>
    )
  }

  const handlePurchase = () => {
    if (items.length === 0) return

    // Formatear el mensaje de WhatsApp
    let message = '🛒 *PEDIDO KNDrinks*\n\n'
    
    // Agrupar productos por tipo
    const products = items.filter(item => item.type === 'product')
    const combos = items.filter(item => item.type === 'combo')
    
    if (products.length > 0) {
      message += '*Productos:*\n'
      products.forEach(item => {
        message += `• ${item.quantity}x ${item.name} - $${item.price.toLocaleString('es-AR')}\n`
      })
      message += '\n'
    }
    
    if (combos.length > 0) {
      message += '*Combos:*\n'
      combos.forEach(item => {
        message += `• ${item.quantity}x ${item.name} - $${item.price.toLocaleString('es-AR')}\n`
      })
      message += '\n'
    }
    
    message += `*Total: $${getTotalPrice().toLocaleString('es-AR')}*\n\n`
    message += '¿Confirmas este pedido?'
    
    const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">Agrega algunos productos para comenzar tu pedido</p>
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continuar comprando</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 text-gray-600 hover:text-violet-600 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Mi Carrito</h1>
            <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm font-medium">
              {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
            </span>
          </div>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Vaciar carrito
          </button>
        </div>

        {/* Lista de productos */}
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-xl font-bold text-violet-600">
                  ${item.price.toLocaleString('es-AR')}
                </p>
              </div>
              
              {/* Controles de cantidad */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-bold text-gray-800 min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {/* Precio total del item */}
              <div className="text-right">
                <p className="text-xl font-bold text-gray-800">
                  ${(item.price * item.quantity).toLocaleString('es-AR')}
                </p>
              </div>
              
              {/* Botón eliminar */}
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Resumen y botón de compra */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Total del pedido</h2>
            <p className="text-3xl font-bold text-violet-600">
              ${getTotalPrice().toLocaleString('es-AR')}
            </p>
          </div>
          
          <button
            onClick={handlePurchase}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>Comprar por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  )
}
