import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Lista estática de imágenes conocidas para producción
const STATIC_IMAGES = [
  'coca descartable.jpg',
  'cocacola.jfif',
  'Du con speed.jfif',
  'fernet 750.jfif',
  'Logo Bebidas.jpeg',
  'pritty 2.250.jfif',
  'pritty de 3lts.webp',
  'skyy mas speed.jfif',
  'skyy.png',
  'Smirnoff mas 2 speed.png',
  'Smirnoff solo.jpeg',
  'Speed XL.webp',
  'viña de balbo mas pritty.png',
  'vino toro mas pritty.jpg',
  'vino toro.jfif',
  'VINO-VINA-DE-BALBO-TINTO.png'
]

export async function GET() {
  try {
    const images: {name: string, path: string, filename: string, size: number, modified: Date}[] = []
    
    // Intentar leer del sistema de archivos primero
    const imagesDir = path.join(process.cwd(), 'public', 'images')
    
    if (fs.existsSync(imagesDir)) {
      try {
        const files = fs.readdirSync(imagesDir)
        
        files.forEach(file => {
          const ext = path.extname(file).toLowerCase()
          if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.jfif'].includes(ext)) {
            const filePath = path.join(imagesDir, file)
            const stats = fs.statSync(filePath)
            
            images.push({
              name: path.parse(file).name,
              path: `/images/${file}`,
              filename: file,
              size: stats.size,
              modified: stats.mtime
            })
          }
        })
        
        console.log(`📸 API de imágenes (FS): ${images.length} imágenes encontradas`)
      } catch (fsError) {
        console.warn('⚠️ Error leyendo directorio de imágenes, usando lista estática:', fsError)
      }
    }
    
    // Si no hay imágenes del sistema de archivos, usar lista estática
    if (images.length === 0) {
      console.log('📸 Usando lista estática de imágenes para producción')
      
      STATIC_IMAGES.forEach(filename => {
        images.push({
          name: path.parse(filename).name,
          path: `/images/${filename}`,
          filename: filename,
          size: 0, // No podemos obtener el tamaño en producción
          modified: new Date() // Fecha actual como fallback
        })
      })
    }
    
    // Ordenar por fecha de modificación (más recientes primero)
    images.sort((a, b) => b.modified.getTime() - a.modified.getTime())
    
    console.log(`📸 API de imágenes final: ${images.length} imágenes disponibles`)
    
    return NextResponse.json({ 
      images,
      timestamp: new Date().toISOString(),
      count: images.length,
      source: images.length > 0 && images[0].size === 0 ? 'static' : 'filesystem'
    })
  } catch (error) {
    console.error('❌ Error en API de imágenes:', error)
    
    // Fallback a lista estática en caso de error
    const fallbackImages = STATIC_IMAGES.map(filename => ({
      name: path.parse(filename).name,
      path: `/images/${filename}`,
      filename: filename,
      size: 0,
      modified: new Date()
    }))
    
    return NextResponse.json({ 
      images: fallbackImages,
      timestamp: new Date().toISOString(),
      count: fallbackImages.length,
      source: 'fallback',
      error: 'Usando lista de respaldo'
    })
  }
}
