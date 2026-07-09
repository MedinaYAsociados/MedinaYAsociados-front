import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome, MdPerson } from 'react-icons/md';
import { formatAppointmentDate } from '../utils/date';

function AppointmentDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment;

  if (!appointment) {
    return null;
  }

  const statusLabels = {
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    completed: 'Completado',
    cancelled: 'Cancelado',
    rescheduled: 'Reprogramado',
    attended: 'Asistió',
    'no-show': 'No Asistió',
    paid: 'Pagado',
    'in-progress': 'En Curso'
  };

  const terminalStatuses = ['completed', 'cancelled', 'attended', 'no-show', 'paid', 'in-progress'];
  const canReschedule = !terminalStatuses.includes(appointment.status);
  const canCancel = !terminalStatuses.includes(appointment.status);

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 text-[#53667B] mb-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl border-2 border-[#C6A15B]/30 hover:bg-[#C6A15B]/20 transition-colors" aria-label="Volver">
            <MdOutlineArrowBack className="w-9 h-9" />
          </button>
          <button onClick={() => navigate('/dashboard')} className="p-2 rounded-xl border-2 border-[#C6A15B]/30 hover:bg-[#C6A15B]/20 transition-colors" aria-label="Inicio">
            <MdHome className="w-9 h-9" />
          </button>
          <h1 className="ml-2 text-2xl sm:text-3xl font-extrabold">N° Turno: {appointment.number}</h1>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-5 sm:p-8 space-y-5">

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6 flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-[#6C7F94] text-white">
              <MdPerson className="w-14 h-14" />
            </div>
            <h2 className="text-2xl font-bold text-black text-center">{appointment.lawyer}</h2>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white px-5 py-3 text-center">
              <h3 className="text-xl font-extrabold text-black">Especialidad</h3>
            </div>
            <div className="bg-gray-100 px-5 py-4 text-center">
              <p className="text-xl font-bold text-black">{appointment.specialty || 'CIVIL'}</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white px-5 py-3 text-center">
              <h3 className="text-xl font-extrabold text-black">Fecha y Hora</h3>
            </div>
            <div className="bg-gray-100 px-5 py-4 text-center">
              <p className="text-xl font-bold text-black">{formatAppointmentDate(appointment.date)}</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white px-5 py-3 text-center">
              <h3 className="text-xl font-extrabold text-black">Observaciones</h3>
            </div>
            <div className="bg-gray-100 px-5 py-6">
              <p className="text-base text-black text-center leading-relaxed">
                {appointment.observations || 'Sin observaciones'}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={() => navigate(`/appointments/${appointment.id}/history`, { state: { appointment } })}
              className="w-full px-8 py-4 bg-[#6C7F94] hover:bg-[#5A6D82] text-white font-extrabold
                       rounded-2xl shadow-medium hover:shadow-elevated active:scale-[0.99] transition-all"
            >
              Ver historial del Turno
            </button>
            {canReschedule && (
              <button
                onClick={() => navigate('/appointments/new/datetime', { state: { reschedule: appointment } })}
                className="w-full px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white font-extrabold
                         rounded-2xl shadow-medium hover:shadow-elevated active:scale-[0.99] transition-all"
              >
                Reprogramar Turno
              </button>
            )}
            {canCancel && (
              <button
                onClick={() => {
                  if (confirm('¿Está seguro que desea cancelar este turno?')) {
                    alert('Turno cancelado exitosamente');
                    navigate('/dashboard');
                  }
                }}
                className="w-full px-8 py-4 bg-[#C6A15B] hover:bg-[#B08F3F] text-white font-extrabold
                         rounded-2xl shadow-medium hover:shadow-elevated active:scale-[0.99] transition-all"
              >
                Cancelar Turno
              </button>
            )}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-4 flex items-center justify-between gap-3">
            <div className="flex-1 bg-gray-200 rounded-xl px-5 py-3 text-center">
              <p className="text-lg font-bold text-black">Estado</p>
            </div>
            <div className="flex-1 bg-[#B8928D] rounded-xl px-5 py-3 text-center">
              <p className="text-lg font-bold text-white">{statusLabels[appointment.status] || 'Pendiente'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetail;
