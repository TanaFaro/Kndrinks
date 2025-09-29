'use client'

import { useState, useEffect } from 'react'
import { useClientOnly } from '@/lib/useClientOnly'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  image: string
  description: string
}

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(8) // 8 productos por página
  const { isClient, mounted, isReady } = useClientOnly()

  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof window === 'undefined') return
    
    // Cargar productos desde localStorage
    const savedProducts = localStorage.getItem('products')
    console.log('Productos guardados en localStorage:', savedProducts)
    
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts)
        console.log('Productos parseados:', parsedProducts)
        setProducts(parsedProducts)
      } catch (error) {
        console.error('Error parsing products:', error)
      }
    } else {
      console.log('No hay productos guardados, usando productos de ejemplo')
      // Productos de ejemplo si no hay ninguno guardado
      const exampleProducts: Product[] = [
        {
          id: 1,
          name: 'Whisky Premium',
          price: 15000,
          category: 'Licores',
          stock: 10,
          image: '/images/Logo Bebidas.jpeg',
          description: 'Whisky de alta calidad'
        },
        {
          id: 2,
          name: 'Vino Tinto Reserva',
          price: 8500,
          category: 'Vinos',
          stock: 15,
          image: '/images/Logo Bebidas.jpeg',
          description: 'Vino tinto reserva especial'
        },
        {
          id: 3,
          name: 'Cerveza Artesanal',
          price: 1200,
          category: 'Cervezas',
          stock: 50,
          image: '/images/Logo Bebidas.jpeg',
          description: 'Cerveza artesanal premium'
        }
      ]
      setProducts(exampleProducts)
    }
    setLoading(false)
  }, [])

  // Filtrar productos por categoría
  const filteredProducts = selectedCategory === 'Todas' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  // Calcular paginación
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Obtener categorías únicas
  const categories = ['Todas', ...Array.from(new Set(products.map(p => p.category)))]

  // Resetear página cuando cambie la categoría
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  // Evitar renderizado hasta que esté montado en el cliente
  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Header Moderno */}
      <section className="py-24 px-4 text-center bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">
            Nuestros Productos
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra amplia selección de bebidas premium, desde licores exclusivos hasta vinos de la mejor calidad
          </p>
        </div>
      </section>

      {/* Filtros Modernos */}
      <section className="py-16 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-violet-200/30">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Filtrar Productos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div key={category} className="group">
                  <button 
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full py-6 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border ${
                      selectedCategory === category
                        ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white border-violet-500'
                        : 'bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 hover:from-violet-100 hover:via-purple-100 hover:to-indigo-100 text-slate-700 border-violet-200/40 hover:border-violet-300/60'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 ${
                        selectedCategory === category
                          ? 'bg-white/20 text-white'
                          : 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
                      }`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <span className="text-lg font-bold">{category}</span>
                      <span className="text-sm text-center leading-tight opacity-80">
                        {category === 'Todas' ? 'Ver todos los productos' : `Filtrar por ${category}`}
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Productos */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">No hay productos disponibles</h3>
              <p className="text-slate-600 mb-8">No se encontraron productos en esta categoría.</p>
              <button 
                onClick={() => setSelectedCategory('Todas')}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                  {selectedCategory === 'Todas' ? 'Todos los Productos' : `Productos - ${selectedCategory}`}
                </h2>
                <p className="text-slate-600">
                  Mostrando {currentProducts.length} de {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} (Página {currentPage} de {totalPages})
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {currentProducts.map((product) => (
                  <div key={product.id} className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200/30">
                    <div className="h-48 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 overflow-hidden">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = '/images/Logo Bebidas.jpeg'
                          }}
                        />
                      ) : (
                        <div className="text-violet-600 group-hover:text-violet-700 transition-colors duration-300">
                          <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-violet-600 font-semibold mb-2 uppercase tracking-wide">
                        {product.category}
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <p className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-3">
                        ${product.price.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' : 
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 0 ? `${product.stock} en stock` : 'Sin stock'}
                        </span>
                      </div>
                      <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={product.stock === 0}>
                        <span className="flex items-center justify-center space-x-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                          </svg>
                          <span>{product.stock > 0 ? 'Agregar' : 'Sin stock'}</span>
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Paginación Funcional */}
      {filteredProducts.length > productsPerPage && (
        <section className="py-16 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center space-x-2 flex-wrap gap-2">
              {/* Botón Anterior */}
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`w-12 h-12 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white/80 text-slate-600 hover:bg-violet-100 hover:text-slate-800 shadow-lg hover:shadow-xl'
                }`}
              >
                ←
              </button>

              {/* Números de página */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Mostrar solo algunas páginas alrededor de la actual
                const showPage = page === 1 || page === totalPages || 
                  (page >= currentPage - 1 && page <= currentPage + 1)
                
                if (!showPage) {
                  // Mostrar puntos suspensivos
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return (
                      <span key={`dots-${page}`} className="text-slate-400 font-bold">
                        ...
                      </span>
                    )
                  }
                  return null
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-12 h-12 rounded-2xl font-bold transition-all duration-300 ${
                      page === currentPage
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-xl'
                        : 'bg-white/80 text-slate-600 hover:bg-violet-100 hover:text-slate-800 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {page}
                  </button>
                )
              })}

              {/* Botón Siguiente */}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`w-12 h-12 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white/80 text-slate-600 hover:bg-violet-100 hover:text-slate-800 shadow-lg hover:shadow-xl'
                }`}
              >
                →
              </button>
            </div>
            
            {/* Información de paginación */}
            <div className="text-center mt-4">
              <p className="text-slate-600 text-sm">
                Página {currentPage} de {totalPages} • {filteredProducts.length} productos total
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
