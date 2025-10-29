import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function InfoCard({ label, value }) {
  return (
    <div className="bg-white/90 rounded-2xl shadow-soft overflow-hidden">
      <div className="bg-white/60 px-4 py-3 text-center border-b border-black/5">
        <h3 className="text-lg font-bold text-[#3D3229]">{label}</h3>
      </div>
      <div className="bg-black/5 p-4">
        <p className="text-[#3D3229] text-lg font-semibold text-center">
          {value || '-'}
        </p>
      </div>
    </div>
  );
}

function AdminUserFound({ user, onBack, onHome, onConfirm, onSearchAgain }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* Header con botones de navegación y título */}
        <div className="flex items-start justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3D3229] mt-2">
            Usuario
          </h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-3 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
              aria-label="Volver"
            >
              <MdOutlineArrowBack className="w-6 h-6" />
            </button>
            <button 
              onClick={onHome}
              className="p-3 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
              aria-label="Inicio"
            >
              <MdHome className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenedor principal */}
        <div className="bg-[#D4C3A4]/70 rounded-3xl p-6 sm:p-8 space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          
          {/* Nombre y apellido */}
          <InfoCard 
            label="Nombre y apellido" 
            value={user.name} 
          />

          {/* Teléfono */}
          <InfoCard 
            label="Telefono" 
            value={user.phone || user.telefono} 
          />

          {/* Localidad */}
          <InfoCard 
            label="Localidad" 
            value={user.localidad || user.locality} 
          />

          {/* Calle */}
          <InfoCard 
            label="Calle" 
            value={user.street || user.calle} 
          />

          {/* Numero */}
          <InfoCard 
            label="Numero" 
            value={user.number || user.numero} 
          />

          {/* Piso y Depto */}
          <div className="grid grid-cols-2 gap-4">
            <InfoCard 
              label="Piso" 
              value={user.floor || user.piso} 
            />
            <InfoCard 
              label="Depto" 
              value={user.apartment || user.departamento} 
            />
          </div>

          {/* Email */}
          <InfoCard 
            label="Email" 
            value={user.email} 
          />

          {/* Botones de acción */}
          <div className="space-y-3 pt-4">
            <button
              onClick={onConfirm}
              className="w-full px-6 py-4 bg-[#B8D4A5] hover:bg-[#A8C495]
                       border-2 border-[#3D3229] rounded-2xl
                       text-[#3D3229] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30"
            >
              Confirmar usuario
            </button>

            <button
              onClick={onSearchAgain}
              className="w-full px-6 py-4 bg-[#9F8A66] hover:bg-[#8F7A56]
                       border-2 border-[#3D3229] rounded-2xl
                       text-white text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#9F8A66]/30"
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
