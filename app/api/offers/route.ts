import { NextRequest, NextResponse } from 'next/server'
import { dataManager } from '@/lib/dataManager'

// GET - Obtener ofertas
export async function GET() {
  try {
    const ofertas = dataManager.getOfertas()
    console.log('🎁 API: Devolviendo ofertas:', ofertas.length)
    return NextResponse.json(ofertas)
  } catch (error) {
    console.error('❌ API: Error obteniendo ofertas:', error)
    return NextResponse.json({ error: 'Error obteniendo ofertas' }, { status: 500 })
  }
}

// POST - Agregar oferta o sincronizar
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Si es una sincronización desde el cliente
    if (body.action === 'sync') {
      console.log('🔄 API: Sincronizando ofertas desde cliente:', body.data.length)
      // Aquí podrías guardar en una base de datos o archivo
      // Por ahora solo devolvemos las ofertas actuales
      const ofertas = dataManager.getOfertas()
      return NextResponse.json({ message: 'Sincronización exitosa', count: ofertas.length })
    }
    
    // Si es una nueva oferta
    const newOffer = body
    const oferta = dataManager.addOferta(newOffer)
    console.log('✅ API: Oferta agregada:', oferta.title)
    return NextResponse.json(oferta, { status: 201 })
  } catch (error) {
    console.error('❌ API: Error al crear oferta:', error)
    return NextResponse.json({ error: 'Error al crear oferta' }, { status: 500 })
  }
}

// PUT - Actualizar oferta
export async function PUT(request: NextRequest) {
  try {
    const updatedOffer = await request.json()
    const oferta = dataManager.updateOferta(updatedOffer.id, updatedOffer)
    
    if (!oferta) {
      return NextResponse.json({ error: 'Oferta no encontrada' }, { status: 404 })
    }
    
    console.log('🔄 API: Oferta actualizada:', oferta.title)
    return NextResponse.json(oferta)
  } catch (error) {
    console.error('❌ API: Error al actualizar oferta:', error)
    return NextResponse.json({ error: 'Error al actualizar oferta' }, { status: 500 })
  }
}

// DELETE - Eliminar oferta
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    const success = dataManager.deleteOferta(id)
    if (!success) {
      return NextResponse.json({ error: 'Oferta no encontrada' }, { status: 404 })
    }
    
    console.log('🗑️ API: Oferta eliminada:', id)
    return NextResponse.json({ message: 'Oferta eliminada' })
  } catch (error) {
    console.error('❌ API: Error al eliminar oferta:', error)
    return NextResponse.json({ error: 'Error al eliminar oferta' }, { status: 500 })
  }
}
