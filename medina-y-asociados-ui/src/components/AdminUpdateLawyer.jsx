import { useState, useEffect } from 'react';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function LawyerCard({ lawyer, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-6 py-4 bg-white/90 hover:bg-white
               rounded-2xl shadow-soft hover:shadow-medium
               text-[#3D3229] text-lg sm:text-xl font-semibold
               transition-all duration-200 active:scale-[0.98]
               border border-[#3D3229]/10"
    >
      {lawyer.name}
    </button>
  );
}

function AdminUpdateLawyer({ onBack, onHome, onSelectLawyer }) {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Cargar abogados desde el backend
    // Simulando carga de datos
    setTimeout(() => {
      const mockLawyers = [
        {
          id: 'lawyer-1',
          name: 'Ramiro Doglio',
          email: 'ramiro@example.com',
          matricula: '12345',
          specialties: ['familia', 'civil'],
          phone: '3534234567',
          localidad: 'Capital'
        },
        {
          id: 'lawyer-2',
          name: 'Manuel Veronese',
          email: 'manuelveronese@gmail.com',
          matricula: '23456',
          specialties: ['penal', 'laboral'],
          phone: '3534123123',
          localidad: 'Villa Maria'
        },
        {
          id: 'lawyer-3',
          name: 'Juan Perez',
          email: 'juan@example.com',
          matricula: '34567',
          specialties: ['comercial'],
          phone: '3534345678',
          localidad: 'Capital'
        },
        {
          id: 'lawyer-4',
          name: 'Santiago Gonzales',
          email: 'santiago@example.com',
          matricula: '45678',
          specialties: ['administrativo', 'civil'],
          phone: '3534456789',
          localidad: 'Guaymallén'
        },
        {
          id: 'lawyer-5',
          name: 'Catalina Pereira',
          email: 'catalina@example.com',
          matricula: '56789',
          specialties: ['familia', 'penal'],
          phone: '3534567890',
          localidad: 'Luján'
        }
      ];
      
      setLawyers(mockLawyers);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        {/* Header con botones de navegación y título */}
        <div className="flex items-start justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3D3229] mt-2">
            Actualizar abogado
          </h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-3 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
              aria-label="Volver"
            >
              <MdOutlineArrowBack className="w-6 h-6" />
            </button>
            <button 
              onClick={onHome}
              className="p-3 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
              aria-label="Inicio"
            >
              <MdHome className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenedor principal */}
        <div className="bg-[#D4C3A4]/70 rounded-3xl p-6 sm:p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-[#3D3229] text-lg">Cargando abogados...</p>
            </div>
          ) : lawyers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#3D3229] text-lg">No hay abogados registrados</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lawyers.map((lawyer) => (
                <LawyerCard
                  key={lawyer.id}
                  lawyer={lawyer}
                  onClick={() => {
                    // Normalizar specialties a mayúsculas para el form
                    const normalizedLawyer = {
                      ...lawyer,
                      specialties: (lawyer.specialties || []).map(s => s.toUpperCase()),
                    };
                    onSelectLawyer && onSelectLawyer(normalizedLawyer);
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
