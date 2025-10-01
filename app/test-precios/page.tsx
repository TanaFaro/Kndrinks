'use client'

export default function TestPrecios() {
  const productos = [
    { name: "Coca Cola 2.25L", price: 4200 },
    { name: "Fernet Branca 750ml", price: 13500 },
    { name: "Skyy Vodka 750ml", price: 9500 },
    { name: "Smirnoff Vodka 750ml", price: 8000 },
    { name: "Pritty Limón 2.25L", price: 2600 },
    { name: "Pritty Limón 3L", price: 3000 },
    { name: "Coca Cola 2.25L Descartable", price: 4200 },
    { name: "Speed XL", price: 2800 },
    { name: "DU Renaissance", price: 5000 },
    { name: "Vino Toro 750ml", price: 2200 },
    { name: "Vino Viña de Balbo Tinto", price: 2800 },
    { name: "Gancia", price: 8000 }
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">💰 Test de Precios</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Precios Actualizados:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productos.map((producto, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{producto.name}</span>
                <span className="text-green-600 font-bold">${producto.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <a 
              href="/productos" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Ver Página de Productos
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
