import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function AdminManageLawyers({ onBack, onHome, onCreateLawyer, onUpdateLawyer }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* Header con botones de navegación */}
        <div className="flex items-center justify-end gap-3 mb-6 animate-slide-up">
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

        {/* Contenedor principal más claro */}
        <div className="bg-[#D4C3A4]/70 rounded-3xl p-8 sm:p-12 shadow-soft animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3D3229] text-left mb-12">
            Administrar Abogado
          </h1>

          {/* Botones con color más claro */}
          <div className="space-y-6">
            <button
              onClick={onCreateLawyer}
              className="w-full px-8 py-6 bg-[#E8DCC4] hover:bg-[#DED2BA]
                       border-2 border-[#3D3229] rounded-2xl
                       text-[#3D3229] text-xl sm:text-2xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#3D3229]/20"
            >
              Crear Abogado
            </button>

            <button
              onClick={onUpdateLawyer}
              className="w-full px-8 py-6 bg-[#E8DCC4] hover:bg-[#DED2BA]
                       border-2 border-[#3D3229] rounded-2xl
                       text-[#3D3229] text-xl sm:text-2xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#3D3229]/20"
            >
              Actualizar Abogado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminManageLawyers;
