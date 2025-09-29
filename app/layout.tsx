import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MobileMenu from '@/components/MobileMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KNDrinks - Tu tienda de bebidas favorita',
  description: 'Descubre la mejor selección de bebidas, licores, vinos y más. Envío rápido y precios increíbles.',
  keywords: 'bebidas, licores, vinos, cervezas, whisky, vodka, ron, tequila',
  authors: [{ name: 'KNDrinks' }],
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
  openGraph: {
    title: 'KNDrinks - Tu tienda de bebidas favorita',
    description: 'Descubre la mejor selección de bebidas, licores, vinos y más.',
    type: 'website',
    locale: 'es_AR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Forzar estilos móviles ULTRA AGRESIVO
              function forceMobileStyles() {
                console.log('🔧 Forzando estilos móviles...');
                console.log('📱 Ancho de pantalla:', window.innerWidth);
                
                if (window.innerWidth <= 768) {
                  console.log('✅ Detectado móvil, aplicando estilos...');
                  
                  // Agregar clase al body
                  document.body.classList.add('mobile-forced');
                  
                  // Crear estilos ultra-agresivos
                  const style = document.createElement('style');
                  style.id = 'mobile-forced-styles';
                  style.textContent = \`
                    /* Estilos ultra-agresivos para móviles */
                    @media screen and (max-width: 768px) {
                      /* Forzar botones horizontales */
                      .hero-buttons,
                      .flex.flex-col.sm\\\\:flex-row {
                        display: flex !important;
                        flex-direction: row !important;
                        gap: 1rem !important;
                        justify-content: center !important;
                        align-items: center !important;
                        flex-wrap: nowrap !important;
                      }
                      
                      /* Forzar grid de 2 columnas */
                      .products-grid,
                      .ofertas-grid,
                      .grid.grid-cols-1.sm\\\\:grid-cols-2.lg\\\\:grid-cols-3 {
                        display: grid !important;
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 0.75rem !important;
                        padding: 0 0.5rem !important;
                      }
                      
                      /* Forzar botones del mismo tamaño */
                      .hero-button,
                      .group.bg-gradient-to-r {
                        padding: 0.75rem 1.5rem !important;
                        font-size: 1rem !important;
                        width: auto !important;
                        min-width: 140px !important;
                        flex: 0 0 auto !important;
                        white-space: nowrap !important;
                      }
                      
                      /* Forzar títulos más pequeños */
                      .hero-title,
                      h1 {
                        font-size: 2.5rem !important;
                        line-height: 1.1 !important;
                        margin-bottom: 1rem !important;
                      }
                      
                      .hero-subtitle,
                      p.text-2xl.md\\\\:text-3xl {
                        font-size: 1.25rem !important;
                        line-height: 1.4 !important;
                        margin-bottom: 2rem !important;
                      }
                      
                      /* Forzar tarjetas más pequeñas */
                      .product-card,
                      .oferta-card,
                      .group.bg-violet-50\\\\/80,
                      .group.bg-white\\\\/90 {
                        padding: 0.75rem !important;
                        margin: 0 !important;
                      }
                      
                      /* Forzar imágenes más pequeñas */
                      .product-card img,
                      .oferta-card img,
                      .h-48.sm\\\\:h-56 {
                        height: 120px !important;
                        object-fit: cover !important;
                      }
                      
                      /* Forzar títulos de productos */
                      .product-title,
                      .oferta-title,
                      h3 {
                        font-size: 1rem !important;
                        line-height: 1.2 !important;
                        margin-bottom: 0.5rem !important;
                      }
                      
                      /* Forzar precios */
                      .product-price,
                      .oferta-price {
                        font-size: 1.25rem !important;
                        margin-bottom: 0.75rem !important;
                      }
                      
                      /* Forzar botones de WhatsApp */
                      .product-card button,
                      .oferta-card button {
                        padding: 0.5rem !important;
                        font-size: 0.875rem !important;
                      }
                      
                      /* Forzar secciones más pequeñas */
                      section {
                        padding: 1.5rem 0.5rem !important;
                      }
                      
                      /* Forzar contenedores */
                      .max-w-6xl {
                        max-width: 100% !important;
                        padding: 0 0.5rem !important;
                      }
                      
                      /* Forzar espaciado */
                      .mb-8, .mb-12, .mb-16 {
                        margin-bottom: 1rem !important;
                      }
                      
                      .py-24 {
                        padding-top: 1.5rem !important;
                        padding-bottom: 1.5rem !important;
                      }
                    }
                  \`;
                  
                  // Remover estilos anteriores si existen
                  const existingStyle = document.getElementById('mobile-forced-styles');
                  if (existingStyle) {
                    existingStyle.remove();
                  }
                  
                  // Agregar nuevos estilos
                  document.head.appendChild(style);
                  
                  console.log('✅ Estilos móviles aplicados');
                } else {
                  console.log('💻 Detectado desktop, no aplicando estilos móviles');
                }
              }
              
              // Ejecutar inmediatamente
              forceMobileStyles();
              
              // Ejecutar al cargar
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', forceMobileStyles);
              } else {
                forceMobileStyles();
              }
              
              // Ejecutar al redimensionar
              window.addEventListener('resize', forceMobileStyles);
              
              // Ejecutar después de un delay para asegurar que se aplique
              setTimeout(forceMobileStyles, 1000);
              setTimeout(forceMobileStyles, 3000);
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Header Responsivo */}
          <header className="bg-white shadow-md relative">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <img 
                    src="/images/Logo Bebidas.jpeg" 
                    alt="KNDrinks Logo" 
                    className="header-logo h-12 sm:h-16 w-auto object-contain rounded-xl"
                  />
                  <span className="hidden sm:block text-xl font-bold text-gray-800">KNDrinks</span>
                </div>
                
                {/* Navegación Desktop */}
                <nav className="header-nav hidden md:flex items-center space-x-8">
                  <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Inicio</a>
                  <a href="/productos" className="text-gray-700 hover:text-blue-600 transition-colors">Productos</a>
                  <a href="/ofertas" className="text-gray-700 hover:text-blue-600 transition-colors">Ofertas</a>
                  <a href="/contacto" className="text-gray-700 hover:text-blue-600 transition-colors">Contacto</a>
                </nav>
                
                {/* Botones de acción */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {/* Botón de búsqueda - Solo desktop */}
                  <button className="hidden md:block p-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  
                  {/* Botón de administrador - Solo desktop */}
                  <a href="/admin" className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Admin</span>
                  </a>
                  
                  {/* Menú móvil */}
                  <MobileMenu />
                </div>
              </div>
            </div>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          {/* Footer Responsivo */}
          <footer className="bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
              <div className="footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-4">KNDrinks</h3>
                  <p className="text-gray-300 mb-4">
                    Tu tienda de bebidas favorita con la mejor selección de licores, vinos y cervezas.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Productos</h4>
                  <ul className="space-y-2">
                    <li><a href="/licores" className="text-gray-300 hover:text-white transition-colors">Licores</a></li>
                    <li><a href="/vinos" className="text-gray-300 hover:text-white transition-colors">Vinos</a></li>
                    <li><a href="/cervezas" className="text-gray-300 hover:text-white transition-colors">Cervezas</a></li>
                    <li><a href="/sin-alcohol" className="text-gray-300 hover:text-white transition-colors">Sin Alcohol</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Servicios</h4>
                  <ul className="space-y-2">
                    <li><a href="/envios" className="text-gray-300 hover:text-white transition-colors">Envíos</a></li>
                    <li><a href="/reservas" className="text-gray-300 hover:text-white transition-colors">Reservas</a></li>
                    <li><a href="/eventos" className="text-gray-300 hover:text-white transition-colors">Eventos</a></li>
                    <li><a href="/asesoramiento" className="text-gray-300 hover:text-white transition-colors">Asesoramiento</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                  <div className="space-y-2 text-gray-300 text-sm sm:text-base">
                    <p className="flex items-start space-x-2">
                      <span>📍</span>
                      <span>Rimini 343 - Córdoba, Argentina</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <span>📞</span>
                      <a href="tel:+543517738174" className="hover:text-white transition-colors">
                        +54 9 351 773-8174
                      </a>
                    </p>
                    <p className="flex items-start space-x-2">
                      <span>🕒</span>
                      <span className="text-xs sm:text-sm">
                        Dom-Jue: 10:00 - 02:00<br />
                        Vie-Sáb: 24h
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
                <p className="text-gray-400 text-xs sm:text-sm">
                  © 2024 KNDrinks. Todos los derechos reservados.
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <a href="/terminos" className="text-gray-400 hover:text-white transition-colors">Términos y Condiciones</a>
                  <span className="text-gray-600">|</span>
                  <a href="/privacidad" className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</a>
                  <span className="text-gray-600">|</span>
                  <a href="/admin" className="text-gray-400 hover:text-white transition-colors">Panel Admin</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
