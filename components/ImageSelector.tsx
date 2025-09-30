'use client'

import { useState } from 'react'
import { useImageRefresh } from '@/lib/useImageRefresh'

interface ImageSelectorProps {
  onImageSelect: (imagePath: string) => void
  selectedImage?: string
  label?: string
}

export default function ImageSelector({ onImageSelect, selectedImage, label = "Seleccionar Imagen" }: ImageSelectorProps) {
  const { images, loading, lastUpdate, refreshImages, imageCount } = useImageRefresh()
  const [error, setError] = useState<string | null>(null)

  const loadImages = async () => {
    try {
      setError(null)
      await refreshImages()
    } catch (err) {
      setError('Error al cargar las imágenes')
      console.error('Error:', err)
    }
  }

  const handleImageSelect = (imagePath: string) => {
    onImageSelect(imagePath)
  }

  if (loading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-gray-500">Cargando imágenes...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center justify-center p-4 border-2 border-dashed border-red-300 rounded-lg">
          <div className="text-red-500">{error}</div>
        </div>
        <button
          onClick={loadImages}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      
      {/* Información de imágenes cargadas */}
      {!loading && images.length > 0 && (
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
      )}
      
      {/* Imagen seleccionada actualmente */}
      {selectedImage && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
          <div className="relative inline-block">
            <img
              src={selectedImage}
              alt="Imagen seleccionada"
              className="w-20 h-20 object-cover rounded-lg border-2 border-blue-500"
            />
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              ✓
            </div>
          </div>
        </div>
      )}

      {/* Grid de imágenes disponibles */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-60 overflow-y-auto border rounded-lg p-2">
        {images.map((imagePath, index) => (
          <button
            key={index}
            onClick={() => handleImageSelect(imagePath)}
            className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === imagePath
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <img
              src={imagePath}
              alt={`Imagen ${index + 1}`}
              className="w-full h-16 object-cover"
              onError={(e) => {
                e.currentTarget.src = '/images/LogoBebidas.jpeg'
              }}
            />
            
            {/* Overlay de selección */}
            {selectedImage === imagePath && (
              <div className="absolute inset-0 bg-blue-500 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-full p-1">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Tooltip con nombre del archivo */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {imagePath.split('/').pop()}
            </div>
          </button>
        ))}
      </div>

      {/* Botón para recargar */}
      <button
        onClick={loadImages}
        className="text-sm text-gray-600 hover:text-gray-800 underline"
      >
        🔄 Actualizar lista de imágenes
      </button>
    </div>
  )
}
