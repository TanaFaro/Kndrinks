'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isLoggedIn, getCurrentUser } from '@/lib/simpleAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar sesión inicial
    const checkSession = () => {
      if (typeof window === 'undefined') {
        setLoading(false)
        return
      }

      const loggedIn = isLoggedIn()
      console.log('🔒 ProtectedRoute - Verificando sesión:', loggedIn)
      
      setIsAuthenticated(loggedIn)
      setLoading(false)

      if (!loggedIn) {
        console.log('🔒 Acceso denegado, redirigiendo al login...')
        router.push('/admin')
      }
    }

    checkSession()

    // Verificar cada 3 segundos
    const interval = setInterval(checkSession, 3000)

    return () => clearInterval(interval)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h2>
          <p className="text-gray-600 mb-4">Necesitas iniciar sesión para acceder a esta página.</p>
          <button
            onClick={() => router.push('/admin')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ir al Login
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
