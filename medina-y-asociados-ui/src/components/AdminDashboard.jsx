import { MdOutlineArrowBack, MdPerson } from 'react-icons/md';

const iconBtn = 'p-2 rounded-xl border-2 border-[#3D3229]/30 text-[#3D3229] hover:bg-white/40 transition-colors';

function AdminDashboard({ onLogout, onManageLawyers, onManagePricing, onEditProfile, user = { name: 'Admin' } }) {
  
  const menuButtons = [
    {
      id: 'manage-lawyers',
      label: 'Administrar Abogado',
      onClick: onManageLawyers
    },
    {
      id: 'manage-pricing',
      label: 'Gestionar Precios',
      onClick: onManagePricing
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-slide-up">
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
            <button 
              onClick={onEditProfile}
              className="p-2 rounded-full border-2 border-[#3D3229]/30 bg-white/40 text-[#3D3229] hover:bg-white/60 transition-colors cursor-pointer"
              aria-label="Editar perfil"
            >
              <MdPerson className="w-14 h-14 opacity-90" />
            </button>
          </div>
        </div>

        {/* Contenedor principal con fondo más claro */}
        <div className="bg-[#D4C3A4]/70 rounded-3xl p-8 sm:p-12 shadow-soft animate-slide-up" style={{ animationDelay: '100ms' }}>
          {/* Botones principales */}
          <div className="space-y-6">
            {menuButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={btn.onClick}
                className="w-full px-8 py-6 bg-[#E8DCC4] hover:bg-[#DED2BA]
                         border-2 border-[#3D3229] rounded-2xl
                         text-[#3D3229] text-xl sm:text-2xl font-bold
                         shadow-medium hover:shadow-elevated
                         active:scale-[0.98] transition-all duration-200
                         focus:outline-none focus:ring-4 focus:ring-[#3D3229]/20"
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
