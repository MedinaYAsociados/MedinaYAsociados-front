import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { formatAppointmentDate } from '../utils/date';
import { useAppointment } from '../context/AppointmentContext';

function LawyerAppointmentDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const appointment = location.state?.appointment;
  const { startReschedule } = useAppointment();
  const [localStatus, setLocalStatus] = useState(appointment?.status);

  if (!appointment) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto w-full">
          <p className="text-center text-[#53667B]">No se encontró el turno.</p>
        </div>
      </div>
    );
  }

  const clientData = {
    name: 'Ramiro Doglio',
    dni: '12.345.678',
    address: 'Carlos Pelegrini 865 -',
    addressDetail: 'Depto 1 - Piso 1',
    phone: '3534123123'
  };

  const apptDate = new Date(appointment.date);
  const appointmentDate = formatAppointmentDate(appointment.date);
  const appointmentTime = `${String(apptDate.getHours()).padStart(2, '0')}.${String(apptDate.getMinutes()).padStart(2, '0')}hs`;
  const isPastAppointment = apptDate < new Date();
  const canMarkAttendance = isPastAppointment && (localStatus === 'confirmed' || localStatus === 'pending');
  const canMarkPaid = localStatus === 'confirmed' || localStatus === 'attended';
  const canMarkInProgress = localStatus === 'paid';
  const canMarkCompleted = localStatus === 'in-progress';

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
            Nº Turno: {appointment.number}
          </h1>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white/60 rounded-3xl p-6 space-y-6 animate-slide-up">
          {/* Card de Cliente */}
          <div className="bg-gradient-to-b from-white/90 to-white/70 rounded-2xl shadow-medium overflow-hidden">
            <div className="bg-white/80 px-4 py-3 text-center border-b border-black/5">
              <h2 className="text-xl font-bold text-[#53667B]">Cliente</h2>
            </div>
            <div className="bg-black/5 p-6 space-y-2">
              <p className="text-[#53667B] text-lg text-center font-semibold">
                {clientData.name}
              </p>
              <p className="text-[#53667B] text-lg text-center font-semibold">
                {clientData.dni}
              </p>
              <p className="text-[#53667B] text-lg text-center font-semibold">
                {clientData.address}
              </p>
              <p className="text-[#53667B] text-lg text-center font-semibold">
                {clientData.addressDetail}
              </p>
              <p className="text-[#53667B] text-lg text-center font-semibold">
                {clientData.phone}
              </p>
            </div>
          </div>

          {/* Card de Fecha Hora */}
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
        </div>

        {/* Botones de acción */}
        <div className="mt-6 space-y-3 animate-slide-up">
          {/* Asistencia */}
          {canMarkAttendance && (
            <div className="flex gap-3">
              <button
                onClick={() => setLocalStatus('attended')}
                className="flex-1 px-4 py-3.5 bg-[#8FBC8F]/80 hover:bg-[#7FA97F] border-2 border-[#C6A15B] text-white 
                         font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                         transition-all focus:outline-none focus:ring-4 focus:ring-[#8FBC8F]/30"
              >
                ✓ Asistió
              </button>
              <button
                onClick={() => setLocalStatus('no-show')}
                className="flex-1 px-4 py-3.5 bg-[#D4A5A5]/80 hover:bg-[#C99595] border-2 border-[#C6A15B] text-white 
                         font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                         transition-all focus:outline-none focus:ring-4 focus:ring-[#D4A5A5]/30"
              >
                ✗ No Asistió
              </button>
            </div>
          )}
          {canMarkPaid && (
            <button
              onClick={() => setLocalStatus('paid')}
              className="w-full px-6 py-3.5 bg-[#6C7F94]/10 hover:bg-[#6C7F94] border-2 border-[#C6A15B] text-[#53667B]
                       font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                       transition-all focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Marcar Pagado
            </button>
          )}
          {canMarkInProgress && (
            <button
              onClick={() => setLocalStatus('in-progress')}
              className="w-full px-6 py-3.5 bg-[#A5C4D4]/80 hover:bg-[#95B4C4] border-2 border-[#C6A15B] text-white
                       font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                       transition-all focus:outline-none focus:ring-4 focus:ring-[#A5C4D4]/30"
            >
              En Curso
            </button>
          )}
          {canMarkCompleted && (
            <button
              onClick={() => setLocalStatus('completed')}
              className="w-full px-6 py-3.5 bg-[#8FBC8F]/80 hover:bg-[#7FA97F] border-2 border-[#C6A15B] text-white
                       font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                       transition-all focus:outline-none focus:ring-4 focus:ring-[#8FBC8F]/30"
            >
              Finalizar
            </button>
          )}
          <button
            onClick={() => { startReschedule(appointment); navigate('/lawyer/appointments/new/client'); }}
            className="w-full px-6 py-3.5 bg-[#9C8B78]/70 hover:bg-[#9C8B78]/90 border-2 border-[#C6A15B] text-white 
                     font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                     transition-all focus:outline-none focus:ring-4 focus:ring-[#9C8B78]/30"
          >
            Reprogramar Turno
          </button>
          <button
            onClick={() => setLocalStatus('cancelled')}
            className="w-full px-6 py-3.5 bg-[#8B6F47]/70 hover:bg-[#8B6F47]/90 border-2 border-[#C6A15B] text-white 
                     font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                     transition-all focus:outline-none focus:ring-4 focus:ring-[#8B6F47]/30"
          >
            Cancelar Turno
          </button>
          <button
            onClick={() => setLocalStatus('confirmed')}
            className="w-full px-6 py-3.5 bg-[#8FBC8F]/70 hover:bg-[#7FA97F]/90 border-2 border-[#C6A15B] text-white 
                     font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                     transition-all focus:outline-none focus:ring-4 focus:ring-[#8FBC8F]/30"
          >
            Confirmar turno
          </button>
        </div>

        {/* Card de Estado */}
        <div className="mt-6 bg-white/40 backdrop-blur-sm rounded-2xl shadow-medium p-4 animate-slide-up">
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-3 bg-white/60 border border-[#C6A15B]/30 text-[#53667B] 
                             font-semibold text-base rounded-xl transition-colors hover:bg-[#6C7F94]/80">
              Estado
            </button>
            <div className={`flex-1 px-4 py-3 border border-[#C6A15B]/30 text-[#53667B] 
                             font-semibold text-base rounded-xl ${
                               localStatus === 'cancelled' ? 'bg-[#D4A5A5]/70' :
                               localStatus === 'pending' ? 'bg-[#E8DCC4]/70' :
                               localStatus === 'confirmed' ? 'bg-[#B8D4B8]/70' :
                               localStatus === 'completed' ? 'bg-[#A5C4D4]/70' :
                               localStatus === 'rescheduled' ? 'bg-[#6C7F94]/70' :
                                localStatus === 'attended' ? 'bg-[#8FBC8F]/70' :
                                localStatus === 'no-show' ? 'bg-[#D4A5A5]/70' :
                                localStatus === 'paid' ? 'bg-[#6C7F94]/70' :
                                localStatus === 'in-progress' ? 'bg-[#A5C4D4]/70' :
                                'bg-white/70'
                              }`}>
              {localStatus === 'cancelled' ? 'Cancelado' :
               localStatus === 'pending' ? 'Pendiente' :
               localStatus === 'confirmed' ? 'Confirmado' :
               localStatus === 'completed' ? 'Completado' :
               localStatus === 'rescheduled' ? 'Reprog.' :
               localStatus === 'attended' ? 'Asistió' :
               localStatus === 'no-show' ? 'No Asistió' :
               localStatus === 'paid' ? 'Pagado' :
               localStatus === 'in-progress' ? 'En Curso' :
               'Sin estado'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerAppointmentDetail;
