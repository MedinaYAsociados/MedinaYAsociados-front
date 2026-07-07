import { useState } from 'react';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import Calendar from './Calendar';

function LawyerSearchAppointment({ onBack, onHome, onSearch }) {
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
    // Validar que al menos tenga fecha desde y hasta
    if (!filters.dateFrom || !filters.dateTo) {
      alert('Por favor seleccione fecha desde y hasta');
      return;
    }
    onSearch && onSearch(filters);
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
            Buscar turno
          </h1>
        </div>

        {/* Formulario de búsqueda */}
        <div className="bg-[#C9B896]/60 rounded-3xl p-6 space-y-4 animate-slide-up">
          {/* Campo Desde */}
          <div className="relative">
            <label className="block text-[#3D3229] text-lg font-bold mb-2">
              Desde:
            </label>
            <button
              type="button"
              onClick={() => {
                setShowFromCalendar(!showFromCalendar);
                setShowToCalendar(false);
              }}
              className="w-full px-4 py-3 bg-white/80 rounded-xl text-left text-[#3D3229] 
                       border-2 border-[#3D3229]/20 shadow-soft hover:shadow-medium transition-all
                       focus:outline-none focus:border-[#3D3229] focus:ring-4 focus:ring-[#3D3229]/10"
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
            <label className="block text-[#3D3229] text-lg font-bold mb-2">
              Hasta:
            </label>
            <button
              type="button"
              onClick={() => {
                setShowToCalendar(!showToCalendar);
                setShowFromCalendar(false);
              }}
              className="w-full px-4 py-3 bg-white/80 rounded-xl text-left text-[#3D3229] 
                       border-2 border-[#3D3229]/20 shadow-soft hover:shadow-medium transition-all
                       focus:outline-none focus:border-[#3D3229] focus:ring-4 focus:ring-[#3D3229]/10"
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
            <label className="block text-[#3D3229] text-lg font-bold mb-2">
              Estado:
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-3 bg-white/80 rounded-xl text-[#3D3229] 
                       border-2 border-[#3D3229]/20 shadow-soft hover:shadow-medium transition-all
                       focus:outline-none focus:border-[#3D3229] focus:ring-4 focus:ring-[#3D3229]/10
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
            <label className="block text-[#3D3229] text-lg font-bold mb-2">
              Cliente:
            </label>
            <input
              type="text"
              value={filters.clientName}
              onChange={(e) => setFilters(prev => ({ ...prev, clientName: e.target.value }))}
              placeholder="escriba aqui"
              className="w-full px-4 py-3 bg-white/80 rounded-xl text-[#3D3229] placeholder-[#9C8B78]/60
                       border-2 border-[#3D3229]/20 shadow-soft hover:shadow-medium transition-all
                       focus:outline-none focus:border-[#3D3229] focus:ring-4 focus:ring-[#3D3229]/10"
            />
          </div>
        </div>

        {/* Botón Buscar */}
        <div className="mt-6 animate-slide-up">
          <button
            onClick={handleSearch}
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

export default LawyerSearchAppointment;
