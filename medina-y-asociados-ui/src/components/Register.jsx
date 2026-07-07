import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/auth';
import { validateRegisterForm as validateRegister } from '../utils/validation';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', password: '',
    confirmPassword: '', telefono: '', dni: '', fechaNacimiento: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validateRegister(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      setLoading(true);
      await register(form);
      navigate('/register-success');
    } catch (err) {
      setApiError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECEFF3] px-4 sm:px-6 py-8 animate-fade-in">
      <div className="w-full max-w-sm sm:max-w-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#53667B] text-center mb-8 sm:mb-10 md:mb-12 leading-tight animate-slide-up">
          Medina y Asociados
        </h1>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 space-y-5 animate-slide-up">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#53667B] mb-1">
              Crear Cuenta
            </h2>
            <p className="text-[#53667B]/80 text-sm sm:text-base">
              Completa tus datos para registrarte
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="nombre" className="block text-[#53667B] text-sm font-semibold">Nombre</label>
                <input type="text" id="nombre" name="nombre" value={form.nombre} onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all duration-200"
                  required />
                {errors.nombre && <p className="text-red-700 text-xs font-medium">{errors.nombre}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="apellido" className="block text-[#53667B] text-sm font-semibold">Apellido</label>
                <input type="text" id="apellido" name="apellido" value={form.apellido} onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all duration-200"
                  required />
                {errors.apellido && <p className="text-red-700 text-xs font-medium">{errors.apellido}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-[#53667B] text-sm font-semibold">Email</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-3 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all duration-200"
                required />
              {errors.email && <p className="text-red-700 text-xs font-medium">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="password" className="block text-[#53667B] text-sm font-semibold">Contraseña</label>
                <input type="password" id="password" name="password" value={form.password} onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all duration-200"
                  required />
                {errors.password && <p className="text-red-700 text-xs font-medium">{errors.password}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="confirmPassword" className="block text-[#53667B] text-sm font-semibold">Confirmar</label>
                <input type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all duration-200"
                  required />
                {errors.confirmPassword && <p className="text-red-700 text-xs font-medium">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="telefono" className="block text-[#53667B] text-sm font-semibold">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" value={form.telefono} onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all duration-200"
                  required />
                {errors.telefono && <p className="text-red-700 text-xs font-medium">{errors.telefono}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="dni" className="block text-[#53667B] text-sm font-semibold">DNI</label>
                <input type="text" id="dni" name="dni" value={form.dni} onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all duration-200"
                  required />
                {errors.dni && <p className="text-red-700 text-xs font-medium">{errors.dni}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="fechaNacimiento" className="block text-[#53667B] text-sm font-semibold">Fecha de Nacimiento</label>
              <input type="date" id="fechaNacimiento" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] text-sm focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all duration-200"
                required />
              {errors.fechaNacimiento && <p className="text-red-700 text-xs font-medium">{errors.fechaNacimiento}</p>}
            </div>

            {apiError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                <p className="text-red-800 text-sm font-medium">{apiError}</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full mt-2 px-6 py-3.5 bg-[#C6A15B] border-2 border-[#C6A15B] rounded-xl text-[#53667B] text-lg font-bold shadow-medium hover:shadow-elevated hover:bg-[#A8C495] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/50">
              {loading ? '✓ Registrando...' : 'Crear Cuenta'}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-[#C6A15B]/10">
            <p className="text-[#53667B]/70 text-sm mb-2">¿Ya tienes cuenta?</p>
            <Link to="/login"
              className="text-[#6B4423] text-base font-bold hover:text-[#53667B] hover:underline underline-offset-2 active:scale-95 transition-all">
              Inicia sesión aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
