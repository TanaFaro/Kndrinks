'use client'

import { useState } from 'react'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
        aria-label="Abrir menú"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <div className="px-4 py-6 space-y-4">
            <a 
              href="/" 
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              🏠 Inicio
            </a>
            <a 
              href="/productos" 
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              🛍️ Productos
            </a>
            <a 
              href="/ofertas" 
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              ⭐ Ofertas
            </a>
            <a 
              href="/contacto" 
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              📞 Contacto
            </a>
            <a 
              href="/admin" 
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 mt-4"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Panel Admin</span>
            </a>
          </div>
        </div>
      )}

      {/* Overlay para cerrar menú */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
