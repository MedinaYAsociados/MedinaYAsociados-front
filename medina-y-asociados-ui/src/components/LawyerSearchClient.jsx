import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

const allClients = [
  {
    id: 5,
    nombre: 'Catalina',
    apellido: 'Pereira',
    name: 'Catalina Pereira',
    telefono: '3534567890',
    phone: '3534567890',
    email: 'catalina@gmail.com',
    dni: '56789012',
    localidad: { nombreLocalidad: 'Luján', codigoPostal: '5500' },
    direccion: { calle: 'Belgrano', numeroCalle: 456, provincia: 'Córdoba', piso: '2', departamento: 'B' },
    piso: '2',
    departamento: 'B',
    registeredAt: new Date('2025-10-22'),
    turnosPorEstado: [
      { nombre: 'CONFIRMADO', cantidad: 1 },
      { nombre: 'COMPLETADO', cantidad: 3 }
    ]
  },
  {
    id: 4,
    nombre: 'Santiago',
    apellido: 'Gonzales',
    name: 'Santiago Gonzales',
    telefono: '3534456789',
    phone: '3534456789',
    email: 'santiago@gmail.com',
    dni: '45678901',
    localidad: { nombreLocalidad: 'Guaymallén', codigoPostal: '5519' },
    direccion: { calle: 'Mitre', numeroCalle: 789, provincia: 'Córdoba' },
    registeredAt: new Date('2025-10-20'),
    turnosPorEstado: [
      { nombre: 'COMPLETADO', cantidad: 2 },
      { nombre: 'CANCELADO', cantidad: 1 }
    ]
  },
  {
    id: 3,
    nombre: 'Juan',
    apellido: 'Perez',
    name: 'Juan Perez',
    telefono: '3534345678',
    phone: '3534345678',
    email: 'juan@gmail.com',
    dni: '34567890',
    localidad: { nombreLocalidad: 'CAPITAL', codigoPostal: '5000' },
    direccion: { calle: 'San Martín', numeroCalle: 321, provincia: 'Córdoba', piso: '1', departamento: 'A' },
    piso: '1',
    departamento: 'A',
    registeredAt: new Date('2025-10-18'),
    turnosPorEstado: [
      { nombre: 'CONFIRMADO', cantidad: 1 },
      { nombre: 'COMPLETADO', cantidad: 4 },
      { nombre: 'EXPIRO_PAGO', cantidad: 1 }
    ]
  },
  {
    id: 2,
    nombre: 'Manuel',
    apellido: 'Veronese',
    name: 'Manuel Veronese',
    telefono: '3534123123',
    phone: '3534123123',
    email: 'manuelveronese@gmail.com',
    dni: '23456789',
    localidad: { nombreLocalidad: 'VILLA MARIA', codigoPostal: '5900' },
    direccion: { calle: 'America', numeroCalle: 1256, provincia: 'Córdoba' },
    registeredAt: new Date('2025-10-15'),
    turnosPorEstado: [
      { nombre: 'COMPLETADO', cantidad: 6 },
      { nombre: 'PENDIENTE', cantidad: 2 }
    ]
  },
  {
    id: 1,
    nombre: 'Ramiro',
    apellido: 'Doglio',
    name: 'Ramiro Doglio',
    telefono: '3534234567',
    phone: '3534234567',
    email: 'ramiro@gmail.com',
    dni: '12345678',
    localidad: { nombreLocalidad: 'CAPITAL', codigoPostal: '5000' },
    direccion: { calle: 'Carlos Pelegrini', numeroCalle: 865, provincia: 'Córdoba', piso: '1', departamento: '1' },
    piso: '1',
    departamento: '1',
    registeredAt: new Date('2025-10-10'),
    turnosPorEstado: [
      { nombre: 'CONFIRMADO', cantidad: 2 },
      { nombre: 'COMPLETADO', cantidad: 5 },
      { nombre: 'CANCELADO', cantidad: 1 }
    ]
  }
];

function LawyerSearchClient() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    name: '',
    dni: '',
    localidad: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que al menos un campo esté lleno
    const hasAtLeastOneFilter = filters.name.trim() || filters.dni.trim() || filters.localidad.trim();
    
    if (!hasAtLeastOneFilter) {
      alert('Por favor, ingrese al menos un criterio de búsqueda');
      return;
    }
    
    const filtered = allClients.filter(client => {
      if (filters.name) {
        const fullName = `${client.nombre || ''} ${client.apellido || ''} ${client.name || ''}`.toLowerCase();
        if (!fullName.includes(filters.name.toLowerCase())) return false;
      }
      if (filters.dni && !client.dni.includes(filters.dni)) return false;
      if (filters.localidad) {
        const loc = (client.localidad?.nombreLocalidad || client.localidad || '').toLowerCase();
        if (!loc.includes(filters.localidad.toLowerCase())) return false;
      }
      return true;
    });
    navigate('/lawyer/clients/search/results', { state: { results: filtered } });
  };

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
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
            Buscar cliente
          </h1>
        </div>

        {/* Form container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[#53667B] text-base sm:text-lg font-bold">
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleChange}
                  placeholder="escriba aqui"
                  className="flex-1 px-4 py-2.5 bg-white/80 border-2 border-[#6B4423]/30 rounded-xl 
                           text-[#53667B] placeholder-[#9C8B78]/50 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 
                           transition-all shadow-soft hover:shadow-medium"
                />
              </label>
            </div>

            {/* DNI */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[#53667B] text-base sm:text-lg font-bold">
                DNI:
                <input
                  type="text"
                  name="dni"
                  value={filters.dni}
                  onChange={handleChange}
                  placeholder="escriba aqui"
                  className="flex-1 px-4 py-2.5 bg-white/80 border-2 border-[#6B4423]/30 rounded-xl 
                           text-[#53667B] placeholder-[#9C8B78]/50 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 
                           transition-all shadow-soft hover:shadow-medium"
                />
              </label>
            </div>

            {/* Localidad */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[#53667B] text-base sm:text-lg font-bold">
                Localidad:
                <input
                  type="text"
                  name="localidad"
                  value={filters.localidad}
                  onChange={handleChange}
                  placeholder="escriba aqui"
                  className="flex-1 px-4 py-2.5 bg-white/80 border-2 border-[#6B4423]/30 rounded-xl 
                           text-[#53667B] placeholder-[#9C8B78]/50 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 
                           transition-all shadow-soft hover:shadow-medium"
                />
              </label>
            </div>

            {/* Buscar button */}
            <button
              type="submit"
              className="w-full mt-6 px-6 py-3.5 bg-[#C6A15B] 
                       border-2 border-[#C6A15B] rounded-xl
                       text-[#53667B] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Buscar cliente
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LawyerSearchClient;
