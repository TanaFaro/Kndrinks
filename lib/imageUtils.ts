/**
 * Utilidades para el manejo de imágenes
 */

/**
 * Normaliza la ruta de una imagen para asegurar que tenga el formato correcto
 * @param imagePath - Ruta de la imagen
 * @returns Ruta normalizada de la imagen
 */
export function normalizeImagePath(imagePath: string | undefined | null): string {
  if (!imagePath) {
    return '/images/Logo Bebidas.jpeg'
  }
  
  // Si ya es una ruta absoluta o URL completa, devolverla tal como está
  if (imagePath.startsWith('/images/') || imagePath.startsWith('http')) {
    return imagePath
  }
  
  // Si es solo el nombre del archivo, agregar la ruta base
  return `/images/${imagePath}`
}

/**
 * Maneja el error de carga de imagen estableciendo una imagen de fallback
 * @param event - Evento de error de la imagen
 * @param fallbackImage - Imagen de fallback (opcional)
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackImage: string = '/images/Logo Bebidas.jpeg') {
  const img = event.currentTarget
  const originalSrc = img.src
  
  console.log('❌ Error cargando imagen:', originalSrc)
  
  // Intentar diferentes variaciones de la ruta antes de usar el fallback
  const tryAlternativePaths = (src: string) => {
    // Si es una ruta absoluta, intentar sin el dominio
    if (src.includes('vercel.app') || src.includes('localhost')) {
      const url = new URL(src)
      const pathname = url.pathname
      img.src = pathname
      return
    }
    
    // Si no tiene /images/, agregarlo
    if (!src.includes('/images/')) {
      img.src = `/images/${src.split('/').pop()}`
      return
    }
    
    // Si todo falla, usar el fallback
    img.src = fallbackImage
  }
  
  // Solo intentar alternativas si no es ya el fallback
  if (!originalSrc.includes('Logo Bebidas.jpeg')) {
    tryAlternativePaths(originalSrc)
  } else {
    img.src = fallbackImage
  }
}

/**
 * Maneja la carga exitosa de imagen
 * @param event - Evento de carga de la imagen
 */
export function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  console.log('✅ Imagen cargada correctamente:', event.currentTarget.src)
}
