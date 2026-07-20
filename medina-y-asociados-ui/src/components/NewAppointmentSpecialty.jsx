import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext';
import { getSpecialties } from '../services/specialties';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function SpecialtyCard({ sp, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-medium 
                  border ${selected ? 'border-[#C6A15B] border-2' : 'border-black/5'} transition-all p-4 sm:p-5`}
    >
      <h3 className="text-xl sm:text-2xl font-extrabold text-[#53667B] mb-2">{sp.title}</h3>
      <p className="text-[#53667B]/90 text-sm sm:text-base leading-relaxed">{sp.description}</p>
    </button>
  );
}

function NewAppointmentSpecialty() {
  const navigate = useNavigate();
  const { setSelectedSpecialty, resetWizard } = useAppointment();
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await getSpecialties();
      setSpecialties(list);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 text-[#53667B] mb-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl border-2 border-[#C6A15B]/30 hover:bg-[#C6A15B]/20 transition-colors" aria-label="Volver">
            <MdOutlineArrowBack className="w-9 h-9" />
          </button>
          <button onClick={() => { resetWizard(); navigate('/dashboard'); }} className="p-2 rounded-xl border-2 border-[#C6A15B]/30 hover:bg-[#C6A15B]/20 transition-colors" aria-label="Inicio">
            <MdHome className="w-9 h-9" />
          </button>
          <h1 className="ml-2 text-2xl sm:text-3xl font-extrabold">Nuevo turno</h1>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-5 sm:p-8">
          <h2 className="text-center text-xl sm:text-2xl font-extrabold text-[#53667B] mb-4">Seleccione especialidad</h2>

          {loading ? (
            <p className="text-center text-[#53667B]">Cargando…</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {specialties.map(sp => (
                <SpecialtyCard
                  key={sp.id}
                  sp={sp}
                  selected={selectedId === sp.id}
                  onClick={() => {
                    setSelectedId(sp.id);
                    setSelectedSpecialty(sp);
                    navigate('/appointments/new/lawyer');
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

export default NewAppointmentSpecialty;
