import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { actualizarMatricula, actualizarEspecialidades } from '../services/abogados';
import { getSpecialties } from '../services/specialties';

function SpecialtyButton({ name, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-4 rounded-2xl font-bold text-lg sm:text-xl
                 border-2 border-[#C6A15B]/20 transition-all duration-200
                 shadow-soft hover:shadow-medium active:scale-[0.98]
                 ${selected 
                   ? 'bg-[#C6A15B] text-[#53667B]' 
                   : 'bg-black/10 text-[#53667B] hover:bg-black/15'
                 }`}
    >
      {name}
    </button>
  );
}

function AdminUpdateLawyerForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const lawyer = location.state?.lawyer;

  const [matricula, setMatricula] = useState(lawyer?.matricula || '');
  const [selectedSpecialties, setSelectedSpecialties] = useState(lawyer?.especialidadesAbogado || []);
  const [loading, setLoading] = useState(false);

  const { data: specialtiesList = [], isLoading: loadingList } = useQuery({
    queryKey: ['especialidades'],
    queryFn: getSpecialties,
    staleTime: 10 * 60 * 1000,
  });

  const handleSpecialtyToggle = (id) => {
    setSelectedSpecialties((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await Promise.all([
        actualizarMatricula(lawyer.idAbogado, matricula.trim()),
        actualizarEspecialidades(lawyer.idAbogado, selectedSpecialties),
      ]);
      queryClient.invalidateQueries({ queryKey: ['abogados'] });
      navigate('/admin/lawyers');
    } catch (err) {
      alert(err.message || 'Error al actualizar el abogado');
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-xl sm:text-2xl font-bold text-[#53667B]">Actualizar abogado</h1>
        </div>

        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-white/90 rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white/60 px-4 py-3 text-center border-b border-black/5">
              <h3 className="text-lg font-bold text-[#53667B]">Nombre y apellido</h3>
            </div>
            <div className="bg-black/5 p-4">
              <p className="text-[#53667B] text-lg font-semibold text-center">
                {lawyer?.name || '-'}
              </p>
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl px-4 py-4 shadow-soft border border-[#C6A15B]/10">
            <div className="flex items-center gap-3">
              <label className="text-[#53667B] font-bold text-lg whitespace-nowrap">
                Matricula:
              </label>
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="escriba aqui"
                className="flex-1 bg-transparent text-[#53667B] text-lg placeholder:text-gray-400 
                         focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl p-6 shadow-soft">
            <h3 className="text-xl font-bold text-[#53667B] text-center mb-4">
              Especialidades
            </h3>
            {loadingList ? (
              <p className="text-center text-[#53667B]">Cargando especialidades...</p>
            ) : (
              <div className="space-y-3">
                {specialtiesList.map((spec) => (
                  <SpecialtyButton
                    key={spec.id}
                    name={spec.title}
                    selected={selectedSpecialties.includes(spec.id)}
                    onClick={() => handleSpecialtyToggle(spec.id)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={handleUpdate}
              disabled={loading || loadingList}
              className="w-full px-6 py-4 bg-[#C6A15B] hover:bg-[#A8C495]
                       border-2 border-[#C6A15B] rounded-2xl
                       text-[#53667B] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Actualizando...' : 'Actualizar abogado'}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full px-6 py-4 bg-[#C6A15B] hover:bg-[#B08F3F]
                       border-2 border-[#C6A15B] rounded-2xl
                       text-white text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUpdateLawyerForm;
