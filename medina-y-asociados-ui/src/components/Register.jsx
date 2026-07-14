import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { register } from '../services/auth';
import { getLocalidades } from '../services/localidades';
import { validateRegisterForm as validateRegister } from '../utils/validation';

function Register() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', password: '',
    confirmPassword: '', telefono: '', dni: '',
    localidad: '', calle: '', numero: '', piso: '', departamento: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [localidades, setLocalidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    getLocalidades().then(setLocalidades).catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocalidades = localidades.filter(l =>
    `${l.nombreLocalidad} ${l.codigoPostal}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setForm(prev => ({ ...prev, localidad: '' }));
    setShowDropdown(true);
  };

  const handleSelectLocalidad = (loc) => {
    setSearchTerm(`${loc.nombreLocalidad} (${loc.codigoPostal})`);
    setForm(prev => ({ ...prev, localidad: loc.idLocalidad }));
    setShowDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validateRegister(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    try {
      setLoading(true);
      const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        dni: form.dni,
        email: form.email,
        password: form.password,
        telefono: form.telefono,
        idRol: 1,
        direccion: {
          calle: form.calle,
          numeroCalle: parseInt(form.numero) || 0,
          piso: form.piso,
          dpto: form.departamento,
          localidad: Number(form.localidad),
          provincia: 'Córdoba',
        },
      };
      await register(payload);
      navigate('/register-success');
    } catch (err) {
      setApiError(err.message || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 transition-all shadow-soft hover:shadow-medium";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECEFF3] px-4 sm:px-6 py-8 animate-fade-in">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
            aria-label="Volver"
          >
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
            aria-label="Inicio"
          >
            <MdHome className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 animate-slide-up">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#53667B] mb-1">
              Crear Cuenta
            </h2>
            <p className="text-[#53667B]/80 text-sm sm:text-base">
              Completa tus datos para registrarte
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Nombre</label>
              <input type="text" name="nombre" value={form.nombre} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} required />
              {errors.nombre && <p className="text-red-700 text-xs font-medium">{errors.nombre}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Apellido</label>
              <input type="text" name="apellido" value={form.apellido} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} required />
              {errors.apellido && <p className="text-red-700 text-xs font-medium">{errors.apellido}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">DNI</label>
              <input type="text" name="dni" value={form.dni} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} required />
              {errors.dni && <p className="text-red-700 text-xs font-medium">{errors.dni}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Teléfono</label>
              <input type="tel" name="telefono" value={form.telefono} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} required />
              {errors.telefono && <p className="text-red-700 text-xs font-medium">{errors.telefono}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} required />
              {errors.email && <p className="text-red-700 text-xs font-medium">{errors.email}</p>}
            </div>

            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Localidad</label>
              <input type="text" value={searchTerm} onChange={handleSearchChange}
                onFocus={() => setShowDropdown(true)} placeholder="Buscar localidad..."
                className={inputClass} required />
              {errors.localidad && <p className="text-red-700 text-xs font-medium">{errors.localidad}</p>}
              {showDropdown && (
                <ul className="absolute z-10 w-full mt-1 bg-white border-2 border-[#C6A15B]/30 rounded-xl shadow-elevated max-h-48 overflow-y-auto" style={{ width: dropdownRef.current?.offsetWidth }}>
                  {filteredLocalidades.length === 0 ? (
                    <li className="px-4 py-2 text-[#53667B]/60 text-sm">Sin resultados</li>
                  ) : (
                    filteredLocalidades.map(l => (
                      <li key={l.idLocalidad} onClick={() => handleSelectLocalidad(l)}
                        className="px-4 py-2 text-[#53667B] text-sm cursor-pointer hover:bg-[#C6A15B]/20 transition-colors">
                        {l.nombreLocalidad} ({l.codigoPostal})
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Calle</label>
              <input type="text" name="calle" value={form.calle} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} required />
              {errors.calle && <p className="text-red-700 text-xs font-medium">{errors.calle}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Número</label>
              <input type="text" name="numero" value={form.numero} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} required />
              {errors.numero && <p className="text-red-700 text-xs font-medium">{errors.numero}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Piso</label>
              <input type="text" name="piso" value={form.piso} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Departamento</label>
              <input type="text" name="departamento" value={form.departamento} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} />
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Contraseña</label>
              <input type="password" name="password" value={form.password} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} required />
              {errors.password && <p className="text-red-700 text-xs font-medium">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">Confirmar Contraseña</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                placeholder="Escribe aquí" className={inputClass} required />
              {errors.confirmPassword && <p className="text-red-700 text-xs font-medium">{errors.confirmPassword}</p>}
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
