'use client'

export default function LimpiarOfertas() {
  const limpiarYRecargar = () => {
    // Limpiar localStorage
    localStorage.removeItem("ofertas")
    
    // Cargar ofertas correctas
    const ofertasCorrectas = [
      {
        id: 1,
        title: "Combo Fernet + Coca",
        description: "Fernet Branca 750ml + 2 Coca Cola 2.25L",
        comboProducts: [
          { name: "Fernet Branca 750ml", quantity: 1, price: 4500 },
          { name: "Coca Cola 2.25L", quantity: 2, price: 1000 }
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
        description: "Skyy Vodka + Speed XL",
        comboProducts: [
          { name: "Skyy Vodka", quantity: 1, price: 9500 },
          { name: "Speed XL", quantity: 1, price: 1500 }
        ],
        finalPrice: 10000,
        image: "/images/skyymasspeed.jfif",
        category: "Combos",
        active: true,
        featured: false,
        priority: 3
      },
      {
        id: 3,
        title: "Combo DU + Speed",
        description: "DU Renaissance + Speed XL",
        comboProducts: [
          { name: "DU Renaissance", quantity: 1, price: 5000 },
          { name: "Speed XL", quantity: 1, price: 1500 }
        ],
        finalPrice: 6000,
        image: "/images/Duconspeed.jfif",
        category: "Combos",
        active: true,
        featured: false,
        priority: 2
      }
    ]
    
    // Guardar ofertas correctas
    localStorage.setItem("ofertas", JSON.stringify(ofertasCorrectas))
    
    alert("✅ Ofertas limpiadas y recargadas correctamente!")
    window.location.href = "/ofertas"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">🔧 Limpiar Ofertas</h1>
        <p className="text-gray-600 mb-6">Esto eliminará las ofertas incorrectas y cargará las correctas.</p>
        <button 
          onClick={limpiarYRecargar}
          className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
        >
          Limpiar y Recargar Ofertas
        </button>
      </div>
    </div>
  )
}