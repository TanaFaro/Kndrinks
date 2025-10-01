'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  image: string
  description: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Error cargando productos')
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError('Error cargando productos: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) throw new Error('Error eliminando producto')
      
      // Recargar productos
      await loadProducts()
      alert('✅ Producto eliminado correctamente')
    } catch (err) {
      alert('❌ Error eliminando producto: ' + (err as Error).message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Gestión de Productos</h1>
          <p className="text-gray-600 mb-6">Administra los productos que se muestran en todos los dispositivos</p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/admin/products/new"
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ➕ Agregar Producto
            </Link>
            <button 
              onClick={loadProducts}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              🔄 Recargar
            </button>
            <Link 
              href="/admin"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              ← Volver al Admin
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Lista de Productos ({products.length})
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay productos</h3>
              <p className="text-gray-600 mb-4">Agrega tu primer producto para comenzar</p>
              <Link 
                href="/admin/products/new"
                className="inline-block bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Agregar Producto
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img 
                              className="h-12 w-12 rounded-lg object-cover" 
                              src={product.image} 
                              alt={product.name}
                              onError={(e) => {
                                e.currentTarget.src = '/images/LogoBebidas.jpeg'
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-violet-600">
                          ${product.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.category === 'Sin Alcohol' ? 'bg-green-100 text-green-800' :
                          product.category === 'Licores' ? 'bg-red-100 text-red-800' :
                          product.category === 'Aperitivos' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/products/edit/${product.id}`}
                            className="text-violet-600 hover:text-violet-900"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
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
          )}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Información</h3>
          <p className="text-blue-700 text-sm">
            Los cambios que hagas aquí se reflejarán <strong>instantáneamente</strong> en todos los dispositivos 
            (computadora, celular, tablet). No necesitas recargar manualmente en otros dispositivos.
          </p>
        </div>
      </div>
    </div>
  )
}
