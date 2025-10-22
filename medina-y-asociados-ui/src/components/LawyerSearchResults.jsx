import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { formatAppointmentDate } from '../utils/date';

function LawyerSearchResults({ results = [], onBack, onHome, onViewAppointment }) {
  
  const getStatusColor = (status) => {
    const colors = {
      'cancelled': 'bg-[#D4A5A5]',
      'pending': 'bg-[#E8DCC4]',
      'confirmed': 'bg-[#B8D4B8]',
      'completed': 'bg-[#A5C4D4]',
      'rescheduled': 'bg-[#D4C4A5]'
    };
    return colors[status] || 'bg-gray-300';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'cancelled': 'Cancelado',
      'pending': 'Pendiente',
      'confirmed': 'Confirmado',
      'completed': 'Completado',
      'rescheduled': 'Reprogramado'
    };
    return labels[status] || status;
  };

  const AppointmentResultCard = ({ appointment }) => (
    <button
      onClick={() => onViewAppointment && onViewAppointment(appointment)}
      className="w-full bg-gradient-to-b from-white/90 to-white/70 rounded-2xl shadow-medium p-5 
                 hover:shadow-elevated transition-all text-left"
    >
      <h3 className="text-xl font-bold text-[#3D3229] mb-3 text-center">
        Nº Turno: {appointment.number}
      </h3>
      <div className="space-y-2">
        <p className="text-[#3D3229] text-lg font-semibold">
          Cliente: {appointment.clientName}
        </p>
        <p className="text-[#3D3229] text-lg font-semibold">
          Fecha Hora: {formatAppointmentDate(appointment.date)}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[#3D3229] text-lg font-semibold">Estado:</span>
          <span className={`px-4 py-1 rounded-full text-[#3D3229] font-semibold ${getStatusColor(appointment.status)}`}>
            {getStatusLabel(appointment.status)}
          </span>
        </div>
      </div>
    </button>
  );

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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3D3229]">
            Turnos encontrados
          </h1>
        </div>

        {/* Lista de resultados */}
        <div className="bg-[#C9B896]/60 rounded-3xl p-6 mb-6 space-y-4 animate-slide-up">
          {results.length === 0 ? (
            <div className="bg-white/70 rounded-2xl shadow-medium p-8 text-center">
              <p className="text-[#3D3229] text-lg">No se encontraron turnos con los filtros seleccionados</p>
            </div>
          ) : (
            results.map((appointment) => (
              <AppointmentResultCard key={appointment.id} appointment={appointment} />
            ))
          )}
        </div>

        {/* Botón volver a buscar */}
        <div className="animate-slide-up">
          <button
            onClick={onBack}
            className="w-full px-6 py-3.5 bg-[#B8D4A5] 
                     border-2 border-[#3D3229] rounded-xl
                     text-[#3D3229] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30"
          >
            Volver a buscar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerSearchResults;
