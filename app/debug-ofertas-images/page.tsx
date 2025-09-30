'use client'

import { useState, useEffect } from 'react'

export default function DebugOfertasImages() {
  const [testResults, setTestResults] = useState<Array<{name: string, path: string, status: string, error?: string}>>([])

  const testImages = [
    { name: "Fernet + Coca", path: "/images/fernetmas2cocas.jfif" },
    { name: "Skyy + Speed", path: "/images/skyymasspeed.jfif" },
    { name: "DU + Speed", path: "/images/Duconspeed.jfif" },
    { name: "Smirnoff + 2 Speed", path: "/images/Smirnoffmas2speed.png" },
    { name: "Fernet + Coca Descartable", path: "/images/fernetmascocadescartable.jpg" },
    { name: "Vino Toro + Pritty", path: "/images/vinotoromaspritty.jpg" },
    { name: "Viña de Balbo + Pritty", path: "/images/viñadebalbomaspritty.png" }
  ]

  useEffect(() => {
    const testImage = (image: {name: string, path: string}) => {
      return new Promise<{name: string, path: string, status: string, error?: string}>((resolve) => {
        const img = new Image()
        
        img.onload = () => {
          resolve({
            name: image.name,
            path: image.path,
            status: '✅ Cargada correctamente'
          })
        }
        
        img.onerror = () => {
          resolve({
            name: image.name,
            path: image.path,
            status: '❌ Error al cargar',
            error: 'No se pudo cargar la imagen'
          })
        }
        
        img.src = image.path
      })
    }

    const testAllImages = async () => {
      const results = await Promise.all(testImages.map(testImage))
      setTestResults(results)
    }

    testAllImages()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Debug - Imágenes de Ofertas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testImages.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{image.name}</h3>
              <div className="mb-4">
                <img
                  src={image.path}
                  alt={image.name}
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = '/images/Logo Bebidas.jpeg'
                  }}
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Ruta:</strong> {image.path}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Estado:</strong> {testResults.find(r => r.name === image.name)?.status || 'Probando...'}
                </p>
                {testResults.find(r => r.name === image.name)?.error && (
                  <p className="text-sm text-red-600">
                    <strong>Error:</strong> {testResults.find(r => r.name === image.name)?.error}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Resumen de Pruebas</h2>
          <div className="space-y-2">
            {testResults.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{result.name}</span>
                <span className={result.status.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                  {result.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Información de Debug</h3>
          <p className="text-blue-700 text-sm">
            Esta página prueba la carga de cada imagen de oferta individualmente. 
            Si una imagen falla, se mostrará el logo de KNDrinks como fallback.
          </p>
        </div>
      </div>
    </div>
  )
}
