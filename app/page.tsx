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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    // Cargar productos desde localStorage o productos de ejemplo
    const loadProducts = () => {
      try {
        const savedProducts = localStorage.getItem('products')
        if (savedProducts) {
          const parsedProducts: Product[] = JSON.parse(savedProducts)
          setProducts(parsedProducts)
        } else {
          // Productos de ejemplo con tus imágenes
          const exampleProducts: Product[] = [
            {
              id: 1,
              name: "Coca Cola 2.25L",
              price: 3800,
              category: "Bebidas",
              stock: 50,
              image: "/images/cocacola.jfif",
              description: "Refresco clásico de Coca Cola"
            },
            {
              id: 2,
              name: "Fernet Branca 750ml",
              price: 13500,
              category: "Licores",
              stock: 30,
              image: "/images/fernet750.jfif",
              description: "Fernet italiano de alta calidad"
            },
            {
              id: 3,
              name: "Skyy Vodka 750ml",
              price: 9500,
              category: "Licores",
              stock: 25,
              image: "/images/skyy.png",
              description: "Vodka premium americano"
            },
            {
              id: 4,
              name: "Smirnoff Vodka 750ml",
              price: 8000,
              category: "Licores",
              stock: 20,
              image: "/images/Smirnoffsolo.jpeg",
              description: "Vodka ruso premium"
            },
            {
              id: 5,
              name: "Pritty Limón 2.25L",
              price: 2600,
              category: "Bebidas",
              stock: 40,
              image: "/images/pritty2250.jfif",
              description: "Gaseosa sabor limón"
            },
            {
              id: 6,
              name: "Pritty Limón 3L",
              price: 3000,
              category: "Bebidas",
              stock: 30,
              image: "/images/prittyde3lts.webp",
              description: "Gaseosa sabor limón 3 litros"
            },
            {
              id: 7,
              name: "Gancia 1L",
              price: 8000,
              category: "Licores",
              stock: 25,
              image: "/images/Gancia.jfif",
              description: "Aperitivo italiano clásico"
            },
            {
              id: 8,
              name: "Coca Cola Descartable 2.25L",
              price: 4200,
              category: "Bebidas",
              stock: 60,
              image: "/images/cocadescartable.jpg",
              description: "Coca Cola en botella descartable"
            },
            {
              id: 9,
              name: "Speed XL",
              price: 2800,
              category: "Bebidas",
              stock: 40,
              image: "/images/SpeedXL.webp",
              description: "Bebida energética XL"
            },
            {
              id: 10,
              name: "Sprite 2.25L",
              price: 3400,
              category: "Bebidas",
              stock: 40,
              image: "/images/Sprite.webp",
              description: "Refresco sabor lima-limón"
            },
            {
              id: 11,
              name: "DU Renaissance 750ml",
              price: 5000,
              category: "Licores",
              stock: 15,
              image: "/images/DURenaissance.jfif",
              description: "Vodka premium francés"
            },
            {
              id: 12,
              name: "Vino Viña de Balbo Tinto 1.25L",
              price: 2800,
              category: "Vinos",
              stock: 25,
              image: "/images/balbomaspritty.png",
              description: "Vino tinto premium"
            },
            {
              id: 13, 
              name: "Vino Toro 1L",
              price: 2200,
              category: "Vinos",
              stock: 30,
              image: "/images/vinotoro.jfif",
              description: "Vino tinto de calidad"
            }
          ]
          setProducts(exampleProducts)
        }
      } catch (error) {
        console.error('Error cargando productos:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
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
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.error('Error cargando imagen:', product.image)
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
// Force Vercel update - Version 3 - Major C/ /   F o r c e   V e r c e l   u p d a t e   -   P r e c i o s   c o r r e g i d o s   0 9 / 3 0 / 2 0 2 5   2 2 : 3 5 : 1 6  
 