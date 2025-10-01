// Script para cargar ofertas iniciales en el sistema
const ofertas = [
  {
    id: 1,
    title: "Du + Speed",
    description: "Combo DU Renaissance + Speed XL",
    comboProducts: [
      { productId: 11, productName: "DU Renaissance 750ml", quantity: 1, price: 5000 },
      { productId: 13, productName: "Speed XL", quantity: 1, price: 2800 }
    ],
    finalPrice: 7500,
    image: "/images/Duconspeed.jfif",
    category: "Combos",
    active: true,
    featured: false,
    priority: 1
  },
  {
    id: 2,
    title: "Branca 750ml + 1 Coca 2.25L",
    description: "Fernet Branca + Coca Cola descartable",
    comboProducts: [
      { productId: 2, productName: "Fernet Branca 750ml", quantity: 1, price: 13500 },
      { productId: 8, productName: "Coca Cola Descartable 2.25L", quantity: 1, price: 4200 }
    ],
    finalPrice: 17000,
    image: "/images/fernetmascocadescartable.jpg",
    category: "Combos",
    active: true,
    featured: false,
    priority: 2
  },
  {
    id: 3,
    title: "Branca 750ml + 2 Coca 2.25L",
    description: "Fernet Branca + 2 Coca Cola descartable",
    comboProducts: [
      { productId: 2, productName: "Fernet Branca 750ml", quantity: 1, price: 13500 },
      { productId: 8, productName: "Coca Cola Descartable 2.25L", quantity: 2, price: 4200 }
    ],
    finalPrice: 21200,
    image: "/images/fernetmas2cocas.jfif",
    category: "Combos",
    active: true,
    featured: false,
    priority: 3
  },
  {
    id: 4,
    title: "Skyy 750ml + 2 Speed XL",
    description: "Skyy Vodka + 2 Speed XL",
    comboProducts: [
      { productId: 3, productName: "Skyy Vodka 750ml", quantity: 1, price: 9500 },
      { productId: 13, productName: "Speed XL", quantity: 2, price: 2800 }
    ],
    finalPrice: 15500,
    image: "/images/skyymasspeed.jfif",
    category: "Combos",
    active: true,
    featured: false,
    priority: 4
  },
  {
    id: 5,
    title: "Smirnoff 750ml + 2 Speed XL",
    description: "Smirnoff Vodka + 2 Speed XL",
    comboProducts: [
      { productId: 4, productName: "Smirnoff Vodka 750ml", quantity: 1, price: 8000 },
      { productId: 13, productName: "Speed XL", quantity: 2, price: 2800 }
    ],
    finalPrice: 14500,
    image: "/images/Smirnoffmas2speed.png",
    category: "Combos",
    active: true,
    featured: false,
    priority: 5
  },
  {
    id: 6,
    title: "Toro Tinto 1L + 1 Pritty 2.25L",
    description: "Vino Toro + Pritty Limón",
    comboProducts: [
      { productId: 13, productName: "Vino Toro 1L", quantity: 1, price: 2200 },
      { productId: 5, productName: "Pritty Limón 2.25L", quantity: 1, price: 2600 }
    ],
    finalPrice: 4500,
    image: "/images/vinotoromaspritty.jpg",
    category: "Combos",
    active: true,
    featured: false,
    priority: 6
  },
  {
    id: 7,
    title: "Gancia + Sprite 2.25L",
    description: "Gancia + Sprite descartable",
    comboProducts: [
      { productId: 12, productName: "Gancia", quantity: 1, price: 8000 },
      { productId: 10, productName: "Sprite 2.25L", quantity: 1, price: 3400 }
    ],
    finalPrice: 12000,
    image: "/images/ganciamassprite.jpeg",
    category: "Combos",
    active: true,
    featured: false,
    priority: 7
  },
  {
    id: 8,
    title: "Du + Speed XL",
    description: "DU Renaissance + Speed XL",
    comboProducts: [
      { productId: 11, productName: "DU Renaissance 750ml", quantity: 1, price: 5000 },
      { productId: 13, productName: "Speed XL", quantity: 1, price: 2800 }
    ],
    finalPrice: 7500,
    image: "/images/Duconspeed.jfif",
    category: "Combos",
    active: true,
    featured: false,
    priority: 8
  },
  {
    id: 9,
    title: "Viñas de Balbo + Pritty",
    description: "Vino Viña de Balbo + Pritty de 2.25L",
    comboProducts: [
      { productId: 11, productName: "Vino Viña de Balbo Tinto", quantity: 1, price: 2800 },
      { productId: 5, productName: "Pritty Limón 2.25L", quantity: 1, price: 2600 }
    ],
    finalPrice: 5500,
    image: "/images/balbomaspritty.jpg",
    category: "Combos",
    active: true,
    featured: false,
    priority: 9
  }
]

// Función para cargar las ofertas en localStorage
function loadOffers() {
  try {
    localStorage.setItem('ofertas', JSON.stringify(ofertas))
    console.log('✅ Ofertas cargadas exitosamente:', ofertas.length)
    console.log('📋 Ofertas:', ofertas.map(o => `${o.title} - $${o.finalPrice}`))
    return true
  } catch (error) {
    console.error('❌ Error al cargar ofertas:', error)
    return false
  }
}

// Ejecutar si estamos en el navegador
if (typeof window !== 'undefined') {
  loadOffers()
}

// Exportar para uso en Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ofertas, loadOffers }
}
