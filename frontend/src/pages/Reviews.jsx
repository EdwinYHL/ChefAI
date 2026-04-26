import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Reviews() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [filterStars, setFilterStars] = useState(null);
  const reviews = [
    { id: 1, user: 'María García', stars: 5, date: 'hace 2 días', text: '¡Excelente receta! Mindy me sugirió orégano en lugar de albahaca y quedó increíble.', diet: '🌱 Vegano', likes: 12 },
    { id: 2, user: 'Carlos Méndez', stars: 4, date: 'hace 5 días', text: 'Muy buena. Adapté para keto con calabacín.', diet: '🥩 Keto', likes: 8 },
    { id: 3, user: 'Laura Jiménez', stars: 5, date: 'hace 1 semana', text: 'ChefMind detectó mis tomates al 97% y propuso esta receta en segundos.', diet: '🍽️ Normal', likes: 5 },
  ];
  const filtered = filterStars ? reviews.filter(r => r.stars === filterStars) : reviews;

  const starBars = [
    { stars: 5, percent: 72 },
    { stars: 4, percent: 18 },
    { stars: 3, percent: 7 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 0 },
  ];

  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="sticky top-0 bg-cream p-4 flex items-center gap-3 border-b">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Valoraciones</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold">4.8</div>
              <div className="text-yellow-500">★★★★★</div>
              <div className="text-xs text-gray-500">128 reseñas</div>
            </div>
            <div className="flex-1 space-y-1">
              {starBars.map(bar => (
                <div key={bar.stars} className="flex items-center gap-2 text-sm">
                  <span>{bar.stars} ★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${bar.percent}%` }}></div>
                  </div>
                  <span className="text-xs">{bar.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {['Todas', '★5', '★4', '★3'].map(label => (
            <button
              key={label}
              onClick={() => setFilterStars(label === 'Todas' ? null : parseInt(label.charAt(1)))}
              className={`px-3 py-1 rounded-full text-sm ${(filterStars === null && label === 'Todas') || filterStars === parseInt(label.charAt(1)) ? 'bg-orange text-white' : 'bg-gray-100'}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map(r => (
            <div key={r.id} className="bg-white p-3 rounded-xl shadow-sm">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{r.user}</span>
                    <span className="text-yellow-500">{"★".repeat(r.stars)}</span>
                  </div>
                  <p className="text-xs text-gray-400">{r.date}</p>
                </div>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{r.diet}</span>
              </div>
              <p className="text-sm mt-2">{r.text}</p>
              <button className="mt-2 text-xs text-gray-500">👍 Útil ({r.likes})</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
