'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Product, Oferta } from '@/lib/types'

// Función helper robusta para localStorage en móviles
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window === 'undefined') return null
      if (!window.localStorage) return null
      return window.localStorage.getItem(key)
    } catch (error) {
      console.warn('⚠️ Error accediendo a localStorage:', error)
      return null
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window === 'undefined') return false
      if (!window.localStorage) return false
      window.localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.warn('⚠️ Error guardando en localStorage:', error)
      return false
    }
  }
}

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([])
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [allItems, setAllItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(8)
  const [isAdmin, setIsAdmin] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    const loadData = () => {
      try {
        console.log('🔄 Cargando productos...')
        
        // Cargar productos desde localStorage de forma segura
        const savedProducts = safeLocalStorage.getItem('products')
        let productsToShow: Product[] = []
        
        if (savedProducts) {
          try {
            productsToShow = JSON.parse(savedProducts)
          } catch (parseError) {
            console.warn('⚠️ Error parseando productos:', parseError)
            productsToShow = []
          }
        }
        
        setProducts(productsToShow)
        setOfertas([]) // No mostrar ofertas en la página de productos
        setAllItems(productsToShow)
        
        console.log('📦 Productos cargados:', productsToShow.length)
        console.log('📋 Total items:', productsToShow.length)
        
        // Si no hay productos, intentar cargar desde API
        if (productsToShow.length === 0) {
          console.warn('⚠️ No hay productos en localStorage, cargando desde API...')
          
          // Cargar productos desde la API existente
          fetch('/api/images')
            .then(response => response.json())
            .then(data => {
              if (data.products && data.products.length > 0) {
                console.log('✅ Productos cargados desde API:', data.products.length)
                setProducts(data.products)
                setAllItems(data.products)
                // Guardar en localStorage para futuras visitas
                safeLocalStorage.setItem('products', JSON.stringify(data.products))
              }
            })
            .catch(error => {
              console.error('❌ Error cargando desde API:', error)
            })
        }
        
      } catch (error) {
        console.error('❌ Error cargando datos:', error)
        setProducts([])
        setOfertas([])
        setAllItems([])
      } finally {
        setLoading(false)
      }
    }

    // Delay más largo para móviles con conexión lenta
    const timer = setTimeout(loadData, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const isAdminUser = safeLocalStorage.getItem('isAdmin') === 'true'
    setIsAdmin(isAdminUser)
  }, [])

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name || item.title,
      price: item.price || item.finalPrice,
      category: item.category,
      image: item.image,
      type: item.type || 'combo'
    })
    console.log('✅ Item agregado al carrito:', item.name || item.title)
  }

  // Obtener categorías únicas
  const categories = ['Todas', ...Array.from(new Set(allItems.map(item => item.category)))]

  // Filtrar items por categoría
  const filteredItems = selectedCategory === 'Todas'
    ? allItems
    : allItems.filter(item => item.category === selectedCategory)

  // Paginación
  const indexOfLastItem = currentPage * productsPerPage
  const indexOfFirstItem = indexOfLastItem - productsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredItems.length / productsPerPage)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">
            Nuestros Productos
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Descubre nuestra amplia selección de bebidas, licores, vinos y ofertas especiales.
          </p>
        </div>

          {/* Filtros de categoría */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentPage(1)
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-violet-50 hover:text-violet-600 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid de productos */}
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200">
                  <div className="relative h-48 sm:h-64 overflow-hidden bg-gradient-to-br from-violet-100 to-purple-100">
                    <img
                      src={item.image}
                      alt={item.name || item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                        console.error('❌ Error cargando imagen:', item.image)
                        e.currentTarget.style.display = 'none'
                        const container = e.currentTarget.parentElement
                        if (container) {
                          container.innerHTML = `
                            <div class="w-full h-full flex flex-col items-center justify-center text-violet-600">
                              <div class="text-4xl mb-2">${item.type === 'combo' ? '🎁' : '🍷'}</div>
                              <div class="text-sm font-semibold text-center px-2">${item.name || item.title}</div>
                              <div class="text-xs text-violet-500 mt-1">Imagen no disponible</div>
                            </div>
                          `
                        }
                      }}
                      loading="lazy"
                        />
                      </div>
                      <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name || item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    
                        <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-violet-600">
                        ${(item.price || item.finalPrice).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.stock ? `Stock: ${item.stock}` : 'Combo'}
                      </span>
                        </div>
                    
                          <button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            Agregar al carrito
                          </button>
                        </div>
                      </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍷</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No hay productos disponibles</h3>
              <p className="text-gray-600">Los productos se cargarán desde la administración.</p>
            </div>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Anterior
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-violet-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-violet-50 shadow-md'
                    }`}
                  >
                    {page}
                </button>
              ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}