import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function AdminManageLawyers() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
            aria-label="Volver"
          >
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
            aria-label="Inicio"
          >
            <MdHome className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#53667B]">Administrar Abogado</h1>
        </div>

        <div className="bg-white/70 rounded-3xl p-8 sm:p-12 shadow-soft animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="space-y-6">
            <button
              onClick={() => navigate('/admin/lawyers/create')}
              className="w-full px-8 py-6 bg-[#E8DCC4] hover:bg-[#DED2BA]
                       border-2 border-[#C6A15B] rounded-2xl
                       text-[#53667B] text-xl sm:text-2xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Crear Abogado
            </button>

            <button
              onClick={() => navigate('/admin/lawyers/update')}
              className="w-full px-8 py-6 bg-[#E8DCC4] hover:bg-[#DED2BA]
                       border-2 border-[#C6A15B] rounded-2xl
                       text-[#53667B] text-xl sm:text-2xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
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
