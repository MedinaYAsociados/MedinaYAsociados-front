import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import Calendar from './Calendar';
import { useAuth } from '../context/AuthContext';
import { listarTurnosAbogado } from '../services/turnos';

const statusToSpanish = {
  '': '',
  'pending': 'PENDIENTE',
  'confirmed': 'CONFIRMADO',
  'completed': 'COMPLETADO',
  'cancelled': 'CANCELADO',
  'rescheduled': 'REPROGRAMADO',
  'attended': 'ASISTIÓ',
  'no-show': 'NO ASISTIÓ',
  'paid': 'PAGADO',
  'in-progress': 'EN CURSO',
  'expired': 'EXPIRO_PAGO',
};

const statusMap = {
  'PENDIENTE': 'pending',
  'CONFIRMADO': 'confirmed',
  'COMPLETADO': 'completed',
  'FINALIZADO': 'completed',
  'CANCELADO': 'cancelled',
  'REPROGRAMADO': 'rescheduled',
  'ASISTIÓ': 'attended',
  'ASISTIO': 'attended',
  'NO ASISTIÓ': 'no-show',
  'NO ASISTIO': 'no-show',
  'PAGADO': 'paid',
  'EN CURSO': 'in-progress',
  'EN_CURSO': 'in-progress',
  'EXPIRO_PAGO': 'expired',
};

function LawyerSearchAppointment() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    dateFrom: null,
    dateTo: null,
    status: '',
    clientName: ''
  });

  const handleDateFromSelect = (date) => {
    setFilters(prev => ({ ...prev, dateFrom: date }));
    setShowFromCalendar(false);
  };

  const handleDateToSelect = (date) => {
    setFilters(prev => ({ ...prev, dateTo: date }));
    setShowToCalendar(false);
  };

  const formatDateDisplay = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateISO = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = async () => {
    if (!filters.dateFrom || !filters.dateTo) {
      alert('Por favor seleccione fecha desde y hasta');
      return;
    }
    setLoading(true);
    try {
      const apiFilters = {
        fechaDesde: formatDateISO(filters.dateFrom),
        fechaHasta: formatDateISO(filters.dateTo),
        estado: statusToSpanish[filters.status] || filters.status,
        cliente: filters.clientName,
      };
      const res = await listarTurnosAbogado(user.idUsuario, 0, 100, apiFilters);
      const results = (res.content || []).map(item => {
        const dateStr = item.fechaHora || item.horarioTurno;
        const dateObj = dateStr ? new Date(dateStr) : null;
        return {
          id: item.idTurno,
          number: item.idTurno,
          clientName: item.persona || `${item.nombreCliente || ''} ${item.apellidoCliente || ''}`.trim() || '',
          date: dateObj && !isNaN(dateObj.getTime()) ? dateObj : dateStr,
          status: statusMap[item.estado?.toUpperCase()] || item.nombreEstado?.toLowerCase() || item.estado || 'pending',
        };
      });
      navigate('/lawyer/appointments/search/results', { state: { results } });
    } catch {
      alert('Error al buscar turnos');
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: '', label: 'Todos' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'confirmed', label: 'Confirmado' },
    { value: 'completed', label: 'Completado' },
    { value: 'cancelled', label: 'Cancelado' },
    { value: 'rescheduled', label: 'Reprogramado' },
    { value: 'attended', label: 'Asistió' },
    { value: 'no-show', label: 'No Asistió' },
    { value: 'paid', label: 'Pagado' },
    { value: 'in-progress', label: 'En Curso' }
  ];

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
          <h1 className="text-2xl sm:text-3xl font-bold text-[#53667B]">
            Buscar turno
          </h1>
        </div>

        <div className="bg-white/60 rounded-3xl p-6 space-y-4 animate-slide-up">
          <div className="relative">
            <label className="block text-[#53667B] text-lg font-bold mb-2">
              Desde:
            </label>
            <button
              type="button"
              onClick={() => {
                setShowFromCalendar(!showFromCalendar);
                setShowToCalendar(false);
              }}
              className="w-full px-4 py-3 bg-white/80 rounded-xl text-left text-[#53667B] 
                       border-2 border-[#C6A15B]/20 shadow-soft hover:shadow-medium transition-all
                       focus:outline-none focus:border-[#C6A15B] focus:ring-4 focus:ring-[#6C7F94]/20"
            >
              {filters.dateFrom ? formatDateDisplay(filters.dateFrom) : 'escriba aqui'}
            </button>
            {showFromCalendar && (
              <div className="absolute z-10 mt-2 bg-white rounded-2xl shadow-elevated p-4">
                <Calendar
                  selectedDate={filters.dateFrom}
                  onSelectDate={handleDateFromSelect}
                />
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-[#53667B] text-lg font-bold mb-2">
              Hasta:
            </label>
            <button
              type="button"
              onClick={() => {
                setShowToCalendar(!showToCalendar);
                setShowFromCalendar(false);
              }}
              className="w-full px-4 py-3 bg-white/80 rounded-xl text-left text-[#53667B] 
                       border-2 border-[#C6A15B]/20 shadow-soft hover:shadow-medium transition-all
                       focus:outline-none focus:border-[#C6A15B] focus:ring-4 focus:ring-[#6C7F94]/20"
            >
              {filters.dateTo ? formatDateDisplay(filters.dateTo) : 'escriba aqui'}
            </button>
            {showToCalendar && (
              <div className="absolute z-10 mt-2 bg-white rounded-2xl shadow-elevated p-4">
                <Calendar
                  selectedDate={filters.dateTo}
                  onSelectDate={handleDateToSelect}
                  minDate={filters.dateFrom}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-[#53667B] text-lg font-bold mb-2">
              Estado:
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-3 bg-white/80 rounded-xl text-[#53667B] 
                       border-2 border-[#C6A15B]/20 shadow-soft hover:shadow-medium transition-all
                       focus:outline-none focus:border-[#C6A15B] focus:ring-4 focus:ring-[#6C7F94]/20
                       appearance-none cursor-pointer"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[#53667B] text-lg font-bold mb-2">
              Cliente:
            </label>
            <input
              type="text"
              value={filters.clientName}
              onChange={(e) => setFilters(prev => ({ ...prev, clientName: e.target.value }))}
              placeholder="escriba aqui"
              className="w-full px-4 py-3 bg-white/80 rounded-xl text-[#53667B] placeholder-[#9C8B78]/60
                       border-2 border-[#C6A15B]/20 shadow-soft hover:shadow-medium transition-all
                       focus:outline-none focus:border-[#C6A15B] focus:ring-4 focus:ring-[#6C7F94]/20"
            />
          </div>
        </div>

        <div className="mt-6 animate-slide-up">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full px-6 py-3.5 bg-[#C6A15B] 
                     border-2 border-[#C6A15B] rounded-xl
                     text-[#53667B] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Buscando...' : 'Buscar turnos'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerSearchAppointment;
