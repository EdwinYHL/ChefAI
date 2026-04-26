import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Saved() {
  const [sort, setSort] = useState('recent');
  const savedRecipes = [
    { id: 1, name: 'Pasta al Pomodoro', rating: 4.8, time: 25, diet: 'Vegano' },
    { id: 2, name: 'Curry Vegano', rating: 4.6, time: 35, diet: 'Vegano' },
    { id: 3, name: 'Ensalada César', rating: 4.3, time: 10, diet: 'Rápida' },
    { id: 4, name: 'Sopa de Verduras', rating: 4.7, time: 40, diet: 'Vegano' },
    { id: 5, name: 'Smoothie de Mora', rating: 4.9, time: 5, diet: 'Rápido' },
  ];

  const sorted = [...savedRecipes];
  if (sort === 'top') sorted.sort((a,b) => b.rating - a.rating);
  if (sort === 'fast') sorted.sort((a,b) => a.time - b.time);

  return (
    <div className="p-4 pb-20">
      <h1 className="text-2xl font-bold mb-2">❤️ Guardadas ({savedRecipes.length})</h1>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {['Recientes', '⭐ Mejor valoradas', '⏱️ Más rápidas'].map(opt => (
          <button
            key={opt}
            onClick={() => setSort(opt.includes('valoradas') ? 'top' : opt.includes('rápidas') ? 'fast' : 'recent')}
            className={`px-3 py-1 rounded-full text-sm ${(opt.includes('Recientes') && sort === 'recent') || (opt.includes('valoradas') && sort === 'top') || (opt.includes('rápidas') && sort === 'fast') ? 'bg-orange text-white' : 'bg-gray-100'}`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {sorted.map(rec => (
          <Link key={rec.id} to={`/recipe/${rec.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="h-28 bg-orangePale flex items-center justify-center text-3xl">🍝</div>
            <div className="p-2">
              <p className="font-semibold text-sm">{rec.name}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>⭐ {rec.rating}</span>
                <span>{rec.time} min</span>
              </div>
              {rec.diet && <span className="text-xs bg-gray-100 px-1 rounded">{rec.diet}</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
