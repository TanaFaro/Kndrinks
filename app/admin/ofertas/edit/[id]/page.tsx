'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'

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

export default function EditOferta() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    finalPrice: '',
    active: true
  })
  const [loading, setLoading] = useState(false)
  const [oferta, setOferta] = useState<Oferta | null>(null)
  const router = useRouter()
  const params = useParams()
  const ofertaId = params.id

  useEffect(() => {
    // Verificar si el admin está logueado
    if (!auth.isLoggedIn()) {
      router.push('/admin')
      return
    }

    // Cargar la oferta a editar
    loadOferta()
  }, [router, ofertaId])

  const loadOferta = () => {
    const savedOfertas = localStorage.getItem('ofertas')
    if (savedOfertas) {
      const ofertas: Oferta[] = JSON.parse(savedOfertas)
      const ofertaToEdit = ofertas.find(o => o.id === parseInt(ofertaId as string))
      
      if (ofertaToEdit) {
        setOferta(ofertaToEdit)
        setFormData({
          title: ofertaToEdit.title,
          description: ofertaToEdit.description,
          finalPrice: ofertaToEdit.finalPrice.toString(),
          active: ofertaToEdit.active
        })
      } else {
        alert('Combo no encontrado')
        router.push('/admin/ofertas')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Iniciando actualización de combo...')
      console.log('Datos del formulario:', formData)

      // Validar datos requeridos
      if (!formData.title || !formData.finalPrice) {
        alert('Por favor completa todos los campos requeridos')
        setLoading(false)
        return
      }

      // Obtener ofertas existentes
      const savedOfertas = localStorage.getItem('ofertas')
      const ofertas: Oferta[] = savedOfertas ? JSON.parse(savedOfertas) : []

      // Actualizar la oferta
      const updatedOferta: Oferta = {
        ...oferta!,
        title: formData.title,
        description: formData.description,
        finalPrice: parseFloat(formData.finalPrice),
        active: formData.active
      }

      console.log('Combo actualizado:', updatedOferta)

      // Actualizar en la lista
      const updatedOfertas = ofertas.map(o => 
        o.id === parseInt(ofertaId as string) ? updatedOferta : o
      )

      // Guardar en localStorage
      localStorage.setItem('ofertas', JSON.stringify(updatedOfertas))
      console.log('Combo actualizado exitosamente')

      // Mostrar mensaje de éxito
      alert('¡Combo actualizado exitosamente!')

      // Redirigir al dashboard de ofertas
      router.push('/admin/ofertas')
    } catch (error) {
      console.error('Error al actualizar combo:', error)
      alert('Error al actualizar el combo: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (!oferta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando combo...</p>
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
              <Link href="/admin/ofertas" className="text-violet-600 hover:text-violet-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <img 
                src="/images/Logo Bebidas.jpeg" 
                alt="KNDrinks Logo" 
                className="h-12 w-auto object-contain rounded-lg"
              />
              <h1 className="text-2xl font-bold text-slate-800">Editar Combo</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información actual del combo */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Información Actual del Combo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-600">Título:</p>
                  <p className="font-semibold text-blue-800">{oferta.title}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Categoría:</p>
                  <p className="font-semibold text-blue-800">{oferta.category}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Precio actual:</p>
                  <p className="font-semibold text-blue-800">${oferta.finalPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Estado:</p>
                  <p className="font-semibold text-blue-800">{oferta.active ? 'Activo' : 'Inactivo'}</p>
                </div>
              </div>
              
              {/* Productos del combo */}
              <div className="mt-4">
                <p className="text-sm text-blue-600 mb-2">Productos incluidos:</p>
                <div className="space-y-2">
                  {oferta.comboProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center bg-white rounded-lg p-3">
                      <span className="text-sm font-medium">{product.productName}</span>
                      <span className="text-sm text-gray-600">x{product.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Título del Combo */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                Título del Combo *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Ej: Fernet + Coca Cola"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                Descripción del Combo
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Describe el combo..."
              />
            </div>

            {/* Precio Final */}
            <div>
              <label htmlFor="finalPrice" className="block text-sm font-medium text-slate-700 mb-2">
                Precio del Combo *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  id="finalPrice"
                  name="finalPrice"
                  value={formData.finalPrice}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Estado activo */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="active"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="w-4 h-4 text-violet-600 border-slate-300 rounded focus:ring-violet-500"
              />
              <label htmlFor="active" className="text-sm font-medium text-slate-700">
                Combo activo
              </label>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6">
              <Link
                href="/admin/ofertas"
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Actualizando...' : 'Actualizar Combo'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}