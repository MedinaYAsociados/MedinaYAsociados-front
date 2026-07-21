import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { listarAbogados } from '../services/abogados';

function LawyerCard({ lawyer, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-6 py-4 bg-white/90 hover:bg-white
               rounded-2xl shadow-soft hover:shadow-medium
               text-[#53667B] text-lg sm:text-xl font-semibold
               transition-all duration-200 active:scale-[0.98]
               border border-[#C6A15B]/10"
    >
      {lawyer.name}
    </button>
  );
}

function AdminUpdateLawyer() {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const data = await listarAbogados();
        if (mounted) setLawyers(data);
      } catch {
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

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

        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-[#53667B] text-lg">Cargando abogados...</p>
            </div>
          ) : lawyers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#53667B] text-lg">No hay abogados registrados</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lawyers.map((lawyer) => (
                <LawyerCard
                  key={lawyer.id}
                  lawyer={lawyer}
                  onClick={() => {
                    navigate('/admin/lawyers/update/form', { state: { lawyer } });
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUpdateLawyer;
