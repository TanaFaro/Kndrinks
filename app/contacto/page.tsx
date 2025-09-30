'use client'

export default function Contacto() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
      {/* Header Moderno */}
      <section className="py-24 px-4 text-center bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">
            Contáctanos
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para ayudarte. ¡Conversemos sobre tus necesidades de bebidas!
          </p>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Logo y Descripción */}
            <div className="text-center lg:text-left">
              <div className="mb-8 flex justify-center lg:justify-start">
                <a href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
                  <img 
                    src="/images/LogoBebidas.jpeg" 
                    alt="KNDrinks Logo" 
                    className="h-56 w-auto object-contain drop-shadow-2xl rounded-2xl"
                  />
                </a>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Tu tienda de confianza para las mejores bebidas. Ofrecemos una amplia selección de licores, vinos, cervezas y más, con la mejor calidad y precios competitivos.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">Productos Premium</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">Envío Rápido</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">Atención Personalizada</span>
                </div>
              </div>
            </div>

            {/* Botón de WhatsApp Directo */}
            <div className="bg-violet-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-violet-200/20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-4xl">💬</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                ¡Chatea con Nosotros!
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                ¿Tienes preguntas sobre nuestros productos? ¿Quieres hacer un pedido especial? ¡Estamos aquí para ayudarte!
              </p>
              <a
                href="https://wa.me/5493517738174?text=¡Hola! Me gustaría obtener más información sobre sus productos."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="text-2xl">💬</span>
                <span>Chatear por WhatsApp</span>
                <span>→</span>
              </a>
              <p className="text-sm text-slate-500 mt-4">
                Horario de atención: De Domingos a jueves de 10 a 02 hs<br/>
                Viernes y sábados TODA LA NOCHE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detalles de Contacto */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-16">
            Información de Contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'WhatsApp',
                description: 'Chatea con nosotros',
                contact: '+54 9 351 773-8174',
                icon: '💬',
                action: 'Chatear',
                link: 'https://wa.me/5493517738174?text=¡Hola! Me gustaría obtener más información sobre sus productos.',
                isExternal: true
              },
              {
                title: 'Dirección',
                description: 'Visítanos',
                contact: 'Rimini 343 - Barrio Ampliación Kennedy',
                icon: '📍',
                action: 'Ver Mapa',
                link: 'https://www.google.com/maps/search/Rimini+343+Barrio+Ampliación+Kennedy+Córdoba+Argentina',
                isExternal: true
              },
              {
                title: 'Horarios',
                description: 'Horarios de atención',
                contact: 'De Domingos a jueves de 10 a 02 hs\nViernes y sábados TODA LA NOCHE',
                icon: '🕒',
                action: 'Ver Horarios',
                link: '#'
              }
            ].map((item) => (
              <div key={item.title} className="group bg-violet-50/80 backdrop-blur-sm rounded-3xl p-8 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-violet-200/20">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="text-lg font-semibold text-slate-800 mb-6 whitespace-pre-line">
                  {item.contact}
                </div>
                <a
                  href={item.link}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span>{item.action}</span>
                  <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redes Sociales */}
      <section className="py-24 px-4 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-8">
            Síguenos en Redes Sociales
          </h2>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Mantente al día con nuestras novedades, ofertas especiales y productos destacados
          </p>
          <div className="flex justify-center">
            <a
              href="https://www.instagram.com/_kndrinks?igsh=MWdlYno3a3Nzb3Nycw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-2xl text-white px-12 py-6 rounded-2xl font-bold transition-all duration-300 shadow-xl transform hover:scale-105"
            >
              <span className="flex flex-col items-center justify-center space-y-3">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">Instagram</div>
                  <div className="text-sm opacity-90 font-normal">Síguenos para ver fotos y videos</div>
                </div>
              </span>
            </a>
          </div>
        </div>
      </section>
      </div>
  )
}
