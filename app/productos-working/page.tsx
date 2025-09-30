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

interface ComboProduct {
  productId: number
  name: string
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

export default function ProductosWorking() {
  const [products, setProducts] = useState<Product[]>([])
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [allItems, setAllItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(8)
  const [isAdmin, setIsAdmin] = useState(false)

  // Cargar productos estáticos
  useEffect(() => {
    const staticProducts: Product[] = [
      {
        id: 1,
        name: "Coca Cola 2.25L",
        price: 1000,
        category: "Bebidas",
        stock: 50,
        image: "/images/cocacola.jfif",
        description: "Coca Cola 2.25 litros"
      },
      {
        id: 2,
        name: "Fernet Branca 750ml",
        price: 4500,
        category: "Licores",
        stock: 20,
        image: "/images/fernet750.jfif",
        description: "Fernet Branca 750ml"
      },
      {
        id: 3,
        name: "Skyy Vodka",
        price: 9500,
        category: "Licores",
        stock: 15,
        image: "/images/skyy.png",
        description: "Skyy Vodka premium"
      },
      {
        id: 4,
        name: "Smirnoff Saborizado",
        price: 8000,
        category: "Licores",
        stock: 12,
        image: "/images/Smirnoffsolo.jpeg",
        description: "Smirnoff con sabor"
      },
      {
        id: 5,
        name: "Gancia",
        price: 8000,
        category: "Aperitivos",
        stock: 18,
        image: "/images/Gancia.jfif",
        description: "Gancia aperitivo"
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
        name: "Pritty de 2.25L",
        price: 1200,
        category: "Bebidas",
        stock: 40,
        image: "/images/prittyde2250lt.jpg",
        description: "Gaseosa 2.25 litros"
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
        name: "DU Renaissance",
        price: 5000,
        category: "Vinos",
        stock: 15,
        image: "/images/DURenaissance.jfif",
        description: "Vino DU Renaissance"
      },
      {
        id: 11,
        name: "Vino Toro 750ml",
        price: 2200,
        category: "Vinos",
        stock: 25,
        image: "/images/vinotoro.jfif",
        description: "Vino Toro tinto 750ml"
      },
      {
        id: 12,
        name: "Vino Viña de Balbo Tinto",
        price: 2200,
        category: "Vinos",
        stock: 25,
        image: "/images/balbomaspritty.png",
        description: "Vino tinto premium"
      }
    ]

    setProducts(staticProducts)
    setLoading(false)
  }, [])

  // Cargar ofertas
  useEffect(() => {
    const exampleOfertas: Oferta[] = [
      {
        id: 1,
        title: "Combo Fernet + Coca",
        description: "Fernet Branca 750ml + 2 Coca Cola 2.25L",
        comboProducts: [
          { productId: 2, name: "Fernet Branca 750ml", quantity: 1, price: 4500 },
          { productId: 1, name: "Coca Cola 2.25L", quantity: 2, price: 1000 }
        ],
        finalPrice: 6500,
        image: "/images/fernetmas2cocas.jfif",
        category: "Combos",
        active: true,
        featured: true,
        priority: 5
      },
      {
        id: 2,
        title: "Combo Skyy + Speed",
        description: "Skyy Vodka + Speed XL",
        comboProducts: [
          { productId: 3, name: "Skyy Vodka", quantity: 1, price: 9500 },
          { productId: 9, name: "Speed XL", quantity: 1, price: 1500 }
        ],
        finalPrice: 10000,
        image: "/images/skyymasspeed.jfif",
        category: "Combos",
        active: true,
        featured: false,
        priority: 3
      },
      {
        id: 3,
        title: "Combo DU + Speed",
        description: "DU Renaissance + Speed XL",
        comboProducts: [
          { productId: 10, name: "DU Renaissance", quantity: 1, price: 5000 },
          { productId: 9, name: "Speed XL", quantity: 1, price: 1500 }
        ],
        finalPrice: 6000,
        image: "/images/Duconspeed.jfif",
        category: "Combos",
        active: true,
        featured: false,
        priority: 2
      }
    ]

    setOfertas(exampleOfertas)
  }, [])

  // Combinar productos y ofertas
  useEffect(() => {
    const combinedItems = [
      ...products.map(product => ({ ...product, type: 'product' })),
      ...ofertas.map(oferta => ({ ...oferta, type: 'oferta' }))
    ]
    setAllItems(combinedItems)
  }, [products, ofertas])

  // Verificar si es administrador
  useEffect(() => {
    const isAdminUser = localStorage.getItem('isAdmin') === 'true'
    setIsAdmin(isAdminUser)
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

  const setAsAdmin = () => {
    localStorage.setItem('isAdmin', 'true')
    setIsAdmin(true)
    console.log('✅ Establecido como administrador')
    alert('✅ Ahora eres administrador! Recarga la página para ver los cambios.')
  }

  const addToCart = (item: any) => {
    console.log('Agregando al carrito:', item)
    alert(`✅ ${item.name || item.title} agregado al carrito!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <section className="py-24 px-4 text-center bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">
            Nuestros Productos
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Descubre nuestra amplia selección de bebidas, licores y combos especiales. 
            Calidad premium al mejor precio.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-violet-50 hover:text-violet-700 shadow-md'
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((item) => {
                // Renderizar producto
                if (item.type === 'product') {
                  const product = item as Product
                  return (
                    <div key={product.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/LogoBebidas.jpeg'
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-violet-600">${product.price.toLocaleString()}</span>
                          <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                        </div>
                        <button 
                          onClick={() => addToCart(product)}
                          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-2xl font-bold transition-all duration-300"
                        >
                          Agregar al carrito
                        </button>
                      </div>
                    </div>
                  )
                }
                
                // Renderizar oferta
                if (item.type === 'oferta') {
                  const oferta = item as Oferta
                  return (
                    <div key={`oferta-${oferta.id}`} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-yellow-200">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={oferta.image}
                          alt={oferta.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/LogoBebidas.jpeg'
                          }}
                        />
                        {oferta.featured && (
                          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            ⭐ DESTACADO
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{oferta.title}</h3>
                        <p className="text-gray-600 mb-4">{oferta.description}</p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-orange-600">${oferta.finalPrice.toLocaleString()}</span>
                          <span className="text-sm text-gray-500">Combo</span>
                        </div>
                        <button 
                          onClick={() => addToCart(oferta)}
                          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-2xl font-bold transition-all duration-300"
                        >
                          Agregar al carrito
                        </button>
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
          {filteredItems.length > productsPerPage && (
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

      {/* Debug Panel */}
      {!isAdmin && (
        <section className="py-8 px-4 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-orange-800 mb-4">🔧 Panel de Debug</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={setAsAdmin}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Establecer como Administrador
              </button>
            </div>
            <p className="text-sm text-orange-600 mt-2">
              Usa este botón para probar la funcionalidad de administrador
            </p>
          </div>
        </section>
      )}
    </div>
  )
}/ /   F o r c e   d e p l o y  
 