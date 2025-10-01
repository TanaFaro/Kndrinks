'use client'

// Versión actualizada con precios de ofertas corregidos - v2.3
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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    // Productos fijos para la página de inicio (no interfieren con productos/admin)
    const featuredProducts: Product[] = [
      {
        id: 1,
        name: "Fernet BRANCA",
        price: 13500,
        category: "Aperitivos",
        stock: 6,
        image: "/images/fernet750.jfif",
        description: "Fernet italiano de alta calidad"
      },
      {
        id: 2,
        name: "Skyy saborizado",
        price: 9500,
        category: "Licores",
        stock: 12,
        image: "/images/skyy.png",
        description: "Vodka premium americano"
      },
      {
        id: 3,
        name: "Smirnoff Saborizado",
        price: 8000,
        category: "Licores",
        stock: 12,
        image: "/images/Smirnoffsolo.jpeg",
        description: "Vodka ruso premium"
      },
      {
        id: 4,
        name: "Gancia",
        price: 8000,
        category: "Aperitivos",
        stock: 6,
        image: "/images/Gancia.jfif",
        description: "Aperitivo italiano clásico"
      }
    ]
    
    setProducts(featuredProducts)
    setLoading(false)
    console.log('🏠 Productos destacados cargados para página de inicio - v3.13')
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      type: 'product'
    })
    console.log('✅ Producto agregado al carrito:', product.name)
  }

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
      {/* Header */}
      <section className="py-24 px-4 text-center bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">
            KNDrinks
          </h1>
          <div className="text-xs text-violet-500 mb-4">v3.14 - Precios Corregidos</div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Tu tienda de bebidas premium. Descubre nuestra selección cuidadosamente curada.
          </p>
        </div>
      </section>

      {/* Productos */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Productos Destacados
          </h2>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-violet-200">
                  <div className="relative h-48 sm:h-64 overflow-hidden bg-gradient-to-br from-violet-100 to-purple-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('❌ Error cargando imagen:', product.image)
                        e.currentTarget.style.display = 'none'
                        const container = e.currentTarget.parentElement
                        if (container) {
                          container.innerHTML = `
                            <div class="w-full h-full flex flex-col items-center justify-center text-violet-600">
                              <div class="text-4xl mb-2">🍷</div>
                              <div class="text-sm font-semibold text-center px-2">${product.name}</div>
                              <div class="text-xs text-violet-500 mt-1">Imagen no disponible</div>
                            </div>
                          `
                        }
                      }}
                      loading="lazy"
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
                      onClick={() => handleAddToCart(product)}
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
        </div>
      </section>
    </div>
  )
} 
