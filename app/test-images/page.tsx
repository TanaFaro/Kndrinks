'use client'

import Image from 'next/image'

export default function TestImages() {
  const testImages = [
    '/images/cocacola.jfif',
    '/images/fernet 750.jfif',
    '/images/skyy.png',
    '/images/Gancia.jfif',
    '/images/Sprite.webp',
    '/images/DU Renaissance.jfif'
  ]

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Test de Imágenes</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {testImages.map((src, index) => (
          <div key={index} className="border p-4">
            <h3 className="font-bold mb-2">Imagen {index + 1}</h3>
            <p className="text-sm text-gray-600 mb-2">Ruta: {src}</p>
            
            {/* Prueba con img normal */}
            <div className="mb-4">
              <p className="text-sm font-semibold">IMG normal:</p>
              <img 
                src={src} 
                alt={`Test ${index + 1}`}
                className="w-32 h-32 object-cover border"
                onError={(e) => {
                  console.error('Error cargando imagen:', src)
                  e.currentTarget.style.border = '2px solid red'
                }}
                onLoad={() => {
                  console.log('Imagen cargada exitosamente:', src)
                }}
              />
            </div>
            
            {/* Prueba con Next.js Image */}
            <div>
              <p className="text-sm font-semibold">Next.js Image:</p>
              <Image
                src={src}
                alt={`Test ${index + 1}`}
                width={128}
                height={128}
                className="border"
                onError={() => {
                  console.error('Error cargando imagen con Next.js Image:', src)
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
