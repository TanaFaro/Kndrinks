import { NextRequest, NextResponse } from 'next/server'

// Datos de ofertas unificados (en producción esto vendría de una base de datos)
// Usando un sistema de persistencia temporal
let offers: any[] = []

// Función para cargar ofertas desde localStorage (simulado)
function loadOffersFromStorage() {
  // En un entorno real, esto vendría de una base de datos
  // Por ahora, mantenemos los datos en memoria
  if (offers.length === 0) {
    offers = [
      {
        id: 1,
        title: "Fernet + 2 Cocas",
        description: "Fernet BRANCA 750ml + 2 Coca Cola 2.25L",
        comboProducts: [
          { name: "Fernet BRANCA", quantity: 1, price: 13500 },
          { name: "Coca Cola 2.25L", quantity: 2, price: 4200 }
        ],
        finalPrice: 21900,
        image: "/images/fernetmas2cocas.jfif",
        category: "Combos",
        active: true,
        priority: 5
      }
    ]
  }
  return offers
}

// GET - Obtener ofertas
export async function GET() {
  const currentOffers = loadOffersFromStorage()
  console.log('🎁 API: Devolviendo ofertas:', currentOffers.length)
  return NextResponse.json(currentOffers)
}

// POST - Agregar oferta
export async function POST(request: NextRequest) {
  try {
    const newOffer = await request.json()
    const currentOffers = loadOffersFromStorage()
    
    const offer = {
      id: currentOffers.length + 1,
      ...newOffer,
      createdAt: new Date().toISOString()
    }
    
    offers.push(offer)
    console.log('✅ API: Oferta agregada:', offer.title, 'Total ofertas:', offers.length)
    return NextResponse.json(offer, { status: 201 })
  } catch (error) {
    console.error('❌ API: Error al crear oferta:', error)
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
