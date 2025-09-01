'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
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

interface Oferta {
  id: number
  productId: number
  productName: string
  title: string
  description: string
  discount: number
  originalPrice: number
  finalPrice: number
  image: string
  category: string
  validUntil: string
  active: boolean
}

export default function EditOferta() {
  const [formData, setFormData] = useState({
    productId: '',
    title: '',
    description: '',
    discount: '',
    validUntil: '',
    active: true
  })
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [showProductSelector, setShowProductSelector] = useState(false)
  const [availableImages, setAvailableImages] = useState<Array<{name: string, path: string, filename: string}>>([])
  const [oferta, setOferta] = useState<Oferta | null>(null)
  const router = useRouter()
  const params = useParams()
  const ofertaId = params.id

  useEffect(() => {
    // Verificar si el admin está logueado
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!isLoggedIn) {
      router.push('/admin')
      return
    }

    // Cargar la oferta a editar
    loadOferta()
    
    // Cargar productos disponibles
    loadProducts()
    
    // Cargar imágenes disponibles
    loadAvailableImages()
  }, [router, ofertaId])

  const loadOferta = () => {
    const savedOfertas = localStorage.getItem('ofertas')
    if (savedOfertas) {
      const ofertas: Oferta[] = JSON.parse(savedOfertas)
      const ofertaToEdit = ofertas.find(o => o.id === parseInt(ofertaId as string))
      
      if (ofertaToEdit) {
        setOferta(ofertaToEdit)
        setFormData({
          productId: ofertaToEdit.productId.toString(),
          title: ofertaToEdit.title,
          description: ofertaToEdit.description,
          discount: ofertaToEdit.discount.toString(),
          validUntil: ofertaToEdit.validUntil,
          active: ofertaToEdit.active
        })
        
        // Buscar el producto asociado
        const savedProducts = localStorage.getItem('products')
        if (savedProducts) {
          const products: Product[] = JSON.parse(savedProducts)
          const product = products.find(p => p.id === ofertaToEdit.productId)
          if (product) {
            setSelectedProduct(product)
          }
        }
      } else {
        alert('Oferta no encontrada')
        router.push('/admin/ofertas')
      }
    }
  }

  const loadProducts = () => {
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts)
      setProducts(parsedProducts)
    }
  }

  const loadAvailableImages = async () => {
    try {
      const response = await fetch('/api/images')
      const data = await response.json()
      setAvailableImages(data.images || [])
    } catch (error) {
      console.error('Error cargando imágenes:', error)
    }
  }

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product)
    setFormData(prev => ({
      ...prev,
      productId: product.id.toString(),
      title: `${product.name} - OFERTA ESPECIAL`,
      description: `Descuento especial en ${product.name}`,
      image: product.image
    }))
    setShowProductSelector(false)
  }

  const calculateFinalPrice = () => {
    if (!selectedProduct || !formData.discount) return 0
    const originalPrice = selectedProduct.price
    const discount = parseFloat(formData.discount)
    return originalPrice - (originalPrice * discount / 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Iniciando actualización de oferta...')
      console.log('Datos del formulario:', formData)
      console.log('Producto seleccionado:', selectedProduct)

      // Validar datos requeridos
      if (!selectedProduct || !formData.discount || !formData.validUntil) {
        alert('Por favor completa todos los campos requeridos')
        setLoading(false)
        return
      }

      // Validar descuento
      const discount = parseFloat(formData.discount)
      if (discount < 0 || discount > 99) {
        alert('El descuento debe estar entre 0% y 99%')
        setLoading(false)
        return
      }

      // Obtener ofertas existentes
      const savedOfertas = localStorage.getItem('ofertas')
      const ofertas: Oferta[] = savedOfertas ? JSON.parse(savedOfertas) : []

      // Calcular precio final
      const originalPrice = selectedProduct.price
      const finalPrice = originalPrice - (originalPrice * discount / 100)

      // Actualizar la oferta
      const updatedOferta: Oferta = {
        id: parseInt(ofertaId as string),
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        title: formData.title,
        description: formData.description,
        discount: discount,
        originalPrice: originalPrice,
        finalPrice: finalPrice,
        image: selectedProduct.image,
        category: selectedProduct.category,
        validUntil: formData.validUntil,
        active: formData.active
      }

      console.log('Oferta actualizada:', updatedOferta)

      // Actualizar en la lista
      const updatedOfertas = ofertas.map(o => 
        o.id === parseInt(ofertaId as string) ? updatedOferta : o
      )

      // Guardar en localStorage
      localStorage.setItem('ofertas', JSON.stringify(updatedOfertas))
      console.log('Oferta actualizada exitosamente')

      // Mostrar mensaje de éxito
      alert('¡Oferta actualizada exitosamente!')

      // Redirigir al dashboard de ofertas
      router.push('/admin/ofertas')
    } catch (error) {
      console.error('Error al actualizar oferta:', error)
      alert('Error al actualizar la oferta: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const finalPrice = calculateFinalPrice()

  if (!oferta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Cargando oferta...</p>
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
              <h1 className="text-2xl font-bold text-slate-800">Editar Oferta</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información actual de la oferta */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Información Actual de la Oferta</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-600">Producto:</p>
                  <p className="font-semibold text-blue-800">{oferta.productName}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Categoría:</p>
                  <p className="font-semibold text-blue-800">{oferta.category}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Descuento actual:</p>
                  <p className="font-semibold text-blue-800">{oferta.discount}%</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Precio final actual:</p>
                  <p className="font-semibold text-blue-800">${oferta.finalPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Selección de Producto */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Seleccionar Producto *
              </label>
              <div className="space-y-3">
                {selectedProduct ? (
                  <div className="border border-green-300 bg-green-50 rounded-xl p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/images/Logo Bebidas.jpeg'
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">{selectedProduct.name}</h3>
                        <p className="text-sm text-slate-600">{selectedProduct.category}</p>
                        <p className="text-lg font-bold text-green-600">${selectedProduct.price.toLocaleString()}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProduct(null)
                          setFormData(prev => ({ ...prev, productId: '', title: '', description: '' }))
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowProductSelector(true)}
                    className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-violet-400 hover:bg-violet-50 transition-colors text-slate-600"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <span>Cambiar producto</span>
                    </div>
                  </button>
                )}

                {/* Selector de productos */}
                {showProductSelector && (
                  <div className="bg-white border border-slate-200 rounded-xl p-4 max-h-60 overflow-y-auto">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-slate-700">Productos disponibles:</h4>
                      <button
                        type="button"
                        onClick={() => setShowProductSelector(false)}
                        className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                      >
                        ✕ Cerrar
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {products.length > 0 ? (
                        products.map((product) => (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => handleProductSelect(product)}
                            className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-violet-50 transition-colors text-left"
                          >
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                              onError={(e) => {
                                e.currentTarget.src = '/images/Logo Bebidas.jpeg'
                              }}
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-800">{product.name}</h4>
                              <p className="text-sm text-slate-600">{product.category}</p>
                              <p className="text-sm font-semibold text-green-600">${product.price.toLocaleString()}</p>
                            </div>
                            <div className="text-violet-600">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="text-center py-8 text-slate-500">
                          <svg className="w-12 h-12 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <p className="text-sm">No hay productos disponibles</p>
                          <p className="text-xs mt-1">Crea productos primero en el panel de administración</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Título de la Oferta */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                Título de la Oferta *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Ej: Whisky Premium 20% OFF"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                Descripción de la Oferta
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Describe la oferta..."
              />
            </div>

            {/* Descuento y Fecha de Vencimiento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-slate-700 mb-2">
                  Descuento (%) *
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  placeholder="Ingresa el porcentaje de descuento"
                  min="0"
                  max="99"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label htmlFor="validUntil" className="block text-sm font-medium text-slate-700 mb-2">
                  Válida hasta *
                </label>
                <input
                  type="date"
                  id="validUntil"
                  name="validUntil"
                  value={formData.validUntil}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Vista previa de la oferta */}
            {selectedProduct && formData.discount && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Vista previa de la oferta actualizada:</h3>
                <div className="flex items-center space-x-4">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/images/Logo Bebidas.jpeg'
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{formData.title}</h4>
                    <p className="text-sm text-slate-600">{formData.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-lg line-through text-slate-500">
                        ${selectedProduct.price.toLocaleString()}
                      </span>
                      <span className="text-2xl font-bold text-red-600">
                        ${finalPrice.toLocaleString()}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-bold">
                        -{formData.discount}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                Oferta activa
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
                disabled={loading || !selectedProduct}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Actualizando...' : 'Actualizar Oferta'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
