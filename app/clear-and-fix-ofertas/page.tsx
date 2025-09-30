'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ClearAndFixOfertas() {
  const router = useRouter()

  useEffect(() => {
    // Forzar limpieza completa
    console.log('🧹 Limpiando localStorage completamente...')
    localStorage.clear()
    
    // Esperar un momento
    setTimeout(() => {
      console.log('📦 Cargando ofertas corregidas...')
      
      // Cargar ofertas con rutas 100% correctas
      const ofertasCorregidas = [
        {
          id: 1,
          title: "Combo Fernet + Coca",
          description: "Fernet Branca 750ml + 2 Coca Cola 2.25L",
          comboProducts: [
            { productId: 2, productName: "Fernet Branca 750ml", quantity: 1, price: 4500 },
            { productId: 1, productName: "Coca Cola 2.25L", quantity: 2, price: 1000 }
          ],
          finalPrice: 6500,
          image: "/images/fernetmas2cocas.jfif",
          category: "Combos",
          active: true,
          featured: true,
          priority: 5
        },
        {
          id: 2,
          title: "Combo Skyy + Speed",
          description: "Skyy Vodka 750ml + Speed XL",
          comboProducts: [
            { productId: 3, productName: "Skyy Vodka 750ml", quantity: 1, price: 3800 },
            { productId: 9, productName: "Speed XL", quantity: 1, price: 1500 }
          ],
          finalPrice: 4800,
          image: "/images/skyymasspeed.jfif",
          category: "Combos",
          active: true,
          featured: true,
          priority: 4
        },
        {
          id: 3,
          title: "Combo DU + Speed",
          description: "DU Renaissance 750ml + Speed XL",
          comboProducts: [
            { productId: 11, productName: "DU Renaissance 750ml", quantity: 1, price: 6500 },
            { productId: 9, productName: "Speed XL", quantity: 1, price: 1500 }
          ],
          finalPrice: 7500,
          image: "/images/Duconspeed.jfif",
          category: "Combos",
          active: true,
          featured: false,
          priority: 3
        },
        {
          id: 4,
          title: "Combo Smirnoff + 2 Speed",
          description: "Smirnoff Vodka 750ml + 2 Speed XL",
          comboProducts: [
            { productId: 4, productName: "Smirnoff Vodka 750ml", quantity: 1, price: 3500 },
            { productId: 9, productName: "Speed XL", quantity: 2, price: 1500 }
          ],
          finalPrice: 5500,
          image: "/images/Smirnoffmas2speed.png",
          category: "Combos",
          active: true,
          featured: false,
          priority: 2
        },
        {
          id: 5,
          title: "Combo Fernet + Coca Descartable",
          description: "Fernet Branca 750ml + Coca Cola Descartable 500ml",
          comboProducts: [
            { productId: 2, productName: "Fernet Branca 750ml", quantity: 1, price: 4500 },
            { productId: 8, productName: "Coca Cola Descartable 500ml", quantity: 1, price: 800 }
          ],
          finalPrice: 5000,
          image: "/images/fernetmascocadescartable.jpg",
          category: "Combos",
          active: true,
          featured: false,
          priority: 2
        },
        {
          id: 6,
          title: "Combo Vino Toro + Pritty",
          description: "Vino Toro 750ml + Pritty Limón 2.25L",
          comboProducts: [
            { productId: 13, productName: "Vino Toro 750ml", quantity: 1, price: 2200 },
            { productId: 5, productName: "Pritty Limón 2.25L", quantity: 1, price: 1200 }
          ],
          finalPrice: 4000,
          image: "/images/vinotoromaspritty.jpg",
          category: "Combos",
          active: true,
          featured: false,
          priority: 1
        },
        {
          id: 7,
          title: "Combo Viña de Balbo + Pritty",
          description: "Vino Viña de Balbo Tinto + Pritty Limón 2.25L",
          comboProducts: [
            { productId: 12, productName: "Vino Viña de Balbo Tinto", quantity: 1, price: 2200 },
            { productId: 5, productName: "Pritty Limón 2.25L", quantity: 1, price: 1200 }
          ],
          finalPrice: 4000,
          image: "/images/balbomaspritty.png",
          category: "Combos",
          active: true,
          featured: false,
          priority: 1
        }
      ]

      // Guardar ofertas corregidas
      localStorage.setItem('ofertas', JSON.stringify(ofertasCorregidas))
      console.log('✅ Ofertas corregidas guardadas:', ofertasCorregidas.length)
      
      // Verificar que se guardaron correctamente
      const verificacion = localStorage.getItem('ofertas')
      if (verificacion) {
        const ofertasVerificadas = JSON.parse(verificacion)
        console.log('🔍 Verificación - Ofertas en localStorage:', ofertasVerificadas)
        console.log('🔍 Verificación - Primera oferta:', ofertasVerificadas[0])
        console.log('🔍 Verificación - Imagen primera oferta:', ofertasVerificadas[0]?.image)
      }

      // Redirigir a ofertas
      setTimeout(() => {
        router.push('/ofertas')
      }, 1000)
    }, 500)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">LIMPIEZA FORZADA EN PROGRESO</h2>
        <p className="text-red-600 mb-4">Eliminando TODAS las ofertas incorrectas...</p>
        <div className="mt-4 text-sm text-red-500 space-y-1">
          <p>• Limpiando localStorage completamente</p>
          <p>• Cargando ofertas con rutas correctas</p>
          <p>• Verificando que se guardaron correctamente</p>
          <p>• Redirigiendo en 1 segundo...</p>
        </div>
        <div className="mt-6 p-4 bg-red-100 rounded-lg">
          <p className="text-red-700 font-semibold">⚠️ Esta página elimina TODOS los datos del localStorage</p>
          <p className="text-red-600 text-sm">Incluyendo productos, ofertas y configuraciones</p>
        </div>
      </div>
    </div>
  )
}
