import { Link } from 'react-router-dom';

export default function Home() {
  const recentRecipes = [
    { id: 1, name: 'Pasta al Tomate', time: 25 },
    { id: 2, name: 'Ensalada César', time: 10 },
  ];

  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">🤖 Mindy</h2>
          <p className="text-xs text-green-600">● En línea · Lista para cocinar</p>
        </div>
        <div className="flex gap-3">
          <button className="relative">🔔</button>
          <Link to="/profile">👤</Link>
        </div>
      </div>

      <div className="bg-orangePale p-5 rounded-2xl mb-6">
        <p className="font-semibold">¡Hola! Soy Mindy 👋</p>
        <p className="text-sm text-gray-600 mt-1">Cuéntame qué tienes en la nevera o déjame verlo — ¡inventamos algo rico!</p>
        <div className="flex gap-3 mt-4">
          <Link to="/detect" className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow">📸 Escanear nevera</Link>
          <button className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow">🗣️ Decir ingredientes</button>
          <Link to="/saved" className="bg-white px-4 py-2 rounded-full text-sm font-medium shadow">📋 Mis recetas</Link>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">✦ Recientes</h3>
          <button className="text-orange text-sm">Ver todo</button>
        </div>
        {recentRecipes.map(recipe => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="block bg-white p-3 rounded-xl mb-2 shadow-sm">
            <div className="flex justify-between">
              <span className="font-medium">🍝 {recipe.name}</span>
              <span className="text-gray-400 text-sm">{recipe.time} min</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
