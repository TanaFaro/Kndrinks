/**
 * Sistema de autenticación simple y directo
 */

// Clave única para localStorage
const AUTH_KEY = 'kndrinks_admin_session'

interface AuthData {
  isLoggedIn: boolean
  username: string
  loginTime: string
}

// Función para obtener datos de autenticación
export function getAuthData(): AuthData | null {
  if (typeof window === 'undefined') return null
  
  try {
    const data = localStorage.getItem(AUTH_KEY)
    if (data) {
      const parsed = JSON.parse(data)
      // Verificar que la estructura sea válida
      if (parsed.isLoggedIn && parsed.username && parsed.loginTime) {
        return parsed
      }
    }
    return null
  } catch (error) {
    console.error('Error getting auth data:', error)
    return null
  }
}

// Función para verificar si está logueado
export function isLoggedIn(): boolean {
  const authData = getAuthData()
  return authData?.isLoggedIn === true
}

// Función para obtener el usuario
export function getCurrentUser(): string | null {
  const authData = getAuthData()
  return authData?.username || null
}

// Función para iniciar sesión
export function login(username: string): void {
  if (typeof window === 'undefined') return
  
  const authData: AuthData = {
    isLoggedIn: true,
    username,
    loginTime: new Date().toISOString()
  }
  
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData))
    console.log('✅ Sesión iniciada:', username)
  } catch (error) {
    console.error('Error saving auth data:', error)
  }
}

// Función para cerrar sesión
export function logout(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(AUTH_KEY)
    console.log('👋 Sesión cerrada')
  } catch (error) {
    console.error('Error clearing auth data:', error)
  }
}

// Función para verificar sesión en cualquier momento
export function checkSession(): boolean {
  const isLoggedIn = getAuthData()?.isLoggedIn === true
  console.log('🔍 Verificando sesión:', isLoggedIn)
  return isLoggedIn
}
