import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function ClientCard({ client, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden hover:shadow-medium transition-shadow"
    >
      <div className="p-4">
        <p className="text-[#53667B] text-xl font-bold text-center">{client.name}</p>
      </div>
    </button>
  );
}

function LawyerClients() {
  const navigate = useNavigate();
  // Mock de clientes del abogado - ordenados por fecha de registro (más recientes primero)
  const clients = [
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
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#53667B] text-center mb-6 animate-slide-up">
          Clientes
        </h2>

        {/* List container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6 mb-6 animate-slide-up">
          {clients.length === 0 ? (
            <p className="text-center text-[#53667B]">No hay clientes disponibles.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map(client => (
                <ClientCard 
                  key={client.id} 
                  client={client} 
                  onClick={() => navigate(`/lawyer/clients/${client.id}`, { state: { client } })}
                />
              ))}
            </div>
          )}
        </div>

        {/* Buscar cliente button */}
        <div className="animate-slide-up">
          <button
            onClick={() => navigate('/lawyer/clients/search')}
            className="w-full px-6 py-3.5 bg-[#C6A15B] 
                     border-2 border-[#C6A15B] rounded-xl
                     text-[#53667B] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
          >
            Buscar cliente
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerClients;
