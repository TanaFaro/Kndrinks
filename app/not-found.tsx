export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl">🔍</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">
          Página no encontrada
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          La página que buscas no existe o ha sido movida. 
          Regresa al inicio para continuar navegando.
        </p>
        <a
          href="/"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span>🏠</span>
          <span>Ir al inicio</span>
        </a>
      </div>
    </div>
  )
}
