import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointment } from '../context/AppointmentContext';
import { getLawyersBySpecialty } from '../services/lawyers';
import { MdOutlineArrowBack, MdHome, MdPerson } from 'react-icons/md';

function LawyerCard({ lawyer, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-medium 
                  border ${selected ? 'border-[#C6A15B] border-2' : 'border-black/5'} transition-all p-6 sm:p-8 
                  flex flex-col items-center justify-center gap-3`}
    >
      <div className="p-3 rounded-full bg-[#6C7F94] text-white">
        <MdPerson className="w-12 h-12 sm:w-14 sm:h-14" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-black text-center">{lawyer.name}</h3>
    </button>
  );
}

function NewAppointmentLawyer() {
  const navigate = useNavigate();
  const { selectedSpecialty, setSelectedLawyer, resetWizard } = useAppointment();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await getLawyersBySpecialty(selectedSpecialty?.id);
      setLawyers(list);
      setLoading(false);
    })();
  }, [selectedSpecialty]);

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button onClick={() => navigate(-1)} className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors" aria-label="Volver">
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button onClick={() => { resetWizard(); navigate('/dashboard'); }} className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors" aria-label="Inicio">
            <MdHome className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#53667B]">Nuevo turno</h1>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-5 sm:p-8">
          <h2 className="text-center text-xl sm:text-2xl font-extrabold text-black mb-6">Seleccione el abogado</h2>

          {loading ? (
            <p className="text-center text-[#53667B]">Cargando…</p>
          ) : lawyers.length === 0 ? (
            <p className="text-center text-[#53667B]">No hay abogados disponibles para esta especialidad.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {lawyers.map(l => (
                <LawyerCard
                  key={l.id}
                  lawyer={l}
                  selected={selectedId === l.id}
                  onClick={() => {
                    setSelectedId(l.id);
                    setSelectedLawyer(l);
                    navigate('/appointments/new/datetime');
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

export default NewAppointmentLawyer;
