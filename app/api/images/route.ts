import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'Fotos Bebidas')
    
    // Leer el directorio de imágenes
    const files = fs.readdirSync(imagesDir)
    
    // Filtrar solo archivos de imagen (todos los formatos soportados)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.jfif', '.bmp', '.tiff', '.tif', '.svg', '.ico'].includes(ext)
    })
    
    // Mapeo de nombres de archivos a información del producto
    const imageMapping: Record<string, any> = {
      'cocacola.jfif': { category: 'Bebidas', price: 2500, description: 'Refresco clásico de Coca Cola', type: 'product' },
      'fernet 750.jfif': { category: 'Licores', price: 4500, description: 'Fernet italiano de alta calidad', type: 'product' },
      'skyy.png': { category: 'Licores', price: 3800, description: 'Vodka premium americano', type: 'product' },
      'Smirnoff solo.jpeg': { category: 'Licores', price: 3500, description: 'Vodka ruso premium', type: 'product' },
      'pritty de 2.250 lt.jpg': { category: 'Bebidas', price: 1200, description: 'Gaseosa sabor limón 2.25L', type: 'product' },
      'Gancia.jfif': { category: 'Licores', price: 3200, description: 'Aperitivo italiano clásico', type: 'product' },
      'Sprite.webp': { category: 'Bebidas', price: 1000, description: 'Refresco sabor lima-limón', type: 'product' },
      'pritty de 3 lts.webp': { category: 'Bebidas', price: 1800, description: 'Gaseosa sabor limón 3 litros', type: 'product' },
      'Speed XL.webp': { category: 'Bebidas', price: 1500, description: 'Bebida energética XL', type: 'product' },
      'DU Renaissance.jfif': { category: 'Licores', price: 6500, description: 'Vodka premium francés', type: 'product' },
      'skyy mas speed.jfif': { category: 'Combos', price: 4800, description: 'Combo Skyy + Speed', type: 'combo' },
      'Smirnoff mas 2 speed.png': { category: 'Combos', price: 5500, description: 'Combo Smirnoff + 2 Speed', type: 'combo' },
      'Du con speed.jfif': { category: 'Combos', price: 7500, description: 'Combo Du + Speed', type: 'combo' },
      'fernet mas 2 cocas.jfif': { category: 'Combos', price: 6500, description: 'Combo Fernet + 2 Coca Cola', type: 'combo' },
      'fernet mas coca descartable.jpg': { category: 'Combos', price: 5000, description: 'Combo Fernet + Coca Descartable', type: 'combo' }
    }
    
    // Procesar las imágenes
    const products: any[] = []
    const combos: any[] = []
    let productId = 1
    let comboId = 1
    
    for (const file of imageFiles) {
      const mapping = imageMapping[file]
      if (mapping) {
        const imageData = {
          id: mapping.type === 'combo' ? comboId++ : productId++,
          name: file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          price: mapping.price,
          category: mapping.category,
          stock: Math.floor(Math.random() * 50) + 10, // Stock aleatorio
          image: `/Fotos Bebidas/${file}`,
          description: mapping.description,
          type: mapping.type
        }
        
        if (mapping.type === 'combo') {
          combos.push(imageData)
        } else {
          products.push(imageData)
        }
      } else {
        // Imagen nueva sin mapeo - crear producto automáticamente
        const ext = path.extname(file).toLowerCase()
        const name = file.replace(ext, '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        
        // Detectar categoría basándose en el nombre del archivo
        let category = 'Nuevo'
        let price = 2000
        let description = `Producto nuevo: ${name}`
        
        const fileName = file.toLowerCase()
        
        // Detectar categorías por palabras clave
        if (fileName.includes('fernet') || fileName.includes('vodka') || fileName.includes('whisky') || 
            fileName.includes('gin') || fileName.includes('ron') || fileName.includes('licor')) {
          category = 'Licores'
          price = 3500
          description = `Licor: ${name}`
        } else if (fileName.includes('vino') || fileName.includes('wine') || fileName.includes('tinto') || 
                   fileName.includes('blanco') || fileName.includes('rosado')) {
          category = 'Vinos'
          price = 2200
          description = `Vino: ${name}`
        } else if (fileName.includes('coca') || fileName.includes('sprite') || fileName.includes('fanta') || 
                   fileName.includes('pritty') || fileName.includes('gaseosa') || fileName.includes('bebida')) {
          category = 'Bebidas'
          price = 1500
          description = `Bebida: ${name}`
        } else if (fileName.includes('combo') || fileName.includes('pack') || fileName.includes('oferta')) {
          category = 'Combos'
          price = 3000
          description = `Combo: ${name}`
        }
        
        // Detectar si es un combo por el nombre
        const isCombo = fileName.includes('combo') || fileName.includes('pack') || fileName.includes('mas') || 
                       fileName.includes('+') || fileName.includes('y')
        
        const productData = {
          id: isCombo ? comboId++ : productId++,
          name: name,
          price: price,
          category: category,
          stock: Math.floor(Math.random() * 50) + 10,
          image: `/Fotos Bebidas/${file}`,
          description: description,
          type: isCombo ? 'combo' : 'product'
        }
        
        if (isCombo) {
          combos.push(productData)
        } else {
          products.push(productData)
        }
      }
    }
    
    return NextResponse.json({
      products,
      combos,
      totalImages: imageFiles.length,
      newImages: imageFiles.filter(file => !imageMapping[file])
    })
    
  } catch (error) {
    console.error('Error reading images:', error)
    return NextResponse.json({ error: 'Failed to read images' }, { status: 500 })
  }
}