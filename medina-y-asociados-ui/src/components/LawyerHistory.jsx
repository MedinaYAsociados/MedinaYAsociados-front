import { formatAppointmentDate } from '../utils/date';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

const iconBtn = 'p-2 rounded-xl border-2 border-[#3D3229]/30 text-[#3D3229] hover:bg-white/40 transition-colors';

const getStatusColor = (status) => {
  const colors = {
    cancelled: 'bg-[#D4A5A5]/70',
    pending: 'bg-[#E8DCC4]/70',
    confirmed: 'bg-[#B8D4B8]/70',
    completed: 'bg-[#A5C4D4]/70',
    rescheduled: 'bg-[#D4C4A5]/70'
  };
  return colors[status] || 'bg-white/70';
};

const getStatusLabel = (status) => {
  const labels = {
    cancelled: 'Cancelado',
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    completed: 'Completado',
    rescheduled: 'Reprog.'
  };
  return labels[status] || status;
};

function HistoryAppointmentCard({ appt, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden hover:shadow-medium transition-shadow"
    >
      <div className="bg-white/60 px-4 py-3 border-b border-black/5 text-center font-extrabold text-[#3D3229]">
        Nº Turno: {appt.number}
      </div>
      <div className="p-4">
        <div className="bg-black/5 rounded-xl p-4 shadow-soft space-y-2">
          <p className="text-[#3D3229] text-lg font-semibold">Cliente: {appt.clientName}</p>
          <p className="text-[#3D3229] text-lg font-semibold">Fecha Hora: {formatAppointmentDate(appt.date)}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[#3D3229] text-base font-semibold">Estado:</span>
            <span className={`px-3 py-1 rounded-full text-[#3D3229] text-sm font-semibold ${getStatusColor(appt.status)}`}>
              {getStatusLabel(appt.status)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function LawyerHistory({ onBack, onHome, onSearchAppointment, onViewAppointment, user = { name: 'Abogado' } }) {
  // Mock de turnos históricos del abogado
  const historyAppointments = [
    {
      id: 1,
      number: 1,
      clientName: 'Ramiro Doglio',
      date: new Date('2025-12-12T13:00:00'),
      status: 'cancelled'
    },
    {
      id: 2,
      number: 1,
      clientName: 'Ramiro Doglio',
      date: new Date('2025-12-12T13:00:00'),
      status: 'pending'
    },
    {
      id: 3,
      number: 1,
      clientName: 'Ramiro Doglio',
      date: new Date('2025-12-12T13:00:00'),
      status: 'confirmed'
    },
    {
      id: 4,
      number: 4,
      clientName: 'Ana Martínez',
      date: new Date('2025-10-10T15:30:00'),
      status: 'completed'
    },
    {
      id: 5,
      number: 5,
      clientName: 'Luis Rodríguez',
      date: new Date('2025-09-20T11:00:00'),
      status: 'rescheduled'
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Volver"
          >
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button 
            onClick={onHome}
            className="p-2.5 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Inicio"
          >
            <MdHome className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D3229] text-center mb-6 animate-slide-up">
          Historial turnos
        </h2>

        {/* List container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6 mb-6 animate-slide-up">
          {historyAppointments.length === 0 ? (
            <p className="text-center text-[#3D3229]">No hay turnos en el historial.</p>
          ) : (
            <div className="grid gap-4">
              {historyAppointments.map(appt => (
                <HistoryAppointmentCard 
                  key={appt.id} 
                  appt={appt} 
                  onClick={() => onViewAppointment(appt)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Buscar turnos button */}
        <div className="animate-slide-up">
          <button
            onClick={onSearchAppointment}
            className="w-full px-6 py-3.5 bg-[#B8D4A5] 
                     border-2 border-[#3D3229] rounded-xl
                     text-[#3D3229] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30"
          >
            Buscar turnos
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerHistory;
