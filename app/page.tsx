'use client'

import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'

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
const STATIC_PRODUCTS = [
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
  },
  {
    id: 4,
    name: "Smirnoff Vodka 750ml",
    price: 3500,
    category: "Licores",
    stock: 20,
    image: "/images/Smirnoff solo.jpeg",
    description: "Vodka ruso premium"
  },
  {
    id: 5,
    name: "Pritty Limón 2.25L",
    price: 1200,
    category: "Bebidas",
    stock: 40,
    image: "/images/pritty 2.250.jfif",
    description: "Gaseosa sabor limón"
  },
  {
    id: 6,
    name: "Vino Toro Tinto 750ml",
    price: 1800,
    category: "Vinos",
    stock: 35,
    image: "/images/vino toro.jfif",
    description: "Vino tinto clásico"
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
    image: "/images/coca descartable.jpg",
    description: "Coca Cola en botella descartable"
  },
  {
    id: 9,
    name: "Pritty 3L",
    price: 1800,
    category: "Bebidas",
    stock: 30,
    image: "/images/pritty de 3lts.webp",
    description: "Gaseosa sabor limón 3 litros"
  },
  {
    id: 10,
    name: "Speed XL",
    price: 1500,
    category: "Bebidas",
    stock: 40,
    image: "/images/Speed XL.webp",
    description: "Bebida energética XL"
  },
  {
    id: 11,
    name: "Vino Viña de Balbo Tinto",
    price: 2200,
    category: "Vinos",
    stock: 25,
    image: "/images/VINO-VINA-DE-BALBO-TINTO.png",
    description: "Vino tinto premium"
  },
  {
    id: 12,
    name: "Sprite 500ml",
    price: 1000,
    category: "Bebidas",
    stock: 40,
    image: "/images/Sprite.webp",
    description: "Refresco sabor lima-limón"
  },
  {
    id: 13,
    name: "DU Renaissance 750ml",
    price: 6500,
    category: "Licores",
    stock: 15,
    image: "/images/DU Renaissance.jfif",
    description: "Vodka premium francés"
  },
  {
    id: 14,
    name: "Gancia 1L",
    price: 3200,
    category: "Licores",
    stock: 25,
    image: "/images/Gancia.jfif",
    description: "Aperitivo italiano clásico"
  },
  {
    id: 15,
    name: "Vino Toro 750ml",
    price: 2200,
    category: "Vinos",
    stock: 30,
    image: "/images/vino toro.jfif",
    description: "Vino tinto de calidad"
  }
]

const STATIC_OFERTAS = [
  {
    id: 1,
    title: "Combo Fernet + Coca",
    description: "Fernet Branca 750ml + 2 Coca Cola 2.25L",
    finalPrice: 6500,
    image: "/images/fernet 750.jfif",
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
    image: "/images/skyy mas speed.jfif",
    active: true,
    featured: true,
    priority: 4,
    comboProducts: [
      { name: "Skyy Vodka 750ml", price: 3800, quantity: 1 },
      { name: "Speed XL", price: 1000, quantity: 1 }
    ]
  },
  {
    id: 3,
    title: "Combo Smirnoff + Speed",
    description: "Smirnoff Vodka 750ml + 2 Speed XL",
    finalPrice: 5500,
    image: "/images/Smirnoff mas 2 speed.png",
    active: true,
    featured: false,
    priority: 3,
    comboProducts: [
      { name: "Smirnoff Vodka 750ml", price: 3500, quantity: 1 },
      { name: "Speed XL", price: 1000, quantity: 2 }
    ]
  },
  {
    id: 4,
    title: "Combo Du + Speed",
    description: "Du Vodka 750ml + Speed XL",
    finalPrice: 7500,
    image: "/images/Du con speed.jfif",
    active: true,
    featured: false,
    priority: 2,
    comboProducts: [
      { name: "Du Vodka 750ml", price: 6500, quantity: 1 },
      { name: "Speed XL", price: 1000, quantity: 1 }
    ]
  },
  {
    id: 5,
    title: "Combo Viña + Pritty",
    description: "Vino Viña de Balbo + Pritty 3L",
    finalPrice: 3500,
    image: "/images/viña de balbo mas pritty.png",
    active: true,
    featured: true,
    priority: 4,
    comboProducts: [
      { name: "Vino Viña de Balbo Tinto", price: 2200, quantity: 1 },
      { name: "Pritty 3L", price: 1300, quantity: 1 }
    ]
  },
  {
    id: 6,
    title: "Combo Vino Toro + Pritty",
    description: "Vino Toro Tinto + Pritty 2.25L",
    finalPrice: 2500,
    image: "/images/vino toro mas pritty.jpg",
    active: true,
    featured: false,
    priority: 3,
    comboProducts: [
      { name: "Vino Toro Tinto 750ml", price: 1800, quantity: 1 },
      { name: "Pritty Limón 2.25L", price: 700, quantity: 1 }
    ]
  },
  {
    id: 7,
    title: "Combo Fernet + 2 Coca",
    description: "Fernet Branca 750ml + 2 Coca Cola 2.25L",
    finalPrice: 6500,
    image: "/images/fernet mas 2 cocas.jfif",
    active: true,
    featured: true,
    priority: 5,
    comboProducts: [
      { name: "Fernet Branca 750ml", price: 4500, quantity: 1 },
      { name: "Coca Cola 2.25L", price: 1000, quantity: 2 }
    ]
  },
  {
    id: 8,
    title: "Combo Fernet + Coca Descartable",
    description: "Fernet Branca 750ml + Coca Cola Descartable",
    finalPrice: 5000,
    image: "/images/fernet mas coca descartable.jpg",
    active: true,
    featured: false,
    priority: 4,
    comboProducts: [
      { name: "Fernet Branca 750ml", price: 4500, quantity: 1 },
      { name: "Coca Cola Descartable 500ml", price: 500, quantity: 1 }
    ]
  }
]

