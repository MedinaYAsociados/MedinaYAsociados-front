import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function LawyerAppointmentDetail({ appointment, onBack, onHome, onReschedule, onCancel }) {
  if (!appointment) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-[#3D3229]">No se encontró el turno.</p>
        </div>
      </div>
    );
  }

  // Mock de datos del cliente (en producción vendría del appointment)
  const clientData = {
    name: 'Ramiro Doglio',
    dni: '12.345.678',
    address: 'Carlos Pelegrini 865 -',
    addressDetail: 'Depto 1 - Piso 1',
    phone: '3534123123'
  };

  const appointmentDate = '12/12/2025';
  const appointmentTime = '13.00hs';

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
          <h1 className="text-xl sm:text-2xl font-bold text-[#3D3229]">
            Nº Turno: {appointment.number}
          </h1>
        </div>

        {/* Contenedor principal */}
        <div className="bg-[#C9B896]/60 rounded-3xl p-6 space-y-6 animate-slide-up">
          {/* Card de Cliente */}
          <div className="bg-gradient-to-b from-white/90 to-white/70 rounded-2xl shadow-medium overflow-hidden">
            <div className="bg-white/80 px-4 py-3 text-center border-b border-black/5">
              <h2 className="text-xl font-bold text-[#3D3229]">Cliente</h2>
            </div>
            <div className="bg-black/5 p-6 space-y-2">
              <p className="text-[#3D3229] text-lg text-center font-semibold">
                {clientData.name}
              </p>
              <p className="text-[#3D3229] text-lg text-center font-semibold">
                {clientData.dni}
              </p>
              <p className="text-[#3D3229] text-lg text-center font-semibold">
                {clientData.address}
              </p>
              <p className="text-[#3D3229] text-lg text-center font-semibold">
                {clientData.addressDetail}
              </p>
              <p className="text-[#3D3229] text-lg text-center font-semibold">
                {clientData.phone}
              </p>
            </div>
          </div>

          {/* Card de Fecha Hora */}
          <div className="bg-gradient-to-b from-white/90 to-white/70 rounded-2xl shadow-medium overflow-hidden">
            <div className="bg-white/80 px-4 py-3 text-center border-b border-black/5">
              <h2 className="text-xl font-bold text-[#3D3229]">Fecha Hora</h2>
            </div>
            <div className="bg-black/5 p-6 space-y-2">
              <p className="text-[#3D3229] text-lg text-center font-semibold">
                {appointmentDate}
              </p>
              <p className="text-[#3D3229] text-lg text-center font-semibold">
                {appointmentTime}
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-6 space-y-3 animate-slide-up">
          <button
            onClick={onReschedule}
            className="w-full px-6 py-3.5 bg-[#9C8B78]/70 hover:bg-[#9C8B78]/90 border-2 border-[#3D3229] text-white 
                     font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                     transition-all focus:outline-none focus:ring-4 focus:ring-[#9C8B78]/30"
          >
            Reprogramar Turno
          </button>
          <button
            onClick={onCancel}
            className="w-full px-6 py-3.5 bg-[#8B6F47]/70 hover:bg-[#8B6F47]/90 border-2 border-[#3D3229] text-white 
                     font-bold text-lg rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                     transition-all focus:outline-none focus:ring-4 focus:ring-[#8B6F47]/30"
          >
            Cancelar Turno
          </button>
        </div>

        {/* Card de Estado */}
        <div className="mt-6 bg-white/40 backdrop-blur-sm rounded-2xl shadow-medium p-4 animate-slide-up">
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-3 bg-[#C9B896]/60 border border-[#3D3229]/30 text-[#3D3229] 
                             font-semibold text-base rounded-xl transition-colors hover:bg-[#C9B896]/80">
              Estado
            </button>
            <button className="flex-1 px-4 py-3 bg-[#D4A5A5]/70 border border-[#3D3229]/30 text-[#3D3229] 
                             font-semibold text-base rounded-xl transition-colors hover:bg-[#D4A5A5]/90">
              Reprog.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerAppointmentDetail;
