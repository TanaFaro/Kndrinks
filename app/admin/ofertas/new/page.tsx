'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
  validUntil: string
  active: boolean
}

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  image: string
  description: string
}

export default function NewOferta() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<ComboProduct[]>([])
  const [availableImages, setAvailableImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    finalPrice: '',
    validUntil: '',
    active: true
  })

  // Cargar productos disponibles
  useEffect(() => {
    loadProducts()
    loadAvailableImages()
  }, [])

  // Monitorear cambios en selectedProducts
  useEffect(() => {
    console.log('🔄 selectedProducts cambió:', selectedProducts)
    console.log('📊 Cantidad actual:', selectedProducts.length)
  }, [selectedProducts])

  const loadProducts = () => {
    try {
      console.log('🔄 Iniciando carga de productos...')
      const savedProducts = localStorage.getItem('products')
      console.log('📦 Productos en localStorage:', savedProducts)
      
      if (savedProducts) {
        const parsedProducts: Product[] = JSON.parse(savedProducts)
        console.log('✅ Productos parseados:', parsedProducts)
        console.log('📊 Cantidad de productos:', parsedProducts.length)
        
        setProducts(parsedProducts)
        console.log('✅ Estado de productos actualizado')
      } else {
        console.log('⚠️ No hay productos creados. Crea productos primero.')
        setProducts([])
      }
    } catch (error) {
      console.error('❌ Error cargando productos:', error)
      setProducts([])
    }
  }

  const loadAvailableImages = async () => {
    try {
      const response = await fetch('/api/images')
      if (response.ok) {
        const data = await response.json()
        const imagePaths = data.images.map((img: any) => img.path)
        setAvailableImages(imagePaths)
        console.log('✅ Imágenes disponibles:', imagePaths.length)
      } else {
        console.error('❌ Error cargando imágenes:', response.status)
      }
    } catch (error) {
      console.error('❌ Error cargando imágenes:', error)
    }
  }

  const handleProductSelect = (product: Product) => {
    console.log('🎯 Seleccionando producto:', product.name)
    console.log('📋 Producto completo:', product)
    console.log('🔍 Productos actualmente seleccionados:', selectedProducts)
    
    // Verificar si el producto ya está en el combo
    const existingProduct = selectedProducts.find(p => p.productId === product.id)
    console.log('🔍 Producto existente encontrado:', existingProduct)
    
    if (existingProduct) {
      console.log('➕ Incrementando cantidad del producto existente')
      setSelectedProducts(prev => {
        const updated = prev.map(p => 
          p.productId === product.id 
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
        console.log('✅ Productos actualizados (incremento):', updated)
        return updated
      })
    } else {
      console.log('➕ Agregando nuevo producto al combo')
      const newComboProduct: ComboProduct = {
        productId: product.id,
        productName: product.name,
        quantity: 1,
        price: product.price
      }
      console.log('🆕 Nuevo producto del combo:', newComboProduct)
      setSelectedProducts(prev => {
        const updated = [...prev, newComboProduct]
        console.log('✅ Productos actualizados (nuevo):', updated)
        return updated
      })
    }
  }

  const handleImageSelect = (imagePath: string) => {
    console.log('🎯 Seleccionando imagen:', imagePath)
    
    // Crear un producto virtual basado en la imagen
    const productName = imagePath.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Producto'
    const virtualProduct: Product = {
      id: Date.now() + Math.random(), // ID único temporal
      name: productName,
      price: 1000, // Precio por defecto
      category: 'Producto',
      stock: 1,
      image: imagePath,
      description: `Producto basado en ${productName}`
    }
    
    // Agregar al combo
    const newComboProduct: ComboProduct = {
      productId: virtualProduct.id,
      productName: virtualProduct.name,
      quantity: 1,
      price: virtualProduct.price
    }
    
    setSelectedProducts(prev => [...prev, newComboProduct])
    console.log('✅ Imagen agregada como producto al combo')
  }

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setSelectedProducts(prev => prev.filter(p => p.productId !== productId))
    } else {
      setSelectedProducts(prev => prev.map(p => 
        p.productId === productId 
          ? { ...p, quantity: newQuantity }
          : p
      ))
    }
  }

  const removeProduct = (productId: number) => {
    setSelectedProducts(prev => prev.filter(p => p.productId !== productId))
  }

  const isFormValid = () => {
    const hasProducts = selectedProducts.length > 0
    const hasTitle = formData.title.trim() !== ''
    const hasPrice = formData.finalPrice.trim() !== ''
    const hasDate = formData.validUntil.trim() !== ''
    const notLoading = !loading
    
    console.log('🔍 Validación del formulario:', {
      hasProducts,
      hasTitle,
      hasPrice,
      hasDate,
      notLoading,
      selectedProductsCount: selectedProducts.length,
      title: formData.title,
      price: formData.finalPrice,
      date: formData.validUntil
    })
    
    return hasProducts && hasTitle && hasPrice && hasDate && notLoading
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('🚀 Iniciando creación de combo...')
      console.log('📋 Datos del formulario:', formData)
      console.log('🛍️ Productos del combo:', selectedProducts)
      console.log('🖼️ Imagen seleccionada:', selectedImage)

      if (selectedProducts.length === 0) {
        alert('Debes seleccionar al menos un producto para el combo')
        setLoading(false)
        return
      }

      if (!formData.title || !formData.finalPrice || !formData.validUntil) {
        alert('Por favor completa todos los campos requeridos')
        setLoading(false)
        return
      }

      const savedOfertas = localStorage.getItem('ofertas')
      const ofertas: Oferta[] = savedOfertas ? JSON.parse(savedOfertas) : []

      const newOferta: Oferta = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        comboProducts: selectedProducts,
        finalPrice: parseFloat(formData.finalPrice),
        image: selectedImage || '/images/Logo Bebidas.jpeg',
        category: 'Combos',
        validUntil: formData.validUntil,
        active: formData.active
      }

      console.log('✅ Nuevo combo creado:', newOferta)
      ofertas.push(newOferta)
      localStorage.setItem('ofertas', JSON.stringify(ofertas))
      console.log('✅ Combo guardado exitosamente')
      alert('¡Combo creado exitosamente!')
      router.push('/admin/ofertas')
    } catch (error) {
      console.error('❌ Error al crear combo:', error)
      alert('Error al crear el combo: ' + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const calculateIndividualPrice = () => {
    return selectedProducts.reduce((total, product) => {
      return total + (product.price * product.quantity)
    }, 0)
  }

  const calculateSavings = () => {
    const individualPrice = calculateIndividualPrice()
    const comboPrice = parseFloat(formData.finalPrice) || 0
    return individualPrice - comboPrice
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Crear Nuevo Combo</h1>
          <p className="text-gray-600">Crea ofertas especiales combinando productos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del Combo *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                    formData.title.trim() !== '' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300'
                  }`}
                  placeholder="Ej: Fernet + Coca Cola"
                  required
                />
                {formData.title.trim() !== '' && (
                  <div className="flex items-center gap-2 mt-1 text-green-600 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Título válido
                  </div>
                )}
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  rows={3}
                  placeholder="Describe el combo..."
                />
              </div>

              {/* Precio Final */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio del Combo *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.finalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, finalPrice: e.target.value }))}
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                      formData.finalPrice.trim() !== '' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                {formData.finalPrice.trim() !== '' && (
                  <div className="flex items-center gap-2 mt-1 text-green-600 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Precio válido
                  </div>
                )}
              </div>

              {/* Fecha de Vencimiento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Válido hasta *
                </label>
                <input
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all ${
                    formData.validUntil.trim() !== '' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300'
                  }`}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                {formData.validUntil.trim() !== '' && (
                  <div className="flex items-center gap-2 mt-1 text-green-600 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Fecha válida
                  </div>
                )}
              </div>

              {/* Imagen del Combo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen del Combo
                </label>
                <div className="space-y-3">
                  <select
                    value={selectedImage}
                    onChange={(e) => setSelectedImage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  >
                    <option value="">Seleccionar imagen...</option>
                    {availableImages.map((image, index) => (
                      <option key={index} value={image}>
                        {image.split('/').pop()}
                      </option>
                    ))}
                  </select>
                  
                  {selectedImage && (
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-xl border-2 border-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedImage('')}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <button
                    type="button"
                    onClick={loadAvailableImages}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Actualizar Lista de Imágenes
                  </button>
                </div>
              </div>

              {/* Estado Activo */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                />
                <label htmlFor="active" className="ml-2 text-sm text-gray-700">
                  Combo activo
                </label>
              </div>

              {/* Resumen de Validación */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-gray-700">Estado de Validación:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className={`flex items-center gap-2 ${selectedProducts.length > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {selectedProducts.length > 0 ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    Productos: {selectedProducts.length}
                  </div>
                  <div className={`flex items-center gap-2 ${formData.title.trim() !== '' ? 'text-green-600' : 'text-red-500'}`}>
                    {formData.title.trim() !== '' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    Título
                  </div>
                  <div className={`flex items-center gap-2 ${formData.finalPrice.trim() !== '' ? 'text-green-600' : 'text-red-500'}`}>
                    {formData.finalPrice.trim() !== '' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    Precio
                  </div>
                  <div className={`flex items-center gap-2 ${formData.validUntil.trim() !== '' ? 'text-green-600' : 'text-red-500'}`}>
                    {formData.validUntil.trim() !== '' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    Fecha
                  </div>
                </div>
              </div>

              {/* Botón de Envío */}
              <button
                type="submit"
                disabled={!isFormValid()}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all ${
                  isFormValid()
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creando Combo...
                  </div>
                ) : (
                  'Crear Combo'
                )}
              </button>
            </form>
          </div>

          {/* Panel de Productos y Vista Previa */}
          <div className="space-y-6">
            {/* Selección de Productos */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Seleccionar Productos</h3>
                {selectedProducts.length > 0 && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {selectedProducts.length} producto(s) seleccionado(s)
                  </div>
                )}
              </div>
              
              {availableImages.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-2">No hay imágenes disponibles</p>
                  <p className="text-sm text-gray-500">Agrega imágenes a la carpeta public/images</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {availableImages.map((imagePath, index) => (
                    <div
                      key={index}
                      onClick={() => handleImageSelect(imagePath)}
                      className="p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={imagePath}
                          alt={`Producto ${index + 1}`}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">
                            {imagePath.split('/').pop()?.replace(/\.[^/.]+$/, '') || `Producto ${index + 1}`}
                          </p>
                          <p className="text-sm text-gray-600">Seleccionar</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Productos Seleccionados */}
            {selectedProducts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Productos del Combo</h3>
                <div className="space-y-3">
                  {selectedProducts.map((comboProduct) => {
                    const product = products.find(p => p.id === comboProduct.productId)
                    return (
                      <div key={comboProduct.productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img
                            src={product?.image || '/images/Logo Bebidas.jpeg'}
                            alt={product?.name}
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{product?.name}</p>
                            <p className="text-sm text-gray-600">${product?.price} c/u</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(comboProduct.productId, comboProduct.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">{comboProduct.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(comboProduct.productId, comboProduct.quantity + 1)}
                            className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeProduct(comboProduct.productId)}
                            className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Vista Previa del Combo */}
            {selectedProducts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Vista Previa del Combo</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Precio individual:</span>
                    <span className="font-medium">${calculateIndividualPrice()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Precio del combo:</span>
                    <span className="font-medium text-violet-600">${formData.finalPrice || '0.00'}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Ahorro:</span>
                      <span className="text-green-600">${calculateSavings().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
