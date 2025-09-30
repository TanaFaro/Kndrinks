/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Configurar archivos estáticos desde la carpeta Fotos Bebidas
  async rewrites() {
    return [
      {
        source: '/Fotos Bebidas/:path*',
        destination: '/api/serve-image/:path*',
      },
    ]
  },
}

module.exports = nextConfig
