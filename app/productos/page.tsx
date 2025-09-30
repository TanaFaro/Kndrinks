'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  image: string
  description: string
}

interface ComboProduct {
  productId: number
  productName: string
  quantity: number
  price: number
}

interface Oferta {
  id: number
  title: string
  description: string
  comboProducts: ComboProduct[]
  finalPrice: number
  image: string
  category: string
  active: boolean
  featured?: boolean
  priority?: number
}

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([])
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [allItems, setAllItems] = useState<any[]>([]) // Lista combinada
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(8) // 8 productos por página
  const [isAdmin, setIsAdmin] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    // Datos estáticos de productos
    const staticProducts = [
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
        image: "/images/fernet750.jfif",
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
      },
      {
        id: 4,
        name: "Smirnoff Vodka 750ml",
        price: 3500,
        category: "Licores",
        stock: 20,
        image: "/images/Smirnoffsolo.jpeg",
        description: "Vodka ruso premium"
      },
      {
        id: 5,
        name: "Pritty Limón 2.25L",
        price: 1200,
        category: "Bebidas",
        stock: 40,
        image: "/images/pritty2250.jfif",
        description: "Gaseosa sabor limón"
      },
      {
        id: 6,
        name: "Pritty Limón 3L",
        price: 1800,
        category: "Bebidas",
        stock: 30,
        image: "/images/prittyde3lts.webp",
        description: "Gaseosa sabor limón 3 litros"
      },
      {
        id: 7,
        name: "Gancia 1L",
        price: 3200,
        category: "Licores",
        stock: 25,
        image: "/images/Gancia.jfif",
        description: "Aperitivo italiano clásico"
      },
      {
        id: 8,
        name: "Coca Cola Descartable 500ml",
        price: 800,
        category: "Bebidas",
        stock: 60,
        image: "/images/cocadescartable.jpg",
        description: "Coca Cola en botella descartable"
      },
      {
        id: 9,
        name: "Speed XL",
        price: 1500,
        category: "Bebidas",
        stock: 40,
        image: "/images/SpeedXL.webp",
        description: "Bebida energética XL"
      },
      {
        id: 10,
        name: "Sprite 500ml",
        price: 1000,
        category: "Bebidas",
        stock: 40,
        image: "/images/Sprite.webp",
        description: "Refresco sabor lima-limón"
      },
      {
        id: 11,
        name: "DU Renaissance 750ml",
        price: 6500,
        category: "Licores",
        stock: 15,
        image: "/images/DURenaissance.jfif",
        description: "Vodka premium francés"
      },
      {
        id: 12,
        name: "Vino Viña de Balbo Tinto",
        price: 2200,
        category: "Vinos",
        stock: 25,
        image: "/images/balbo.png",
        description: "Vino tinto premium"
      },
      {
        id: 13,
        name: "Vino Toro 750ml",
        price: 2200,
        category: "Vinos",
        stock: 30,
        image: "/images/vinotoro.jfif",
        description: "Vino tinto de calidad"
      }
    ]
    
    setProducts(staticProducts)
    setLoading(false)
  }, [])

  const categories = ['Todas', 'Bebidas', 'Licores', 'Vinos', 'Aperitivos', 'Sin Alcohol', 'Combos']
  
  const filteredItems = selectedCategory === 'Todas'
    ? allItems
    : allItems.filter(item => item.category === selectedCategory)

  // Paginación
  const indexOfLastItem = currentPage * productsPerPage
  const indexOfFirstItem = indexOfLastItem - productsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

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

  // Funciones de gestión de ofertas
  const loadOfertas = () => {
    try {
      const savedOfertas = localStorage.getItem('ofertas')
      if (savedOfertas) {
        const parsedOfertas: Oferta[] = JSON.parse(savedOfertas)
        setOfertas(parsedOfertas)
        console.log('📦 Ofertas cargadas:', parsedOfertas.length)
      } else {
        setOfertas([])
      }
    } catch (error) {
      console.error('❌ Error cargando ofertas:', error)
      setOfertas([])
    }
  }

  const handleDeleteOferta = (id: number) => {
    const ofertaToDelete = ofertas.find(oferta => oferta.id === id)
    if (!ofertaToDelete) return

    if (window.confirm(`¿Estás seguro de que quieres eliminar la oferta "${ofertaToDelete.title}"?`)) {
      try {
        const updatedOfertas = ofertas.filter(oferta => oferta.id !== id)
        setOfertas(updatedOfertas)
        localStorage.setItem('ofertas', JSON.stringify(updatedOfertas))
        console.log('🗑️ Oferta eliminada:', ofertaToDelete.title)
        alert(`✅ Oferta "${ofertaToDelete.title}" eliminada correctamente.`)
      } catch (error) {
        console.error('❌ Error eliminando oferta:', error)
        alert('❌ Error al eliminar la oferta.')
      }
    }
  }

  const handleEditOferta = (id: number) => {
    window.location.href = `/admin/ofertas/edit/${id}`
  }

  const handleToggleActiveOferta = (id: number) => {
    const ofertaToToggle = ofertas.find(oferta => oferta.id === id)
    if (!ofertaToToggle) return

    try {
      const updatedOfertas = ofertas.map(oferta => 
        oferta.id === id ? { ...oferta, active: !oferta.active } : oferta
      )
      setOfertas(updatedOfertas)
      localStorage.setItem('ofertas', JSON.stringify(updatedOfertas))
      
      const newStatus = !ofertaToToggle.active ? 'activada' : 'desactivada'
      console.log(`🔄 Oferta ${newStatus}:`, ofertaToToggle.title)
      alert(`✅ Oferta "${ofertaToToggle.title}" ${newStatus} correctamente.`)
    } catch (error) {
      console.error('❌ Error cambiando estado:', error)
      alert('❌ Error al cambiar el estado.')
    }
  }

  const calculateIndividualPrice = (comboProducts: ComboProduct[]) => {
    if (!comboProducts || !Array.isArray(comboProducts)) return 0
    return comboProducts.reduce((total, product) => {
      if (!product || typeof product.price !== 'number' || typeof product.quantity !== 'number') {
        return total
      }
      return total + (product.price * product.quantity)
    }, 0)
  }

  // Verificar si es administrador
  useEffect(() => {
    const checkAdminStatus = () => {
      const isAdminUser = localStorage.getItem('isAdmin') === 'true'
      setIsAdmin(isAdminUser)
    }
    checkAdminStatus()
  }, [])

  // Cargar ofertas
  useEffect(() => {
    loadOfertas()
  }, [])

  // Combinar productos y ofertas cuando cambien
  useEffect(() => {
    const combinedItems = [
      ...products.map(product => ({ ...product, type: 'product' })),
      ...ofertas.map(oferta => ({ ...oferta, type: 'oferta' }))
    ]
    setAllItems(combinedItems)
  }, [products, ofertas])

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
          
          {currentItems.length > 0 ? (
            <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((item) => {
                // Renderizar producto
                if (item.type === 'product') {
                  const product = item as Product
                  return (
                    <div key={product.id} className="product-card group bg-violet-50/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200/30">
                      <div className="h-48 sm:h-56 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => e.currentTarget.src = '/images/LogoBebidas.jpeg'}
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
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              category: product.category,
                              image: product.image,
                              type: 'product'
                            })
                          }}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <span className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                            </svg>
                            <span>Agregar al carrito</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  )
                }
                
                // Renderizar oferta
                if (item.type === 'oferta') {
                  const oferta = item as Oferta
                  const individualPrice = calculateIndividualPrice(oferta.comboProducts)
                  return (
                    <div key={`oferta-${oferta.id}`} className="product-card group bg-gradient-to-br from-yellow-50 to-orange-50 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-yellow-200/30">
                      <div className="h-48 sm:h-56 bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 flex items-center justify-center group-hover:from-yellow-200 group-hover:via-orange-200 group-hover:to-red-200 transition-all duration-500 relative overflow-hidden">
                        <img 
                          src={oferta.image} 
                          alt={oferta.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => e.currentTarget.src = '/images/LogoBebidas.jpeg'}
                        />
                        {/* Badge de oferta */}
                        <div className="absolute top-3 right-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                            oferta.active 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white'
                          }`}>
                            {oferta.active ? '✅ Activa' : '❌ Inactiva'}
                          </span>
                        </div>
                        {/* Badge de popularidad */}
                        {oferta.priority && oferta.priority >= 2 && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ⭐ {oferta.priority >= 5 ? 'MÁS PEDIDO' : oferta.priority >= 4 ? 'MUY POPULAR' : 'POPULAR'}
                          </div>
                        )}
                      </div>
                      <div className="p-8">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                          {oferta.category}
                        </div>
                        <h3 className="product-title text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors">
                          {oferta.title}
                        </h3>
                        <p className="text-slate-600 mb-4 text-sm">
                          {oferta.description}
                        </p>
                        
                        {/* Precios de oferta */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">Precio individual:</span>
                            <span className="text-sm text-gray-600 line-through">
                              ${individualPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">Precio combo:</span>
                            <span className="text-2xl font-bold text-orange-600">
                              ${oferta.finalPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-green-600 font-semibold">Ahorro:</span>
                            <span className="text-sm text-green-600 font-semibold">
                              ${(individualPrice - oferta.finalPrice).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Productos incluidos */}
                        <div className="mb-6">
                          <p className="text-xs text-gray-500 mb-2">Incluye:</p>
                          <div className="space-y-1">
                            {oferta.comboProducts.slice(0, 2).map((product, index) => (
                              <div key={index} className="text-xs text-gray-600">
                                {product.quantity}x {product.productName}
                              </div>
                            ))}
                            {oferta.comboProducts.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{oferta.comboProducts.length - 2} más...
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Botones de acción para ofertas */}
                        {isAdmin ? (
                          <div className="space-y-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditOferta(oferta.id)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleToggleActiveOferta(oferta.id)}
                                className={`flex-1 font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${
                                  oferta.active 
                                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                              >
                                {oferta.active ? 'Desactivar' : 'Activar'}
                              </button>
                            </div>
                            <button
                              onClick={() => handleDeleteOferta(oferta.id)}
                              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                              Eliminar
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => {
                              addItem({
                                id: oferta.id,
                                name: oferta.title,
                                price: oferta.finalPrice,
                                category: oferta.category,
                                image: oferta.image,
                                type: 'oferta'
                              })
                            }}
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <span className="flex items-center justify-center space-x-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                              </svg>
                              <span>Agregar al carrito</span>
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  )
                }
                
                return null
              })}
              
            </div>
          ) : (
            <p className="text-center text-slate-600 text-lg">No hay productos disponibles en esta categoría.</p>
          )}

          {/* Paginación */}
          {products.length > productsPerPage && (
            <div className="flex justify-center mt-12">
              {Array.from({ length: Math.ceil(filteredItems.length / productsPerPage) }, (_, i) => (
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

      {/* Sección de Ofertas (solo para administradores) */}
      {isAdmin && ofertas.length > 0 && (
        <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
                Ofertas
              </h2>
              <div className="flex items-center space-x-4">
                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {ofertas.length} total
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {ofertas.filter(o => o.active).length} activas
                </span>
                <button
                  onClick={() => window.location.href = '/admin/ofertas/new'}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                >
                  Nueva Oferta
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ofertas.map((oferta) => {
                const individualPrice = calculateIndividualPrice(oferta.comboProducts)
                return (
                  <div key={oferta.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    {/* Imagen */}
                    <div className="h-48 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src={oferta.image} 
                        alt={oferta.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/images/LogoBebidas.jpeg'
                        }}
                      />
                      {/* Badge de estado */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                          oferta.active 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {oferta.active ? '✅ Activa' : '❌ Inactiva'}
                        </span>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{oferta.title}</h3>
                        {oferta.priority && oferta.priority >= 2 && (
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            ⭐ {oferta.priority >= 5 ? 'MÁS PEDIDO' : oferta.priority >= 4 ? 'MUY POPULAR' : 'POPULAR'}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4">{oferta.description}</p>
                      
                      {/* Categoría */}
                      <div className="mb-4">
                        <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                          {oferta.category}
                        </span>
                      </div>

                      {/* Precios */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">Precio individual:</span>
                          <span className="text-sm text-gray-600 line-through">
                            ${individualPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">Precio combo:</span>
                          <span className="text-2xl font-bold text-violet-600">
                            ${oferta.finalPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-green-600 font-semibold">Ahorro:</span>
                          <span className="text-sm text-green-600 font-semibold">
                            ${(individualPrice - oferta.finalPrice).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Productos incluidos */}
                      <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-2">Incluye:</p>
                        <div className="space-y-1">
                          {oferta.comboProducts.slice(0, 2).map((product, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              {product.quantity}x {product.productName}
                            </div>
                          ))}
                          {oferta.comboProducts.length > 2 && (
                            <div className="text-sm text-gray-500">
                              +{oferta.comboProducts.length - 2} más...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditOferta(oferta.id)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleToggleActiveOferta(oferta.id)}
                            className={`flex-1 font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${
                              oferta.active 
                                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                          >
                            {oferta.active ? 'Desactivar' : 'Activar'}
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteOferta(oferta.id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}