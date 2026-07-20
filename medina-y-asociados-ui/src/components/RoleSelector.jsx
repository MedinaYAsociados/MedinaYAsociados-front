import { useNavigate } from 'react-router-dom';
import { MdGavel, MdAdminPanelSettings } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

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

function RoleSelector() {
  const navigate = useNavigate();
  const { user, token, login } = useAuth();

  if (!user) return null;

  const roles = Array.isArray(user.roles) ? user.roles : [user.role];
  const available = roles
    .filter(r => roleConfig[r])
    .map(r => ({ key: r, ...roleConfig[r] }));

  if (available.length <= 1) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSelectRole = (selectedRole) => {
    login({ ...user, role: selectedRole }, token);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#53667B] leading-tight">
            Seleccionar rol
          </h1>
        </div>

        <p className="text-[#53667B]/80 text-lg text-center mb-8 animate-slide-up">
          Tiene múltiples roles asignados. Seleccione con qué perfil desea ingresar:
        </p>

        <div className="space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {available.map(({ key, icon: Icon, label, description }) => (
            <button
              key={key}
              onClick={() => handleSelectRole(key)}
              className="w-full bg-white/90 hover:bg-white rounded-2xl shadow-medium hover:shadow-elevated
                       border-2 border-[#C6A15B] p-6
                       active:scale-[0.98] transition-all duration-200 text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#6C7F94] text-white flex-shrink-0">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#53667B]">{label}</h2>
                  <p className="text-[#53667B]/70 text-sm mt-1">{description}</p>
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
