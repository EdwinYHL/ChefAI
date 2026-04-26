import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} state={{ recipe }} className="block bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="h-32 bg-orangePale flex items-center justify-center text-4xl">🍳</div>
      <div className="p-3">
        <h3 className="font-bold text-md">{recipe.nombre}</h3>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>⭐ {recipe.similitud ? (recipe.similitud * 10).toFixed(1) : '4.8'}</span>
          <span>⏱️ {recipe.tiempo || 25} min</span>
        </div>
      </div>
    </Link>
  );
}
