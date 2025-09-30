'use client'

export default function DebugPage() {
  const testImages = [
    '/images/cocacola.jfif',
    '/images/fernet-750.jfif',
    '/images/skyy.png',
    '/images/Gancia.jfif',
    '/images/Sprite.webp',
    '/images/DU-Renaissance.jfif'
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Debug de Imágenes</h1>
      
      <div className="space-y-8">
        {testImages.map((src, index) => (
          <div key={index} className="border-2 border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Imagen {index + 1}</h3>
            <p className="text-sm text-gray-600 mb-4">Ruta: <code>{src}</code></p>
            
            <div className="flex gap-4">
              <div>
                <p className="text-sm font-semibold mb-2">IMG normal:</p>
                <img 
                  src={src} 
                  alt={`Test ${index + 1}`}
                  className="w-32 h-32 object-cover border-2 border-blue-300"
                  onError={(e) => {
                    console.error('❌ Error cargando imagen:', src)
                    e.currentTarget.style.border = '2px solid red'
                    e.currentTarget.alt = 'ERROR: No se pudo cargar'
                  }}
                  onLoad={() => {
                    console.log('✅ Imagen cargada exitosamente:', src)
                  }}
                />
              </div>
              
              <div>
                <p className="text-sm font-semibold mb-2">Estado:</p>
                <div id={`status-${index}`} className="text-sm">
                  Cargando...
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Instrucciones:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Abre la consola del navegador (F12)</li>
          <li>Revisa los mensajes de error o éxito</li>
          <li>Verifica si las imágenes aparecen o tienen borde rojo</li>
        </ol>
      </div>
    </div>
  )
}
