import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular login (conectar con backend real después)
    const mockUser = { id: 1, name: email.split('@')[0], email, diet: 'normal', allergies: [] };
    login(mockUser, 'fake-token');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-cream p-6 flex flex-col">
      <div className="text-center mt-12">
        <div className="text-5xl mb-3">🤖</div>
        <h1 className="font-sora text-2xl font-bold text-ink">ChefMind</h1>
        <p className="text-gray-500 text-sm">Tu chef personal con IA</p>
      </div>

      <div className="flex justify-center gap-6 mt-8 border-b">
        <button
          className={`pb-2 font-semibold ${mode === 'login' ? 'border-b-2 border-orange text-orange' : 'text-gray-400'}`}
          onClick={() => setMode('login')}
        >
          Iniciar sesión
        </button>
        <button
          className={`pb-2 font-semibold ${mode === 'register' ? 'border-b-2 border-orange text-orange' : 'text-gray-400'}`}
          onClick={() => setMode('register')}
        >
          Registrarse
        </button>
      </div>

      <div className="mt-8 space-y-4">
        <button className="w-full py-3 bg-black text-white rounded-xl flex items-center justify-center gap-2">
          🍎 Continuar con Apple
        </button>
        <button className="w-full py-3 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2">
          🔵 Continuar con Google
        </button>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-cream text-gray-500">o con correo</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl"
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-xl"
            required
          />
          <button type="submit" className="w-full py-3 bg-orange text-white rounded-xl font-semibold">
            {mode === 'login' ? 'Iniciar sesión →' : 'Crear cuenta →'}
          </button>
        </form>
        {mode === 'login' && (
          <p className="text-center text-sm text-gray-500">
            ¿Olvidaste tu contraseña?{' '}
            <button className="text-orange">Recuperar</button>
          </p>
        )}
      </div>
    </div>
  );
}
