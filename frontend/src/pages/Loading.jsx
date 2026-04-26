import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { chefaiService } from '../services/chefaiService';

export default function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ingredients, diet, allergies, maxTime, servings } = location.state || { ingredients: [] };
  const [step, setStep] = useState(0);
  const messages = [
    'Verificando alérgenos y restricciones 🔍',
    'Confirmando ingredientes ✓',
    'Generando receta con LLM...',
    '¡Casi lista! 🍳'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => Math.min(prev + 1, messages.length - 1));
    }, 2000);

    const generateRecipe = async () => {
      try {
        const filtros = {};
        if (diet && diet !== 'normal') filtros.tags = [diet];
        if (maxTime !== 'Cualquier') {
          const minutes = parseInt(maxTime.split(' ')[1]);
          filtros.tiempo_max = minutes;
        }
        const result = await chefaiService.recomendar(ingredients, 1, filtros);
        if (result.status === 'success' && result.recomendaciones.length > 0) {
          navigate('/recipe/' + result.recomendaciones[0].id, { state: { recipe: result.recomendaciones[0] } });
        } else {
          throw new Error('No se pudo generar receta');
        }
      } catch (error) {
        console.error(error);
        navigate('/home'); // fallback
      }
    };
    generateRecipe();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-cream p-6 text-center">
      <div className="text-7xl mb-6 animate-bounce">🤖</div>
      <h2 className="text-2xl font-bold mb-2">¡Mindy está cocinando tu receta perfecta! 🍳</h2>
      <p className="text-gray-500 mb-8">{messages[step]}</p>
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-orange transition-all duration-500" style={{ width: `${(step+1) * 25}%` }}></div>
      </div>
    </div>
  );
}
