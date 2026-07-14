import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome, MdCheckCircle, MdCancel, MdSchedule, MdMoneyOff, MdPlayCircle, MdAttachMoney } from 'react-icons/md';
import { detalleUsuario } from '../services/usuarios';

const statusLabels = {
  CONFIRMADO: 'Confirmados',
  COMPLETADO: 'Completados',
  CANCELADO: 'Cancelados',
  PENDIENTE: 'Pendientes',
  EXPIRO_PAGO: 'Pagos vencidos',
  PAGADO: 'Pagados',
  EN_CURSO: 'En curso',
  CANCELADO_CON_REEMBOLSO: 'Cancelado con reembolso',
  CANCELADO_SIN_REEMBOLSO: 'Cancelado sin reembolso',
  PENDIENTE_COBRO: 'Pendiente de cobro',
};

const statusIcons = {
  CONFIRMADO: MdCheckCircle,
  COMPLETADO: MdCheckCircle,
  CANCELADO: MdCancel,
  PENDIENTE: MdSchedule,
  EXPIRO_PAGO: MdMoneyOff,
  PAGADO: MdCheckCircle,
  EN_CURSO: MdPlayCircle,
  CANCELADO_CON_REEMBOLSO: MdCancel,
  CANCELADO_SIN_REEMBOLSO: MdCancel,
  PENDIENTE_COBRO: MdAttachMoney,
};

const statusColors = {
  CONFIRMADO: 'text-green-700 bg-green-100',
  COMPLETADO: 'text-blue-700 bg-blue-100',
  CANCELADO: 'text-red-700 bg-red-100',
  PENDIENTE: 'text-yellow-700 bg-yellow-100',
  EXPIRO_PAGO: 'text-orange-700 bg-orange-100',
  PAGADO: 'text-green-700 bg-green-100',
  EN_CURSO: 'text-blue-700 bg-blue-100',
  CANCELADO_CON_REEMBOLSO: 'text-red-700 bg-red-100',
  CANCELADO_SIN_REEMBOLSO: 'text-red-700 bg-red-100',
  PENDIENTE_COBRO: 'text-orange-700 bg-orange-100',
};

function StatCard({ nombre, cantidad }) {
  const label = statusLabels[nombre] || nombre;
  const Icon = statusIcons[nombre] || MdSchedule;
  const color = statusColors[nombre] || 'text-gray-700 bg-gray-100';
  return (
    <div className="bg-white/90 rounded-xl shadow-soft p-3 flex items-center gap-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#53667B] text-sm font-semibold truncate">{label}</p>
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

function AdminUserFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    detalleUsuario(user.id)
      .then((res) => { if (!cancelled) setData(res); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [user?.id]);

  const fullData = data && {
    ...data,
    id: data.idUsuario || data.id || user?.id,
  };

  const nombreCompleto = data?.nombre && data?.apellido
    ? `${data.nombre} ${data.apellido}`
    : user?.name || '-';

  const direccionStr = [
    data?.direccion?.calle || data?.calle,
    data?.direccion?.numeroCalle ?? data?.numero,
  ].filter(Boolean).join(' ');

  const localidadStr = data?.localidad
    ? `${data.localidad.nombreLocalidad} (${data.localidad.codigoPostal})`
    : data?.localidad || user?.localidad || '-';

  const provinciaStr = data?.direccion?.provincia || '-';
  const pisoStr = data?.piso || data?.direccion?.piso;
  const deptoStr = data?.departamento || data?.direccion?.dpto || data?.direccion?.departamento;

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-start justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#53667B] mt-2">
            Usuario
          </h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
              aria-label="Volver"
            >
              <MdOutlineArrowBack className="w-6 h-6" />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-3 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
              aria-label="Inicio"
            >
              <MdHome className="w-6 h-6" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white/70 rounded-3xl p-6 sm:p-8 shadow-soft animate-slide-up">
            <p className="text-center text-[#53667B] text-lg font-semibold">Cargando datos del usuario...</p>
          </div>
        ) : (
          <>
            <div className="bg-white/70 rounded-3xl p-6 sm:p-8 animate-slide-up space-y-4" style={{ animationDelay: '100ms' }}>
              <InfoCard label="Nombre y apellido" value={nombreCompleto} />
              <InfoCard label="Teléfono" value={data?.telefono || user?.phone} />
              <InfoCard label="Email" value={data?.email} />
              <InfoCard label="DNI" value={data?.dni} />

              {direccionStr && (
                <InfoCard label="Dirección" value={`${direccionStr}${pisoStr ? ` - Piso ${pisoStr}` : ''}${deptoStr ? ` - Depto ${deptoStr}` : ''}`} />
              )}
              <InfoCard label="Localidad" value={localidadStr} />
              <InfoCard label="Provincia" value={provinciaStr} />
            </div>

            {data?.turnosPorEstado && data.turnosPorEstado.length > 0 && (
              <div className="mt-6 bg-white/70 rounded-3xl p-5 sm:p-6 animate-slide-up space-y-3">
                <h3 className="text-lg font-bold text-[#53667B] text-center">Estadísticas de turnos</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {data.turnosPorEstado.map((stat) => (
                    <StatCard key={stat.nombre} nombre={stat.nombre} cantidad={stat.cantidad} />
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 pt-4 max-w-6xl mx-auto w-full">
              <button
                onClick={() => navigate('/admin/lawyers/create/form', { state: { user: fullData || user } })}
                className="w-full px-6 py-4 bg-[#C6A15B] hover:bg-[#A8C495]
                         border-2 border-[#C6A15B] rounded-2xl
                         text-[#53667B] text-lg sm:text-xl font-bold
                         shadow-medium hover:shadow-elevated
                         active:scale-[0.98] transition-all duration-200
                         focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
              >
                Confirmar usuario
              </button>

              <button
                onClick={() => navigate('/admin/lawyers/create')}
                className="w-full px-6 py-4 bg-[#C6A15B] hover:bg-[#B08F3F]
                         border-2 border-[#C6A15B] rounded-2xl
                         text-white text-lg sm:text-xl font-bold
                         shadow-medium hover:shadow-elevated
                         active:scale-[0.98] transition-all duration-200
                         focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
              >
                Buscar de nuevo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminUserFound;