// Función para convertir prioridad a estrellas
const getPriorityStars = (priority?: number): string => {
  if (!priority) return ''
  
  if (priority >= 5) return '⭐⭐⭐⭐⭐'
  if (priority >= 4) return '⭐⭐⭐⭐'
  if (priority >= 3) return '⭐⭐⭐'
  if (priority >= 2) return '⭐⭐'
  return '⭐'
}

// Función para obtener el texto de popularidad
const getPopularityText = (priority?: number): string => {
  if (!priority) return ''
  
  if (priority >= 5) return 'MÁS PEDIDO'
  if (priority >= 4) return 'MUY POPULAR'
  if (priority >= 3) return 'POPULAR'
  if (priority >= 2) return 'RECOMENDADO'
  return 'NUEVO'
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [dynamicProducts, setDynamicProducts] = useState<Product[]>([])
  const [dynamicOfertas, setDynamicOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    setMounted(true)
    // Deshabilitar carga dinámica temporalmente
    // loadDynamicImages()
    setLoading(false)
  }, [])

  const loadDynamicImages = async () => {
    try {
      const response = await fetch('/api/images')
      const data = await response.json()
      
      console.log('API Response:', data) // Debug
      
      if (data.products && data.products.length > 0) {
        setDynamicProducts(data.products)
      }
      if (data.combos && data.combos.length > 0) {
        setDynamicOfertas(data.combos)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error loading images:', error)
      // Usar productos estáticos como fallback
      setDynamicProducts([])
      setDynamicOfertas([])
      setLoading(false)
    }
  }

  if (!mounted) {
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
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto">
          <h1 className="hero-title font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
            KNDrinks
          </h1>
          <p className="hero-subtitle text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Tu tienda de bebidas favorita con la mejor selección de licores, vinos y más
          </p>
          <div className="hero-buttons">
            <a
              href="/productos"
              className="hero-button bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white"
            >
              Ver Productos
            </a>
            <a
              href="/ofertas"
              className="hero-button bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              Ver Ofertas
            </a>
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Productos Destacados
          </h2>
          
          <div className="products-grid">
            {STATIC_PRODUCTS.map((product) => (
              <div key={product.id} className="product-card group">
                <div className="bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div>
                  <div className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                    {product.category}
                  </div>
                  <h3 className="product-title text-slate-800 group-hover:text-slate-900 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 mb-4 text-sm">
                    {product.description}
                    </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="product-price font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                        ${product.price.toLocaleString('es-AR')}
                      </span>
                      <span className="text-xs text-slate-500">Precio por unidad</span>
                    </div>
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
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    title="Agregar al carrito"
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
      <section className="bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent">
            Ofertas Especiales
          </h2>
          
          <div className="ofertas-grid">
            {STATIC_OFERTAS.map((oferta) => (
              <div key={oferta.id} className={`oferta-card group ${oferta.featured ? 'border-yellow-400/50 shadow-yellow-200/50' : 'border-violet-200/30'}`}>
                {/* Badge unificado */}
                {(oferta.featured || (oferta.priority && oferta.priority >= 2)) && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {oferta.featured ? '⭐ DESTACADO' : `${getPriorityStars(oferta.priority)} ${getPopularityText(oferta.priority)}`}
                  </div>
                )}
                
                <div className="bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 flex items-center justify-center group-hover:from-violet-200 group-hover:via-purple-200 group-hover:to-indigo-200 transition-all duration-500 relative overflow-hidden">
                    <Image
                      src={oferta.image}
                      alt={oferta.title}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
                <div>
                  <div className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                    COMBO
                  </div>
                  <h3 className="oferta-title text-slate-800 group-hover:text-slate-900 transition-colors">
                    {oferta.title}
            </h3>
                  <p className="text-slate-600 mb-4 text-sm">
                    {oferta.description}
                  </p>
                  
                  {/* Productos incluidos */}
                  <div className="bg-slate-50 rounded-lg p-3 mb-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Incluye:</h4>
                    <div className="space-y-1">
                      {oferta.comboProducts.map((product, index) => (
                        <p key={index} className="text-xs text-slate-600">
                          • {product.name} x{product.quantity}
                        </p>
                      ))}
          </div>
        </div>
                  
                  <div className="mb-6">
                    <div className="text-center mb-3">
                      <span className="oferta-price font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent block">
                        ${oferta.finalPrice.toLocaleString('es-AR')}
                      </span>
                      <p className="text-xs text-slate-500 mt-1">Precio combo</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-500 line-through">
                        Individual: ${oferta.comboProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toLocaleString('es-AR')}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      addItem({
                        id: oferta.id + 1000, // ID único para combos
                        name: oferta.title,
                        price: oferta.finalPrice,
                        category: 'Combo',
                        image: oferta.image,
                        type: 'combo'
                      })
                    }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                    title="Agregar al carrito"
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