'use client'

export default function TestImages() {
  const images = [
    '/images/Duconspeed.jfif',
    '/images/fernetmascocadescartable.jpg',
    '/images/fernetmas2cocas.jfif',
    '/images/skyymasspeed.jfif',
    '/images/Smirnoffmas2speed.png',
    '/images/vinotoromaspritty.jpg',
    '/images/ganciamassprite.jpeg',
    '/images/balbomaspritty.jpg'
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Test de Imágenes de Ofertas</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-bold mb-2">Imagen {index + 1}</h3>
            <div className="relative h-32 bg-gray-200 rounded">
              <img
                src={image}
                alt={`Test ${index + 1}`}
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  console.error('❌ Error cargando:', image)
                  e.currentTarget.style.display = 'none'
                  const container = e.currentTarget.parentElement
                  if (container) {
                    container.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-red-100 text-red-600 text-xs">
                        ERROR<br/>${image}
                      </div>
                    `
                  }
                }}
                onLoad={() => {
                  console.log('✅ Cargada:', image)
                }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2 break-all">{image}</p>
          </div>
        ))}
      </div>
    </div>
  )
}