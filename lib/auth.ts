// Sistema de autenticación simple y robusto
const SESSION_KEY = 'kndrinks_admin_session'

export interface AdminSession {
  isLoggedIn: boolean
  username: string
  loginTime: string
  token: string
}

export const auth = {
  // Iniciar sesión
  login: (username: string, password: string): boolean => {
    // Credenciales simples
    if (username === 'KNDrinks' && password === 'KNDrinks2025') {
      const session: AdminSession = {
        isLoggedIn: true,
        username: username,
        loginTime: new Date().toISOString(),
        token: Math.random().toString(36).substring(2) + Date.now().toString(36)
      }
      
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
        console.log('✅ Sesión iniciada correctamente')
        return true
      } catch (error) {
        console.error('❌ Error guardando sesión:', error)
        return false
      }
    }
    return false
  },

  // Cerrar sesión
  logout: (): void => {
    try {
      localStorage.removeItem(SESSION_KEY)
      console.log('✅ Sesión cerrada correctamente')
    } catch (error) {
      console.error('❌ Error cerrando sesión:', error)
    }
  },

  // Verificar si está logueado
  isLoggedIn: (): boolean => {
    try {
      if (typeof window === 'undefined') return false
      
      const sessionStr = localStorage.getItem(SESSION_KEY)
      if (!sessionStr) return false
      
      const session: AdminSession = JSON.parse(sessionStr)
      
      // Verificar que la sesión es válida
      if (!session.isLoggedIn || !session.username || !session.token) {
        return false
      }
      
      // Verificar que no haya expirado (24 horas) - TEMPORALMENTE DESHABILITADO
      // const loginTime = new Date(session.loginTime)
      // const now = new Date()
      // const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60)

      // if (hoursDiff > 24) {
      //   localStorage.removeItem(SESSION_KEY)
      //   return false
      // }
      
      return true
    } catch (error) {
      console.error('❌ Error verificando sesión:', error)
      return false
    }
  },

  // Obtener usuario actual
  getCurrentUser: (): string | null => {
    try {
      if (typeof window === 'undefined') return null
      
      const sessionStr = localStorage.getItem(SESSION_KEY)
      if (!sessionStr) return null
      
      const session: AdminSession = JSON.parse(sessionStr)
      return session.username || null
    } catch (error) {
      console.error('❌ Error obteniendo usuario:', error)
      return null
    }
  },

  // Verificar sesión y redirigir si es necesario
  checkAuth: (): boolean => {
    const isAuth = auth.isLoggedIn()
    if (!isAuth) {
      // Solo redirigir si estamos en el cliente
      if (typeof window !== 'undefined') {
        window.location.href = '/admin'
      }
    }
    return isAuth
  }
}
// Force Vercel update - Version 2