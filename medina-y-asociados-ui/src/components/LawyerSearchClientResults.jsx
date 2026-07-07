import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function ClientResultCard({ client, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden hover:shadow-medium transition-shadow"
    >
      <div className="p-4">
        <p className="text-[#3D3229] text-xl font-bold text-center">{client.name || `${client.nombre || ''} ${client.apellido || ''}`}</p>
      </div>
    </button>
  );
}

function LawyerSearchClientResults({ results, onBack, onHome, onViewClient, onSearchAgain }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Volver"
          >
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button 
            onClick={onHome}
            className="p-2.5 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Inicio"
          >
            <MdHome className="w-5 h-5" />
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D3229] text-center mb-6 animate-slide-up">
          Resultados de búsqueda
        </h2>

        {/* Results container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6 mb-6 animate-slide-up">
          {results.length === 0 ? (
            <p className="text-center text-[#3D3229] py-8">No se encontraron clientes con los criterios especificados.</p>
          ) : (
            <div className="grid gap-4">
              {results.map(client => (
                <ClientResultCard 
                  key={client.id} 
                  client={client} 
                  onClick={() => onViewClient(client)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Volver a buscar button */}
        <div className="animate-slide-up">
          <button
            onClick={onSearchAgain}
            className="w-full px-6 py-3.5 bg-[#B8D4A5] 
                     border-2 border-[#3D3229] rounded-xl
                     text-[#3D3229] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30"
          >
            Volver a buscar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LawyerSearchClientResults;
