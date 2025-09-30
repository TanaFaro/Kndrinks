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
  name: string
  price: number
  quantity: number
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

// Datos estáticos para garantizar que siempre funcionen
const STATIC_PRODUCTS: Product[] = [
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
    image: "/images/VINOVINADEBALBO.png",
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

const STATIC_OFERTAS: Oferta[] = [
  {
    id: 1,
    title: "Combo Fernet + Coca",
    description: "Fernet Branca 750ml + 2 Coca Cola 2.25L",
    finalPrice: 6500,
    image: "/images/fernetmas2cocas.jfif",
    category: "Combos",
    active: true,
    featured: true,
    priority: 5,
    comboProducts: [
      { name: "Fernet Branca 750ml", price: 4500, quantity: 1 },
      { name: "Coca Cola 2.25L", price: 1000, quantity: 2 }
    ]
  },
  {
    id: 2,
    title: "Combo Skyy + Speed",
    description: "Skyy Vodka 750ml + Speed XL",
    finalPrice: 4800,
    image: "/images/skyymasspeed.jfif",
    category: "Combos",
    active: true,
    featured: true,
    priority: 4,
    comboProducts: [
      { name: "Skyy Vodka 750ml", price: 3800, quantity: 1 },
      { name: "Speed XL", price: 1000, quantity: 1 }
    ]
  }
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { addItem } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            KNDrinks
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Las mejores bebidas y licores al mejor precio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#productos"
              className="bg-white text-violet-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Productos
            </a>
            <a
              href="#ofertas"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Ofertas
            </a>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section id="productos" className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Productos Destacados
          </h2>
          
          <div className="products-grid">
            {STATIC_PRODUCTS.map((product) => (
              <div key={product.id} className="product-card group">
                <div className="bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      console.error('Error cargando imagen:', product.image)
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <div>
                  <div className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                    {product.category}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-violet-600">
                      ${product.price.toLocaleString('es-AR')}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </span>
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
            ))}
          </div>
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section id="ofertas" className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
            Ofertas Especiales
          </h2>
          
          <div className="ofertas-grid">
            {STATIC_OFERTAS.map((oferta) => (
              <div key={oferta.id} className={`oferta-card group ${oferta.featured ? 'border-yellow-400/50 shadow-yellow-200/50' : 'border-violet-200/30'}`}>
                <div className="bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 relative overflow-hidden">
                  <img
                    src={oferta.image}
                    alt={oferta.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      console.error('Error cargando imagen de oferta:', oferta.image)
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <div>
                  <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                    COMBO
                  </div>
                  <h3 className="font-bold text-lg mb-2">{oferta.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{oferta.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Incluye:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {oferta.comboProducts.map((combo, index) => (
                        <li key={index}>
                          {combo.quantity}x {combo.name} - ${combo.price.toLocaleString('es-AR')}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ${oferta.finalPrice.toLocaleString('es-AR')}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      addItem({
                        id: oferta.id + 1000,
                        name: oferta.title,
                        price: oferta.finalPrice,
                        category: 'Combo',
                        image: oferta.image,
                        type: 'combo'
                      })
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
