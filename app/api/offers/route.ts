import { NextRequest, NextResponse } from 'next/server'

// Datos de ofertas unificados (en producción esto vendría de una base de datos)
let offers = [
  {
    id: 1,
    title: "Du + Speed",
    description: "Combo DU Renaissance + Speed XL",
    comboProducts: [
      { name: "DU Renaissance 750ml", quantity: 1, price: 5000 },
      { name: "Speed XL", quantity: 1, price: 2800 }
    ],
    finalPrice: 7500,
    image: "/images/Duconspeed.jfif",
    category: "Combos",
    active: true,
    priority: 1
  },
  {
    id: 2,
    title: "Branca 750ml + 1 Coca 2.25L",
    description: "Fernet Branca + Coca Cola descartable",
    comboProducts: [
      { name: "Fernet Branca 750ml", quantity: 1, price: 13500 },
      { name: "Coca Cola Descartable 2.25L", quantity: 1, price: 4200 }
    ],
    finalPrice: 17000,
    image: "/images/fernetmascocadescartable.jpg",
    category: "Combos",
    active: true,
    priority: 2
  },
  {
    id: 3,
    title: "Branca 750ml + 2 Coca 2.25L",
    description: "Fernet Branca + 2 Coca Cola descartable",
    comboProducts: [
      { name: "Fernet Branca 750ml", quantity: 1, price: 13500 },
      { name: "Coca Cola Descartable 2.25L", quantity: 2, price: 4200 }
    ],
    finalPrice: 21200,
    image: "/images/fernetmas2cocas.jfif",
    category: "Combos",
    active: true,
    priority: 3
  }
]

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
