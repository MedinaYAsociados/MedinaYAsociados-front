import { useState } from 'react';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

const specialtiesList = [
  { id: 'familia', name: 'FAMILIA', emoji: '⚖️' },
  { id: 'penal', name: 'PENAL', emoji: '👮' },
  { id: 'laboral', name: 'LABORAL', emoji: '💼' },
  { id: 'civil', name: 'CIVIL', emoji: '🏠' },
  { id: 'comercial', name: 'COMERCIAL', emoji: '🏢' },
  { id: 'administrativo', name: 'ADMINISTRATIVO', emoji: '🏛️' },
];

function SpecialtyButton({ name, emoji, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-6 py-4 rounded-2xl font-bold text-lg sm:text-xl
                 border-2 border-[#3D3229]/20 transition-all duration-200
                 shadow-soft hover:shadow-medium active:scale-[0.98]
                 ${selected 
                   ? 'bg-[#B8D4A5] text-[#3D3229]' 
                   : 'bg-black/10 text-[#3D3229] hover:bg-black/15'
                 }`}
    >
      {name} {emoji}
    </button>
  );
}

function AdminUpdateLawyerForm({ lawyer, onUpdate, onCancel, onGoHome }) {
  const normalizedSpecialties = (lawyer?.specialties || []).map(s => s.toLowerCase());
  const [matricula, setMatricula] = useState(lawyer?.matricula || "");
  const [selectedSpecialties, setSelectedSpecialties] = useState(normalizedSpecialties);

  const handleSpecialtyToggle = (id) => {
    setSelectedSpecialties((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate({ ...lawyer, matricula, specialties: selectedSpecialties });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3D3229] mt-2">
            Actualizar abogado
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="p-3 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
              aria-label="Volver"
            >
              <MdOutlineArrowBack className="w-6 h-6" />
            </button>
            <button
              onClick={onGoHome}
              className="p-3 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
              aria-label="Inicio"
            >
              <MdHome className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="bg-[#D4C3A4]/70 rounded-3xl p-6 sm:p-8 space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-white/90 rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white/60 px-4 py-3 text-center border-b border-black/5">
              <h3 className="text-lg font-bold text-[#3D3229]">Nombre y apellido</h3>
            </div>
            <div className="bg-black/5 p-4">
              <p className="text-[#3D3229] text-lg font-semibold text-center">
                {lawyer?.name || '-'}
              </p>
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl px-4 py-4 shadow-soft border border-[#3D3229]/10">
            <div className="flex items-center gap-3">
              <label className="text-[#3D3229] font-bold text-lg whitespace-nowrap">
                Matricula:
              </label>
              <input
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="escriba aqui"
                className="flex-1 bg-transparent text-[#3D3229] text-lg placeholder:text-gray-400 
                         focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl p-6 shadow-soft">
            <h3 className="text-xl font-bold text-[#3D3229] text-center mb-4">
              Especialidades
            </h3>
            <div className="space-y-3">
              {specialtiesList.map((spec) => (
                <SpecialtyButton
                  key={spec.id}
                  name={spec.name}
                  emoji={spec.emoji}
                  selected={selectedSpecialties.includes(spec.id)}
                  onClick={() => handleSpecialtyToggle(spec.id)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={handleUpdate}
              className="w-full px-6 py-4 bg-[#B8D4A5] hover:bg-[#A8C495]
                       border-2 border-[#3D3229] rounded-2xl
                       text-[#3D3229] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30"
            >
              Actualizar abogado
            </button>
            <button
              onClick={onCancel}
              className="w-full px-6 py-4 bg-[#9F8A66] hover:bg-[#8F7A56]
                       border-2 border-[#3D3229] rounded-2xl
                       text-white text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#9F8A66]/30"
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
