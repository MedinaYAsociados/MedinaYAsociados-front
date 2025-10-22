import { useState } from 'react';
import { login } from '../services/auth';
import { validateLogin } from '../utils/validation';

function Login({ onGoRegister }) {
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
      await login({ email, password });
      console.log('Login OK');
    } catch (err) {
      setApiError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-8 animate-fade-in">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Título Principal */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3D3229] text-center mb-8 sm:mb-10 md:mb-12 leading-tight animate-slide-up">
          Bienvenido a Medina y Asociados
        </h1>

        {/* Card Formulario de Login */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 space-y-5 animate-slide-up">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3D3229] mb-1">
              Inicio de Sesión
            </h2>
            <p className="text-[#3D3229]/80 text-sm sm:text-base">
              Inicia sesión con tu cuenta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Email */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-[#3D3229] text-sm sm:text-base font-semibold"
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
                         text-[#3D3229] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all duration-200 shadow-soft hover:shadow-medium"
                required
              />
              {errors.email && (<p className="text-red-700 text-xs sm:text-sm mt-1 font-medium">{errors.email}</p>)}
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-[#3D3229] text-sm sm:text-base font-semibold"
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
                           text-[#3D3229] placeholder-[#9C8B78]/60 text-sm sm:text-base
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                           transition-all duration-200 shadow-soft hover:shadow-medium"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPwd(s=>!s)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B4423] text-xs sm:text-sm font-semibold 
                           hover:text-[#3D3229] transition-colors px-2 py-1 rounded"
                >
                  {showPwd ? 'Ocultar' : 'Ver'}
                </button>
              </div>
              {errors.password && (<p className="text-red-700 text-xs sm:text-sm mt-1 font-medium">{errors.password}</p>)}
            </div>

            {/* Error de API */}
            {apiError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                <p className="text-red-800 text-sm font-medium">{apiError}</p>
              </div>
            )}

            {/* Botón Iniciar Sesión */}
            <button
              type="submit"
              className="w-full mt-2 px-6 py-3.5 bg-[#B8D4A5] 
                       border-2 border-[#3D3229] rounded-xl
                       text-[#3D3229] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                       active:scale-[0.98] transition-all duration-200 
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-soft
                       focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/50"
              disabled={loading}
            >
              {loading ? '✓ Ingresando...' : 'Inicia sesión'}
            </button>
          </form>

          {/* Enlace Registrarse */}
          <div className="text-center pt-4 border-t border-[#3D3229]/10">
            <p className="text-[#3D3229]/70 text-sm sm:text-base mb-2">
              ¿No tienes cuenta?
            </p>
            <button 
              className="text-[#6B4423] text-base sm:text-lg font-bold hover:text-[#3D3229] 
                       hover:underline underline-offset-2 active:scale-95 transition-all"
              onClick={onGoRegister}
            >
              Regístrate aquí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
