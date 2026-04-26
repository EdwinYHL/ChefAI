import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4 pb-20">
      <div className="text-center mb-6">
        <div className="text-5xl mb-2">👩‍🍳</div>
        <h2 className="text-xl font-bold">{user?.name || 'Ana Torres'}</h2>
        <p className="text-gray-500">@ana.cocina · ana@ejemplo.com</p>
      </div>
      <div className="flex justify-around mb-6">
        <div className="text-center"><div className="font-bold text-xl">47</div><div className="text-xs">Cocinadas</div></div>
        <div className="text-center"><div className="font-bold text-xl">128</div><div className="text-xs">Guardadas</div></div>
        <div className="text-center"><div className="font-bold text-xl">4.9</div><div className="text-xs">Rating dado</div></div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between p-3 bg-gray-50 rounded-xl"><span>🌱 Dieta</span><span className="text-orange">Vegano ›</span></div>
        <div className="flex justify-between p-3 bg-gray-50 rounded-xl"><span>🚨 Alergias</span><span className="text-orange">Lácteos ›</span></div>
        <div className="flex justify-between p-3 bg-gray-50 rounded-xl"><span>⏱️ Tiempo default</span><span className="text-orange">≤ 30 min ›</span></div>
        <button onClick={handleLogout} className="w-full p-3 bg-red-50 text-red-600 rounded-xl mt-6">🚪 Cerrar sesión</button>
      </div>
    </div>
  );
}
