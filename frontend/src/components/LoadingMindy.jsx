export default function LoadingMindy({ step, message }) {
  const steps = ['Verificando alérgenos', 'Confirmando ingredientes', 'Generando receta', '¡Casi lista!'];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream p-6 text-center">
      <div className="text-7xl mb-6 animate-bounce">🤖</div>
      <h2 className="text-2xl font-bold mb-2">Mindy está cocinando tu receta perfecta 🍳</h2>
      <p className="text-gray-500 mb-8">{message || steps[step]}</p>
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-orange transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
