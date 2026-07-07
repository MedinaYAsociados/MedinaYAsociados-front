import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function AdminCreateLawyer() {
  const navigate = useNavigate();
  const [dni, setDni] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = () => {
    if (!dni.trim()) {
      setErrorMessage('Por favor ingrese un DNI');
      return;
    }
    
    setErrorMessage('');
    
    // TODO: Buscar usuario en el backend
    console.log('Buscando usuario con DNI:', dni);
    
    // Mock: simular búsqueda de usuario
    // Simular que solo encuentra usuarios con DNI específicos
    const mockUsers = {
      '12345678': {
        id: 'user-123',
        dni: '12345678',
        name: 'Manuel Veronese',
        email: 'manuelveronese@gmail.com',
        phone: '3534123123',
        localidad: 'Villa Maria',
        calle: 'America',
        numero: '1256',
        piso: '',
        departamento: '',
        role: 'client'
      },
      '23456789': {
        id: 'user-456',
        dni: '23456789',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '3534234567',
        localidad: 'Capital',
        calle: 'San Martín',
        numero: '321',
        piso: '1',
        departamento: 'A',
        role: 'client'
      }
    };
    
    const foundUser = mockUsers[dni];
    
    if (foundUser) {
      navigate('/admin/lawyers/create/user-found', { state: { user: foundUser } });
    } else {
      setErrorMessage('No se encontró ningún usuario con ese DNI');
    }
  };

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header con botones de navegación y título */}
        <div className="flex items-start justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#53667B] mt-2">
            Buscar usuario
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
        <div className="bg-white/70 rounded-3xl p-8 sm:p-12 shadow-soft animate-slide-up" style={{ animationDelay: '100ms' }}>
          <p className="text-center text-[#53667B] text-lg sm:text-xl font-semibold leading-relaxed mb-8">
            Ingrese el DNI del usuario que desea crear como Abogado
          </p>

          {/* Input de DNI */}
          <div className="mb-8">
            <div className="flex items-center gap-3 bg-white/90 rounded-2xl px-4 py-4 shadow-soft border border-[#C6A15B]/10">
              <label className="text-[#53667B] font-bold text-lg whitespace-nowrap">
                DNI:
              </label>
              <input
                type="text"
                value={dni}
                onChange={(e) => {
                  setDni(e.target.value);
                  setErrorMessage(''); // Limpiar error al escribir
                }}
                placeholder="escriba aqui"
                className="flex-1 bg-transparent text-[#53667B] text-lg placeholder:text-gray-400 
                         focus:outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>

          {/* Mensaje de error */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-2xl animate-slide-up">
              <p className="text-red-700 text-center font-semibold">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Botón de búsqueda */}
          <button
            onClick={handleSearch}
            className="w-full px-8 py-5 bg-[#E8DCC4] hover:bg-[#DED2BA]
                     border-2 border-[#C6A15B] rounded-2xl
                     text-[#53667B] text-xl sm:text-2xl font-bold
                     shadow-medium hover:shadow-elevated
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
          >
            Buscar usuario
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateLawyer;
