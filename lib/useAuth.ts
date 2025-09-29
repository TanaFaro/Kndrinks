import { useState, useEffect } from 'react'
import { isAdminLoggedIn, getAdminUser } from './auth'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar autenticación al cargar
    const checkAuth = () => {
      const loggedIn = isAdminLoggedIn()
      const adminUser = getAdminUser()
      
      console.log('🔐 Verificando autenticación:', { loggedIn, adminUser })
      
      setIsAuthenticated(loggedIn)
      setUser(adminUser)
      setLoading(false)
    }

    checkAuth()

    // Escuchar cambios en localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminLoggedIn' || e.key === 'adminUser') {
        console.log('🔄 Cambio detectado en localStorage:', e.key)
        checkAuth()
      }
    }

    // Escuchar cambios cuando se regresa a la pestaña
    const handleFocus = () => {
      console.log('👁️ Pestaña enfocada, verificando sesión...')
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', handleFocus)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  return { isAuthenticated, user, loading }
}
