'use client'

import { useState } from 'react'

export default function LimpiarProductos() {
  const [message, setMessage] = useState('')

  const limpiarYRecargar = () => {
    try {
      // Limpiar localStorage
      localStorage.removeItem('products')
      
      // Recargar la página
      window.location.href = '/productos'
      
      setMessage('✅ Productos limpiados y página recargada')
    } catch (error) {
      setMessage('❌ Error: ' + error)
    }
  }

  const soloLimpiar = () => {
    try {
      localStorage.removeItem('products')
      setMessage('✅ Productos eliminados del localStorage')
    } catch (error) {
      setMessage('❌ Error: ' + error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">🧹 Limpiar Productos</h1>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-center">
            Esto eliminará todos los productos del localStorage para evitar duplicaciones.
          </p>
          
          <button
            onClick={limpiarYRecargar}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            🗑️ Limpiar y Recargar
          </button>
          
          <button
            onClick={soloLimpiar}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
          >
            🧹 Solo Limpiar
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
              href="/productos" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Ver Productos
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
