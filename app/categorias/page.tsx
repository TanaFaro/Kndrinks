export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Moderno */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
            Nuestras Categorías
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Explora nuestra amplia gama de bebidas organizadas por categorías para encontrar exactamente lo que buscas
          </p>
        </div>

        {/* Grid de Categorías Moderno */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              name: 'Licores Premium',
              description: 'Whisky, Vodka, Gin, Ron y más',
              count: '150+ productos',
              icon: (
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ),
              gradient: 'from-amber-500 to-orange-600',
              bgGradient: 'from-amber-50 to-orange-50',
              hoverGradient: 'from-amber-100 to-orange-100',
              products: ['Whisky Premium', 'Vodka Absolut', 'Gin Botánico', 'Ron Añejo']
            },
            {
              name: 'Vinos Especiales',
              description: 'Tintos, blancos, rosados y espumantes',
              count: '200+ productos',
              icon: (
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ),
              gradient: 'from-red-500 to-pink-600',
              bgGradient: 'from-red-50 to-pink-50',
              hoverGradient: 'from-red-100 to-pink-100',
              products: ['Malbec Reserva', 'Chardonnay', 'Cabernet', 'Champagne']
            },
            {
              name: 'Cervezas Craft',
              description: 'Artesanales, importadas y nacionales',
              count: '100+ productos',
              icon: (
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              ),
              gradient: 'from-yellow-500 to-amber-600',
              bgGradient: 'from-yellow-50 to-amber-50',
              hoverGradient: 'from-yellow-100 to-amber-100',
              products: ['IPA Artesanal', 'Stout Negra', 'Lager Premium', 'Porter']
            },
            {
              name: 'Bebidas Sin Alcohol',
              description: 'Refrescos, jugos y bebidas saludables',
              count: '80+ productos',
              icon: (
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              ),
              gradient: 'from-blue-500 to-cyan-600',
              bgGradient: 'from-blue-50 to-cyan-50',
              hoverGradient: 'from-blue-100 to-cyan-100',
              products: ['Agua Premium', 'Jugos Naturales', 'Tés Helados', 'Limonadas']
            },
            {
              name: 'Aperitivos',
              description: 'Vermouth, amargos y digestivos',
              count: '60+ productos',
              icon: (
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ),
              gradient: 'from-purple-500 to-indigo-600',
              bgGradient: 'from-purple-50 to-indigo-50',
              hoverGradient: 'from-purple-100 to-indigo-100',
              products: ['Vermouth Rojo', 'Amargo Seltz', 'Fernet', 'Campari']
            },
            {
              name: 'Accesorios',
              description: 'Copas, decantadores y más',
              count: '40+ productos',
              icon: (
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              ),
              gradient: 'from-slate-500 to-gray-600',
              bgGradient: 'from-slate-50 to-gray-50',
              hoverGradient: 'from-slate-100 to-gray-100',
              products: ['Copas de Vino', 'Decantadores', 'Hieleras', 'Cocteleras']
            }
          ].map((category, index) => (
            <div key={index} className="group">
              <div className={`bg-gradient-to-br ${category.bgGradient} hover:${category.hoverGradient} rounded-3xl p-8 text-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border border-white/20 backdrop-blur-sm h-full`}>
                <div className={`w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                  {category.name}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent mb-4">
                  {category.count}
                </div>
                
                {/* Productos destacados */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2">Productos Destacados:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.products.map((product, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white/60 rounded-full text-xs text-slate-600 font-medium">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <button className={`w-full bg-gradient-to-r ${category.gradient} hover:${category.gradient.replace('500', '600').replace('600', '700')} text-white py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}>
                  <span className="flex items-center justify-center space-x-2">
                    <span>Ver Productos</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </span>
                </button>

                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className={`w-full h-1 bg-gradient-to-r ${category.gradient} rounded-full`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Estadísticas Modernas */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/20">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Nuestras Estadísticas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '590+', label: 'Productos Totales', icon: '📦' },
              { number: '6', label: 'Categorías', icon: '🏷️' },
              { number: '50+', label: 'Marcas Premium', icon: '⭐' },
              { number: '24/7', label: 'Soporte', icon: '🔄' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
