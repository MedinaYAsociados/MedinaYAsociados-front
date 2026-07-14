import { useState, useMemo } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

function Calendar({ selectedDate, onSelectDate, minDate = null, blockPast = false }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    return selectedDate || new Date();
  });

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const today = useMemo(() => {
    if (!blockPast) return null;
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, [blockPast]);

  const actualMinDate = useMemo(() => {
    if (!blockPast) return minDate;
    if (!minDate) return today;
    return today > minDate ? today : minDate;
  }, [blockPast, minDate, today]);

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentMonth]);

  const isDateDisabled = (date) => {
    if (!date) return false;
    if (!actualMinDate) return false;
    return date <= actualMinDate;
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="w-72">
      {/* Header con mes/año y navegación */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-[#6C7F94]/20 rounded-full transition-colors"
          type="button"
        >
          <MdChevronLeft className="w-6 h-6 text-[#53667B]" />
        </button>
        <h3 className="text-lg font-bold text-[#53667B]">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={handleNextMonth}
          className="p-1 hover:bg-[#6C7F94]/20 rounded-full transition-colors"
          type="button"
        >
          <MdChevronRight className="w-6 h-6 text-[#53667B]" />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, idx) => (
          <div key={idx} className="text-center text-sm font-semibold text-[#53667B] py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, idx) => {
          if (!date) {
            return <div key={`empty-${idx}`} />;
          }

          const disabled = isDateDisabled(date);
          const selected = isSelected(date);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => !disabled && onSelectDate(date)}
              disabled={disabled}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                transition-all
                ${disabled 
                  ? 'bg-black/5 text-[#9C8B78]/50 cursor-not-allowed' 
                  : 'text-[#53667B] hover:bg-[#6C7F94]/30 cursor-pointer'
                }
                ${selected 
                  ? 'bg-[#6C7F94] text-white ring-2 ring-[#C6A15B] ring-offset-2' 
                  : ''
                }
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

export default Calendar;
