'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import { normalizeImagePath } from '@/lib/imageUtils'
import { useImageRefresh } from '@/lib/useImageRefresh'
import { saveOfertas, notifyDataChange } from '@/lib/dataSync'
import ImageSelector from '@/components/ImageSelector'

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
  featured?: boolean
  priority?: number
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
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [showProductSelector, setShowProductSelector] = useState(false)
  
  // Usar el hook personalizado para manejar imágenes
  const { images: availableImages, loading: imagesLoading, lastUpdate, refreshImages, imageCount } = useImageRefresh()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    finalPrice: '',
    active: true,
    featured: false,
    priority: 1
  })

  // Cargar productos disponibles
  useEffect(() => {
    // Verificar si el admin está logueado
    if (!auth.isLoggedIn()) {
      router.push('/admin')
      return
    }
    
    loadProducts()
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
        
        // Verificar cada producto individualmente
        parsedProducts.forEach((product, index) => {
          console.log(`Producto ${index + 1}:`, {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            stock: product.stock
          })
        })
        
        // Verificar si hay productos duplicados
        const uniqueProducts = parsedProducts.filter((product, index, self) => 
          index === self.findIndex(p => p.id === product.id)
        )
        
        if (uniqueProducts.length !== parsedProducts.length) {
          console.log('⚠️ Productos duplicados detectados:', {
            total: parsedProducts.length,
            únicos: uniqueProducts.length,
            duplicados: parsedProducts.length - uniqueProducts.length
          })
        }
        
        // Usar solo productos únicos
        setProducts(uniqueProducts)
        console.log('✅ Productos únicos establecidos:', uniqueProducts.length)
      } else {
        console.log('⚠️ No hay productos creados. Crea productos primero.')
        setProducts([])
      }
    } catch (error) {
      console.error('❌ Error cargando productos:', error)
      setProducts([])
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
    console.log('🎯 Seleccionando imagen para la oferta:', imagePath)
    setSelectedImage(imagePath)
    console.log('✅ Imagen seleccionada para la oferta')
    
    // Actualizar el título del combo basado en la imagen seleccionada
    const imageName = imagePath.split('/').pop()?.replace(/\.[^/.]+$/, '') || ''
    if (imageName && !formData.title) {
      setFormData(prev => ({
        ...prev,
        title: imageName.replace(/\s+/g, ' ').trim()
      }))
    }
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
    const hasTitle = formData.title.trim() !== ''
    const hasPrice = formData.finalPrice.trim() !== ''
    const hasImage = selectedImage !== ''
    const notLoading = !loading
    
    console.log('🔍 Validación del formulario:', {
      hasTitle,
      hasPrice,
      hasImage,
      notLoading,
      selectedProductsCount: selectedProducts.length,
      title: formData.title,
      price: formData.finalPrice,
      image: selectedImage,
      productsAvailable: products.length
    })
    
    return hasTitle && hasPrice && hasImage && notLoading
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('🚀 Iniciando creación de combo...')
      console.log('📋 Datos del formulario:', formData)
      console.log('🛍️ Productos del combo:', selectedProducts)
      console.log('🖼️ Imagen seleccionada:', selectedImage)

      // Los productos son opcionales para los combos
      console.log('📦 Productos seleccionados:', selectedProducts.length)

      if (!formData.title || !formData.finalPrice) {
        alert('Por favor completa todos los campos requeridos')
        setLoading(false)
        return
      }

      const savedOfertas = localStorage.getItem('ofertas')
      const ofertas: Oferta[] = savedOfertas ? JSON.parse(savedOfertas) : []

      // Normalizar la ruta de la imagen
      const imagePath = normalizeImagePath(selectedImage)

      const newOferta: Oferta = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        comboProducts: selectedProducts,
        finalPrice: parseFloat(formData.finalPrice),
        image: imagePath,
        category: 'Combos',
        active: formData.active,
        featured: formData.featured,
        priority: formData.priority
      }

      console.log('✅ Nuevo combo creado:', newOferta)
      console.log('🖼️ Imagen guardada:', imagePath)
      ofertas.push(newOferta)
      saveOfertas(ofertas)
      console.log('✅ Combo guardado exitosamente')
      console.log('📦 Total de ofertas guardadas:', ofertas.length)
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


              {/* Imagen del Combo */}
              <ImageSelector
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                label="Imagen del Combo"
              />

              {/* Estado Activo */}
              <div className="space-y-4">
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
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                    ⭐ Combo destacado (aparece primero)
                  </label>
                </div>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="priority" className="text-sm text-gray-700">
                    Popularidad:
                  </label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  >
                    <option value={1}>⭐ Nuevo</option>
                    <option value={2}>⭐⭐ Recomendado</option>
                    <option value={3}>⭐⭐⭐ Popular</option>
                    <option value={4}>⭐⭐⭐⭐ Muy Popular</option>
                    <option value={5}>⭐⭐⭐⭐⭐ Más Pedido</option>
                  </select>
                </div>
              </div>

              {/* Resumen de Validación */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 className="font-medium text-gray-700">Estado de Validación:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
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
                  <div className={`flex items-center gap-2 ${selectedImage !== '' ? 'text-green-600' : 'text-red-500'}`}>
                    {selectedImage !== '' ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    Imagen
                  </div>
                  <div className={`flex items-center gap-2 ${selectedProducts.length > 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                    {selectedProducts.length > 0 ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    Productos: {selectedProducts.length} (opcional)
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
                <div className="flex items-center gap-3">
                  {selectedProducts.length > 0 && (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {selectedProducts.length} producto(s) seleccionado(s)
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowProductSelector(true)}
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Agregar Producto
                  </button>
                </div>
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
                <>
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      📸 {imageCount} imágenes disponibles
                      {lastUpdate && (
                        <span className="text-xs text-blue-600 ml-2">
                          (Actualizado: {new Date(lastUpdate).toLocaleTimeString()})
                        </span>
                      )}
                    </p>
                  </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                  {availableImages.map((imagePath, index) => (
                    <div
                      key={index}
                      onClick={() => handleImageSelect(imagePath)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedImage === imagePath 
                          ? 'border-violet-500 bg-violet-50' 
                          : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={imagePath}
                          alt={`Imagen ${index + 1}`}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">
                            {imagePath.split('/').pop()?.replace(/\.[^/.]+$/, '') || `Imagen ${index + 1}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {selectedImage === imagePath ? 'Seleccionada' : 'Seleccionar'}
                          </p>
                        </div>
                        {selectedImage === imagePath && (
                          <div className="text-violet-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                </>
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
                            src={product?.image || '/images/LogoBebidas.jpeg'}
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
            {(selectedProducts.length > 0 || selectedImage) && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Vista Previa del Combo</h3>
                
                {/* Imagen del combo */}
                {selectedImage && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Imagen del combo:</h4>
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Vista previa del combo"
                        className="w-full h-48 object-cover rounded-xl border-2 border-violet-200"
                        onError={(e) => {
                          console.log('❌ Error cargando imagen en vista previa:', selectedImage)
                          e.currentTarget.src = '/images/LogoBebidas.jpeg'
                        }}
                        onLoad={() => {
                          console.log('✅ Imagen de vista previa cargada:', selectedImage)
                        }}
                      />
                      <div className="absolute top-2 left-2 bg-violet-500 text-white px-2 py-1 rounded text-xs font-bold">
                        Combo Preview
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Información del combo */}
                {selectedProducts.length > 0 && (
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
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Selección de Productos */}
      {showProductSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Seleccionar Productos</h2>
                <button
                  onClick={() => setShowProductSelector(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {products.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <p className="text-gray-600 mb-2">No hay productos disponibles</p>
                  <p className="text-sm text-gray-500 mb-4">Crea productos primero en la sección de productos</p>
                  <button
                    onClick={() => {
                      setShowProductSelector(false)
                      router.push('/admin/products/new')
                    }}
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                  >
                    Crear Producto
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      📊 Mostrando {products.length} productos disponibles
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-violet-300 hover:bg-violet-50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = '/images/LogoBebidas.jpeg'
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 truncate">{product.name}</p>
                          <p className="text-sm text-gray-600">${product.price.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
