'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, Truck } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore()

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Tu carrito está vacío')
      return
    }
    
    setIsCheckingOut(true)
    // Simular proceso de checkout
    setTimeout(() => {
      toast.success('¡Pedido realizado con éxito!')
      clearCart()
      setIsCheckingOut(false)
      onClose()
    }, 2000)
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      toast.success('Producto removido del carrito')
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const shippingCost = total > 50000 ? 0 : 3000
  const finalTotal = total + shippingCost

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6 text-primary-600" />
                <h2 className="text-xl font-bold text-gray-900">Tu Carrito</h2>
                {items.length > 0 && (
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Contenido del carrito */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-500 mb-6">
                    Agrega algunos productos para comenzar a comprar
                  </p>
                  <button
                    onClick={onClose}
                    className="btn-primary"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Lista de productos */}
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      {/* Imagen del producto */}
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Imagen</span>
                      </div>

                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-sm font-semibold text-primary-600">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Controles de cantidad */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Botón eliminar */}
                      <button
                        onClick={() => {
                          removeItem(item.id)
                          toast.success('Producto removido del carrito')
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer con total y checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Resumen de costos */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Envío:</span>
                    <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                      {shippingCost === 0 ? 'GRATIS' : `$${shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  {shippingCost > 0 && (
                    <div className="text-xs text-gray-500 text-center">
                      Envío gratis en compras superiores a $50.000
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>${finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Procesando...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Finalizar Compra</span>
                      </span>
                    )}
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full btn-outline py-3"
                  >
                    Vaciar Carrito
                  </button>
                </div>

                {/* Información adicional */}
                <div className="text-center text-xs text-gray-500 space-y-1">
                  <p>• Envío en 24-48 horas</p>
                  <p>• Pago seguro con Mercado Pago</p>
                  <p>• Productos 100% originales</p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer



