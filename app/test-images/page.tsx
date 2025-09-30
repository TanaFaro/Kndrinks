'use client'

export default function TestImages() {
  const testImages = [
    { name: 'Coca Cola', src: '/images/cocacola.jfif' },
    { name: 'Fernet', src: '/images/fernet-750.jfif' },
    { name: 'Skyy', src: '/images/skyy.png' },
    { name: 'Gancia', src: '/images/Gancia.jfif' },
    { name: 'Logo (debería funcionar)', src: '/images/Logo Bebidas.jpeg' }
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Test de Imágenes en Vercel</h1>
      
      <div className="space-y-8">
        {testImages.map((image, index) => (
          <div key={index} className="border-2 border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{image.name}</h3>
            <p className="text-sm text-gray-600 mb-4">Ruta: <code>{image.src}</code></p>
            
            <div className="flex gap-4">
              <div>
                <p className="text-sm font-semibold mb-2">Imagen:</p>
                <img 
                  src={image.src} 
                  alt={image.name}
                  className="w-48 h-48 object-cover border-2 border-gray-400"
                  onError={(e) => {
                    console.error('❌ Error cargando imagen:', image.src)
                    e.currentTarget.style.border = '3px solid red'
                    e.currentTarget.alt = 'ERROR: No se pudo cargar'
                  }}
                  onLoad={() => {
                    console.log('✅ Imagen cargada exitosamente:', image.src)
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
          <li>Las imágenes con borde negro funcionan, las rojas tienen error 404</li>
        </ol>
      </div>
    </div>
  )
}