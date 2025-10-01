'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  image: string
  description: string
}

export default function EditProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Licores',
    stock: '',
    image: '',
    description: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const params = useParams()
  const productId = parseInt(params.id as string)

  useEffect(() => {
    // Verificar si el admin está logueado
    const isLoggedIn = auth.isLoggedIn()
    if (!isLoggedIn) {
      router.push('/admin')
      return
    }
  
    // Cargar datos del producto desde la API
    loadProduct()
  }, [productId, router])

  const loadProduct = async () => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Error cargando productos')
      
      const products: Product[] = await response.json()
      const product = products.find(p => p.id === productId)
      
      if (product) {
        setFormData({
          name: product.name,
          price: product.price.toString(),
          category: product.category,
          stock: product.stock.toString(),
          image: product.image,
          description: product.description
        })
      } else {
        alert('Producto no encontrado')
        router.push('/admin/products')
      }
    } catch (error) {
      console.error('Error cargando producto:', error)
      alert('Error cargando producto: ' + (error as Error).message)
      router.push('/admin/products')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Actualizar producto en la API unificada
      const updatedProduct = {
        id: productId,
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        image: formData.image || '/images/LogoBebidas.jpeg',
        description: formData.description
      }

      console.log('Actualizando producto en API:', updatedProduct)

      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct)
      })

      if (!response.ok) {
        throw new Error('Error al actualizar producto en la API')
      }

      const result = await response.json()
      console.log('Producto actualizado en API:', result)

      alert('✅ ¡Producto actualizado exitosamente! Se actualizará automáticamente en todos los dispositivos.')

      // Redirigir a la gestión de productos
      router.push('/admin/products')
    } catch (error) {
      console.error('Error al actualizar producto:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando producto...</p>
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
              <img 
                src="/images/LogoBebidas.jpeg" 
                alt="KNDrinks Logo" 
                className="h-12 w-auto object-contain rounded-lg"
              />
              <h1 className="text-2xl font-bold text-slate-800">Editar Producto</h1>
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

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2">
                  URL de la Imagen
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
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
                disabled={saving}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
