import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Splash() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) navigate('/home');
      else navigate('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange to-orangePale">
      <div className="text-center">
        <div className="text-7xl mb-4 animate-bounce">🤖</div>
        <h1 className="font-sora text-3xl font-bold text-white">ChefMind</h1>
        <p className="text-white/80 mt-2">Tu chef personal con inteligencia artificial</p>
      </div>
      <div className="absolute bottom-8 text-white/60 text-sm">
        © 2025 ChefMind · v1.0.0
      </div>
    </div>
  );
}
