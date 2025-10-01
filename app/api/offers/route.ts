import { NextRequest, NextResponse } from 'next/server'

// Datos de ofertas unificados (en producción esto vendría de una base de datos)
// Iniciando vacío - se cargarán desde el panel de administrador
let offers: any[] = []

// GET - Obtener ofertas
export async function GET() {
  return NextResponse.json(offers)
}

// POST - Agregar oferta
export async function POST(request: NextRequest) {
  try {
    const newOffer = await request.json()
    const offer = {
      id: offers.length + 1,
      ...newOffer,
      createdAt: new Date().toISOString()
    }
    offers.push(offer)
    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear oferta' }, { status: 500 })
  }
}

// PUT - Actualizar oferta
export async function PUT(request: NextRequest) {
  try {
    const updatedOffer = await request.json()
    const index = offers.findIndex(o => o.id === updatedOffer.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Oferta no encontrada' }, { status: 404 })
    }
    
    offers[index] = { ...offers[index], ...updatedOffer }
    return NextResponse.json(offers[index])
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar oferta' }, { status: 500 })
  }
}

// DELETE - Eliminar oferta
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    const index = offers.findIndex(o => o.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Oferta no encontrada' }, { status: 404 })
    }
    
    offers.splice(index, 1)
    return NextResponse.json({ message: 'Oferta eliminada' })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar oferta' }, { status: 500 })
  }
}
