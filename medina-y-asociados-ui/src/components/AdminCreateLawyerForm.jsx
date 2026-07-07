import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function SpecialtyButton({ name, emoji, selected, onClick }) {
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
      {name} {emoji}
    </button>
  );
}

function AdminCreateLawyerForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const [matricula, setMatricula] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  const specialties = [
    { id: 'familia', name: 'FAMILIA', emoji: '⚖️' },
    { id: 'penal', name: 'PENAL', emoji: '👮' },
    { id: 'laboral', name: 'LABORAL', emoji: '💼' },
    { id: 'civil', name: 'CIVIL', emoji: '🏠' },
    { id: 'comercial', name: 'COMERCIAL', emoji: '🏢' },
    { id: 'administrativo', name: 'ADMINISTRATIVO', emoji: '🏛️' }
  ];

  const toggleSpecialty = (specialtyId) => {
    setSelectedSpecialties(prev => {
      if (prev.includes(specialtyId)) {
        return prev.filter(id => id !== specialtyId);
      } else {
        return [...prev, specialtyId];
      }
    });
  };

  const handleConfirm = () => {
    if (!matricula.trim()) {
      alert('Por favor ingrese la matrícula');
      return;
    }
    
    if (selectedSpecialties.length === 0) {
      alert('Por favor seleccione al menos una especialidad');
      return;
    }

    // TODO: Enviar datos al backend
    const lawyerData = {
      ...user,
      matricula,
      specialties: selectedSpecialties,
      role: 'lawyer'
    };
    
    console.log('Creando abogado:', lawyerData);
    navigate('/admin/lawyers');
  };

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header con botones de navegación y título */}
        <div className="flex items-start justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#53667B] mt-2">
            Crear abogado
          </h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
              aria-label="Volver"
            >
              <MdOutlineArrowBack className="w-6 h-6" />
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-3 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
              aria-label="Inicio"
            >
              <MdHome className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          
          {/* Nombre y apellido (solo lectura) */}
          <div className="bg-white/90 rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white/60 px-4 py-3 text-center border-b border-black/5">
              <h3 className="text-lg font-bold text-[#53667B]">Nombre y apellido</h3>
            </div>
            <div className="bg-black/5 p-4">
              <p className="text-[#53667B] text-lg font-semibold text-center">
                {user?.name}
              </p>
            </div>
          </div>

          {/* Input de Matrícula */}
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

          {/* Especialidades */}
          <div className="bg-white/90 rounded-2xl p-6 shadow-soft">
            <h3 className="text-xl font-bold text-[#53667B] text-center mb-4">
              Especialidades
            </h3>
            <div className="space-y-3">
              {specialties.map(specialty => (
                <SpecialtyButton
                  key={specialty.id}
                  name={specialty.name}
                  emoji={specialty.emoji}
                  selected={selectedSpecialties.includes(specialty.id)}
                  onClick={() => toggleSpecialty(specialty.id)}
                />
              ))}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleConfirm}
              className="w-full px-6 py-4 bg-[#C6A15B] hover:bg-[#A8C495]
                       border-2 border-[#C6A15B] rounded-2xl
                       text-[#53667B] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Confirmar abogado
            </button>

            <button
              onClick={() => navigate('/admin/lawyers')}
              className="w-full px-6 py-4 bg-[#C6A15B] hover:bg-[#B08F3F]
                       border-2 border-[#C6A15B] rounded-2xl
                       text-white text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Cancelar abogado
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateLawyerForm;
