'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, Phone } from 'lucide-react'
import SearchModal from './SearchModal'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 sm:space-x-4">
              <img 
                src="/images/Logo Bebidas.jpeg" 
                alt="KNDrinks Logo" 
                className="h-12 sm:h-16 w-auto object-contain rounded-xl"
              />
              <span className="hidden sm:block text-xl font-bold text-gray-800">KNDrinks</span>
            </Link>

            {/* Navegación Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Inicio
              </Link>
              <Link href="/productos" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Productos
              </Link>
              <Link href="/categorias" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Categorías
              </Link>
              <Link href="/ofertas" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Ofertas
              </Link>
              <Link href="/contacto" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Contacto
              </Link>
            </nav>

            {/* Acciones Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Search size={20} />
              </button>
              
              <Link href="/mi-cuenta" className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <User size={20} />
              </Link>
              
              <Link href="https://wa.me/5491112345678" className="p-2 text-green-600 hover:text-green-700 transition-colors">
                <Phone size={20} />
              </Link>
              
            </div>

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Menú móvil */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  href="/productos"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Productos
                </Link>
                <Link
                  href="/categorias"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categorías
                </Link>
                <Link
                  href="/ofertas"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Ofertas
                </Link>
                <Link
                  href="/contacto"
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
                
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Espaciador para el contenido */}
      <div className="h-16 lg:h-20"></div>

      {/* Modales */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

export default Header
