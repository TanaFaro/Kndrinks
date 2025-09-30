'use client'

export default function CheckImages() {
  const testDirectAccess = async () => {
    const images = [
      '/images/cocacola.jfif',
      '/images/fernet-750.jfif',
      '/images/skyy.png',
      '/images/Gancia.jfif',
      '/images/Logo Bebidas.jpeg'
    ]

    console.log('🔍 Verificando acceso directo a imágenes...')
    
    for (const imagePath of images) {
      try {
        const response = await fetch(imagePath, { method: 'HEAD' })
        console.log(`${imagePath}: ${response.status} ${response.statusText}`)
      } catch (error) {
        console.error(`${imagePath}: Error -`, error)
      }
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Verificación de Imágenes en Vercel</h1>
      
      <div className="space-y-4">
        <button 
          onClick={testDirectAccess}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Verificar Acceso Directo a Imágenes
        </button>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Pruebas de Imágenes:</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4">
              <h3 className="font-semibold">Coca Cola</h3>
              <img 
                src="/images/cocacola.jfif" 
                alt="Coca Cola"
                className="w-32 h-32 object-cover border"
                onError={(e) => {
                  console.error('❌ Error:', e.currentTarget.src)
                  e.currentTarget.style.border = '3px solid red'
                }}
                onLoad={() => console.log('✅ Cargada:', e.currentTarget.src)}
              />
            </div>
            
            <div className="border p-4">
              <h3 className="font-semibold">Logo (debería funcionar)</h3>
              <img 
                src="/images/Logo Bebidas.jpeg" 
                alt="Logo"
                className="w-32 h-32 object-cover border"
                onError={(e) => {
                  console.error('❌ Error:', e.currentTarget.src)
                  e.currentTarget.style.border = '3px solid red'
                }}
                onLoad={() => console.log('✅ Cargada:', e.currentTarget.src)}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-100 rounded">
          <h3 className="font-semibold">Instrucciones:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm mt-2">
            <li>Abre la consola del navegador (F12)</li>
            <li>Haz clic en "Verificar Acceso Directo a Imágenes"</li>
            <li>Revisa los códigos de estado (200 = OK, 404 = No encontrado)</li>
            <li>Verifica qué imágenes aparecen con borde rojo</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
