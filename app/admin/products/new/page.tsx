'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Licores',
    stock: '',
    image: '',
    description: ''
  })
  const [selectedImage, setSelectedImage] = useState('')
  const [showImageSelector, setShowImageSelector] = useState(false)
  const [availableImages, setAvailableImages] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar si el admin está logueado
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    if (!isLoggedIn) {
      router.push('/admin')
      return
    }

    // Cargar imágenes disponibles
    loadAvailableImages()
  }, [router])

  const loadAvailableImages = async () => {
    try {
      // Llamar a la API para obtener imágenes dinámicamente
      const response = await fetch('/api/images')
      const data = await response.json()
      
      if (data.images && data.images.length > 0) {
        setAvailableImages(data.images)
      } else {
        // Fallback a imágenes conocidas si la API falla
        const fallbackImages = [
          { name: 'Logo Bebidas', path: '/images/Logo Bebidas.jpeg' }
        ]
        setAvailableImages(fallbackImages)
      }
    } catch (error) {
      console.error('Error cargando imágenes:', error)
      // Fallback a imágenes conocidas
      const fallbackImages = [
        { name: 'Logo Bebidas', path: '/images/Logo Bebidas.jpeg' }
      ]
      setAvailableImages(fallbackImages)
    }
  }

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

      // Obtener productos existentes
      const savedProducts = localStorage.getItem('products')
      console.log('Productos existentes:', savedProducts)
      
      const products: Product[] = savedProducts ? JSON.parse(savedProducts) : []
      console.log('Lista de productos parseada:', products)

      // Crear nuevo producto
      const newProduct: Product = {
        id: Date.now(), // ID único basado en timestamp
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        image: formData.image || '/images/Logo Bebidas.jpeg',
        description: formData.description
      }

      console.log('Nuevo producto creado:', newProduct)

      // Agregar a la lista
      products.push(newProduct)
      console.log('Producto agregado a la lista. Total:', products.length)

      // Guardar en localStorage
      localStorage.setItem('products', JSON.stringify(products))
      console.log('Productos guardados en localStorage')

      // Mostrar mensaje de éxito
      alert('¡Producto creado exitosamente!')

      // Redirigir al dashboard
      router.push('/admin/dashboard')
    } catch (error) {
      console.error('Error al crear producto:', error)
      alert('Error al crear el producto: ' + error.message)
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
                src="/images/Logo Bebidas.jpeg" 
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

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2">
                  Imagen del Producto
                </label>
                <div className="space-y-3">
                                     {/* URL de imagen */}
                   <div className="relative">
                     <input
                       type="text"
                       id="image"
                       name="image"
                       value={formData.image}
                       onChange={handleChange}
                       className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ${
                         formData.image ? 'border-green-300 bg-green-50' : 'border-slate-300'
                       }`}
                       placeholder="URL de imagen o selecciona una imagen local"
                     />
                     {formData.image && (
                       <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                         <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                         </svg>
                         <button
                           type="button"
                           onClick={() => {
                             setFormData(prev => ({ ...prev, image: '' }))
                             setSelectedImage('')
                           }}
                           className="text-red-500 hover:text-red-700"
                           title="Limpiar imagen"
                         >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                           </svg>
                         </button>
                       </div>
                     )}
                   </div>
                  
                  {/* O usar imagen local */}
                  <div className="text-center">
                    <span className="text-sm text-slate-500">O</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setShowImageSelector(!showImageSelector)}
                    className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-violet-400 hover:bg-violet-50 transition-colors text-slate-600"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Seleccionar imagen local</span>
                    </div>
                  </button>
                  
                                     {/* Selector de imágenes locales */}
                   {showImageSelector && (
                     <div className="bg-white border border-slate-200 rounded-xl p-4 max-h-60 overflow-y-auto">
                       <div className="flex justify-between items-center mb-3">
                         <h4 className="text-sm font-medium text-slate-700">Imágenes disponibles:</h4>
                         <button
                           type="button"
                           onClick={loadAvailableImages}
                           className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                         >
                           🔄 Actualizar
                         </button>
                       </div>
                                              <div className="grid grid-cols-2 gap-3">
                         {availableImages.length > 0 ? (
                           availableImages.map((img) => (
                             <button
                               key={img.path}
                               type="button"
                               onClick={() => {
                                 console.log('Imagen seleccionada:', img.path)
                                 setFormData(prev => {
                                   const newData = { ...prev, image: img.path }
                                   console.log('Nuevo formData:', newData)
                                   return newData
                                 })
                                 setSelectedImage(img.path)
                                 setShowImageSelector(false)
                               }}
                               className={`p-2 border rounded-lg hover:bg-violet-50 transition-colors ${
                                 selectedImage === img.path ? 'border-violet-500 bg-violet-50' : 'border-slate-200'
                               }`}
                             >
                               <img 
                                 src={img.path} 
                                 alt={img.name}
                                 className="w-full h-20 object-cover rounded"
                                 onError={(e) => {
                                   e.currentTarget.src = '/images/Logo Bebidas.jpeg'
                                 }}
                               />
                               <p className="text-xs text-slate-600 mt-1 truncate">{img.name}</p>
                             </button>
                           ))
                         ) : (
                           <div className="col-span-2 text-center py-8 text-slate-500">
                             <svg className="w-12 h-12 mx-auto mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                             </svg>
                             <p className="text-sm">No se encontraron imágenes</p>
                             <p className="text-xs mt-1">Ejecuta update-images.bat para copiar imágenes</p>
                           </div>
                         )}
                       </div>
                                             <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                         <p className="text-xs text-blue-700">
                           💡 <strong>Consejo:</strong> Para agregar más imágenes:
                         </p>
                         <ul className="text-xs text-blue-700 mt-1 space-y-1">
                           <li>• Colócalas en la carpeta <code className="bg-blue-100 px-1 rounded">public/images/</code></li>
                           <li>• O ejecuta <code className="bg-blue-100 px-1 rounded">update-images.bat</code> para copiar desde "Fotos Bebidas"</li>
                           <li>• Haz clic en "🔄 Actualizar" para recargar la lista</li>
                         </ul>
                       </div>
                    </div>
                  )}
                  
                  {/* Vista previa */}
                  {formData.image && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-slate-700 mb-2">Vista previa:</p>
                      <div className="relative w-32 h-32 border border-slate-200 rounded-lg overflow-hidden">
                        <img 
                          src={formData.image} 
                          alt="Vista previa"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/product-default.jpg'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
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
