import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images')
    const images: {name: string, path: string, filename: string}[] = []
    
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir)
      
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase()
        if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.jfif'].includes(ext)) {
          images.push({
            name: path.parse(file).name,
            path: `/images/${file}`,
            filename: file
          })
        }
      })
    }
    
    return NextResponse.json({ images })
  } catch (error) {
    console.error('Error leyendo imágenes:', error)
    return NextResponse.json({ images: [] }, { status: 500 })
  }
}
