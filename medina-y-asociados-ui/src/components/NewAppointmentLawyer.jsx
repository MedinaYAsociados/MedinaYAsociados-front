import { useEffect, useState } from 'react';
import { getLawyersBySpecialty } from '../services/lawyers';
import { MdOutlineArrowBack, MdHome, MdPerson } from 'react-icons/md';

function LawyerCard({ lawyer, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft hover:shadow-medium 
                  border ${selected ? 'border-[#3D3229] border-2' : 'border-black/5'} transition-all p-6 sm:p-8 
                  flex flex-col items-center justify-center gap-3`}
    >
      <div className="p-3 rounded-full bg-[#3D3229] text-white">
        <MdPerson className="w-12 h-12 sm:w-14 sm:h-14" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-black text-center">{lawyer.name}</h3>
    </button>
  );
}

function NewAppointmentLawyer({ selectedSpecialty, onBack, onHome, onSelect }) {
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
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 text-[#3D3229] mb-4">
          <button onClick={onBack} className="p-2 rounded-xl border-2 border-[#3D3229]/30 hover:bg-white/40 transition-colors" aria-label="Volver">
            <MdOutlineArrowBack className="w-9 h-9" />
          </button>
          <button onClick={onHome} className="p-2 rounded-xl border-2 border-[#3D3229]/30 hover:bg-white/40 transition-colors" aria-label="Inicio">
            <MdHome className="w-9 h-9" />
          </button>
          <h1 className="ml-2 text-2xl sm:text-3xl font-extrabold">Nuevo turno</h1>
        </div>

        {/* Container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-5 sm:p-8">
          <h2 className="text-center text-xl sm:text-2xl font-extrabold text-black mb-6">Seleccione el abogado</h2>

          {loading ? (
            <p className="text-center text-[#3D3229]">Cargando…</p>
          ) : lawyers.length === 0 ? (
            <p className="text-center text-[#3D3229]">No hay abogados disponibles para esta especialidad.</p>
          ) : (
            <div className="grid gap-4">
              {lawyers.map(l => (
                <LawyerCard
                  key={l.id}
                  lawyer={l}
                  selected={selectedId === l.id}
                  onClick={() => {
                    setSelectedId(l.id);
                    onSelect && onSelect(l);
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
