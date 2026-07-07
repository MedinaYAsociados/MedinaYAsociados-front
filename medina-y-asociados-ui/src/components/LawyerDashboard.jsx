import { useNavigate, useOutletContext } from 'react-router-dom';

function LawyerDashboard() {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const multiRole = user?.roles?.length > 1;

  const menuButtons = [
    { id: 'appointments', label: 'Turnos', onClick: () => navigate('/lawyer/appointments') },
    { id: 'clients', label: 'Clientes', onClick: () => navigate('/lawyer/clients') },
    { id: 'history', label: 'Historial', onClick: () => navigate('/lawyer/history') },
  ];

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#53667B] leading-tight">
              Bienvenido/a
            </h1>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#53667B]">[{user?.name}]</p>
          </div>
          {multiRole && (
            <button onClick={() => navigate('/role-selector')}
              className="p-2 rounded-xl border-2 border-[#C6A15B]/30 text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
              aria-label="Cambiar rol">
              ←
            </button>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#53667B] text-center mb-6">Panel de Control</h2>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6">
          <div className="space-y-4">
            {menuButtons.map((button) => (
              <button
                key={button.id}
                onClick={button.onClick}
                className="w-full px-6 py-3.5 bg-[#C6A15B]
                         border-2 border-[#C6A15B] rounded-xl
                         text-[#53667B] text-lg sm:text-xl font-bold
                         shadow-medium hover:shadow-elevated hover:bg-[#A8C495]
                         active:scale-[0.98] transition-all duration-200
                         focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
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
