import React, { useState } from "react";

const specialtiesList = [
  { name: "FAMILIA", emoji: "⚖️" },
  { name: "PENAL", emoji: "👮‍♂️" },
  { name: "LABORAL", emoji: "💼" },
  { name: "CIVIL", emoji: "🏠" },
  { name: "COMERCIAL", emoji: "🏢" },
  { name: "ADMINISTRATIVO", emoji: "🏛️" },
];

export default function AdminUpdateLawyerForm({ lawyer, onUpdate, onCancel, onGoHome }) {
  // Normalizar specialties a mayúsculas para el renderizado
  const normalizedSpecialties = (lawyer?.specialties || []).map(s => s.toUpperCase());
  const [matricula, setMatricula] = useState(lawyer?.matricula || "");
  const [selectedSpecialties, setSelectedSpecialties] = useState(normalizedSpecialties);

  const handleSpecialtyToggle = (name) => {
    setSelectedSpecialties((prev) =>
      prev.includes(name)
        ? prev.filter((s) => s !== name)
        : [...prev, name]
    );
  };

  const handleUpdate = () => {
    // TODO: Integrar con backend
    if (onUpdate) {
      onUpdate({ ...lawyer, matricula, specialties: selectedSpecialties });
    }
  };

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#e2ceaa] rounded-4xl">
      <div className="w-[370px] p-6 rounded-3xl bg-[#cdb88f] flex flex-col items-center shadow-lg">
        {/* Header */}
        <div className="flex w-full justify-between mb-2">
          <button onClick={onCancel} className="text-3xl text-[#3d3d3d] hover:scale-110 transition">←</button>
          <button onClick={onGoHome} className="text-3xl text-[#3d3d3d] hover:scale-110 transition">🏠</button>
        </div>
        <h2 className="text-3xl font-bold text-[#3d3d3d] mb-4 text-center">Actualizar abogado</h2>
        {/* Nombre y apellido */}
        <div className="w-full mb-4">
          <div className="bg-[#f7f3ea] rounded-t-2xl px-4 py-2 text-xl font-semibold text-center">Nombre y apellido</div>
          <div className="bg-[#d9d9d9] rounded-b-2xl px-4 py-2 text-xl font-bold text-center shadow">{lawyer?.name || "-"}</div>
        </div>
        {/* Matricula */}
        <div className="w-full mb-4">
          <div className="flex items-center bg-[#f7f3ea] rounded-t-2xl px-4 py-2 text-xl font-semibold">
            <span>Matricula:</span>
            <input
              className="ml-2 flex-1 bg-[#d9d9d9] rounded-2xl px-3 py-1 text-xl font-semibold text-[#7c7c7c] focus:outline-none"
              type="text"
              placeholder="escriba aqui"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </div>
        </div>
        {/* Especialidades */}
        <div className="w-full mb-6">
          <div className="bg-[#f7f3ea] rounded-t-2xl px-4 py-2 text-xl font-bold text-center">Especialidades</div>
          <div className="bg-[#f7f3ea] rounded-b-2xl px-2 py-4 flex flex-col gap-3 items-center">
            {specialtiesList.map((spec) => {
              const selected = selectedSpecialties.includes(spec.name);
              return (
                <button
                  key={spec.name}
                  type="button"
                  onClick={() => handleSpecialtyToggle(spec.name)}
                  className={`w-[90%] py-2 text-xl font-bold rounded-2xl shadow text-[#3d3d3d] transition-all ${selected ? "bg-[#b6e7b0]" : "bg-[#d9d9d9]"}`}
                >
                  {spec.name} {spec.emoji}
                </button>
              );
            })}
          </div>
        </div>
        {/* Botones */}
        <button
          className="w-full py-3 mb-3 rounded-2xl bg-[#b6e7b0] text-white text-xl font-bold shadow hover:scale-[1.03] transition"
          onClick={handleUpdate}
        >
          Actualizar abogado
        </button>
        <button
          className="w-full py-3 rounded-2xl bg-[#a98c6f] text-white text-xl font-bold shadow hover:scale-[1.03] transition border border-[#7c5c3b]"
          onClick={onCancel}
        >
          Cancelar abogado
        </button>
      </div>
    </div>
  );
}
