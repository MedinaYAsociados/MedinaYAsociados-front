import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginApi } from '../services/auth';
import { validateLogin } from '../utils/validation';

function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validateLogin({ email, password });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      setLoading(true);
      const { token, user } = await loginApi({ email, password });
      authLogin(user, token);
      if (user.roles && user.roles.length > 1) {
        navigate('/role-selector');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setApiError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#ECEFF3] px-4 sm:px-6 py-8 animate-fade-in">
      <div className="w-full max-w-sm sm:max-w-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#53667B] text-center mb-8 sm:mb-10 md:mb-12 leading-tight animate-slide-up">
          Bienvenido a Medina y Asociados
        </h1>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 space-y-5 animate-slide-up">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#53667B] mb-1">
              Inicio de Sesión
            </h2>
            <p className="text-[#53667B]/80 text-sm sm:text-base">
              Inicia sesión con tu cuenta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[#53667B] text-sm sm:text-base font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl
                         text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all duration-200 shadow-soft hover:shadow-medium"
                required
              />
              {errors.email && (<p className="text-red-700 text-xs sm:text-sm mt-1 font-medium">{errors.email}</p>)}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-[#53667B] text-sm sm:text-base font-semibold"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-20 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl
                           text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                           transition-all duration-200 shadow-soft hover:shadow-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(s=>!s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B4423] text-xs sm:text-sm font-semibold
                           hover:text-[#53667B] transition-colors px-2 py-1 rounded"
                >
                  {showPwd ? 'Ocultar' : 'Ver'}
                </button>
              </div>
              {errors.password && (<p className="text-red-700 text-xs sm:text-sm mt-1 font-medium">{errors.password}</p>)}
            </div>

            {apiError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                <p className="text-red-800 text-sm font-medium">{apiError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 px-6 py-3.5 bg-[#C6A15B]
                       border-2 border-[#C6A15B] rounded-xl
                       text-[#53667B] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated hover:bg-[#A8C495]
                       active:scale-[0.98] transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-soft
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/50"
              disabled={loading}
            >
              {loading ? '✓ Ingresando...' : 'Inicia sesión'}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-[#C6A15B]/10">
            <p className="text-[#53667B]/70 text-sm sm:text-base mb-2">
              ¿No tienes cuenta?
            </p>
            <Link
              to="/register"
              className="text-[#6B4423] text-base sm:text-lg font-bold hover:text-[#53667B]
                       hover:underline underline-offset-2 active:scale-95 transition-all"
            >
              Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
