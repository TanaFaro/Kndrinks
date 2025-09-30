'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ClienteDashboard() {
  const [cliente, setCliente] = useState({
    email: '',
    nombre: 'Cliente',
    pedidos: []
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar si el cliente está logueado
    const isLoggedIn = localStorage.getItem('clienteLoggedIn')
    if (!isLoggedIn) {
      router.push('/cliente/login')
      return
    }

    // Cargar datos del cliente
    const email = localStorage.getItem('clienteEmail') || ''
    setCliente(prev => ({ ...prev, email }))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('clienteLoggedIn')
    localStorage.removeItem('clienteEmail')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando...</p>
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
              <Link href="/" className="text-blue-600 hover:text-blue-800">
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
              <h1 className="text-2xl font-bold text-slate-800">Mi Cuenta</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-600">Bienvenido, {cliente.nombre}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cerrar Sesión
              </button>
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
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Pedidos</p>
                <p className="text-2xl font-bold text-slate-900">{cliente.pedidos.length}</p>
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
                <p className="text-sm font-medium text-slate-600">Pedidos Completados</p>
                <p className="text-2xl font-bold text-slate-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">En Proceso</p>
                <p className="text-2xl font-bold text-slate-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-xl">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Gastado</p>
                <p className="text-2xl font-bold text-slate-900">$0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-slate-800">Mi Cuenta</h2>
          <div className="flex space-x-4">
            <Link
              href="/productos"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Productos
            </Link>
            <Link
              href="/ofertas"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Ver Ofertas
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información Personal */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Información Personal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <p className="text-slate-900">{cliente.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                <p className="text-slate-900">{cliente.nombre}</p>
              </div>
              <div className="pt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>

          {/* Pedidos Recientes */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Pedidos Recientes</h3>
            {cliente.pedidos.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-slate-500 mb-4">Aún no tienes pedidos</p>
                <Link
                  href="/productos"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Hacer mi primer pedido
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Aquí irían los pedidos */}
              </div>
            )}
          </div>
        </div>

        {/* Favoritos */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Mis Favoritos</h3>
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-slate-500 mb-4">Aún no tienes productos favoritos</p>
            <Link
              href="/productos"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Explorar productos
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
