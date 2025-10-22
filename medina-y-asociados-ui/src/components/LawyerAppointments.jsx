import { formatAppointmentDate } from '../utils/date';
import { MdOutlineArrowBack, MdPerson } from 'react-icons/md';

const iconBtn = 'p-2 rounded-xl border-2 border-[#3D3229]/30 text-[#3D3229] hover:bg-white/40 transition-colors';

function AppointmentCard({ appt, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden hover:shadow-medium transition-shadow"
    >
      <div className="bg-white/60 px-4 py-3 border-b border-black/5 text-center font-extrabold text-[#3D3229]">
        Nº Turno: {appt.number}
      </div>
      <div className="p-4">
        <div className="bg-black/5 rounded-xl p-4 shadow-soft">
          <p className="text-[#3D3229] text-lg font-semibold">Cliente: {appt.clientName}</p>
          <p className="text-[#3D3229] text-lg font-semibold mt-3">Fecha Hora: {formatAppointmentDate(appt.date)}</p>
        </div>
      </div>
    </button>
  );
}

function LawyerAppointments({ onBack, onHome, onNewAppointment, onSearchAppointment, onViewAppointment, user = { name: 'Abogado' } }) {
  // Mock de turnos actuales del abogado
  const appointments = [
    {
      id: 1,
      number: 1,
      clientName: 'Ramiro Doglio',
      date: new Date('2025-12-12T13:00:00')
    },
    {
      id: 2,
      number: 2,
      clientName: 'María González',
      date: new Date('2025-11-15T14:30:00')
    },
    {
      id: 3,
      number: 3,
      clientName: 'Carlos Pérez',
      date: new Date('2025-12-18T16:00:00')
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D3229] leading-tight">
              Bienvenido/a
            </h1>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#3D3229]">[{user.name}]</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onBack} className={iconBtn} aria-label="Volver">
              <MdOutlineArrowBack className="w-8 h-8" />
            </button>
            <button onClick={onHome} className={iconBtn} aria-label="Inicio">
              <MdPerson className="w-8 h-8" />
            </button>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D3229] text-center mb-6">Sus turnos</h2>

        {/* List container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6 mb-6">
          {appointments.length === 0 ? (
            <p className="text-center text-[#3D3229]">No hay turnos disponibles.</p>
          ) : (
            <div className="grid gap-4">
              {appointments.map(appt => (
                <AppointmentCard 
                  key={appt.id} 
                  appt={appt} 
                  onClick={() => onViewAppointment && onViewAppointment(appt)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-6 sm:mt-8 space-y-4">
          <button
            onClick={onNewAppointment}
            className="w-full px-6 py-3.5 bg-[#B8D4A5] 
                     border-2 border-[#3D3229] rounded-xl
                     text-[#3D3229] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30"
          >
            Nuevo turno
          </button>
          <button
            onClick={onSearchAppointment}
            className="w-full px-6 py-3.5 bg-[#B8D4A5] 
                     border-2 border-[#3D3229] rounded-xl
                     text-[#3D3229] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30"
          >
            Buscar turno
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerAppointments;
