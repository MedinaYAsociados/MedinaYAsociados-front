import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function ClientResultCard({ client, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden hover:shadow-medium transition-shadow"
    >
      <div className="p-4">
        <p className="text-[#53667B] text-xl font-bold text-center">{client.name || `${client.nombre || ''} ${client.apellido || ''}`}</p>
      </div>
    </button>
  );
}

function LawyerSearchClientResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results || [];
  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
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
          Resultados de búsqueda
        </h2>

        {/* Results container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6 mb-6 animate-slide-up">
          {results.length === 0 ? (
            <p className="text-center text-[#53667B] py-8">No se encontraron clientes con los criterios especificados.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map(client => (
                <ClientResultCard 
                  key={client.id} 
                  client={client} 
                  onClick={() => navigate(`/lawyer/clients/${client.id}`, { state: { client } })}
                />
              ))}
            </div>
          )}
        </div>

        {/* Volver a buscar button */}
        <div className="animate-slide-up">
          <button
            onClick={() => navigate('/lawyer/clients/search')}
            className="w-full px-6 py-3.5 bg-[#C6A15B] 
                     border-2 border-[#C6A15B] rounded-xl
                     text-[#53667B] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
          >
            Volver a buscar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerSearchClientResults;
