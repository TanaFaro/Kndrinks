import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images')
    const images: {name: string, path: string, filename: string, size: number, modified: Date}[] = []
    
    if (fs.existsSync(imagesDir)) {
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
      
      // Ordenar por fecha de modificación (más recientes primero)
      images.sort((a, b) => b.modified.getTime() - a.modified.getTime())
    }
    
    console.log(`📸 API de imágenes: ${images.length} imágenes encontradas`)
    
    return NextResponse.json({ 
      images,
      timestamp: new Date().toISOString(),
      count: images.length
    })
  } catch (error) {
    console.error('❌ Error leyendo imágenes:', error)
    return NextResponse.json({ 
      images: [], 
      error: 'Error al leer imágenes',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
