import { useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { formatAppointmentDate } from '../utils/date';
import { listarTurnosAbogado } from '../services/turnos';

const getStatusColor = (status) => {
  const colors = {
    cancelled: 'bg-[#D4A5A5]/70',
    pending: 'bg-[#E8DCC4]/70',
    confirmed: 'bg-[#B8D4B8]/70',
    completed: 'bg-[#A5C4D4]/70',
    rescheduled: 'bg-[#6C7F94]/70',
    attended: 'bg-[#8FBC8F]/70',
    'no-show': 'bg-[#D4A5A5]/70',
    paid: 'bg-[#6C7F94]/70',
    'in-progress': 'bg-[#A5C4D4]/70',
    expired: 'bg-[#D4A5A5]/70',
  };
  return colors[status] || 'bg-white/70';
};

const getStatusLabel = (status) => {
  const labels = {
    cancelled: 'Cancelado',
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    completed: 'Completado',
    rescheduled: 'Reprog.',
    attended: 'Asistió',
    'no-show': 'No Asistió',
    paid: 'Pagado',
    'in-progress': 'En Curso',
    expired: 'Expiró Pago',
  };
  return labels[status] || status;
};

function HistoryAppointmentCard({ appt, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden hover:shadow-medium transition-shadow"
    >
      <div className="bg-white/60 px-4 py-3 border-b border-black/5 text-center font-extrabold text-[#53667B]">
        Nº Turno: {appt.number}
      </div>
      <div className="p-4">
        <div className="bg-black/5 rounded-xl p-4 shadow-soft space-y-2">
          <p className="text-[#53667B] text-lg font-semibold">Cliente: {appt.clientName}</p>
          <p className="text-[#53667B] text-lg font-semibold">Fecha Hora: {formatAppointmentDate(appt.date)}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[#53667B] text-base font-semibold">Estado:</span>
            <span className={`px-3 py-1 rounded-full text-[#53667B] text-sm font-semibold ${getStatusColor(appt.status)}`}>
              {getStatusLabel(appt.status)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

const statusMap = {
  pendiente: 'pending',
  confirmado: 'confirmed',
  completado: 'completed',
  finalizado: 'completed',
  cancelado: 'cancelled',
  reprogramado: 'rescheduled',
  asistio: 'attended',
  no_asistio: 'no-show',
  pagado: 'paid',
  en_curso: 'in-progress',
  expiro_pago: 'expired',
};

function LawyerHistory() {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [page, setPage] = useState(0);

  const { data: turnosPage, isLoading: loading } = useQuery({
    queryKey: ['historial', user?.idUsuario, page],
    queryFn: () => listarTurnosAbogado(user?.idUsuario, page),
    enabled: !!user?.idUsuario,
  });

  const historyAppointments = useMemo(() =>
    (turnosPage?.content || turnosPage || []).map(t => ({
      id: t.idTurno,
      number: t.idTurno,
      clientName: t.persona || `${t.nombreCliente || ''} ${t.apellidoCliente || ''}`.trim() || '—',
      date: t.fechaHora || t.horarioTurno,
      status: statusMap[(t.estado || t.nombreEstado || '').toLowerCase().replace(/\s+/g, '_')] || (t.estado || t.nombreEstado || '').toLowerCase() || 'pending',
    })),
    [turnosPage]
  );

  const totalPages = turnosPage?.totalPages || 1;

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
            ←
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
            aria-label="Inicio"
          >
            🏠
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#53667B] text-center mb-6 animate-slide-up">
          Historial turnos
        </h2>

        {/* List container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6 mb-6 animate-slide-up">
          {loading ? (
            <p className="text-center text-[#53667B]">Cargando historial...</p>
          ) : historyAppointments.length === 0 ? (
            <p className="text-center text-[#53667B]">No hay turnos en el historial.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {historyAppointments.map(appt => (
                <HistoryAppointmentCard 
                  key={appt.id} 
                  appt={appt} 
                  onClick={() => navigate(`/lawyer/appointments/${appt.id}`)}
                />
              ))}
            </div>
          )}
          {totalPages > 1 && !loading && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-5 py-2 rounded-xl bg-[#C6A15B] text-[#53667B] font-bold shadow-soft hover:shadow-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Anterior
              </button>
              <span className="text-[#53667B] font-semibold">Página {page + 1} de {totalPages}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= totalPages - 1}
                className="px-5 py-2 rounded-xl bg-[#C6A15B] text-[#53667B] font-bold shadow-soft hover:shadow-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>

        <div className="animate-slide-up">
          <button
            onClick={() => navigate('/lawyer/appointments/search')}
            className="w-full px-6 py-3.5 bg-[#C6A15B] 
                     border-2 border-[#C6A15B] rounded-xl
                     text-[#53667B] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
          >
            Buscar turnos
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerHistory;
