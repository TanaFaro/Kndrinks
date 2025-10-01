'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FixCoca() {
  const [status, setStatus] = useState('Iniciando corrección...')
  const [products, setProducts] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const fixCocaCategory = () => {
      try {
        setStatus('Obteniendo productos del localStorage...')
        
        // Obtener productos del localStorage
        const savedProducts = localStorage.getItem('products')
        if (savedProducts) {
          const productsList = JSON.parse(savedProducts)
          setProducts(productsList)
          setStatus(`Productos encontrados: ${productsList.length}`)
          
          // Buscar y corregir Coca Cola de 2.25L
          let corrected = false
          const correctedProducts = productsList.map((product: any) => {
            if (product.name && product.name.includes('Coca-cola x 2.25') && product.category === 'Licores') {
              setStatus(`Corrigiendo: ${product.name} de "${product.category}" a "Sin Alcohol"`)
              corrected = true
              return {
                ...product,
                category: 'Sin Alcohol'
              }
            }
            return product
          })
          
          if (corrected) {
            // Guardar productos corregidos
            localStorage.setItem('products', JSON.stringify(correctedProducts))
            setStatus('✅ Categoría de Coca Cola corregida a "Sin Alcohol"')
            
            // Actualizar el estado local
            setProducts(correctedProducts)
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
              router.push('/productos')
            }, 2000)
          } else {
            setStatus('ℹ️ No se encontró Coca Cola con categoría "Licores"')
          }
        } else {
          setStatus('❌ No se encontraron productos en localStorage')
        }
      } catch (error) {
        setStatus(`❌ Error: ${error}`)
      }
    }

    fixCocaCategory()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md mx-4 text-center">
        <div className="text-6xl mb-4">🔧</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Corrigiendo Categoría de Coca Cola
        </h1>
        <p className="text-gray-600 mb-6">{status}</p>
        
        {products.length > 0 && (
          <div className="text-left">
            <h3 className="font-semibold mb-2">Productos encontrados:</h3>
            <div className="max-h-40 overflow-y-auto text-sm">
              {products.map((product, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span className="truncate">{product.name}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    product.category === 'Sin Alcohol' ? 'bg-green-100 text-green-800' :
                    product.category === 'Licores' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {product.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
