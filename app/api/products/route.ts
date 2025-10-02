import { NextRequest, NextResponse } from 'next/server'
import { dataManager } from '@/lib/dataManager'

// GET - Obtener productos
export async function GET() {
  try {
    const products = dataManager.getProducts()
    console.log('📦 API: Devolviendo productos:', products.length)
    return NextResponse.json(products)
  } catch (error) {
    console.error('❌ API: Error obteniendo productos:', error)
    return NextResponse.json({ error: 'Error obteniendo productos' }, { status: 500 })
  }
}

// POST - Agregar producto
export async function POST(request: NextRequest) {
  try {
    const newProduct = await request.json()
    const product = dataManager.addProduct(newProduct)
    console.log('✅ API: Producto agregado:', product.name)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('❌ API: Error al crear producto:', error)
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 })
  }
}

// PUT - Actualizar producto
export async function PUT(request: NextRequest) {
  try {
    const updatedProduct = await request.json()
    const product = dataManager.updateProduct(updatedProduct.id, updatedProduct)
    
    if (!product) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }
    
    console.log('🔄 API: Producto actualizado:', product.name)
    return NextResponse.json(product)
  } catch (error) {
    console.error('❌ API: Error al actualizar producto:', error)
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 })
  }
}

// DELETE - Eliminar producto
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    const success = dataManager.deleteProduct(id)
    if (!success) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }
    
    console.log('🗑️ API: Producto eliminado:', id)
    return NextResponse.json({ message: 'Producto eliminado' })
  } catch (error) {
    console.error('❌ API: Error al eliminar producto:', error)
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 })
  }
}
