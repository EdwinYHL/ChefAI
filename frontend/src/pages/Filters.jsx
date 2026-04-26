import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Filters() {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = location.state?.ingredients || [];
  const [diet, setDiet] = useState('normal');
  const [allergies, setAllergies] = useState([]);
  const [maxTime, setMaxTime] = useState('cualquier');
  const [servings, setServings] = useState(2);

  const toggleAllergy = (allergy) => {
    setAllergies(prev => prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]);
  };

  const handleGenerate = () => {
    navigate('/loading', { state: { ingredients, diet, allergies, maxTime, servings } });
  };

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Ajusta tu receta</h1>
      </div>

      <div className="bg-orangePale p-4 rounded-xl mb-6">
        <p className="text-sm font-medium mb-2">✦ Ingredientes confirmados</p>
        <div className="flex flex-wrap gap-2">
          {ingredients.map(ing => (
            <span key={ing} className="bg-white px-3 py-1 rounded-full text-sm">🍅 {ing}</span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">🌿 Tipo de Dieta</p>
        <div className="flex flex-wrap gap-2">
          {['normal', 'vegano', 'keto', 'pescatarian', 'sin gluten', 'sin lacteos'].map(d => (
            <button
              key={d}
              onClick={() => setDiet(d)}
              className={`px-4 py-2 rounded-full text-sm ${diet === d ? 'bg-orange text-white' : 'bg-gray-100'}`}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2 text-red-600">🚨 Alergias (omite estos ingredientes)</p>
        <div className="flex flex-wrap gap-2">
          {['Maní', 'Lácteos', 'Gluten', 'Mariscos', 'Huevo', 'Nueces'].map(a => (
            <button
              key={a}
              onClick={() => toggleAllergy(a.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm ${allergies.includes(a.toLowerCase()) ? 'bg-red-500 text-white' : 'bg-gray-100'}`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="font-semibold mb-2">⏱️ Tiempo máximo de cocción</p>
        <div className="flex gap-3">
          {['≤ 15 min', '≤ 30 min', 'Cualquier'].map(t => (
            <button
              key={t}
              onClick={() => setMaxTime(t)}
              className={`px-4 py-2 rounded-full ${maxTime === t ? 'bg-orange text-white' : 'bg-gray-100'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <p className="font-semibold mb-2">👨‍👩‍👧 Porciones</p>
        <div className="flex items-center gap-4">
          <button onClick={() => setServings(Math.max(1, servings-1))} className="w-10 h-10 bg-gray-100 rounded-full text-xl">−</button>
          <span className="text-xl font-semibold">{servings}</span>
          <button onClick={() => setServings(servings+1)} className="w-10 h-10 bg-gray-100 rounded-full text-xl">+</button>
          <span className="text-gray-500">personas</span>
        </div>
      </div>

      <button onClick={handleGenerate} className="w-full py-4 bg-orange text-white rounded-xl font-bold text-lg">
        ✨ Generar Receta con Mindy
      </button>
    </div>
  );
}
