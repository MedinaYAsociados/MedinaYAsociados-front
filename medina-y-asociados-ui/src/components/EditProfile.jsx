import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome, MdCheckCircle, MdCancel, MdSchedule, MdMoneyOff } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const statusIcons = {
  CONFIRMADO: MdCheckCircle,
  COMPLETADO: MdCheckCircle,
  CANCELADO: MdCancel,
  PENDIENTE: MdSchedule,
  EXPIRO_PAGO: MdMoneyOff,
};

const statusColors = {
  CONFIRMADO: 'text-green-700 bg-green-100',
  COMPLETADO: 'text-blue-700 bg-blue-100',
  CANCELADO: 'text-red-700 bg-red-100',
  PENDIENTE: 'text-yellow-700 bg-yellow-100',
  EXPIRO_PAGO: 'text-orange-700 bg-orange-100',
};

function StatCard({ nombre, cantidad }) {
  const Icon = statusIcons[nombre] || MdSchedule;
  const color = statusColors[nombre] || 'text-gray-700 bg-gray-100';
  return (
    <div className="bg-white/90 rounded-xl shadow-soft p-3 flex items-center gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#53667B] text-sm font-semibold truncate">
          {nombre === 'EXPIRO_PAGO' ? 'Pagos vencidos' :
           nombre === 'CONFIRMADO' ? 'Confirmados' :
           nombre === 'COMPLETADO' ? 'Completados' :
           nombre === 'CANCELADO' ? 'Cancelados' :
           nombre === 'PENDIENTE' ? 'Pendientes' : nombre}
        </p>
        <p className="text-[#53667B] text-2xl font-bold">{cantidad}</p>
      </div>
    </div>
  );
}

function EditProfile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const formInitial = {
    nombre: user?.nombre || user?.name?.split(' ')[0] || '',
    apellido: user?.apellido || user?.name?.split(' ').slice(1).join(' ') || '',
    dni: user?.dni || '',
    telefono: user?.telefono || '',
    localidad: user?.localidad?.nombreLocalidad || user?.localidad || '',
    calle: user?.direccion?.calle || user?.calle || '',
    numero: user?.direccion?.numeroCalle?.toString() || user?.numero || '',
    piso: user?.piso || '',
    departamento: user?.departamento || '',
    email: user?.email || '',
    password: '',
  };
  const [form, setForm] = useState(formInitial);
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('¡Perfil actualizado exitosamente!');
      updateUser(form);
    } catch (err) {
      setErrors({ general: err.message || 'Error al actualizar perfil' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-[#ECEFF3] px-4 sm:px-6 py-8 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
            aria-label="Volver"
          >
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
            aria-label="Inicio"
          >
            <MdHome className="w-5 h-5" />
          </button>
        </div>

        {user?.turnosPorEstado && user.turnosPorEstado.length > 0 && (
          <div className="bg-white/70 rounded-3xl p-5 sm:p-6 animate-slide-up space-y-3" style={{ animationDelay: '50ms' }}>
            <h3 className="text-lg font-bold text-[#53667B] text-center">Estadísticas de turnos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {user.turnosPorEstado.map((stat) => (
                <StatCard key={stat.nombre} nombre={stat.nombre} cantidad={stat.cantidad} />
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 space-y-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#53667B]">Editar perfil</h2>
            <p className="text-[#53667B]/80 text-sm sm:text-base">Actualiza tus datos personales</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[#53667B] text-sm font-semibold" htmlFor="nombre">Nombre</label>
              <input
                id="nombre" name="nombre" value={form.nombre} onChange={handleChange}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
              />
              {errors.nombre && <p className="text-red-700 text-xs font-medium mt-1">{errors.nombre}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#53667B] text-sm font-semibold" htmlFor="apellido">Apellido</label>
              <input
                id="apellido" name="apellido" value={form.apellido} onChange={handleChange}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
              />
              {errors.apellido && <p className="text-red-700 text-xs font-medium mt-1">{errors.apellido}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#53667B] text-sm font-semibold" htmlFor="dni">DNI</label>
              <input
                id="dni" name="dni" value={form.dni} onChange={handleChange}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
              />
              {errors.dni && <p className="text-red-700 text-xs font-medium mt-1">{errors.dni}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#53667B] text-sm font-semibold" htmlFor="telefono">Teléfono</label>
              <input
                id="telefono" name="telefono" value={form.telefono} onChange={handleChange}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
              />
              {errors.telefono && <p className="text-red-700 text-xs font-medium mt-1">{errors.telefono}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#53667B] text-sm font-semibold" htmlFor="localidad">Localidad</label>
              <select
                id="localidad" name="localidad" value={form.localidad} onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] text-sm
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

            <div className="space-y-1.5">
              <label className="block text-[#53667B] text-sm font-semibold" htmlFor="calle">Calle</label>
              <input
                id="calle" name="calle" value={form.calle} onChange={handleChange}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
              />
              {errors.calle && <p className="text-red-700 text-xs font-medium mt-1">{errors.calle}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#53667B] text-sm font-semibold" htmlFor="numero">Número</label>
              <input
                id="numero" name="numero" value={form.numero} onChange={handleChange}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
              />
              {errors.numero && <p className="text-red-700 text-xs font-medium mt-1">{errors.numero}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-[#53667B] text-sm font-semibold" htmlFor="piso">Piso</label>
                <input
                  id="piso" name="piso" value={form.piso} onChange={handleChange}
                  placeholder="Escribe aquí"
                  className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[#53667B] text-sm font-semibold" htmlFor="departamento">Departamento</label>
                <input
                  id="departamento" name="departamento" value={form.departamento} onChange={handleChange}
                  placeholder="Escribe aquí"
                  className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#53667B] text-sm font-semibold" htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email" value={form.email} onChange={handleChange}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
              />
              {errors.email && <p className="text-red-700 text-xs font-medium mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-[#53667B] text-sm font-semibold" htmlFor="password">Contraseña</label>
              <input
                id="password" name="password" type="password" value={form.password} onChange={handleChange}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium"
              />
              {errors.password && <p className="text-red-700 text-xs font-medium mt-1">{errors.password}</p>}
              <p className="text-[#53667B]/60 text-xs">Deja en blanco si no deseas cambiar la contraseña</p>
            </div>

            {successMessage && (
              <div className="bg-[#C6A15B]/20 border-l-4 border-[#C6A15B] p-3 rounded-lg">
                <p className="text-[#53667B] text-sm font-medium">{successMessage}</p>
              </div>
            )}

            {errors.general && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-lg">
                <p className="text-red-800 text-sm font-medium">{errors.general}</p>
              </div>
            )}

            <button type="submit"
              className="w-full mt-2 px-6 py-3.5 bg-[#C6A15B] border-2 border-[#C6A15B] rounded-xl text-[#53667B] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated hover:bg-[#A8C495] active:scale-[0.98] transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-soft
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/50"
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
