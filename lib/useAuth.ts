import { useState, useEffect, useCallback } from 'react'
import { isAdminLoggedIn, getAdminUser, logoutAdmin } from './auth'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = useCallback(() => {
    // Verificar que estamos en el cliente
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    const loggedIn = isAdminLoggedIn()
    const adminUser = getAdminUser()
    
    console.log('🔐 Verificando autenticación:', { loggedIn, adminUser })
    
    setIsAuthenticated(loggedIn)
    setUser(adminUser)
    setLoading(false)
  }, [])

  const handleLogout = useCallback(() => {
    logoutAdmin()
    setIsAuthenticated(false)
    setUser(null)
    console.log('🚪 Usuario deslogueado')
  }, [])

  useEffect(() => {
    // Verificar autenticación al cargar
    checkAuth()

    // Escuchar cambios en localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminLoggedIn' || e.key === 'adminUser' || e.key === 'adminLoginTime') {
        console.log('🔄 Cambio detectado en localStorage:', e.key)
        checkAuth()
      }
    }

    // Escuchar cambios cuando se regresa a la pestaña
    const handleFocus = () => {
      console.log('👁️ Pestaña enfocada, verificando sesión...')
      checkAuth()
    }

    // Verificar sesión periódicamente (cada 30 segundos)
    const intervalId = setInterval(() => {
      checkAuth()
    }, 30000)

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('focus', handleFocus)
    }

    return () => {
      clearInterval(intervalId)
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('focus', handleFocus)
      }
    }
  }, [checkAuth])

  return { isAuthenticated, user, loading, logout: handleLogout }
}
