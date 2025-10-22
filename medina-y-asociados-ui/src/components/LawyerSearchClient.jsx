import { useState } from 'react';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function LawyerSearchClient({ onBack, onHome, onSearch }) {
  const [filters, setFilters] = useState({
    name: '',
    dni: '',
    localidad: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que al menos un campo esté lleno
    const hasAtLeastOneFilter = filters.name.trim() || filters.dni.trim() || filters.localidad.trim();
    
    if (!hasAtLeastOneFilter) {
      alert('Por favor, ingrese al menos un criterio de búsqueda');
      return;
    }
    
    onSearch(filters);
  };

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
          <h1 className="text-xl sm:text-2xl font-bold text-[#3D3229]">
            Buscar cliente
          </h1>
        </div>

        {/* Form container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[#3D3229] text-base sm:text-lg font-bold">
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleChange}
                  placeholder="escriba aqui"
                  className="flex-1 px-4 py-2.5 bg-white/80 border-2 border-[#6B4423]/30 rounded-xl 
                           text-[#3D3229] placeholder-[#9C8B78]/50 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 
                           transition-all shadow-soft hover:shadow-medium"
                />
              </label>
            </div>

            {/* DNI */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[#3D3229] text-base sm:text-lg font-bold">
                DNI:
                <input
                  type="text"
                  name="dni"
                  value={filters.dni}
                  onChange={handleChange}
                  placeholder="escriba aqui"
                  className="flex-1 px-4 py-2.5 bg-white/80 border-2 border-[#6B4423]/30 rounded-xl 
                           text-[#3D3229] placeholder-[#9C8B78]/50 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 
                           transition-all shadow-soft hover:shadow-medium"
                />
              </label>
            </div>

            {/* Localidad */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[#3D3229] text-base sm:text-lg font-bold">
                Localidad:
                <input
                  type="text"
                  name="localidad"
                  value={filters.localidad}
                  onChange={handleChange}
                  placeholder="escriba aqui"
                  className="flex-1 px-4 py-2.5 bg-white/80 border-2 border-[#6B4423]/30 rounded-xl 
                           text-[#3D3229] placeholder-[#9C8B78]/50 text-sm
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10 
                           transition-all shadow-soft hover:shadow-medium"
                />
              </label>
            </div>

            {/* Buscar button */}
            <button
              type="submit"
              className="w-full mt-6 px-6 py-3.5 bg-[#B8D4A5] 
                       border-2 border-[#3D3229] rounded-xl
                       text-[#3D3229] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated hover:bg-[#A8C495] 
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30"
            >
              Buscar cliente
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LawyerSearchClient;
