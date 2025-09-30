import { useState, useEffect } from 'react'

interface ImageInfo {
  name: string
  path: string
  category: string
  price: number
  description: string
}

// Mapeo de nombres de archivos a información del producto
const IMAGE_MAPPING: Record<string, Omit<ImageInfo, 'name' | 'path'>> = {
  'cocacola.jfif': { category: 'Bebidas', price: 2500, description: 'Refresco clásico de Coca Cola' },
  'fernet 750.jfif': { category: 'Licores', price: 4500, description: 'Fernet italiano de alta calidad' },
  'skyy.png': { category: 'Licores', price: 3800, description: 'Vodka premium americano' },
  'Smirnoff solo.jpeg': { category: 'Licores', price: 3500, description: 'Vodka ruso premium' },
  'pritty 2.250.jfif': { category: 'Bebidas', price: 1200, description: 'Gaseosa sabor limón' },
  'vino toro.jfif': { category: 'Vinos', price: 1800, description: 'Vino tinto clásico' },
  'coca descartable.jpg': { category: 'Bebidas', price: 800, description: 'Coca Cola en botella descartable' },
  'pritty de 3lts.webp': { category: 'Bebidas', price: 1800, description: 'Gaseosa sabor limón 3 litros' },
  'Speed XL.webp': { category: 'Bebidas', price: 1500, description: 'Bebida energética XL' },
  'VINO-VINA-DE-BALBO-TINTO.png': { category: 'Vinos', price: 2200, description: 'Vino tinto premium' },
  'Logo Bebidas.jpeg': { category: 'Otros', price: 0, description: 'Logo de la empresa' },
  'skyy mas speed.jfif': { category: 'Combos', price: 4800, description: 'Combo Skyy + Speed' },
  'Smirnoff mas 2 speed.png': { category: 'Combos', price: 5500, description: 'Combo Smirnoff + 2 Speed' },
  'Du con speed.jfif': { category: 'Combos', price: 7500, description: 'Combo Du + Speed' },
  'viña de balbo mas pritty.png': { category: 'Combos', price: 3500, description: 'Combo Viña + Pritty' },
  'vino toro mas pritty.jpg': { category: 'Combos', price: 2500, description: 'Combo Vino Toro + Pritty' },
  'viñas mas pritty': { category: 'Combos', price: 3000, description: 'Combo Viñas + Pritty' }
}

// Lista de imágenes conocidas (se actualiza automáticamente)
const KNOWN_IMAGES = [
  'cocacola.jfif',
  'fernet 750.jfif', 
  'skyy.png',
  'Smirnoff solo.jpeg',
  'pritty 2.250.jfif',
  'vino toro.jfif',
  'coca descartable.jpg',
  'pritty de 3lts.webp',
  'Speed XL.webp',
  'VINO-VINA-DE-BALBO-TINTO.png',
  'skyy mas speed.jfif',
  'Smirnoff mas 2 speed.png',
  'Du con speed.jfif',
  'viña de balbo mas pritty.png',
  'vino toro mas pritty.jpg'
]

export function useImages() {
  const [images, setImages] = useState<ImageInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Simular carga de imágenes (en un caso real, harías una llamada a la API)
        const imageList: ImageInfo[] = []
        let productId = 1
        let comboId = 1

        for (const imageName of KNOWN_IMAGES) {
          const mapping = IMAGE_MAPPING[imageName]
          if (mapping) {
            imageList.push({
              name: imageName,
              path: `/images/${imageName}`,
              ...mapping,
              // Agregar ID único
              ...(mapping.category === 'Combos' ? { id: comboId++ } : { id: productId++ })
            })
          }
        }

        setImages(imageList)
        setLoading(false)
      } catch (error) {
        console.error('Error loading images:', error)
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  return { images, loading }
}

// Función para detectar nuevas imágenes (simulada)
export function detectNewImages(): Promise<string[]> {
  return new Promise((resolve) => {
    // En un caso real, aquí harías una llamada a la API para obtener la lista de imágenes
    // Por ahora, retornamos las imágenes conocidas
    setTimeout(() => {
      resolve(KNOWN_IMAGES)
    }, 100)
  })
}
