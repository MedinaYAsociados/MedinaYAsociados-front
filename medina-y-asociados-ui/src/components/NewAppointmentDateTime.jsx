import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { getAvailableTimeSlots } from '../services/timeSlots';
import { crearTurno, crearTurnoOffline, reprogramarTurno } from '../services/turnos';
import { getPrecio } from '../services/config';
import Calendar from './Calendar';

// Componente para un slot de hora
function TimeSlot({ time, selected, available, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={!available}
      className={`
        px-6 py-3 rounded-2xl font-bold text-base transition-all shadow-soft
        ${!available ? 'bg-white/40 text-gray-400 cursor-not-allowed' : ''}
        ${available && !selected ? 'bg-white/90 text-[#53667B] hover:bg-white hover:shadow-medium' : ''}
        ${selected ? 'bg-[#6C7F94] text-white shadow-medium' : ''}
      `}
    >
      {time}
    </button>
  );
}

function NewAppointmentDateTime() {
  const navigate = useNavigate();
  const { selectedSpecialty, selectedLawyer, isRescheduling, clientData, currentAppointment, resetWizard } = useAppointment();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [observations, setObservations] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [precio, setPrecio] = useState(null);

  useEffect(() => {
    getPrecio().then(data => setPrecio(data.precio || data || 0)).catch(() => {});
  }, []);

  useEffect(() => {
    if (selectedDate && selectedLawyer) {
      (async () => {
        setLoadingSlots(true);
        setSelectedTime(null);
        const slots = await getAvailableTimeSlots(selectedLawyer.idUsuario, selectedDate);
        setAvailableSlots(slots);
        setLoadingSlots(false);
      })();
    }
  }, [selectedDate, selectedLawyer]);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    const time24 = selectedTime.replace('hs', ':00');
    const y = selectedDate.getFullYear();
    const m = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const d = String(selectedDate.getDate()).padStart(2, '0');
    const horarioTurno = `${y}-${m}-${d}T${time24}`;

    try {
      if (isRescheduling) {
        await reprogramarTurno(currentAppointment.id, horarioTurno);
        resetWizard();
        navigate('/dashboard');
      } else if (clientData) {
        await crearTurnoOffline({
          idAbogado: selectedLawyer.idUsuario,
          idEspecialidad: selectedSpecialty.id,
          horarioTurno,
          observacionesCliente: observations,
          cliente: {
            nombre: clientData.firstName || '',
            apellido: clientData.lastName || '',
            dni: clientData.dni || '',
            telefono: clientData.phone || '',
            email: clientData.email || '',
            ...(clientData.street || clientData.number || clientData.locality
              ? {
                  direccion: {
                    calle: clientData.street || '',
                    numeroCalle: parseInt(clientData.number) || 0,
                    dpto: clientData.apartment || '',
                    piso: clientData.floor || '',
                    localidad: Number(clientData.locality) || null,
                    provincia: 'Córdoba',
                  }
                }
              : {}),
          }
        });
        resetWizard();
        navigate('/dashboard');
      } else {
        const result = await crearTurno({
          idEspecialidad: selectedSpecialty.id,
          horarioTurno,
          observacionesCliente: observations,
          idAbogado: selectedLawyer.idUsuario,
          idCliente: user.idUsuario,
        });
        setSuccessData(result);
      }
    } catch (err) {
      alert(err.message || 'Error al crear el turno');
    }
  };

  const canConfirm = selectedDate && selectedTime;
  const precioFormateado = precio != null
    ? `$${Number(precio).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : null;

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-3 text-[#53667B] mb-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl border-2 border-[#C6A15B]/30 hover:bg-[#C6A15B]/20 transition-colors" aria-label="Volver">
            <MdOutlineArrowBack className="w-9 h-9" />
          </button>
          <button onClick={() => { resetWizard(); navigate('/dashboard'); }} className="p-2 rounded-xl border-2 border-[#C6A15B]/30 hover:bg-[#C6A15B]/20 transition-colors" aria-label="Inicio">
            <MdHome className="w-9 h-9" />
          </button>
          <h1 className="ml-2 text-2xl sm:text-3xl font-extrabold">Nuevo turno</h1>
        </div>

        {/* Container principal */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-5 sm:p-8 space-y-6">
          
          {/* Calendario */}
          <div>
            <h2 className="text-center text-xl sm:text-2xl font-extrabold text-black mb-4">Seleccione fecha</h2>
            <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </div>

          {/* Horarios */}
          <div>
            <h2 className="text-center text-xl sm:text-2xl font-extrabold text-black mb-4">Seleccione hora</h2>
            {loadingSlots ? (
              <p className="text-center text-[#53667B]">Cargando horarios…</p>
            ) : !selectedDate ? (
              <p className="text-center text-[#53667B]/70">Primero seleccione una fecha</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableSlots.map(slot => (
                  <TimeSlot
                    key={slot}
                    time={slot}
                    selected={selectedTime === slot}
                    available={true}
                    onClick={() => setSelectedTime(slot)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Observaciones */}
          <div>
            <h2 className="text-center text-xl sm:text-2xl font-extrabold text-black mb-4">Observaciones</h2>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Escriba aquí cualquier observación adicional..."
              className="w-full bg-white/90 rounded-2xl shadow-soft border border-black/5 p-4 text-[#53667B] 
                       placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C6A15B] 
                       resize-none h-32"
            />
          </div>

          {/* Precio */}
          {!isRescheduling && !clientData && precioFormateado && (
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-black">Valor: {precioFormateado}</p>
            </div>
          )}

          {isRescheduling && (
            <div className="text-center bg-[#C6A15B]/30 rounded-xl p-4 border-2 border-[#C6A15B]">
              <p className="text-lg font-bold text-[#53667B]">
                ℹ️ Reprogramación sin cargo adicional
              </p>
              <p className="text-sm text-[#53667B]/70 mt-1">
                El pago ya fue realizado
              </p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="space-y-3">
            <button
              onClick={handleConfirm}
              disabled={!canConfirm}
              className={`w-full px-6 py-3.5 rounded-xl font-bold text-lg sm:text-xl shadow-medium transition-all duration-200
                border-2 border-[#C6A15B]
                ${canConfirm 
                  ? 'bg-[#C6A15B] hover:bg-[#A8C495] text-[#53667B] hover:shadow-elevated active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30' 
                  : 'bg-[#C6A15B]/40 text-[#53667B]/60 cursor-not-allowed'
                }`}
            >
              {isRescheduling ? 'Confirmar reprogramación' : 'Confirmar turno'}
            </button>
            <button
              onClick={() => { resetWizard(); navigate('/dashboard'); }}
              className="w-full px-6 py-3.5 bg-[#C6A15B] hover:bg-[#B08F3F] text-white font-bold 
                       border-2 border-[#C6A15B] rounded-xl shadow-medium hover:shadow-elevated 
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30 text-lg sm:text-xl"
            >
              Cancelar Turno
            </button>
          </div>
        </div>
      </div>

      {successData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-3xl p-8 mx-4 max-w-md shadow-xl text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-[#53667B] mb-2">Turno reservado</h2>
            <p className="text-[#53667B]/80 mb-6">
              Debe pagar en los próximos <strong>15 minutos</strong> para confirmar su reserva,
              de lo contrario el turno se cancelará automáticamente.
            </p>
            <button
              onClick={() => { resetWizard(); navigate('/dashboard'); }}
              className="w-full px-6 py-3.5 bg-[#C6A15B] border-2 border-[#C6A15B] rounded-xl
                       text-[#53667B] text-lg font-bold shadow-medium hover:shadow-elevated
                       hover:bg-[#A8C495] active:scale-[0.98] transition-all"
            >
              Ir al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewAppointmentDateTime;
