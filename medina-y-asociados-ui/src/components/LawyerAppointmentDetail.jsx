import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { formatAppointmentDate } from '../utils/date';
import { useAppointment } from '../context/AppointmentContext';
import { detalleAbogado, noAsistio, enCurso, finalizar, marcarPagado, cancelarTurno } from '../services/turnos';

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
  pendiente_cobro: 'pending-payment',
};

const statusLabels = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  completed: 'Completado',
  cancelled: 'Cancelado',
  rescheduled: 'Reprogramado',
  attended: 'Asistió',
  'no-show': 'No Asistió',
  paid: 'Pagado',
  'in-progress': 'En Curso',
  expired: 'Expiró Pago',
  'pending-payment': 'Pendiente de cobro',
};

function getStatusClass(status) {
  const classes = {
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
  return classes[status] || 'bg-white/70';
}

function LawyerAppointmentDetail() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { startReschedule } = useAppointment();

  const { data: appointment, isLoading: loading } = useQuery({
    queryKey: ['turno-detalle-abogado', id],
    queryFn: () => detalleAbogado(id),
    enabled: !!id,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 flex items-center justify-center">
        <p className="text-center text-[#53667B]">Cargando turno...</p>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto w-full">
          <p className="text-center text-[#53667B]">No se encontró el turno.</p>
        </div>
      </div>
    );
  }

  const apptId = appointment.idTurno || appointment.id;
  const statusKey = (appointment.nombreEstado || appointment.estado || appointment.status || 'pending').toLowerCase().replace(/\s+/g, '_');
  const localStatus = statusMap[statusKey] || statusKey;
  const dateStr = appointment.horarioTurno || appointment.fechaHora;
  const apptDate = dateStr ? new Date(dateStr) : new Date(NaN);
  const isValidDate = apptDate instanceof Date && !isNaN(apptDate);
  const appointmentDate = isValidDate ? formatAppointmentDate(apptDate) : '—';
  const appointmentTime = isValidDate ? `${String(apptDate.getHours()).padStart(2, '0')}.${String(apptDate.getMinutes()).padStart(2, '0')}hs` : '';
  const canMarkInProgress = localStatus === 'paid' || localStatus === 'rescheduled';
  const canMarkCompleted = localStatus === 'in-progress';
  const canMarkNoShow = canMarkCompleted;
  const canMarkPaid = localStatus === 'pending-payment';
  const canReschedule = canMarkInProgress;
  const canCancel = canReschedule;

  const handleAction = async (actionFn) => {
    try {
      await actionFn(apptId);
      queryClient.invalidateQueries({ queryKey: ['turno-detalle-abogado', id] });
      queryClient.invalidateQueries({ queryKey: ['turnos-abogado'] });
    } catch (err) {
      alert(err.message || 'Error al actualizar el turno');
    }
  };

  const handleReschedule = () => {
    startReschedule({
      id: apptId,
      specialty: { id: appointment.idEspecialidad, title: appointment.especialidad || appointment.nombreEspecialidad || '', description: '' },
      lawyer: appointment.nombreCliente || appointment.persona || '',
      specialtyId: appointment.idEspecialidad,
      lawyerId: appointment.idAbogado || appointment.idUsuario,
      abogadoId: appointment.idAbogado,
    });
    navigate('/appointments/new/datetime');
  };

  const handleCancel = async () => {
    if (!confirm('¿Está seguro que desea cancelar este turno?')) return;
    await handleAction(() => cancelarTurno(apptId));
  };

  const clienteName = `${appointment.nombreCliente || appointment.persona || ''} ${appointment.apellidoCliente || ''}`.trim() || '—';
  const clienteDni = appointment.dni || appointment.dniCliente || '—';

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
            Nº Turno: {apptId}
          </h1>
        </div>

        <div className="bg-white/60 rounded-3xl p-6 space-y-6 animate-slide-up">
          <div className="bg-gradient-to-b from-white/90 to-white/70 rounded-2xl shadow-medium overflow-hidden">
            <div className="bg-white/80 px-4 py-3 text-center border-b border-black/5">
              <h2 className="text-xl font-bold text-[#53667B]">Cliente</h2>
            </div>
            <div className="bg-black/5 p-6 space-y-2">
              <p className="text-[#53667B] text-lg text-center font-semibold">
                {clienteName}
              </p>
              <p className="text-[#53667B] text-lg text-center font-semibold">
                {clienteDni}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/90 to-white/70 rounded-2xl shadow-medium overflow-hidden">
            <div className="bg-white/80 px-4 py-3 text-center border-b border-black/5">
              <h2 className="text-xl font-bold text-[#53667B]">Fecha Hora</h2>
            </div>
            <div className="bg-black/5 p-6 space-y-2">
              <p className="text-[#53667B] text-lg text-center font-semibold">
                {appointmentDate}
              </p>
              <p className="text-[#53667B] text-lg text-center font-semibold">
                {appointmentTime}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-white/90 to-white/70 rounded-2xl shadow-medium overflow-hidden">
            <div className="bg-white/80 px-4 py-3 text-center border-b border-black/5">
              <h2 className="text-xl font-bold text-[#53667B]">Especialidad</h2>
            </div>
            <div className="bg-black/5 p-6">
              <p className="text-[#53667B] text-lg text-center font-semibold">
                {appointment.especialidad || appointment.nombreEspecialidad || '—'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3 animate-slide-up">
          {canMarkPaid && (
            <button
              onClick={() => handleAction(() => marcarPagado(apptId))}
              className="w-full px-6 py-3.5 bg-[#6C7F94]/10 hover:bg-[#6C7F94] border-2 border-[#C6A15B] text-[#53667B]
                       font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                       transition-all focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Marcar Pagado
            </button>
          )}
          {canMarkInProgress && (
            <button
              onClick={() => handleAction(() => enCurso(apptId))}
              className="w-full px-6 py-3.5 bg-[#A5C4D4]/80 hover:bg-[#95B4C4] border-2 border-[#C6A15B] text-white
                       font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                       transition-all focus:outline-none focus:ring-4 focus:ring-[#A5C4D4]/30"
            >
              En Curso
            </button>
          )}
          {canMarkCompleted && (
            <div className="flex gap-3">
              <button
                onClick={() => handleAction(() => finalizar(apptId))}
                className="flex-1 px-4 py-3.5 bg-[#8FBC8F]/80 hover:bg-[#7FA97F] border-2 border-[#C6A15B] text-white 
                         font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                         transition-all focus:outline-none focus:ring-4 focus:ring-[#8FBC8F]/30"
              >
                Finalizar
              </button>
              {canMarkNoShow && (
                <button
                  onClick={() => handleAction(() => noAsistio(apptId))}
                  className="flex-1 px-4 py-3.5 bg-[#D4A5A5]/80 hover:bg-[#C99595] border-2 border-[#C6A15B] text-white 
                           font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                           transition-all focus:outline-none focus:ring-4 focus:ring-[#D4A5A5]/30"
                >
                  No Asistió
                </button>
              )}
            </div>
          )}
          <button
            onClick={() => navigate(`/lawyer/appointments/${apptId}/history`)}
            className="w-full px-6 py-3.5 bg-[#6C7F94]/70 hover:bg-[#6C7F94]/90 border-2 border-[#C6A15B] text-white 
                     font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                     transition-all focus:outline-none focus:ring-4 focus:ring-[#6C7F94]/30"
          >
            Ver historial del Turno
          </button>
          <button
            onClick={() => navigate(`/lawyer/appointments/${apptId}/cobro`)}
            className="w-full px-6 py-3.5 bg-[#C6A15B]/70 hover:bg-[#C6A15B]/90 border-2 border-[#C6A15B] text-white 
                     font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                     transition-all focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
          >
            Ver cobro del Turno
          </button>
          {canReschedule && (
            <button
              onClick={handleReschedule}
              className="w-full px-6 py-3.5 bg-[#9C8B78]/70 hover:bg-[#9C8B78]/90 border-2 border-[#C6A15B] text-white 
                       font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                       transition-all focus:outline-none focus:ring-4 focus:ring-[#9C8B78]/30"
            >
              Reprogramar Turno
            </button>
          )}
          {canCancel && (
            <button
              onClick={handleCancel}
              className="w-full px-6 py-3.5 bg-[#8B6F47]/70 hover:bg-[#8B6F47]/90 border-2 border-[#C6A15B] text-white 
                       font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                       transition-all focus:outline-none focus:ring-4 focus:ring-[#8B6F47]/30"
            >
              Cancelar Turno
            </button>
          )}
        </div>

        <div className="mt-6 bg-white/40 backdrop-blur-sm rounded-2xl shadow-medium p-4 animate-slide-up">
          <div className="flex gap-3">
            <div className="flex-1 px-4 py-3 bg-white/60 border border-[#C6A15B]/30 text-[#53667B] 
                          font-semibold text-base rounded-xl text-center">
              Estado
            </div>
            <div className={`flex-1 px-4 py-3 border border-[#C6A15B]/30 text-[#53667B] 
                             font-semibold text-base rounded-xl text-center ${getStatusClass(localStatus)}`}>
              {statusLabels[localStatus] || 'Sin estado'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerAppointmentDetail;
