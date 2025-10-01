'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import { normalizeImagePath, handleImageError } from '@/lib/imageUtils'
import Link from 'next/link'

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
}

export default function AdminOfertas() {
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar si el admin está logueado
    if (!auth.isLoggedIn()) {
      router.push('/admin')
      return
    }

    // Cargar ofertas desde localStorage
    const savedOfertas = localStorage.getItem('ofertas')
    if (savedOfertas) {
      try {
        const parsedOfertas: Oferta[] = JSON.parse(savedOfertas)
        console.log('📦 Ofertas cargadas desde localStorage:', parsedOfertas)
        setOfertas(parsedOfertas)
      } catch (error) {
        console.error('❌ Error parseando ofertas:', error)
        setOfertas([])
      }
    } else {
      console.log('📦 No hay ofertas guardadas, cargando ofertas iniciales...')
      loadInitialOffers()
    }
    setLoading(false)
  }, [router])

  const loadInitialOffers = () => {
    const initialOffers: Oferta[] = [
      {
        id: 1,
        title: "Du + Speed",
        description: "Combo DU Renaissance + Speed XL",
        comboProducts: [
          { productId: 11, productName: "DU Renaissance 750ml", quantity: 1, price: 5000 },
          { productId: 13, productName: "Speed XL", quantity: 1, price: 2800 }
        ],
        finalPrice: 7500,
        image: "/images/Duconspeed.jfif",
        category: "Combos",
        active: true
      },
      {
        id: 2,
        title: "Branca 750ml + 1 Coca 2.25L",
        description: "Fernet Branca + Coca Cola descartable",
        comboProducts: [
          { productId: 2, productName: "Fernet Branca 750ml", quantity: 1, price: 13500 },
          { productId: 8, productName: "Coca Cola Descartable 2.25L", quantity: 1, price: 4200 }
        ],
        finalPrice: 17000,
        image: "/images/fernetmascocadescartable.jpg",
        category: "Combos",
        active: true
      },
      {
        id: 3,
        title: "Branca 750ml + 2 Coca 2.25L",
        description: "Fernet Branca + 2 Coca Cola descartable",
        comboProducts: [
          { productId: 2, productName: "Fernet Branca 750ml", quantity: 1, price: 13500 },
          { productId: 8, productName: "Coca Cola Descartable 2.25L", quantity: 2, price: 4200 }
        ],
        finalPrice: 21200,
        image: "/images/fernetmas2cocas.jfif",
        category: "Combos",
        active: true
      },
      {
        id: 4,
        title: "Skyy 750ml + 2 Speed XL",
        description: "Skyy Vodka + 2 Speed XL",
        comboProducts: [
          { productId: 3, productName: "Skyy Vodka 750ml", quantity: 1, price: 9500 },
          { productId: 13, productName: "Speed XL", quantity: 2, price: 2800 }
        ],
        finalPrice: 15500,
        image: "/images/skyymasspeed.jfif",
        category: "Combos",
        active: true
      },
      {
        id: 5,
        title: "Smirnoff 750ml + 2 Speed XL",
        description: "Smirnoff Vodka + 2 Speed XL",
        comboProducts: [
          { productId: 4, productName: "Smirnoff Vodka 750ml", quantity: 1, price: 8000 },
          { productId: 13, productName: "Speed XL", quantity: 2, price: 2800 }
        ],
        finalPrice: 14500,
        image: "/images/Smirnoffmas2speed.png",
        category: "Combos",
        active: true
      },
      {
        id: 6,
        title: "Toro Tinto 1L + 1 Pritty 2.25L",
        description: "Vino Toro + Pritty Limón",
        comboProducts: [
          { productId: 13, productName: "Vino Toro 1L", quantity: 1, price: 2200 },
          { productId: 5, productName: "Pritty Limón 2.25L", quantity: 1, price: 2600 }
        ],
        finalPrice: 4500,
        image: "/images/vinotoromaspritty.jpg",
        category: "Combos",
        active: true
      },
      {
        id: 7,
        title: "Gancia + Sprite 2.25L",
        description: "Gancia + Sprite descartable",
        comboProducts: [
          { productId: 12, productName: "Gancia", quantity: 1, price: 8000 },
          { productId: 10, productName: "Sprite 2.25L", quantity: 1, price: 3400 }
        ],
        finalPrice: 12000,
        image: "/images/ganciamassprite.jpeg",
        category: "Combos",
        active: true
      },
      {
        id: 8,
        title: "Du + Speed XL",
        description: "DU Renaissance + Speed XL",
        comboProducts: [
          { productId: 11, productName: "DU Renaissance 750ml", quantity: 1, price: 5000 },
          { productId: 13, productName: "Speed XL", quantity: 1, price: 2800 }
        ],
        finalPrice: 7500,
        image: "/images/Duconspeed.jfif",
        category: "Combos",
        active: true
      },
      {
        id: 9,
        title: "Viñas de Balbo + Pritty",
        description: "Vino Viña de Balbo + Pritty de 2.25L",
        comboProducts: [
          { productId: 11, productName: "Vino Viña de Balbo Tinto", quantity: 1, price: 2800 },
          { productId: 5, productName: "Pritty Limón 2.25L", quantity: 1, price: 2600 }
        ],
        finalPrice: 5500,
        image: "/images/balbomaspritty.jpg",
        category: "Combos",
        active: true
      }
    ]

    setOfertas(initialOffers)
    localStorage.setItem('ofertas', JSON.stringify(initialOffers))
    console.log('✅ Ofertas iniciales cargadas:', initialOffers.length)
  }

  const deleteOferta = (id: number) => {
    const updatedOfertas = ofertas.filter(oferta => oferta.id !== id)
    setOfertas(updatedOfertas)
    localStorage.setItem('ofertas', JSON.stringify(updatedOfertas))
  }

  const toggleOfertaStatus = (id: number) => {
    const updatedOfertas = ofertas.map(oferta => 
      oferta.id === id ? { ...oferta, active: !oferta.active } : oferta
    )
    setOfertas(updatedOfertas)
    localStorage.setItem('ofertas', JSON.stringify(updatedOfertas))
  }

  const deleteOfertasByCategory = (category: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar todas las ofertas de la categoría "${category}"?`)) {
      const updatedOfertas = ofertas.filter(oferta => oferta.category !== category)
      setOfertas(updatedOfertas)
      localStorage.setItem('ofertas', JSON.stringify(updatedOfertas))
      alert(`Se eliminaron todas las ofertas de la categoría "${category}"`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando ofertas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="text-violet-600 hover:text-violet-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <a href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
                <img 
                  src="/images/LogoBebidas.jpeg" 
                  alt="KNDrinks Logo" 
                  className="h-12 w-auto object-contain rounded-lg"
                />
              </a>
              <h1 className="text-2xl font-bold text-slate-800">Gestión de Ofertas</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/dashboard"
                className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Volver al Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-xl">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Ofertas</p>
                <p className="text-2xl font-bold text-slate-900">{ofertas.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Ofertas Activas</p>
                <p className="text-2xl font-bold text-slate-900">
                  {ofertas.filter(o => o.active).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-xl">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Ofertas Inactivas</p>
                <p className="text-2xl font-bold text-slate-900">
                  {ofertas.filter(o => !o.active).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Categorías</p>
                <p className="text-2xl font-bold text-slate-900">
                  {new Set(ofertas.map(o => o.category)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Gestión de Ofertas</h2>
          <Link
            href="/admin/ofertas/new"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            + Crear Nueva Oferta
          </Link>
        </div>

        {/* Ofertas Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Oferta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Productos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Precio Final
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {ofertas.map((oferta) => (
                  <tr key={oferta.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            src={normalizeImagePath(oferta.image)}
                            alt={oferta.title}
                            className="h-10 w-10 rounded-lg object-cover"
                            onError={(e) => handleImageError(e)}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{oferta.title}</div>
                          <div className="text-sm text-slate-500">{oferta.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {oferta.comboProducts ? oferta.comboProducts.length : 0} productos
                        </span>
                        {oferta.comboProducts && oferta.comboProducts.length > 0 && (
                          <div className="text-xs text-slate-500">
                            {oferta.comboProducts.map((product, index) => (
                              <span key={index}>
                                {product.productName} x{product.quantity}
                                {index < oferta.comboProducts.length - 1 ? ', ' : ''}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Combo
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      <div>
                        <span className="font-bold text-green-600">${oferta.finalPrice ? oferta.finalPrice.toLocaleString() : '0'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        oferta.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {oferta.active ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/admin/ofertas/edit/${oferta.id}`}
                          className="text-violet-600 hover:text-violet-900 bg-violet-50 hover:bg-violet-100 px-3 py-1 rounded-lg transition-colors"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => toggleOfertaStatus(oferta.id)}
                          className={`px-3 py-1 rounded-lg transition-colors ${
                            oferta.active 
                              ? 'text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100' 
                              : 'text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100'
                          }`}
                        >
                          {oferta.active ? 'Desactivar' : 'Activar'}
                        </button>
                        <button
                          onClick={() => deleteOferta(oferta.id)}
                          className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
