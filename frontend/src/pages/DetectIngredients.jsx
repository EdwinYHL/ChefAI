import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DetectIngredients() {
  const navigate = useNavigate();
  const [detected, setDetected] = useState([
    { name: 'Tomate', confidence: 97, amount: '3' },
    { name: 'Cebolla', confidence: 91, amount: '½' },
    { name: 'Pasta', confidence: 88, amount: '250g' }
  ]);
  const [manualInput, setManualInput] = useState('');

  const addManualIngredient = () => {
    if (manualInput.trim()) {
      setDetected([...detected, { name: manualInput.trim(), confidence: 100, amount: '1' }]);
      setManualInput('');
    }
  };

  const confirmAndContinue = () => {
    const ingredientsList = detected.map(i => i.name.toLowerCase());
    navigate('/filters', { state: { ingredients: ingredientsList } });
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-orangePale p-4 flex items-center gap-3 sticky top-0">
        <button onClick={() => navigate(-1)} className="text-2xl">←</button>
        <h1 className="text-xl font-bold">Mindy ve tus ingredientes</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Hoy</span>
            <span>YOLO v8 · 3 obj</span>
          </div>
          <div className="relative h-48 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-4xl">📸</span>
            {/* Aquí iría el canvas de bounding boxes si tuvieras YOLO real */}
          </div>
          <p className="font-medium">¡Detecté 3 ingredientes! ¿Es correcto? 🔍</p>
          <div className="mt-3 space-y-2">
            {detected.map((ing, idx) => (
              <div key={idx} className="flex justify-between items-center border-b pb-1">
                <span>🍅 {ing.name} <span className="text-xs text-gray-400">{ing.confidence}%</span></span>
                <input
                  type="text"
                  value={ing.amount}
                  onChange={(e) => {
                    const newList = [...detected];
                    newList[idx].amount = e.target.value;
                    setDetected(newList);
                  }}
                  className="w-16 text-right border rounded px-1"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={confirmAndContinue} className="flex-1 bg-green-600 text-white py-2 rounded-full">✓ Sí, correcto</button>
            <button className="flex-1 border border-gray-300 py-2 rounded-full">✏️ Editar lista</button>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Agregar ingrediente manualmente..."
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            className="flex-1 p-2 border rounded-xl"
          />
          <button onClick={addManualIngredient} className="bg-orange text-white px-4 rounded-xl">➕</button>
        </div>
      </div>
    </div>
  );
}
