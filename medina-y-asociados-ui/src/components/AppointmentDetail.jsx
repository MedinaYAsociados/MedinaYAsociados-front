import { MdOutlineArrowBack, MdHome, MdPerson } from 'react-icons/md';
import { formatAppointmentDate } from '../utils/date';

function AppointmentDetail({ appointment, onBack, onHome, onReschedule, onCancel }) {
  if (!appointment) {
    return null;
  }

  const statusLabels = {
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    completed: 'Completado',
    cancelled: 'Cancelado',
    rescheduled: 'Reprogramado'
  };

  const canReschedule = appointment.status !== 'completed' && appointment.status !== 'cancelled';
  const canCancel = appointment.status !== 'completed' && appointment.status !== 'cancelled';

  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 text-[#3D3229] mb-4">
          <button onClick={onBack} className="p-2 rounded-xl border-2 border-[#3D3229]/30 hover:bg-white/40 transition-colors" aria-label="Volver">
            <MdOutlineArrowBack className="w-9 h-9" />
          </button>
          <button onClick={onHome} className="p-2 rounded-xl border-2 border-[#3D3229]/30 hover:bg-white/40 transition-colors" aria-label="Inicio">
            <MdHome className="w-9 h-9" />
          </button>
          <h1 className="ml-2 text-2xl sm:text-3xl font-extrabold">Nº Turno: {appointment.number}</h1>
        </div>

        {/* Container principal */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-5 sm:p-8 space-y-5">
          
          {/* Abogado */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6 flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-[#3D3229] text-white">
              <MdPerson className="w-14 h-14" />
            </div>
            <h2 className="text-2xl font-bold text-black text-center">{appointment.lawyer}</h2>
          </div>

          {/* Especialidad */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white px-5 py-3 text-center">
              <h3 className="text-xl font-extrabold text-black">Especialidad</h3>
            </div>
            <div className="bg-gray-100 px-5 py-4 text-center">
              <p className="text-xl font-bold text-black">{appointment.specialty || 'CIVIL 🏠'}</p>
            </div>
          </div>

          {/* Fecha y Hora */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white px-5 py-3 text-center">
              <h3 className="text-xl font-extrabold text-black">Fecha y Hora</h3>
            </div>
            <div className="bg-gray-100 px-5 py-4 text-center">
              <p className="text-xl font-bold text-black">{formatAppointmentDate(appointment.date)}</p>
            </div>
          </div>

          {/* Observaciones */}
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

          {/* Botones de acción */}
          <div className="space-y-3 pt-4">
            {canReschedule && (
              <button
                onClick={onReschedule}
                className="w-full px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white font-extrabold 
                         rounded-2xl shadow-medium hover:shadow-elevated active:scale-[0.99] transition-all"
              >
                Reprogramar Turno
              </button>
            )}
            {canCancel && (
              <button
                onClick={onCancel}
                className="w-full px-8 py-4 bg-[#9F8A66] hover:bg-[#8F7A56] text-white font-extrabold 
                         rounded-2xl shadow-medium hover:shadow-elevated active:scale-[0.99] transition-all"
              >
                Cancelar Turno
              </button>
            )}
          </div>

          {/* Estado */}
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
