import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome, MdSearch } from 'react-icons/md';
import { useAppointment } from '../context/AppointmentContext';
import { getLocalidades } from '../services/localidades';
import { buscarPorDni } from '../services/usuarios';

function userToClientData(u) {
  return {
    firstName: u.nombre || '',
    lastName: u.apellido || '',
    dni: u.dni || '',
    phone: u.telefono || '',
    email: u.email || '',
    locality: u.direccion?.localidad || u.localidad?.idLocalidad || '',
    street: u.direccion?.calle || '',
    number: (u.direccion?.numeroCalle ?? '').toString(),
    floor: u.direccion?.piso || '',
    apartment: u.direccion?.dpto || u.direccion?.departamento || '',
  };
}

function LawyerNewAppointmentClient() {
  const navigate = useNavigate();
  const { setClientData } = useAppointment();
  const [localidades, setLocalidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    locality: '',
    street: '',
    number: '',
    floor: '',
    apartment: ''
  });
  const [mode, setMode] = useState('search');
  const [dni, setDni] = useState('');
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);

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

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!dni.trim()) {
      setResults([]);
      setMessage('Escriba un DNI para buscar clientes');
      return;
    }
    setSearchLoading(true);
    setMessage('');
    timerRef.current = setTimeout(async () => {
      try {
        const data = await buscarPorDni(dni.trim());
        const rawList = Array.isArray(data) ? data : (data.content || [data]);
        const normalized = rawList.filter(Boolean);
        setResults(normalized);
        if (normalized.length === 0) setMessage('No se encontraron clientes con ese DNI');
      } catch {
        setResults([]);
        setMessage('Error al buscar clientes');
      } finally {
        setSearchLoading(false);
      }
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dni]);

  const filteredLocalidades = localidades.filter(l =>
    l.nombreLocalidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);
    if (formData.locality) {
      setFormData(prev => ({ ...prev, locality: '' }));
    }
  };

  const handleSelectLocalidad = (loc) => {
    setSearchTerm(`${loc.nombreLocalidad} (${loc.codigoPostal})`);
    setFormData(prev => ({ ...prev, locality: loc.idLocalidad }));
    setShowDropdown(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.dni || !formData.phone) {
      alert('Por favor complete los campos obligatorios');
      return;
    }
    if (!formData.locality) {
      alert('Seleccione una localidad de la lista');
      return;
    }
    setClientData(formData);
    navigate('/appointments/new/specialty');
  };

  const handleSelectUser = (user) => {
    setClientData(userToClientData(user));
    navigate('/appointments/new/specialty');
  };

  if (mode === 'search') {
    return (
      <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
        <div className="max-w-6xl mx-auto w-full">
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
            <h1 className="text-xl sm:text-2xl font-bold text-[#53667B]">
              Nuevo turno
            </h1>
          </div>

          <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 animate-slide-up space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#53667B] mb-1">
              Buscar cliente
            </h2>
            <p className="text-[#53667B]/80 text-sm sm:text-base mb-4">
              Busque un cliente por DNI o cree uno nuevo
            </p>

            <div className="flex items-center gap-3 bg-white/90 rounded-2xl px-4 py-3 shadow-soft border-2 border-[#C6A15B]/20">
              <MdSearch className="w-6 h-6 text-[#53667B]" />
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="escriba aqui"
                autoFocus
                className="flex-1 bg-transparent text-[#53667B] text-lg placeholder:text-gray-400
                         focus:outline-none"
              />
              {searchLoading && (
                <span className="text-[#53667B] text-sm font-semibold">Buscando...</span>
              )}
            </div>

            {message && !searchLoading && (
              <p className="text-center text-[#53667B] text-base">{message}</p>
            )}

            {results.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {results.map(client => (
                  <button
                    key={client.idUsuario || client.id}
                    onClick={() => handleSelectUser(client)}
                    className="w-full rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden
                             hover:shadow-medium transition-shadow text-left"
                  >
                    <div className="p-4">
                      <p className="text-[#53667B] text-xl font-bold text-center">
                        {`${client.nombre || ''} ${client.apellido || ''}`.trim() || client.name || ''}
                      </p>
                      <p className="text-[#53667B] text-sm font-semibold text-center mt-1">
                        DNI: {client.dni}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {dni.trim() && !searchLoading && results.length === 0 && (
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, dni: dni.trim() }));
                    setMode('form');
                  }}
                  className="w-full px-6 py-3.5 bg-[#C6A15B]
                           border-2 border-[#C6A15B] rounded-xl
                           text-[#53667B] text-lg sm:text-xl font-bold
                           shadow-medium hover:shadow-elevated hover:bg-[#A8C495]
                           active:scale-[0.98] transition-all duration-200
                           focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
                >
                  Crear nuevo cliente
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="w-full px-6 py-3.5 bg-[#C6A15B] hover:bg-[#B08F3F]
                           border-2 border-[#C6A15B] rounded-xl
                           text-white text-lg sm:text-xl font-bold
                           shadow-medium hover:shadow-elevated
                           active:scale-[0.98] transition-all duration-200
                           focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
            onClick={() => navigate('/dashboard')}
            className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
            aria-label="Inicio"
          >
            <MdHome className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 animate-slide-up">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#53667B] mb-1">
              Datos Cliente
            </h2>
            <p className="text-[#53667B]/80 text-sm sm:text-base">
              Ingrese los datos del cliente para el turno
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">
                Nombre
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">
                Apellido
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">
                DNI
              </label>
              <input
                type="text"
                value={formData.dni}
                onChange={(e) => handleChange('dni', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">
                Telefono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
              />
            </div>

            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">
                Localidad
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowDropdown(true)}
                placeholder="Buscar localidad..."
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
              />
              {showDropdown && (
                <ul className="absolute z-10 w-full mt-1 bg-white border-2 border-[#C6A15B]/30 rounded-xl 
                               shadow-elevated max-h-48 overflow-y-auto">
                  {filteredLocalidades.length === 0 ? (
                    <li className="px-4 py-2 text-[#53667B]/60 text-sm">Sin resultados</li>
                  ) : (
                    filteredLocalidades.map(l => (
                      <li
                        key={l.idLocalidad}
                        onClick={() => handleSelectLocalidad(l)}
                        className="px-4 py-2 text-[#53667B] text-sm cursor-pointer hover:bg-[#C6A15B]/20 
                                   transition-colors"
                      >
                        {l.nombreLocalidad} ({l.codigoPostal})
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">
                Calle
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => handleChange('street', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[#53667B] text-sm sm:text-base font-semibold">
                Numero
              </label>
              <input
                type="text"
                value={formData.number}
                onChange={(e) => handleChange('number', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-[#53667B] text-sm sm:text-base font-semibold">
                  Piso
                </label>
                <input
                  type="text"
                  value={formData.floor}
                  onChange={(e) => handleChange('floor', e.target.value)}
                  placeholder="Escribe aquí"
                  className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                           text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                           transition-all shadow-soft hover:shadow-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[#53667B] text-sm sm:text-base font-semibold">
                  Departamento
                </label>
                <input
                  type="text"
                  value={formData.apartment}
                  onChange={(e) => handleChange('apartment', e.target.value)}
                  placeholder="Escribe aquí"
                  className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                           text-[#53667B] placeholder-[#9C8B78]/60 text-sm sm:text-base
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                           transition-all shadow-soft hover:shadow-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-[#C6A15B] 
                       border-2 border-[#C6A15B] rounded-xl
                       text-[#53667B] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                       active:scale-[0.98] transition-all duration-200 mt-6
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Seguir con turno
            </button>

            <button
              type="button"
              onClick={() => setMode('search')}
              className="w-full px-6 py-3.5 bg-[#C6A15B] hover:bg-[#B08F3F]
                       border-2 border-[#C6A15B] rounded-xl
                       text-white text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Volver a buscar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LawyerNewAppointmentClient;
