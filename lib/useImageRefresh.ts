import { useState, useEffect, useCallback } from 'react'

interface ImageInfo {
  name: string
  path: string
  filename: string
  size: number
  modified: string
}

interface UseImageRefreshReturn {
  images: string[]
  loading: boolean
  lastUpdate: string | null
  refreshImages: () => Promise<void>
  imageCount: number
}

export function useImageRefresh(): UseImageRefreshReturn {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [imageCount, setImageCount] = useState(0)

  const refreshImages = useCallback(async () => {
    setLoading(true)
    try {
      console.log('🔄 Refrescando lista de imágenes...')
      const response = await fetch(`/api/images?t=${Date.now()}`)
      
      if (response.ok) {
        const data = await response.json()
        // Extraer rutas de imágenes de productos y combos
        const imagePaths = [...data.products, ...data.combos].map((item: any) => item.image)
        
        setImages(imagePaths)
        setLastUpdate(new Date().toISOString())
        setImageCount(imagePaths.length)
        
        console.log('✅ Imágenes actualizadas:', imagePaths.length)
        console.log('📸 Última actualización:', new Date().toISOString())
        console.log('🖼️ Imágenes cargadas:', imagePaths)
      } else {
        console.error('❌ Error cargando imágenes:', response.status)
      }
    } catch (error) {
      console.error('❌ Error refrescando imágenes:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshImages()
  }, [refreshImages])

  return {
    images,
    loading,
    lastUpdate,
    refreshImages,
    imageCount
  }
}
