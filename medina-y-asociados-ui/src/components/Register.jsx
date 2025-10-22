import { useState } from 'react';
import { register as registerApi } from '../services/auth';
import { validateRegisterForm } from '../utils/validation';

function Register({ onSuccess, onGoLogin }) {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    localidad: '',
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validateRegisterForm(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      setLoading(true);
      await registerApi(form);
      onSuccess?.(form);
    } catch (err) {
      setApiError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-8 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Título */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#3D3229] text-center mb-8 animate-slide-up">
          Bienvenido a Medina y Asociados
        </h1>

        {/* Card Formulario */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 space-y-5 animate-slide-up">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3D3229]">Registro</h2>
            <p className="text-[#3D3229]/80 text-sm sm:text-base">Regístrate para solicitar un turno</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="nombre">Nombre</label>
              <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" />
              {errors.nombre && <p className="text-red-700 text-xs font-medium mt-1">{errors.nombre}</p>}
            </div>

            {/* Apellido */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="apellido">Apellido</label>
              <input id="apellido" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Pérez"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" />
              {errors.apellido && <p className="text-red-700 text-xs font-medium mt-1">{errors.apellido}</p>}
            </div>

            {/* DNI */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="dni">DNI</label>
              <input id="dni" name="dni" value={form.dni} onChange={handleChange} placeholder="12345678"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" />
              {errors.dni && <p className="text-red-700 text-xs font-medium mt-1">{errors.dni}</p>}
            </div>

            {/* Teléfono */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="telefono">Teléfono</label>
              <input id="telefono" name="telefono" value={form.telefono} onChange={handleChange} placeholder="2612345678"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" />
              {errors.telefono && <p className="text-red-700 text-xs font-medium mt-1">{errors.telefono}</p>}
            </div>

            {/* Localidad */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="localidad">Localidad</label>
              <select id="localidad" name="localidad" value={form.localidad} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium">
                <option value="" disabled>Seleccionar</option>
                <option value="Capital">Capital</option>
                <option value="Godoy Cruz">Godoy Cruz</option>
                <option value="Guaymallén">Guaymallén</option>
                <option value="Luján">Luján</option>
              </select>
              {errors.localidad && <p className="text-red-700 text-xs font-medium mt-1">{errors.localidad}</p>}
            </div>

            {/* Calle */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="calle">Calle</label>
              <input id="calle" name="calle" value={form.calle} onChange={handleChange} placeholder="San Martín"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" />
              {errors.calle && <p className="text-red-700 text-xs font-medium mt-1">{errors.calle}</p>}
            </div>

            {/* Numero */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="numero">Número</label>
              <input id="numero" name="numero" value={form.numero} onChange={handleChange} placeholder="123"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" />
              {errors.numero && <p className="text-red-700 text-xs font-medium mt-1">{errors.numero}</p>}
            </div>

            {/* Piso y Departamento */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="piso">Piso</label>
                <input id="piso" name="piso" value={form.piso} onChange={handleChange} placeholder="5"
                  className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="departamento">Depto</label>
                <input id="departamento" name="departamento" value={form.departamento} onChange={handleChange} placeholder="A"
                  className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" />
              {errors.email && <p className="text-red-700 text-xs font-medium mt-1">{errors.email}</p>}
            </div>

            {/* Contraseña */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="password">Contraseña</label>
              <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" />
              {errors.password && <p className="text-red-700 text-xs font-medium mt-1">{errors.password}</p>}
            </div>

            {/* Error de API */}
            {apiError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                <p className="text-red-800 text-sm font-medium">{apiError}</p>
              </div>
            )}

            {/* Botón */}
            <button type="submit"
              className="w-full mt-2 px-6 py-3.5 bg-[#B8D4A5] border-2 border-[#3D3229] rounded-xl text-[#3D3229] text-lg sm:text-xl font-bold 
                       shadow-medium hover:shadow-elevated hover:bg-[#A8C495] active:scale-[0.98] transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-soft
                       focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/50"
              disabled={loading}
            >
              {loading ? '✓ Enviando...' : 'Regístrate'}
            </button>
          </form>

          {/* Link a login */}
          <div className="text-center pt-4 border-t border-[#3D3229]/10">
            <p className="text-[#3D3229]/70 text-sm">
              ¿Ya tienes cuenta? <button onClick={onGoLogin} className="text-[#6B4423] font-bold hover:text-[#3D3229] hover:underline underline-offset-2 transition-colors">Inicia Sesión</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
