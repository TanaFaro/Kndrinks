'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { dataManager, Product, Oferta, ComboProduct } from '@/lib/dataManager'
import { normalizeImagePath } from '@/lib/imageUtils'
import { useImageRefresh } from '@/lib/useImageRefresh'
import ImageSelector from '@/components/ImageSelector'

type ItemType = 'product' | 'offer'

interface FormData {
  type: ItemType
  name: string
  title: string
  price: string
  finalPrice: string
  category: string
  stock: string
  description: string
  image: string
  active: boolean
  featured: boolean
  priority: number
  comboProducts: ComboProduct[]
}

export default function AdminItems() {
  const [items, setItems] = useState<(Product | Oferta)[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<(Product | Oferta) | null>(null)
  const [formData, setFormData] = useState<FormData>({
    type: 'product',
    name: '',
    title: '',
    price: '',
    finalPrice: '',
    category: 'Licores',
    stock: '',
    description: '',
    image: '',
    active: true,
    featured: false,
    priority: 1,
    comboProducts: []
  })
  const [selectedImage, setSelectedImage] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<ComboProduct[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const { images, refreshImages } = useImageRefresh()

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      router.push('/admin')
      return
    }
    loadItems()
    loadProducts()
  }, [router])

  const loadItems = () => {
    try {
      setLoading(true)
      const allProducts = dataManager.getProducts()
      const allOfertas = dataManager.getOfertas()
      
      // Combinar productos y ofertas en una sola lista
      const allItems = [
        ...allProducts.map(p => ({ ...p, itemType: 'product' as const })),
        ...allOfertas.map(o => ({ ...o, itemType: 'offer' as const }))
      ]
      
      setItems(allItems)
      console.log('📦 Items cargados:', allItems.length)
    } catch (err) {
      console.error('❌ Error cargando items:', err)
      setError('Error cargando items: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const loadProducts = () => {
    try {
      const productsData = dataManager.getProducts()
      setProducts(productsData)
    } catch (err) {
      console.error('❌ Error cargando productos:', err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? value : value
    }))
  }

  const handleImageSelect = (imagePath: string) => {
    setSelectedImage(imagePath)
    setFormData(prev => ({ ...prev, image: imagePath }))
  }

  const handleProductSelect = (product: Product) => {
    const existingProduct = selectedProducts.find(p => p.name === product.name)
    
    if (existingProduct) {
      setSelectedProducts(prev => prev.map(p => 
        p.name === product.name 
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ))
    } else {
      const newComboProduct: ComboProduct = {
        name: product.name,
        quantity: 1,
        price: product.price
      }
      setSelectedProducts(prev => [...prev, newComboProduct])
    }
  }

  const handleQuantityChange = (productName: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSelectedProducts(prev => prev.filter(p => p.name !== productName))
    } else {
      setSelectedProducts(prev => prev.map(p => 
        p.name === productName 
          ? { ...p, quantity: newQuantity }
          : p
      ))
    }
  }

  const removeProduct = (productName: string) => {
    setSelectedProducts(prev => prev.filter(p => p.name !== productName))
  }

  const resetForm = () => {
    setFormData({
      type: 'product',
      name: '',
      title: '',
      price: '',
      finalPrice: '',
      category: 'Licores',
      stock: '',
      description: '',
      image: '',
      active: true,
      featured: false,
      priority: 1,
      comboProducts: []
    })
    setSelectedImage('')
    setSelectedProducts([])
    setEditingItem(null)
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (formData.type === 'product') {
        if (!formData.name || !formData.price || !formData.stock) {
          throw new Error('Por favor completa todos los campos requeridos para productos')
        }

        const productData = {
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          stock: parseInt(formData.stock),
          image: normalizeImagePath(formData.image || selectedImage),
          description: formData.description,
          type: 'product' as const
        }

        if (editingItem && 'itemType' in editingItem && editingItem.itemType === 'product') {
          dataManager.updateProduct(editingItem.id, productData)
          setSuccess('✅ Producto actualizado exitosamente')
        } else {
          dataManager.addProduct(productData)
          setSuccess('✅ Producto creado exitosamente')
        }
      } else {
        if (!formData.title || !formData.finalPrice) {
          throw new Error('Por favor completa todos los campos requeridos para ofertas')
        }

        const ofertaData = {
          title: formData.title,
          description: formData.description,
          comboProducts: selectedProducts,
          finalPrice: parseFloat(formData.finalPrice),
          image: normalizeImagePath(formData.image || selectedImage),
          category: formData.category,
          active: formData.active,
          featured: formData.featured,
          priority: formData.priority
        }

        if (editingItem && 'itemType' in editingItem && editingItem.itemType === 'offer') {
          dataManager.updateOferta(editingItem.id, ofertaData)
          setSuccess('✅ Oferta actualizada exitosamente')
        } else {
          dataManager.addOferta(ofertaData)
          setSuccess('✅ Oferta creada exitosamente')
        }
      }

      loadItems()
      resetForm()
      setShowForm(false)
    } catch (err) {
      console.error('❌ Error guardando item:', err)
      setError('Error: ' + (err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item: Product | Oferta) => {
    if ('itemType' in item) {
      if (item.itemType === 'product') {
        setFormData({
          type: 'product',
          name: item.name,
          title: '',
          price: item.price.toString(),
          finalPrice: '',
          category: item.category,
          stock: item.stock.toString(),
          description: item.description,
          image: item.image,
          active: true,
          featured: false,
          priority: 1,
          comboProducts: []
        })
      } else {
        setFormData({
          type: 'offer',
          name: '',
          title: item.title,
          price: '',
          finalPrice: item.finalPrice.toString(),
          category: item.category,
          stock: '',
          description: item.description,
          image: item.image,
          active: item.active,
          featured: item.featured || false,
          priority: item.priority || 1,
          comboProducts: item.comboProducts || []
        })
        setSelectedProducts(item.comboProducts || [])
      }
      setSelectedImage(item.image)
      setEditingItem(item)
      setShowForm(true)
    }
  }

  const handleDelete = (item: Product | Oferta) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este item?')) return

    try {
      if ('itemType' in item) {
        if (item.itemType === 'product') {
          dataManager.deleteProduct(item.id)
        } else {
          dataManager.deleteOferta(item.id)
        }
        loadItems()
        setSuccess('✅ Item eliminado exitosamente')
      }
    } catch (err) {
      console.error('❌ Error eliminando item:', err)
      setError('Error eliminando item: ' + (err as Error).message)
    }
  }

  const getItemType = (item: Product | Oferta): string => {
    if ('itemType' in item) {
      return item.itemType === 'product' ? 'Producto' : 'Oferta'
    }
    return 'Desconocido'
  }

  const getItemPrice = (item: Product | Oferta): number => {
    if ('price' in item) {
      return item.price
    }
    if ('finalPrice' in item) {
      return item.finalPrice
    }
    return 0
  }

  const getItemName = (item: Product | Oferta): string => {
    if ('name' in item) {
      return item.name
    }
    if ('title' in item) {
      return item.title
    }
    return 'Sin nombre'
  }

  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando items...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Gestión de Items</h1>
              <p className="text-gray-600 mt-2">Administra productos y ofertas desde una sola interfaz</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  resetForm()
                  setShowForm(true)
                }}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                ➕ Nuevo Item
              </button>
              <Link
                href="/admin/dashboard"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                ← Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Éxito:</strong>
            <span className="block sm:inline"> {success}</span>
          </div>
        )}

        {/* Items List */}
        <div className="bg-white rounded-lg shadow-xl p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No hay items registrados</h3>
              <p className="text-gray-600">Agrega nuevos productos u ofertas para que aparezcan aquí.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Tipo</th>
                    <th className="py-3 px-6 text-left">Imagen</th>
                    <th className="py-3 px-6 text-left">Nombre</th>
                    <th className="py-3 px-6 text-left">Precio</th>
                    <th className="py-3 px-6 text-left">Categoría</th>
                    <th className="py-3 px-6 text-center">Estado</th>
                    <th className="py-3 px-6 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          'itemType' in item && item.itemType === 'product' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {getItemType(item)}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-left">
                        <img 
                          src={item.image} 
                          alt={getItemName(item)} 
                          className="w-12 h-12 object-cover rounded-md" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/LogoBebidas.jpeg'
                          }}
                        />
                      </td>
                      <td className="py-3 px-6 text-left font-medium">{getItemName(item)}</td>
                      <td className="py-3 px-6 text-left">${getItemPrice(item).toLocaleString()}</td>
                      <td className="py-3 px-6 text-left">{item.category}</td>
                      <td className="py-3 px-6 text-center">
                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          'active' in item && item.active ? 'text-green-900' : 'text-red-900'
                        }`}>
                          <span aria-hidden className={`absolute inset-0 opacity-50 rounded-full ${
                            'active' in item && item.active ? 'bg-green-200' : 'bg-red-200'
                          }`}></span>
                          <span className="relative">
                            {'active' in item && item.active ? 'Activo' : 'Inactivo'}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center gap-2">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="w-8 h-8 transform hover:text-violet-500 hover:scale-110"
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDelete(item)}
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
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingItem ? 'Editar Item' : 'Nuevo Item'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false)
                      resetForm()
                    }}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Tipo de Item */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Tipo de Item *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    >
                      <option value="product">Producto</option>
                      <option value="offer">Oferta</option>
                    </select>
                  </div>

                  {/* Nombre/Título */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {formData.type === 'product' ? 'Nombre del Producto *' : 'Título de la Oferta *'}
                    </label>
                    <input
                      type="text"
                      name={formData.type === 'product' ? 'name' : 'title'}
                      value={formData.type === 'product' ? formData.name : formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder={formData.type === 'product' ? 'Ej: Whisky Premium' : 'Ej: Combo Especial'}
                      required
                    />
                  </div>

                  {/* Precio */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {formData.type === 'product' ? 'Precio *' : 'Precio Final *'}
                    </label>
                    <input
                      type="number"
                      name={formData.type === 'product' ? 'price' : 'finalPrice'}
                      value={formData.type === 'product' ? formData.price : formData.finalPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="15000"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  {/* Categoría */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Categoría *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      required
                    >
                      <option value="Licores">Licores</option>
                      <option value="Aperitivos">Aperitivos</option>
                      <option value="Sin Alcohol">Sin Alcohol</option>
                      <option value="Combos">Combos</option>
                    </select>
                  </div>

                  {/* Stock (solo para productos) */}
                  {formData.type === 'product' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Stock *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        placeholder="10"
                        min="0"
                        required
                      />
                    </div>
                  )}

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      placeholder="Descripción del item..."
                      rows={3}
                    />
                  </div>

                  {/* Imagen */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Imagen *
                    </label>
                    <ImageSelector
                      images={images}
                      selectedImage={selectedImage}
                      onImageSelect={handleImageSelect}
                      onRefresh={refreshImages}
                    />
                  </div>

                  {/* Productos del combo (solo para ofertas) */}
                  {formData.type === 'offer' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Productos del Combo (Opcional)
                      </label>
                      <div className="space-y-4">
                        {/* Lista de productos disponibles */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {products.map((product) => (
                            <button
                              key={product.id}
                              type="button"
                              onClick={() => handleProductSelect(product)}
                              className="p-3 border border-gray-300 rounded-lg hover:border-violet-500 hover:bg-violet-50 transition-colors text-left"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-8 h-8 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium text-sm">{product.name}</p>
                                  <p className="text-xs text-gray-600">${product.price.toLocaleString()}</p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* Productos seleccionados */}
                        {selectedProducts.length > 0 && (
                          <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-3">Productos Seleccionados</h4>
                            <div className="space-y-2">
                              {selectedProducts.map((comboProduct) => (
                                <div key={comboProduct.name} className="flex items-center justify-between p-2 bg-white rounded">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                                      <span className="text-gray-500 text-xs">📦</span>
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">{comboProduct.name}</p>
                                      <p className="text-xs text-gray-600">${comboProduct.price.toLocaleString()} c/u</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleQuantityChange(comboProduct.name, comboProduct.quantity - 1)}
                                      className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center text-xs"
                                    >
                                      -
                                    </button>
                                    <span className="w-6 text-center text-sm font-medium">{comboProduct.quantity}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleQuantityChange(comboProduct.name, comboProduct.quantity + 1)}
                                      className="w-6 h-6 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center text-xs"
                                    >
                                      +
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => removeProduct(comboProduct.name)}
                                      className="ml-2 text-red-500 hover:text-red-700 transition-colors text-xs"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Estado (solo para ofertas) */}
                  {formData.type === 'offer' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="active"
                          checked={formData.active}
                          onChange={handleChange}
                          className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">Activo</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="featured"
                          checked={formData.featured}
                          onChange={handleChange}
                          className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">Destacado</label>
                      </div>
                    </div>
                  )}

                  {/* Botones */}
                  <div className="flex justify-end gap-4 pt-6 border-t">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        resetForm()
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Guardando...' : editingItem ? 'Actualizar' : 'Crear'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
