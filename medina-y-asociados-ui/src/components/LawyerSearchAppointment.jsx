import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import Calendar from './Calendar';

const allAppointments = [
  { id: 1, number: 1, clientName: 'Ramiro Doglio', date: new Date('2025-12-12T13:00:00'), status: 'confirmed' },
  { id: 2, number: 2, clientName: 'María González', date: new Date('2025-11-15T14:30:00'), status: 'completed' },
  { id: 3, number: 3, clientName: 'Carlos Pérez', date: new Date('2025-12-18T16:00:00'), status: 'pending' },
  { id: 4, number: 4, clientName: 'Ana Martínez', date: new Date('2025-10-10T15:30:00'), status: 'cancelled' },
  { id: 5, number: 5, clientName: 'Luis Rodríguez', date: new Date('2025-09-20T11:00:00'), status: 'rescheduled' },
  { id: 6, number: 6, clientName: 'Ramiro Doglio', date: new Date('2025-12-20T09:00:00'), status: 'attended' },
  { id: 7, number: 7, clientName: 'María González', date: new Date('2025-11-25T10:00:00'), status: 'no-show' },
  { id: 8, number: 8, clientName: 'Carlos Pérez', date: new Date('2025-12-22T15:00:00'), status: 'paid' },
  { id: 9, number: 9, clientName: 'Ana Martínez', date: new Date('2025-10-30T16:30:00'), status: 'in-progress' },
  { id: 10, number: 10, clientName: 'Luis Rodríguez', date: new Date('2025-09-25T12:00:00'), status: 'confirmed' },
];

function LawyerSearchAppointment() {
  const navigate = useNavigate();
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  
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

  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSearch = () => {
    if (!filters.dateFrom || !filters.dateTo) {
      alert('Por favor seleccione fecha desde y hasta');
      return;
    }
    const filtered = allAppointments.filter(appt => {
      if (filters.dateFrom && appt.date < filters.dateFrom) return false;
      if (filters.dateTo) {
        const endOfDay = new Date(filters.dateTo);
        endOfDay.setHours(23, 59, 59, 999);
        if (appt.date > endOfDay) return false;
      }
      if (filters.status && appt.status !== filters.status) return false;
      if (filters.clientName && !appt.clientName.toLowerCase().includes(filters.clientName.toLowerCase())) return false;
      return true;
    });
    navigate('/lawyer/appointments/search/results', { state: { results: filtered } });
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
            Buscar turno
          </h1>
        </div>

        {/* Formulario de búsqueda */}
        <div className="bg-white/60 rounded-3xl p-6 space-y-4 animate-slide-up">
          {/* Campo Desde */}
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
              {filters.dateFrom ? formatDate(filters.dateFrom) : 'escriba aqui'}
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

          {/* Campo Hasta */}
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
              {filters.dateTo ? formatDate(filters.dateTo) : 'escriba aqui'}
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

          {/* Campo Estado */}
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

          {/* Campo Cliente */}
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

        {/* Botón Buscar */}
        <div className="mt-6 animate-slide-up">
          <button
            onClick={handleSearch}
            className="w-full px-6 py-3.5 bg-[#C6A15B] 
                     border-2 border-[#C6A15B] rounded-xl
                     text-[#53667B] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
          >
            Buscar turnos
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerSearchAppointment;
