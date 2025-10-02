'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ImageSelector from '@/components/ImageSelector'
import { auth } from '@/lib/auth'
import { dataManager, Product } from '@/lib/dataManager'


export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Licores',
    stock: '',
    image: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar si el admin está logueado
    const isLoggedIn = auth.isLoggedIn()
    if (!isLoggedIn) {
      router.push('/admin')
      return
    }
  }, [router])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Iniciando creación de producto...')
      console.log('Datos del formulario:', formData)

      // Validar datos requeridos
      if (!formData.name || !formData.price || !formData.stock) {
        alert('Por favor completa todos los campos requeridos')
        setLoading(false)
        return
      }

      // Crear nuevo producto para enviar a la API
      const newProduct = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        image: formData.image || '/images/LogoBebidas.jpeg',
        description: formData.description
      }

      console.log('Creando producto con dataManager:', newProduct)

      // Usar dataManager para agregar el producto
      const createdProduct = dataManager.addProduct(newProduct)
      console.log('Producto creado con dataManager:', createdProduct)

      // Mostrar mensaje de éxito
      alert('✅ ¡Producto creado exitosamente! Se actualizará automáticamente en todos los dispositivos.')

      // Redirigir a la gestión de productos
      router.push('/admin/products')
    } catch (error) {
      console.error('Error al crear producto:', error)
      alert('Error al crear el producto: ' + (error instanceof Error ? error.message : 'Error desconocido'))
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageSelect = (imagePath: string) => {
    console.log('🎯 Seleccionando imagen para el producto:', imagePath)
    setFormData(prev => ({
      ...prev,
      image: imagePath
    }))
    console.log('✅ Imagen seleccionada para el producto')
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
              <img 
                src="/images/LogoBebidas.jpeg" 
                alt="KNDrinks Logo" 
                className="h-12 w-auto object-contain rounded-lg"
              />
              <h1 className="text-2xl font-bold text-slate-800">Nuevo Producto</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre del Producto */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Ej: Whisky Premium"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Describe el producto..."
              />
            </div>

            {/* Categoría y Precio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                  Categoría *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  required
                >
                  <option value="Licores">Licores</option>
                  <option value="Vinos">Vinos</option>
                  <option value="Cervezas">Cervezas</option>
                  <option value="Sin Alcohol">Sin Alcohol</option>
                  <option value="Aperitivos">Aperitivos</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
                  Precio (ARS) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="15000"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Stock e Imagen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="10"
                  min="0"
                  required
                />
              </div>

              {/* Imagen del Producto */}
              <ImageSelector
                onImageSelect={handleImageSelect}
                selectedImage={formData.image}
                label="Imagen del Producto"
              />
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6">
              <Link
                href="/admin/dashboard"
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creando...' : 'Crear Producto'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
