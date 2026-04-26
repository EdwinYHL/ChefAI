import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function RecipeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe || {
    id: 1,
    nombre: 'Pasta al Pomodoro Vegana',
    similitud: 0.85,
    ingredientes: ['Pasta 250g', 'Tomate 3', 'Cebolla ½', 'Ajo 2 dientes', 'Albahaca', 'AOVE 3 cdas'],
    instrucciones: '1. Hervir agua con sal. 2. Sofreír ajo y cebolla. 3. Agregar tomate. 4. Cocinar pasta. 5. Mezclar.',
    tiempo: 25,
    dificultad: 'facil',
    tags: ['vegano']
  };
  const [saved, setSaved] = useState(false);

  return (
    <div className="pb-24">
      <div className="relative h-56 bg-gradient-to-br from-orange/80 to-orangePale flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-white text-2xl">←</button>
        <button onClick={() => setSaved(!saved)} className="absolute top-4 right-12 text-2xl">{saved ? '❤️' : '🤍'}</button>
        <button className="absolute top-4 right-4 text-2xl">📤</button>
        <div className="text-6xl">🍝</div>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-bold">{recipe.nombre}</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-yellow-500">★★★★★</span>
          <span className="text-sm">4.8 (128)</span>
        </div>

        <div className="flex gap-4 mt-4 text-sm text-gray-600">
          <span>⏱️ {recipe.tiempo}'</span>
          <span>👥 2 personas</span>
          <span>⭐ {recipe.similitud * 100}% match</span>
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-lg">Ingredientes</h2>
          <ul className="mt-2 space-y-2">
            {recipe.ingredientes.map((ing, i) => (
              <li key={i} className="flex justify-between items-center border-b pb-1">
                <span>{ing}</span>
                <button className="text-orange text-sm border border-orange px-2 py-0.5 rounded-full">↩ sub</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-lg">Pasos</h2>
          <ol className="mt-2 space-y-3">
            {recipe.instrucciones.split('. ').map((step, i) => (
              <li key={i} className="flex gap-2">
                <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm">{i+1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
