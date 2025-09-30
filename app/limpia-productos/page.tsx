'use client'

export default function LimpiarProductos() {
  const limpiarProductos = () => {
    // Limpiar solo productos del localStorage
    localStorage.removeItem("products")
    
    alert("✅ Productos eliminados! Recarga la página.")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">🧹 Limpiar Productos</h1>
        <p className="text-gray-600 mb-6">Esto eliminará solo los productos del localStorage.</p>
        <button 
          onClick={limpiarProductos}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
        >
          Limpiar Productos
        </button>
      </div>
    </div>
  )
}
// Force Vercel update - Version 2