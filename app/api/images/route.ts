import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images')
    
    // Leer el directorio de imágenes
        const files = fs.readdirSync(imagesDir)
    
    // Filtrar solo archivos de imagen (todos los formatos soportados)
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase()
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.jfif', '.bmp', '.tiff', '.tif', '.svg', '.ico'].includes(ext)
    })
    
    // Mapeo de nombres de archivos a información del producto
        // Mapeo de nombres de archivos a información del producto
        const imageMapping: Record<string, any> = {
          'cocacola.jfif': { category: 'Bebidas', price: 4200, description: 'Refresco clásico de Coca Cola', type: 'product' },
          'fernet750.jfif': { category: 'Licores', price: 13500, description: 'Fernet italiano de alta calidad', type: 'product' },
          'skyy.png': { category: 'Licores', price: 9500, description: 'Vodka premium americano', type: 'product' },
          'Smirnoffsolo.jpeg': { category: 'Licores', price: 8000, description: 'Vodka ruso premium', type: 'product' },
          'prittyde2250-lt.jpg': { category: 'Bebidas', price: 2600, description: 'Gaseosa sabor limón 2.25L', type: 'product' },
          'pritty2250.jfif': { category: 'Bebidas', price: 2600, description: 'Gaseosa sabor limón 2.25L', type: 'product' },
          'Gancia.jfif': { category: 'Licores', price: 8000, description: 'Aperitivo italiano clásico', type: 'product' },
          'Sprite.webp': { category: 'Bebidas', price: 1000, description: 'Refresco sabor lima-limón', type: 'product' },
          'prittyde3lts.webp': { category: 'Bebidas', price: 1800, description: 'Gaseosa sabor limón 3 litros', type: 'product' },
          'SpeedXL.webp': { category: 'Bebidas', price: 1500, description: 'Bebida energética XL', type: 'product' },
          'DURenaissance.jfif': { category: 'Licores', price: 6500, description: 'Vodka premium francés', type: 'product' },
          'balbomaspritty.png': { category: 'Combos', price: 4000, description: 'Combo Viña de Balbo + Pritty', type: 'combo' },
          'vinotoro.jfif': { category: 'Vinos', price: 2200, description: 'Vino tinto de calidad', type: 'product' },
          'cocadescartable.jpg': { category: 'Bebidas', price: 800, description: 'Coca Cola en botella descartable', type: 'product' },
          'skyymasspeed.jfif': { category: 'Combos', price: 4800, description: 'Combo Skyy + Speed', type: 'combo' },
          'Smirnoffmas2speed.png': { category: 'Combos', price: 5500, description: 'Combo Smirnoff + 2 Speed', type: 'combo' },
          'Duconspeed.jfif': { category: 'Combos', price: 7500, description: 'Combo Du + Speed', type: 'combo' },
          'fernetmas2cocas.jfif': { category: 'Combos', price: 6500, description: 'Combo Fernet + 2 Coca Cola', type: 'combo' },
          'fernetmascocadescartable.jpg': { category: 'Combos', price: 5000, description: 'Combo Fernet + Coca Descartable', type: 'combo' },
          'vinotoromaspritty.jpg': { category: 'Combos', price: 4000, description: 'Combo Vino Toro + Pritty', type: 'combo' },
          'viñadebalbomaspritty.png': { category: 'Combos', price: 4000, description: 'Combo Viña de Balbo + Pritty', type: 'combo' },
          'dosbrancamasdoscocas.webp': { category: 'Combos', price: 0, description: 'Imagen disponible para crear oferta', type: 'combo' }
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
          image: `/images/${file}`,
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
        const fileName = file.toLowerCase()
        
        // Excluir logos y archivos que no son productos
        if (fileName.includes('logo') || fileName.includes('brand') || fileName.includes('icon')) {
          continue // Saltar este archivo
        }
        
        const ext = path.extname(file).toLowerCase()
        const name = file.replace(ext, '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        
        // Detectar categoría basándose en el nombre del archivo
        let category = 'Nuevo'
        let price = 2000
        let description = `Producto nuevo: ${name}`
        
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
          image: `/images/${file}`,
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