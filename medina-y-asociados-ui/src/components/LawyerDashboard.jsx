import { MdOutlineArrowBack, MdPerson } from 'react-icons/md';

const iconBtn = 'p-2 rounded-xl border-2 border-[#3D3229]/30 text-[#3D3229] hover:bg-white/40 transition-colors';

function LawyerDashboard({ onLogout, onViewAppointments, onViewClients, onViewHistory, user = { name: 'Abogado' } }) {
  
  const menuButtons = [
    {
      id: 'appointments',
      label: 'Turnos',
      onClick: onViewAppointments
    },
    {
      id: 'clients',
      label: 'Clientes',
      onClick: onViewClients
    },
    {
      id: 'history',
      label: 'Historial',
      onClick: onViewHistory
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
            <button onClick={onLogout} className={iconBtn} aria-label="Cerrar sesión">
              <MdOutlineArrowBack className="w-8 h-8" />
            </button>
            <div className="p-2 rounded-full border-2 border-[#3D3229]/30 bg-white/40 text-[#3D3229]">
              <MdPerson className="w-14 h-14 opacity-90" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D3229] text-center mb-6">Panel de Control</h2>

        {/* Menu buttons container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6">
          <div className="space-y-4">
            {menuButtons.map((button) => (
              <button
                key={button.id}
                onClick={button.onClick}
                className="w-full px-8 py-4 bg-[#D6C59F]/70 hover:bg-[#D6C59F]/90 border-2 border-[#3D3229] text-[#3D3229] 
                         font-extrabold text-xl rounded-2xl shadow-medium hover:shadow-elevated active:scale-[0.99] transition-all"
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerDashboard;
