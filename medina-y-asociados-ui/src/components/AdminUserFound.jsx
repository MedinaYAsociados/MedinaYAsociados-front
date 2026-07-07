import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function InfoCard({ label, value }) {
  return (
    <div className="bg-white/90 rounded-2xl shadow-soft overflow-hidden">
      <div className="bg-white/60 px-4 py-3 text-center border-b border-black/5">
        <h3 className="text-lg font-bold text-[#53667B]">{label}</h3>
      </div>
      <div className="bg-black/5 p-4">
        <p className="text-[#53667B] text-lg font-semibold text-center">
          {value || '-'}
        </p>
      </div>
    </div>
  );
}

function AdminUserFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header con botones de navegación y título */}
        <div className="flex items-start justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#53667B] mt-2">
            Usuario
          </h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
              aria-label="Volver"
            >
              <MdOutlineArrowBack className="w-6 h-6" />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-3 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
              aria-label="Inicio"
            >
              <MdHome className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          
          {/* Nombre y apellido */}
          <InfoCard 
            label="Nombre y apellido" 
            value={user?.name} 
          />

          {/* Teléfono */}
          <InfoCard 
            label="Telefono" 
            value={user?.phone || user?.telefono} 
          />

          {/* Localidad */}
          <InfoCard 
            label="Localidad" 
            value={user?.localidad || user?.locality} 
          />

          {/* Calle */}
          <InfoCard 
            label="Calle" 
            value={user?.street || user?.calle} 
          />

          {/* Numero */}
          <InfoCard 
            label="Numero" 
            value={user?.number || user?.numero} 
          />

          {/* Piso y Depto */}
          <div className="grid grid-cols-2 gap-4">
            <InfoCard 
              label="Piso" 
              value={user?.floor || user?.piso} 
            />
            <InfoCard 
              label="Depto" 
              value={user?.apartment || user?.departamento} 
            />
          </div>

          {/* Email */}
          <InfoCard 
            label="Email" 
            value={user?.email} 
          />

          {/* Botones de acción */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => navigate('/admin/lawyers/create/form', { state: { user } })}
              className="w-full px-6 py-4 bg-[#C6A15B] hover:bg-[#A8C495]
                       border-2 border-[#C6A15B] rounded-2xl
                       text-[#53667B] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Confirmar usuario
            </button>

            <button
              onClick={() => navigate('/admin/lawyers/create')}
              className="w-full px-6 py-4 bg-[#C6A15B] hover:bg-[#B08F3F]
                       border-2 border-[#C6A15B] rounded-2xl
                       text-white text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Buscar de nuevo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserFound;
