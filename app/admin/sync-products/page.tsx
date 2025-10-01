'use client'

import { useState } from 'react'

export default function SyncProducts() {
  const [message, setMessage] = useState('')

  const syncProducts = () => {
    try {
      const staticProducts = [
        { id: 1, name: "Coca Cola 2.25L", price: 2500, category: "Bebidas", stock: 50, image: "/images/cocacola.jfif", description: "Refresco clásico de Coca Cola" },
        { id: 2, name: "Fernet Branca 750ml", price: 4500, category: "Licores", stock: 30, image: "/images/fernet750.jfif", description: "Fernet italiano de alta calidad" },
        { id: 3, name: "Skyy Vodka 750ml", price: 3800, category: "Licores", stock: 25, image: "/images/skyy.png", description: "Vodka premium americano" },
        { id: 4, name: "Smirnoff Vodka 750ml", price: 3500, category: "Licores", stock: 20, image: "/images/Smirnoffsolo.jpeg", description: "Vodka ruso premium" },
        { id: 5, name: "Pritty Limón 2.25L", price: 1200, category: "Bebidas", stock: 40, image: "/images/pritty2250.jfif", description: "Gaseosa sabor limón" },
        { id: 6, name: "Pritty Limón 3L", price: 1800, category: "Bebidas", stock: 30, image: "/images/prittyde3lts.webp", description: "Gaseosa sabor limón 3 litros" },
        { id: 7, name: "Coca Cola Descartable 500ml", price: 800, category: "Bebidas", stock: 60, image: "/images/cocadescartable.jpg", description: "Coca Cola en botella descartable" },
        { id: 8, name: "Speed XL", price: 1500, category: "Bebidas", stock: 40, image: "/images/SpeedXL.webp", description: "Bebida energética XL" },
        { id: 9, name: "DU Renaissance", price: 5000, category: "Vinos", stock: 15, image: "/images/DURenaissance.jfif", description: "Vino DU Renaissance" },
        { id: 10, name: "Vino Toro 750ml", price: 2200, category: "Vinos", stock: 25, image: "/images/vinotoro.jfif", description: "Vino Toro tinto 750ml" },
        { id: 11, name: "Vino Viña de Balbo Tinto", price: 2200, category: "Vinos", stock: 25, image: "/images/balbomaspritty.png", description: "Vino tinto premium" },
        { id: 12, name: "Gancia", price: 8000, category: "Aperitivos", stock: 18, image: "/images/Gancia.jfif", description: "Gancia aperitivo" }
      ]

      localStorage.setItem('products', JSON.stringify(staticProducts))
      setMessage('✅ Productos sincronizados! Speed XL y todos los demás productos están ahora disponibles en el admin.')
    } catch (error) {
      setMessage('❌ Error: ' + error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">🔄 Sincronizar Productos</h1>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-center">
            Esto cargará todos los productos estáticos (incluyendo Speed XL) en el sistema del admin.
          </p>
          
          <button
            onClick={syncProducts}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            📥 Sincronizar Productos
          </button>
          
          {message && (
            <div className={`p-3 rounded-lg text-center ${
              message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
          
          <div className="text-center">
            <a 
              href="/admin/dashboard" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Volver al Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
