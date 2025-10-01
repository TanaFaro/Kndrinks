import { NextRequest, NextResponse } from 'next/server'

// Datos de productos unificados (en producción esto vendría de una base de datos)
let products = [
  {
    id: 1,
    name: "Fernet BRANCA",
    price: 13500,
    category: "Aperitivos",
    stock: 6,
    image: "/images/fernet750.jfif",
    description: "Fernet italiano de alta calidad"
  },
  {
    id: 2,
    name: "Skyy saborizado",
    price: 9500,
    category: "Licores",
    stock: 12,
    image: "/images/skyy.png",
    description: "Vodka premium americano"
  },
  {
    id: 3,
    name: "Smirnoff Saborizado",
    price: 8000,
    category: "Licores",
    stock: 12,
    image: "/images/Smirnoffsolo.jpeg",
    description: "Vodka ruso premium"
  },
  {
    id: 4,
    name: "Gancia",
    price: 8000,
    category: "Aperitivos",
    stock: 6,
    image: "/images/Gancia.jfif",
    description: "Aperitivo italiano clásico"
  },
  {
    id: 5,
    name: "Coca-cola x 2.25 lt",
    price: 4200,
    category: "Sin Alcohol",
    stock: 12,
    image: "/images/cocacola.jfif",
    description: "Refresco clásico de Coca Cola"
  },
  {
    id: 6,
    name: "Speed XL",
    price: 2800,
    category: "Sin Alcohol",
    stock: 12,
    image: "/images/SpeedXL.webp",
    description: "Bebida energética"
  }
]

// GET - Obtener productos
export async function GET() {
  return NextResponse.json(products)
}

// POST - Agregar producto
export async function POST(request: NextRequest) {
  try {
    const newProduct = await request.json()
    const product = {
      id: products.length + 1,
      ...newProduct,
      createdAt: new Date().toISOString()
    }
    products.push(product)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 })
  }
}

// PUT - Actualizar producto
export async function PUT(request: NextRequest) {
  try {
    const updatedProduct = await request.json()
    const index = products.findIndex(p => p.id === updatedProduct.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }
    
    products[index] = { ...products[index], ...updatedProduct }
    return NextResponse.json(products[index])
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar producto' }, { status: 500 })
  }
}

// DELETE - Eliminar producto
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '0')
    
    const index = products.findIndex(p => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })
    }
    
    products.splice(index, 1)
    return NextResponse.json({ message: 'Producto eliminado' })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar producto' }, { status: 500 })
  }
}
