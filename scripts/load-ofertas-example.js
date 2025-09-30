// Script para cargar ofertas de ejemplo con imágenes correctas
const ofertas = [
  {
    id: 1,
    title: "Combo Fernet + Coca",
    description: "Fernet Branca 750ml + 2 Coca Cola 2.25L",
    comboProducts: [
      { productId: 2, productName: "Fernet Branca 750ml", quantity: 1, price: 4500 },
      { productId: 1, productName: "Coca Cola 2.25L", quantity: 2, price: 1000 }
    ],
    finalPrice: 6500,
    image: "/images/fernetmas2cocas.jfif",
    category: "Combos",
    active: true,
    featured: true,
    priority: 5
  },
  {
    id: 2,
    title: "Combo Skyy + Speed",
    description: "Skyy Vodka 750ml + Speed XL",
    comboProducts: [
      { productId: 3, productName: "Skyy Vodka 750ml", quantity: 1, price: 3800 },
      { productId: 9, productName: "Speed XL", quantity: 1, price: 1500 }
    ],
    finalPrice: 4800,
    image: "/images/skyymasspeed.jfif",
    category: "Combos",
    active: true,
    featured: true,
    priority: 4
  },
  {
    id: 3,
    title: "Combo DU + Speed",
    description: "DU Renaissance 750ml + Speed XL",
    comboProducts: [
      { productId: 11, productName: "DU Renaissance 750ml", quantity: 1, price: 6500 },
      { productId: 9, productName: "Speed XL", quantity: 1, price: 1500 }
    ],
    finalPrice: 7500,
    image: "/images/Duconspeed.jfif",
    category: "Combos",
    active: true,
    featured: false,
    priority: 3
  },
  {
    id: 4,
    title: "Combo Smirnoff + 2 Speed",
    description: "Smirnoff Vodka 750ml + 2 Speed XL",
    comboProducts: [
      { productId: 4, productName: "Smirnoff Vodka 750ml", quantity: 1, price: 3500 },
      { productId: 9, productName: "Speed XL", quantity: 2, price: 1500 }
    ],
    finalPrice: 5500,
    image: "/images/Smirnoffmas2speed.png",
    category: "Combos",
    active: true,
    featured: false,
    priority: 2
  },
  {
    id: 5,
    title: "Combo Fernet + Coca Descartable",
    description: "Fernet Branca 750ml + Coca Cola Descartable 500ml",
    comboProducts: [
      { productId: 2, productName: "Fernet Branca 750ml", quantity: 1, price: 4500 },
      { productId: 8, productName: "Coca Cola Descartable 500ml", quantity: 1, price: 800 }
    ],
    finalPrice: 5000,
    image: "/images/fernetmascocadescartable.jpg",
    category: "Combos",
    active: true,
    featured: false,
    priority: 2
  },
  {
    id: 6,
    title: "Combo Vino Toro + Pritty",
    description: "Vino Toro 750ml + Pritty Limón 2.25L",
    comboProducts: [
      { productId: 13, productName: "Vino Toro 750ml", quantity: 1, price: 2200 },
      { productId: 5, productName: "Pritty Limón 2.25L", quantity: 1, price: 1200 }
    ],
    finalPrice: 4000,
    image: "/images/vinotoromaspritty.jpg",
    category: "Combos",
    active: true,
    featured: false,
    priority: 1
  },
  {
    id: 7,
    title: "Combo Viña de Balbo + Pritty",
    description: "Vino Viña de Balbo Tinto + Pritty Limón 2.25L",
    comboProducts: [
      { productId: 12, productName: "Vino Viña de Balbo Tinto", quantity: 1, price: 2200 },
      { productId: 5, productName: "Pritty Limón 2.25L", quantity: 1, price: 1200 }
    ],
    finalPrice: 4000,
    image: "/images/viñadebalbomaspritty.png",
    category: "Combos",
    active: true,
    featured: false,
    priority: 1
  }
]

// Guardar en localStorage
if (typeof window !== 'undefined') {
  localStorage.setItem('ofertas', JSON.stringify(ofertas))
  console.log('✅ Ofertas de ejemplo cargadas:', ofertas.length)
  console.log('📦 Ofertas guardadas:', ofertas)
} else {
  console.log('❌ Este script debe ejecutarse en el navegador')
}

// Exportar para uso en Node.js si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ofertas
}
