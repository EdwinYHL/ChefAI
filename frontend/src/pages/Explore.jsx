import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Explore() {
  const [search, setSearch] = useState('');
  const popular = [
    { id: 1, name: 'Pasta al Tomate', rating: 4.8, time: 25 },
    { id: 2, name: 'Curry Vegano', rating: 4.6, time: 35 },
  ];
  return (
    <div className="p-4 pb-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Explorar 🍳</h1>
        <button className="text-orange">⚙️ Filtrar</button>
      </div>
      <input
        type="text"
        placeholder="Buscar recetas, ingredientes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border border-gray-200 rounded-xl mb-4"
      />
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {['Todo', 'Rápido ⚡', 'Vegano 🌱', 'Sin Gluten 🌾'].map(cat => (
          <button key={cat} className="px-4 py-1 bg-gray-100 rounded-full text-sm">{cat}</button>
        ))}
      </div>
      <h2 className="font-bold text-lg mb-2">🔥 Populares hoy</h2>
      {popular.map(rec => (
        <Link key={rec.id} to={`/recipe/${rec.id}`} className="block bg-white p-3 rounded-xl mb-2 shadow">
          <div className="flex justify-between">
            <span>🍝 {rec.name}</span>
            <span>⭐ {rec.rating} · {rec.time} min</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
