import { useState } from 'react';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function EditProfile({ user, onBack, onHome, onSave }) {
  const [form, setForm] = useState({
    nombre: user?.name?.split(' ')[0] || '',
    apellido: user?.name?.split(' ').slice(1).join(' ') || '',
    dni: user?.dni || '',
    telefono: user?.telefono || '',
    localidad: user?.localidad || '',
    calle: user?.calle || '',
    numero: user?.numero || '',
    piso: user?.piso || '',
    departamento: user?.departamento || '',
    email: user?.email || '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validateForm = () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = 'El nombre es requerido';
    if (!form.apellido.trim()) errs.apellido = 'El apellido es requerido';
    if (!form.dni.trim()) errs.dni = 'El DNI es requerido';
    if (!form.telefono.trim()) errs.telefono = 'El teléfono es requerido';
    if (!form.email.trim()) errs.email = 'El email es requerido';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Email inválido';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    const errs = validateForm();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    
    try {
      setLoading(true);
      // Simular guardado (en producción sería una llamada a la API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('¡Perfil actualizado exitosamente!');
      onSave?.(form);
    } catch (err) {
      setErrors({ general: err.message || 'Error al actualizar perfil' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-8 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Header con botones de navegación */}
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Volver"
          >
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button 
            onClick={onHome}
            className="p-2.5 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Inicio"
          >
            <MdHome className="w-5 h-5" />
          </button>
        </div>

        {/* Card Formulario */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 space-y-5 animate-slide-up">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3D3229]">Editar perfil</h2>
            <p className="text-[#3D3229]/80 text-sm sm:text-base">Regístrate para solicitar un turno</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="nombre">Nombre</label>
              <input 
                id="nombre" 
                name="nombre" 
                value={form.nombre} 
                onChange={handleChange} 
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" 
              />
              {errors.nombre && <p className="text-red-700 text-xs font-medium mt-1">{errors.nombre}</p>}
            </div>

            {/* Apellido */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="apellido">Apellido</label>
              <input 
                id="apellido" 
                name="apellido" 
                value={form.apellido} 
                onChange={handleChange} 
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" 
              />
              {errors.apellido && <p className="text-red-700 text-xs font-medium mt-1">{errors.apellido}</p>}
            </div>

            {/* DNI */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="dni">DNI</label>
              <input 
                id="dni" 
                name="dni" 
                value={form.dni} 
                onChange={handleChange} 
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" 
              />
              {errors.dni && <p className="text-red-700 text-xs font-medium mt-1">{errors.dni}</p>}
            </div>

            {/* Teléfono */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="telefono">Teléfono</label>
              <input 
                id="telefono" 
                name="telefono" 
                value={form.telefono} 
                onChange={handleChange} 
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" 
              />
              {errors.telefono && <p className="text-red-700 text-xs font-medium mt-1">{errors.telefono}</p>}
            </div>

            {/* Localidad */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="localidad">Localidad</label>
              <select 
                id="localidad" 
                name="localidad" 
                value={form.localidad} 
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
              >
                <option value="" disabled>Seleccionar</option>
                <option value="Capital">Capital</option>
                <option value="Godoy Cruz">Godoy Cruz</option>
                <option value="Guaymallén">Guaymallén</option>
                <option value="Luján">Luján</option>
                <option value="Las Heras">Las Heras</option>
                <option value="Maipú">Maipú</option>
              </select>
              {errors.localidad && <p className="text-red-700 text-xs font-medium mt-1">{errors.localidad}</p>}
            </div>

            {/* Calle */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="calle">Calle</label>
              <input 
                id="calle" 
                name="calle" 
                value={form.calle} 
                onChange={handleChange} 
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" 
              />
              {errors.calle && <p className="text-red-700 text-xs font-medium mt-1">{errors.calle}</p>}
            </div>

            {/* Numero */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="numero">Número</label>
              <input 
                id="numero" 
                name="numero" 
                value={form.numero} 
                onChange={handleChange} 
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" 
              />
              {errors.numero && <p className="text-red-700 text-xs font-medium mt-1">{errors.numero}</p>}
            </div>

            {/* Piso y Departamento */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="piso">Piso</label>
                <input 
                  id="piso" 
                  name="piso" 
                  value={form.piso} 
                  onChange={handleChange} 
                  placeholder="Escribe aquí"
                  className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="departamento">Departamento</label>
                <input 
                  id="departamento" 
                  name="departamento" 
                  value={form.departamento} 
                  onChange={handleChange} 
                  placeholder="Escribe aquí"
                  className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" 
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="email">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" 
              />
              {errors.email && <p className="text-red-700 text-xs font-medium mt-1">{errors.email}</p>}
            </div>

            {/* Contraseña */}
            <div className="space-y-1.5">
              <label className="block text-[#3D3229] text-sm font-semibold" htmlFor="password">Contraseña</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={form.password} 
                onChange={handleChange} 
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium" 
              />
              {errors.password && <p className="text-red-700 text-xs font-medium mt-1">{errors.password}</p>}
              <p className="text-[#3D3229]/60 text-xs">Deja en blanco si no deseas cambiar la contraseña</p>
            </div>

            {/* Mensaje de éxito */}
            {successMessage && (
              <div className="bg-[#B8D4A5]/20 border-l-4 border-[#B8D4A5] p-3 rounded-lg">
                <p className="text-[#3D3229] text-sm font-medium">{successMessage}</p>
              </div>
            )}

            {/* Error general */}
            {errors.general && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                <p className="text-red-800 text-sm font-medium">{errors.general}</p>
              </div>
            )}

            {/* Botón */}
            <button 
              type="submit"
              className="w-full mt-2 px-6 py-3.5 bg-[#B8D4A5] border-2 border-[#3D3229] rounded-xl text-[#3D3229] text-lg sm:text-xl font-bold 
                       shadow-medium hover:shadow-elevated hover:bg-[#A8C495] active:scale-[0.98] transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-soft
                       focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/50"
              disabled={loading}
            >
              {loading ? '✓ Guardando...' : 'Editar perfil'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
