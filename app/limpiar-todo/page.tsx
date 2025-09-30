'use client'

export default function LimpiarTodo() {
  const limpiarTodo = () => {
    // Limpiar localStorage completamente
    localStorage.clear()
    
    alert("✅ Todo limpiado! Recarga la página.")
    window.location.href = "/ofertas"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">🧹 Limpiar Todo</h1>
        <p className="text-gray-600 mb-6">Esto eliminará TODAS las ofertas y datos guardados.</p>
        <button 
          onClick={limpiarTodo}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
        >
          Limpiar Todo
        </button>
      </div>
    </div>
  )
}