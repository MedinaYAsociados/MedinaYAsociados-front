import { MdOutlineArrowBack } from 'react-icons/md';
import { MdGavel, MdAdminPanelSettings } from 'react-icons/md';

const roleConfig = {
  admin: {
    icon: MdAdminPanelSettings,
    label: 'Administrador',
    description: 'Gestionar abogados, precios y configuración del sistema'
  },
  lawyer: {
    icon: MdGavel,
    label: 'Abogado',
    description: 'Gestionar turnos, clientes y agenda'
  }
};

function RoleSelector({ roles, onSelectRole, onLogout }) {
  const available = roles
    .filter(r => roleConfig[r])
    .map(r => ({ key: r, ...roleConfig[r] }));

  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D3229] leading-tight">
            Seleccionar rol
          </h1>
          <button
            onClick={onLogout}
            className="p-2 rounded-xl border-2 border-[#3D3229]/30 text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Cerrar sesión"
          >
            <MdOutlineArrowBack className="w-8 h-8" />
          </button>
        </div>

        <p className="text-[#3D3229]/80 text-lg text-center mb-8 animate-slide-up">
          Tiene múltiples roles asignados. Seleccione con qué perfil desea ingresar:
        </p>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {available.map(({ key, icon: Icon, label, description }) => (
            <button
              key={key}
              onClick={() => onSelectRole(key)}
              className="w-full bg-white/90 hover:bg-white rounded-2xl shadow-medium hover:shadow-elevated
                       border-2 border-[#3D3229] p-6
                       active:scale-[0.98] transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#3D3229] text-white flex-shrink-0">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#3D3229]">{label}</h2>
                  <p className="text-[#3D3229]/70 text-sm mt-1">{description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoleSelector;
