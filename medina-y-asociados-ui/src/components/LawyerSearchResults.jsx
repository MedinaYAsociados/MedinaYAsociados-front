import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { formatAppointmentDate } from '../utils/date';

function LawyerSearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results || [];
  
  const getStatusColor = (status) => {
    const colors = {
      'cancelled': 'bg-[#D4A5A5]',
      'pending': 'bg-[#E8DCC4]',
      'confirmed': 'bg-[#B8D4B8]',
      'completed': 'bg-[#A5C4D4]',
      'rescheduled': 'bg-[#6C7F94]',
      'attended': 'bg-[#8FBC8F]',
      'no-show': 'bg-[#D4A5A5]',
      'paid': 'bg-[#6C7F94]',
      'in-progress': 'bg-[#A5C4D4]'
    };
    return colors[status] || 'bg-gray-300';
  };

  const getStatusLabel = (status) => {
    const labels = {
      'cancelled': 'Cancelado',
      'pending': 'Pendiente',
      'confirmed': 'Confirmado',
      'completed': 'Completado',
      'rescheduled': 'Reprogramado',
      'attended': 'Asistió',
      'no-show': 'No Asistió',
      'paid': 'Pagado',
      'in-progress': 'En Curso'
    };
    return labels[status] || status;
  };

  const AppointmentResultCard = ({ appointment }) => (
    <button
      onClick={() => navigate(`/lawyer/appointments/${appointment.id}`, { state: { appointment } })}
      className="w-full bg-gradient-to-b from-white/90 to-white/70 rounded-2xl shadow-medium p-5 
                 hover:shadow-elevated transition-all text-left"
    >
      <h3 className="text-xl font-bold text-[#53667B] mb-3 text-center">
        Nº Turno: {appointment.number}
      </h3>
      <div className="space-y-2">
        <p className="text-[#53667B] text-lg font-semibold">
          Cliente: {appointment.clientName}
        </p>
        <p className="text-[#53667B] text-lg font-semibold">
          Fecha Hora: {formatAppointmentDate(appointment.date)}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[#53667B] text-lg font-semibold">Estado:</span>
          <span className={`px-4 py-1 rounded-full text-[#53667B] font-semibold ${getStatusColor(appointment.status)}`}>
            {getStatusLabel(appointment.status)}
          </span>
        </div>
      </div>
    </button>
  );

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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#53667B]">
            Turnos encontrados
          </h1>
        </div>

        {/* Lista de resultados */}
        <div className="bg-white/60 rounded-3xl p-6 mb-6 grid gap-4 sm:grid-cols-2 animate-slide-up">
          {results.length === 0 ? (
            <div className="bg-white/70 rounded-2xl shadow-medium p-8 text-center">
              <p className="text-[#53667B] text-lg">No se encontraron turnos con los filtros seleccionados</p>
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
            onClick={() => navigate('/lawyer/appointments/search')}
            className="w-full px-6 py-3.5 bg-[#C6A15B] 
                     border-2 border-[#C6A15B] rounded-xl
                     text-[#53667B] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
          >
            Volver a buscar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerSearchResults;
