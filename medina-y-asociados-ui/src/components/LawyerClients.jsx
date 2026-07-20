import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function LawyerClients() {
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
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#53667B] text-center mb-6 animate-slide-up">
          Clientes
        </h2>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6 mb-6 animate-slide-up">
          <p className="text-center text-[#53667B] text-lg mb-6">
            Busque un cliente por su DNI para ver su información
          </p>

          <button
            onClick={() => navigate('/lawyer/clients/search')}
            className="w-full px-6 py-3.5 bg-[#C6A15B] 
                     border-2 border-[#C6A15B] rounded-xl
                     text-[#53667B] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
          >
            Buscar cliente
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerClients;
