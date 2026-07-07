import { useNavigate, useOutletContext } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const multiRole = user?.roles?.length > 1;

  const menuButtons = [
    { id: 'manage-lawyers', label: 'Administrar Abogado', onClick: () => navigate('/admin/lawyers') },
    { id: 'manage-pricing', label: 'Gestionar Precios', onClick: () => navigate('/admin/pricing') },
  ];

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6 animate-slide-up">
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

        <div className="bg-white/70 rounded-3xl p-8 sm:p-12 shadow-soft animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="space-y-6">
            {menuButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={btn.onClick}
                className="w-full px-8 py-6 bg-[#E8DCC4] hover:bg-[#DED2BA]
                         border-2 border-[#C6A15B] rounded-2xl
                         text-[#53667B] text-xl sm:text-2xl font-bold
                         shadow-medium hover:shadow-elevated
                         active:scale-[0.98] transition-all duration-200
                         focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
