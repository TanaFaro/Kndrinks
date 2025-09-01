export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-spin">
          <span className="text-4xl">🍷</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Cargando...
        </h2>
        <p className="text-slate-600">
          Preparando tu experiencia en KNDrinks
        </p>
      </div>
    </div>
  )
}
