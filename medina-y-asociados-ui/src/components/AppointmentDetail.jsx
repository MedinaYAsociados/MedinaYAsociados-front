import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome, MdPerson } from 'react-icons/md';
import { formatAppointmentDate } from '../utils/date';
import { useAppointment } from '../context/AppointmentContext';
import { detalleCliente, pagarTurno, cancelarTurno } from '../services/turnos';

function AppointmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { startReschedule } = useAppointment();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await detalleCliente(id);
        setAppointment(data);
      } catch {
        setAppointment(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 flex items-center justify-center">
        <p className="text-[#53667B] text-lg">Cargando turno...</p>
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

  const statusLabels = {
    reservado: 'Reservado',
    pagado: 'Pagado',
    reprogramado: 'Reprogramado',
    cancelado: 'Cancelado',
    cancelado_sin_reembolso: 'Cancelado sin reembolso',
    cancelado_con_reembolso: 'Cancelado con reembolso',
    en_curso: 'En Curso',
    finalizado: 'Finalizado',
    no_asistio: 'No Asistió',
    expiro_pago: 'Expiró Pago',
    pendiente_cobro: 'Pendiente de cobro',
  };

  const statusKey = (appointment.estado || appointment.status || 'reservado').toLowerCase().replace(/\s+/g, '_');
  const canPay = statusKey === 'reservado';
  const canReschedule = statusKey === 'pagado' || statusKey === 'reprogramado';
  const canCancel = canReschedule;

  const handlePay = async () => {
    try {
      const result = await pagarTurno(appointment.idTurno || appointment.id);
      if (typeof result === 'string' && result.startsWith('http')) {
        window.location.href = result;
      } else {
        alert('Error al generar el pago');
      }
    } catch (err) {
      alert(err.message || 'Error al procesar el pago');
    }
  };

  const handleReschedule = () => {
    startReschedule({
      id: appointment.idTurno || appointment.id,
      specialty: { id: appointment.idEspecialidad, title: appointment.nombreEspecialidad || '', description: '' },
      lawyer: appointment.persona || appointment.nombreAbogado || '',
      specialtyId: appointment.idEspecialidad,
      lawyerId: appointment.idAbogado || appointment.idUsuario,
      abogadoId: appointment.idAbogado,
    });
    navigate('/appointments/new/datetime');
  };

  const handleCancel = async () => {
    if (!confirm('¿Está seguro que desea cancelar este turno?')) return;
    try {
      await cancelarTurno(appointment.idTurno || appointment.id);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message || 'Error al cancelar el turno');
    }
  };

  const apptId = appointment.idTurno || appointment.id;

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
          <h1 className="ml-2 text-2xl sm:text-3xl font-extrabold">N° Turno: {apptId}</h1>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-5 sm:p-8 space-y-5">

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-6 flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-[#6C7F94] text-white">
              <MdPerson className="w-14 h-14" />
            </div>
            <h2 className="text-2xl font-bold text-black text-center">{appointment.persona || appointment.lawyer || ''}</h2>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white px-5 py-3 text-center">
              <h3 className="text-xl font-extrabold text-black">Especialidad</h3>
            </div>
            <div className="bg-gray-100 px-5 py-4 text-center">
              <p className="text-xl font-bold text-black">{appointment.especialidad || appointment.specialty || 'CIVIL'}</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white px-5 py-3 text-center">
              <h3 className="text-xl font-extrabold text-black">Fecha y Hora</h3>
            </div>
            <div className="bg-gray-100 px-5 py-4 text-center">
              <p className="text-xl font-bold text-black">{formatAppointmentDate(appointment.fechaHora || appointment.date)}</p>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white px-5 py-3 text-center">
              <h3 className="text-xl font-extrabold text-black">Observaciones</h3>
            </div>
            <div className="bg-gray-100 px-5 py-6">
              <p className="text-base text-black text-center leading-relaxed">
                {appointment.observacionesCliente || appointment.observations || 'Sin observaciones'}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            {canPay && (
              <button
                onClick={handlePay}
                className="w-full px-8 py-4 bg-[#C6A15B] hover:bg-[#A8C495] text-[#53667B] font-extrabold
                         rounded-2xl shadow-medium hover:shadow-elevated active:scale-[0.99] transition-all"
              >
                Pagar Turno
              </button>
            )}
            <button
              onClick={() => navigate(`/appointments/${apptId}/history`)}
              className="w-full px-8 py-4 bg-[#6C7F94] hover:bg-[#5A6D82] text-white font-extrabold
                       rounded-2xl shadow-medium hover:shadow-elevated active:scale-[0.99] transition-all"
            >
              Ver historial del Turno
            </button>
            {canReschedule && (
              <button
                onClick={handleReschedule}
                className="w-full px-8 py-4 bg-gray-400 hover:bg-gray-500 text-white font-extrabold
                         rounded-2xl shadow-medium hover:shadow-elevated active:scale-[0.99] transition-all"
              >
                Reprogramar Turno
              </button>
            )}
            {canCancel && (
              <button
                onClick={handleCancel}
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
              <p className="text-lg font-bold text-white">{statusLabels[statusKey] || 'Pendiente'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetail;
