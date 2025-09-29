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
  console.log('❌ Error cargando imagen:', event.currentTarget.src)
  event.currentTarget.src = fallbackImage
}

/**
 * Maneja la carga exitosa de imagen
 * @param event - Evento de carga de la imagen
 */
export function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  console.log('✅ Imagen cargada correctamente:', event.currentTarget.src)
}
