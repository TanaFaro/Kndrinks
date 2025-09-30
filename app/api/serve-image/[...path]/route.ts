import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = params.path.join('/')
    const fullPath = path.join(process.cwd(), 'Fotos Bebidas', imagePath)
    
    // Verificar que el archivo existe
    if (!fs.existsSync(fullPath)) {
      return new NextResponse('Image not found', { status: 404 })
    }
    
    // Leer el archivo
    const fileBuffer = fs.readFileSync(fullPath)
    
    // Determinar el tipo de contenido basándose en la extensión
    const ext = path.extname(fullPath).toLowerCase()
    let contentType = 'image/jpeg'
    
    switch (ext) {
      case '.png':
        contentType = 'image/png'
        break
      case '.gif':
        contentType = 'image/gif'
        break
      case '.webp':
        contentType = 'image/webp'
        break
      case '.jfif':
        contentType = 'image/jpeg'
        break
      case '.bmp':
        contentType = 'image/bmp'
        break
      case '.svg':
        contentType = 'image/svg+xml'
        break
      case '.ico':
        contentType = 'image/x-icon'
        break
      default:
        contentType = 'image/jpeg'
    }
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving image:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
