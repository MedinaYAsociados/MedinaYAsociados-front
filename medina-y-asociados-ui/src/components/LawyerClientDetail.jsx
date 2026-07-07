import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome, MdCheckCircle, MdCancel, MdSchedule, MdMoneyOff } from 'react-icons/md';

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

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden">
      <div className="bg-white/60 px-4 py-3 text-center border-b border-black/5">
        <h3 className="text-lg font-bold text-[#53667B]">{label}</h3>
      </div>
      <div className="bg-black/5 p-4">
        <p className="text-[#53667B] text-lg font-semibold text-center">
          {value || '-'}
        </p>
      </div>
    </div>
  );
}

function LawyerClientDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const client = location.state?.client;
  if (!client) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto w-full">
          <p className="text-center text-[#53667B]">No se encontró el cliente.</p>
        </div>
      </div>
    );
  }

  const nombreCompleto = client.nombre && client.apellido
    ? `${client.nombre} ${client.apellido}`
    : client.name || '-';

  const direccionStr = [
    client.direccion?.calle || client.calle,
    client.direccion?.numeroCalle ?? client.numero,
  ].filter(Boolean).join(' ');

  const localidadStr = client.localidad?.nombreLocalidad || client.localidad || '-';
  const provinciaStr = client.direccion?.provincia || '-';
  const pisoStr = client.piso || client.direccion?.piso;
  const deptoStr = client.departamento || client.direccion?.departamento;

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
            Cliente
          </h1>
        </div>

        {/* Datos personales */}
        <div className="bg-white/60 rounded-3xl p-6 space-y-4 animate-slide-up">
          <InfoCard label="Nombre y apellido" value={nombreCompleto} />
          <InfoCard label="Teléfono" value={client.telefono || client.phone} />
          <InfoCard label="Email" value={client.email} />
          <InfoCard label="DNI" value={client.dni} />

          {direccionStr && (
            <InfoCard label="Dirección" value={`${direccionStr}${pisoStr ? ` - Piso ${pisoStr}` : ''}${deptoStr ? ` - Depto ${deptoStr}` : ''}`} />
          )}
          <InfoCard label="Localidad" value={localidadStr} />
          <InfoCard label="Provincia" value={provinciaStr} />
        </div>

        {/* Estadísticas */}
        {client.turnosPorEstado && client.turnosPorEstado.length > 0 && (
          <div className="mt-6 bg-white/60 rounded-3xl p-5 sm:p-6 animate-slide-up space-y-3">
            <h3 className="text-lg font-bold text-[#53667B] text-center">Estadísticas de turnos</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {client.turnosPorEstado.map((stat) => (
                <StatCard key={stat.nombre} nombre={stat.nombre} cantidad={stat.cantidad} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LawyerClientDetail;
