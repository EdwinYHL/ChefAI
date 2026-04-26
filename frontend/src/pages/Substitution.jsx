import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { chefaiService } from '../services/chefaiService';

export default function Substitution() {
  const location = useLocation();
  const navigate = useNavigate();
  const { ingredient, recipeContext, filters } = location.state || {};
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubstitutes = async () => {
      if (!ingredient) return;
      try {
        const data = await chefaiService.obtenerSustitutos(ingredient);
        setSuggestions(data.sustitutos || []);
      } catch (error) {
        console.error(error);
        setSuggestions([
          { ingrediente: 'Orégano fresco', nota: 'Sabor similar', calidad: 'ideal' },
          { ingrediente: 'Espinaca baby', nota: 'Sabor suave', calidad: 'bueno' },
          { ingrediente: 'Cebollín fresco', nota: 'Toque fresco', calidad: 'opcional' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubstitutes();
  }, [ingredient]);

  const applySubstitute = (sub) => {
    navigate(-1, { state: { substituted: { original: ingredient, new: sub.ingrediente } } });
  };

  const getBadgeClass = (quality) => {
    if (quality === 'ideal') return 'bg-green-100 text-green-700';
    if (quality === 'bueno') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-up">
        <div className="sticky top-0 bg-white p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Sin {ingredient} — Mindy sugiere:</h2>
            <button onClick={() => navigate(-1)} className="text-2xl leading-5">✕</button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Considerando: {filters?.diet || 'normal'} + alergias activas</p>
        </div>
        <div className="p-4 space-y-3">
          {loading ? (
            <p className="text-center">Buscando sustitutos...</p>
          ) : (
            suggestions.map((sub, idx) => (
              <div key={idx} onClick={() => applySubstitute(sub)} className="border rounded-xl p-3 active:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">🌿 {sub.ingrediente}</p>
                    <p className="text-sm text-gray-500">{sub.nota || sub.descripcion}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeClass(sub.calidad)}`}>
                    {sub.calidad === 'ideal' ? '✓ Ideal' : sub.calidad === 'bueno' ? '✓ Bueno' : '△ Opcional'}
                  </span>
                </div>
              </div>
            ))
          )}
          <button className="w-full py-2 text-orange text-sm font-medium">¿Otra opción? →</button>
        </div>
      </div>
    </div>
  );
}
