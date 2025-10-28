import { useEffect, useState } from 'react';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { getAvailableTimeSlots } from '../services/timeSlots';

// Componente Calendario simple
function Calendar({ selectedDate, onSelectDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  
  // Generar días del mes anterior para llenar la primera semana
  const prevMonthDays = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const date = new Date(monthStart);
    date.setDate(date.getDate() - i - 1);
    prevMonthDays.push(date);
  }
  
  // Generar días del mes actual
  const currentMonthDays = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    currentMonthDays.push(date);
  }
  
  const allDays = [...prevMonthDays, ...currentMonthDays];
  
  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };
  
  const isPastDate = (date) => date < today;
  
  return (
    <div className="bg-white rounded-2xl shadow-soft p-4">
      <div className="grid grid-cols-7 gap-2 mb-3">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {allDays.map((date, idx) => {
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isPast = isPastDate(date);
          const selected = isSelected(date);
          
          return (
            <button
              key={idx}
              onClick={() => !isPast && isCurrentMonth && onSelectDate(date)}
              disabled={isPast || !isCurrentMonth}
              className={`
                aspect-square rounded-lg text-center font-semibold text-base transition-all
                ${!isCurrentMonth ? 'text-gray-300' : ''}
                ${isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                ${selected ? 'bg-white text-[#3D3229] ring-2 ring-[#3D3229] ring-offset-2' : 'text-black'}
                ${!isPast && !selected && isCurrentMonth ? 'hover:bg-gray-100' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Componente para un slot de hora
function TimeSlot({ time, selected, available, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={!available}
      className={`
        px-6 py-3 rounded-2xl font-bold text-base transition-all shadow-soft
        ${!available ? 'bg-white/40 text-gray-400 cursor-not-allowed' : ''}
        ${available && !selected ? 'bg-white/90 text-[#3D3229] hover:bg-white hover:shadow-medium' : ''}
        ${selected ? 'bg-[#3D3229] text-white shadow-medium' : ''}
      `}
    >
      {time}
    </button>
  );
}

function NewAppointmentDateTime({ selectedSpecialty, selectedLawyer, onBack, onHome, onConfirm, isRescheduling = false, clientData = null }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [observations, setObservations] = useState('');
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (selectedDate && selectedLawyer) {
      (async () => {
        setLoadingSlots(true);
        setSelectedTime(null);
        const slots = await getAvailableTimeSlots(selectedLawyer.id, selectedDate);
        setAvailableSlots(slots);
        setLoadingSlots(false);
      })();
    }
  }, [selectedDate, selectedLawyer]);

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm({
        specialty: selectedSpecialty,
        lawyer: selectedLawyer,
        date: selectedDate,
        time: selectedTime,
        observations
      });
    }
  };

  const canConfirm = selectedDate && selectedTime;
  const APPOINTMENT_PRICE = '10.000 ARS';

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
              <p className="text-center text-[#3D3229]">Cargando horarios…</p>
            ) : !selectedDate ? (
              <p className="text-center text-[#3D3229]/70">Primero seleccione una fecha</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
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
              className="w-full bg-white/90 rounded-2xl shadow-soft border border-black/5 p-4 text-[#3D3229] 
                       placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3D3229] 
                       resize-none h-32"
            />
          </div>

          {/* Precio */}
          {!isRescheduling && !clientData && (
            <div className="text-center">
              <p className="text-xl sm:text-2xl font-extrabold text-black">Valor: {APPOINTMENT_PRICE}</p>
            </div>
          )}

          {isRescheduling && (
            <div className="text-center bg-[#B8D4A5]/30 rounded-xl p-4 border-2 border-[#B8D4A5]">
              <p className="text-lg font-bold text-[#3D3229]">
                ℹ️ Reprogramación sin cargo adicional
              </p>
              <p className="text-sm text-[#3D3229]/70 mt-1">
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
                border-2 border-[#3D3229]
                ${canConfirm 
                  ? 'bg-[#B8D4A5] hover:bg-[#A8C495] text-[#3D3229] hover:shadow-elevated active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30' 
                  : 'bg-[#B8D4A5]/40 text-[#3D3229]/60 cursor-not-allowed'
                }`}
            >
              {isRescheduling ? 'Confirmar reprogramación' : 'Confirmar turno'}
            </button>
            <button
              onClick={onHome}
              className="w-full px-6 py-3.5 bg-[#9F8A66] hover:bg-[#8F7A56] text-white font-bold 
                       border-2 border-[#3D3229] rounded-xl shadow-medium hover:shadow-elevated 
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#9F8A66]/30 text-lg sm:text-xl"
            >
              Cancelar Turno
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewAppointmentDateTime;
