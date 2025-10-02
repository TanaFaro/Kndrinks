'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import { dataManager, Oferta, ComboProduct } from '@/lib/dataManager'
import Link from 'next/link'

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

    // Cargar ofertas desde dataManager
    try {
      const ofertasData = dataManager.getOfertas()
      console.log('🎁 Ofertas cargadas desde dataManager:', ofertasData.length)
      setOfertas(ofertasData)
    } catch (error) {
      console.error('❌ Error cargando ofertas:', error)
      setOfertas([])
    }
    setLoading(false)
  }, [router])

  const deleteOferta = (id: number) => {
    const success = dataManager.deleteOferta(id)
    if (success) {
      const updatedOfertas = dataManager.getOfertas()
      setOfertas(updatedOfertas)
      console.log('🗑️ Oferta eliminada:', id)
    }
  }

  const toggleOfertaStatus = (id: number) => {
    const oferta = ofertas.find(o => o.id === id)
    if (oferta) {
      const updated = dataManager.updateOferta(id, { active: !oferta.active })
      if (updated) {
        const updatedOfertas = dataManager.getOfertas()
        setOfertas(updatedOfertas)
        console.log('🔄 Estado de oferta actualizado:', oferta.title)
      }
    }
  }

  const deleteOfertasByCategory = (category: string) => {
    if (confirm(`¿Estás seguro de que quieres eliminar todas las ofertas de la categoría "${category}"?`)) {
      const ofertasToDelete = ofertas.filter(oferta => oferta.category === category)
      ofertasToDelete.forEach(oferta => dataManager.deleteOferta(oferta.id))
      
      const updatedOfertas = dataManager.getOfertas()
      setOfertas(updatedOfertas)
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Ofertas</h1>
            <div className="flex space-x-4">
              <Link
                href="/admin/ofertas/new"
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                ➕ Nueva Oferta
              </Link>
              <Link
                href="/admin"
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                ← Volver al Admin
              </Link>
            </div>
          </div>

          {ofertas.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No hay ofertas registradas</h3>
              <p className="text-gray-600 mb-6">Agrega nuevas ofertas para que aparezcan en tu tienda.</p>
              <Link
                href="/admin/ofertas/new"
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Crear Primera Oferta
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Imagen</th>
                    <th className="py-3 px-6 text-left">Título</th>
                    <th className="py-3 px-6 text-left">Categoría</th>
                    <th className="py-3 px-6 text-left">Precio</th>
                    <th className="py-3 px-6 text-left">Estado</th>
                    <th className="py-3 px-6 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {ofertas.map((oferta) => (
                    <tr key={oferta.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{oferta.id}</td>
                      <td className="py-3 px-6 text-left">
                        <img 
                          src={oferta.image} 
                          alt={oferta.title} 
                          className="w-12 h-12 object-cover rounded-md"
                          onError={(e) => {
                            e.currentTarget.src = '/images/LogoBebidas.jpeg'
                          }}
                        />
                      </td>
                      <td className="py-3 px-6 text-left">{oferta.title}</td>
                      <td className="py-3 px-6 text-left">{oferta.category}</td>
                      <td className="py-3 px-6 text-left">${oferta.finalPrice.toLocaleString()}</td>
                      <td className="py-3 px-6 text-left">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          oferta.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {oferta.active ? 'Activa' : 'Inactiva'}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center space-x-2">
                          <button
                            onClick={() => toggleOfertaStatus(oferta.id)}
                            className="w-8 h-8 transform hover:text-blue-500 hover:scale-110"
                            title={oferta.active ? 'Desactivar' : 'Activar'}
                          >
                            {oferta.active ? '⏸️' : '▶️'}
                          </button>
                          <button
                            onClick={() => deleteOferta(oferta.id)}
                            className="w-8 h-8 transform hover:text-red-500 hover:scale-110"
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Estadísticas */}
          {ofertas.length > 0 && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">Total Ofertas</h3>
                <p className="text-2xl font-bold text-blue-600">{ofertas.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">Ofertas Activas</h3>
                <p className="text-2xl font-bold text-green-600">
                  {ofertas.filter(o => o.active).length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800">Categorías</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(ofertas.map(o => o.category)).size}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}