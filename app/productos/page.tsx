'use client'

import { useState, useEffect } from 'react'

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

  useEffect(() => {
    // Verificar que estamos en el cliente
    if (typeof window === 'undefined') return
    
    // Cargar productos desde localStorage
    const savedProducts = localStorage.getItem('products')
    
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts)
        setProducts(parsedProducts)
      } catch (error) {
        console.error('Error parsing products:', error)
      }
    } else {
      // Datos de ejemplo si no hay productos guardados
      const exampleProducts = [
        {
          id: 1,
          name: "Coca Cola 2.25L",
          price: 2500,
          category: "Bebidas",
          stock: 50,
          image: "/images/cocacola.jfif",
          description: "Refresco clásico de Coca Cola"
        },
        {
          id: 2,
          name: "Fernet Branca 750ml",
          price: 4500,
          category: "Licores",
          stock: 30,
          image: "/images/fernet 750.jfif",
          description: "Fernet italiano de alta calidad"
        },
        {
          id: 3,
          name: "Skyy Vodka 750ml",
          price: 3800,
          category: "Licores",
          stock: 25,
          image: "/images/skyy.png",
          description: "Vodka premium americano"
        }
      ]
      setProducts(exampleProducts)
      localStorage.setItem('products', JSON.stringify(exampleProducts))
    }
    setLoading(false)
  }, [])

  const categories = ['Todas', ...new Set(products.map(product => product.category))]

  const filteredProducts = selectedCategory === 'Todas'
    ? products
    : products.filter(product => product.category === selectedCategory)

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Resetear página cuando cambie la categoría
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  // Mostrar loading si está cargando
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
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
            Explora nuestra amplia selección de bebidas. ¡Encuentra tus favoritas!
          </p>
        </div>
      </section>

      {/* Filtro de Categorías */}
      <section className="py-12 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Filtrar por Categoría</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white transform scale-105'
                    : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lista de Productos */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            {selectedCategory === 'Todas' ? 'Todos los Productos' : `Productos de ${selectedCategory}`}
          </h2>
          
          {currentProducts.length > 0 ? (
            <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.map((product) => (
                <div key={product.id} className="product-card group bg-violet-50/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200/30">
                  <div className="h-48 sm:h-56 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => e.currentTarget.src = '/images/Logo Bebidas.jpeg'} // Fallback image
                    />
                  </div>
                  <div className="p-8">
                    <div className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                      {product.category}
                    </div>
                    <h3 className="product-title text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <span className="product-price text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-500">Stock: {product.stock}</span>
                    </div>
                    <button 
                      onClick={() => {
                        const message = `Hola! Me interesa el producto: ${product.name} - $${product.price.toLocaleString()}`
                        const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent(message)}`
                        window.open(whatsappUrl, '_blank')
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        <span>Consultar por WhatsApp</span>
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-600 text-lg">No hay productos disponibles en esta categoría.</p>
          )}

          {/* Paginación */}
          {products.length > productsPerPage && (
            <div className="flex justify-center mt-12">
              {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`mx-2 px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
                    currentPage === i + 1
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 shadow-md'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}