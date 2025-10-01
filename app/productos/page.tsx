'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Product, ComboProduct, Oferta } from '@/lib/types'

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
    const staticProducts: Product[] = [
      {
        id: 1,
        name: "Coca Cola 2.25L",
        price: 4200,
        category: "Bebidas",
        stock: 50,
        image: "/images/cocacola.jfif",
        description: "Refresco clásico de Coca Cola",
        type: 'product'
      },
      {
        id: 2,
        name: "Fernet Branca 750ml",
        price: 13500,
        category: "Licores",
        stock: 30,
        image: "/images/fernet750.jfif",
        description: "Fernet italiano de alta calidad",
        type: 'product'
      },
      {
        id: 3,
        name: "Skyy Vodka 750ml",
        price: 9500,
        category: "Licores",
        stock: 25,
        image: "/images/skyy.png",
        description: "Vodka premium americano",
        type: 'product'
      },
      {
        id: 4,
        name: "Smirnoff Vodka 750ml",
        price: 8000,
        category: "Licores",
        stock: 20,
        image: "/images/Smirnoffsolo.jpeg",
        description: "Vodka ruso premium",
        type: 'product'
      },
      {
        id: 5,
        name: "Pritty Limón 2.25L",
        price: 2600,
        category: "Bebidas",
        stock: 40,
        image: "/images/pritty2250.jfif",
        description: "Gaseosa sabor limón",
        type: 'product'
      },
      {
        id: 6,
        name: "Pritty Limón 3L",
        price: 3000,
        category: "Bebidas",
        stock: 30,
        image: "/images/prittyde3lts.webp",
        description: "Gaseosa sabor limón 3 litros",
        type: 'product'
      },
      {
        id: 7,
        name: "Coca Cola 2,25L Descartable ",
        price: 4200,
        category: "Bebidas",
        stock: 60,
        image: "/images/cocadescartable.jpg",
        description: "Coca Cola en botella descartable",
        type: 'product'
      },
      {
        id: 9,
        name: "DU Renaissance",
        price: 5000,
        category: "Vinos",
        stock: 15,
        image: "/images/DURenaissance.jfif",
        description: "Vino DU Renaissance",
        type: 'product'
      },
      {
        id: 10,
        name: "Vino Toro 750ml",
        price: 2200,
        category: "Vinos",
        stock: 25,
        image: "/images/vinotoro.jfif",
        description: "Vino Toro tinto 750ml",
        type: 'product'
      },
      {
        id: 11,
        name: "Vino Viña de Balbo Tinto",
        price: 2800,
        category: "Vinos",
        stock: 25,
        image: "/images/balbomaspritty.png",
        description: "Vino tinto premium",
        type: 'product'
      },
      {
        id: 12,
        name: "Gancia",
        price: 8000,
        category: "Aperitivos",
        stock: 18,
        image: "/images/Gancia.jfif",
        description: "Gancia aperitivo",
        type: 'product'
      },
      {
        id: 13,
        name: "Speed XL",
        price: 2800,
        category: "Bebidas",
        stock: 35,
        image: "/images/speedxl1.jfif",
        description: "Bebida energética de gran tamaño",
        type: 'product'
      }
    ]

    setProducts(staticProducts)
    setAllItems(staticProducts)
    setLoading(false)
  }, [])


  const categories = ['Todas', 'Bebidas', 'Licores', 'Vinos', 'Aperitivos', 'Sin Alcohol', 'Combos']
  
  const filteredItems = selectedCategory === 'Todas'
    ? allItems
    : allItems.filter(item => item.category === selectedCategory)

  const indexOfLastItem = currentPage * productsPerPage
  const indexOfFirstItem = indexOfLastItem - productsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Función para eliminar producto (solo admin)
  const deleteProduct = (productId: number) => {
    if (!isAdmin) return
    
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const updatedProducts = products.filter(p => p.id !== productId)
      setProducts(updatedProducts)
      setAllItems(updatedProducts)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  // Verificar si es admin
  useEffect(() => {
    const checkAdmin = () => {
      if (typeof window !== 'undefined') {
        const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'
        setIsAdmin(adminLoggedIn)
      }
    }
    checkAdmin()
  }, [])

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

      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            {selectedCategory === 'Todas' ? 'Todos los Productos' : `Productos de ${selectedCategory}`}
          </h2>
          
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((item) => {
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
                        <div className="space-y-2">
                          <button 
                            onClick={() => addItem({ id: product.id, name: product.name, price: product.price, category: product.category, image: product.image, type: 'product' })}
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-2xl font-bold transition-all duration-300"
                          >
                            Agregar al carrito
                          </button>
                          {isAdmin && (
                            <button 
                              onClick={() => deleteProduct(product.id)}
                              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition-all duration-300"
                            >
                              🗑️ Eliminar
                            </button>
                          )}
                        </div>
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
    </div>
  )
}