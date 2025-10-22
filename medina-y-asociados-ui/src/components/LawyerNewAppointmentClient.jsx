import { useState } from 'react';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function LawyerNewAppointmentClient({ onBack, onHome, onContinue }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    locality: '',
    street: '',
    number: '',
    floor: '',
    apartment: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que los campos requeridos estén completos
    if (!formData.firstName || !formData.lastName || !formData.dni || !formData.phone) {
      alert('Por favor complete los campos obligatorios');
      return;
    }
    // Continuar con el flujo normal de turno
    onContinue(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-8 animate-fade-in">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Header con botones */}
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Volver"
          >
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button 
            onClick={onHome}
            className="p-2.5 rounded-full border-2 border-[#3D3229] text-[#3D3229] hover:bg-white/40 transition-colors"
            aria-label="Inicio"
          >
            <MdHome className="w-5 h-5" />
          </button>
        </div>

        {/* Card del Formulario */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 animate-slide-up">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3D3229] mb-1">
              Datos Cliente
            </h2>
            <p className="text-[#3D3229]/80 text-sm sm:text-base">
              Ingrese los datos del cliente para el turno
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="block text-[#3D3229] text-sm sm:text-base font-semibold">
                Nombre
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#3D3229] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
                required
              />
            </div>

            {/* Apellido */}
            <div className="space-y-2">
              <label className="block text-[#3D3229] text-sm sm:text-base font-semibold">
                Apellido
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#3D3229] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
                required
              />
            </div>

            {/* DNI */}
            <div className="space-y-2">
              <label className="block text-[#3D3229] text-sm sm:text-base font-semibold">
                DNI
              </label>
              <input
                type="text"
                value={formData.dni}
                onChange={(e) => handleChange('dni', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#3D3229] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
                required
              />
            </div>

            {/* Telefono */}
            <div className="space-y-2">
              <label className="block text-[#3D3229] text-sm sm:text-base font-semibold">
                Telefono
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#3D3229] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
                required
              />
            </div>

            {/* Localidad */}
            <div className="space-y-2">
              <label className="block text-[#3D3229] text-sm sm:text-base font-semibold">
                Localidad
              </label>
              <select
                value={formData.locality}
                onChange={(e) => handleChange('locality', e.target.value)}
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#3D3229] text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium appearance-none cursor-pointer"
              >
                <option value="">Seleccionar</option>
                <option value="Rosario">Rosario</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Buenos Aires">Buenos Aires</option>
              </select>
            </div>

            {/* Calle */}
            <div className="space-y-2">
              <label className="block text-[#3D3229] text-sm sm:text-base font-semibold">
                Calle
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => handleChange('street', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#3D3229] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
              />
            </div>

            {/* Numero */}
            <div className="space-y-2">
              <label className="block text-[#3D3229] text-sm sm:text-base font-semibold">
                Numero
              </label>
              <input
                type="text"
                value={formData.number}
                onChange={(e) => handleChange('number', e.target.value)}
                placeholder="Escribe aquí"
                className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                         text-[#3D3229] placeholder-[#9C8B78]/60 text-sm sm:text-base
                         focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                         transition-all shadow-soft hover:shadow-medium"
              />
            </div>

            {/* Piso y Departamento */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="block text-[#3D3229] text-sm sm:text-base font-semibold">
                  Piso
                </label>
                <input
                  type="text"
                  value={formData.floor}
                  onChange={(e) => handleChange('floor', e.target.value)}
                  placeholder="Escribe aquí"
                  className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                           text-[#3D3229] placeholder-[#9C8B78]/60 text-sm sm:text-base
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                           transition-all shadow-soft hover:shadow-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[#3D3229] text-sm sm:text-base font-semibold">
                  Departamento
                </label>
                <input
                  type="text"
                  value={formData.apartment}
                  onChange={(e) => handleChange('apartment', e.target.value)}
                  placeholder="Escribe aquí"
                  className="w-full px-4 py-2.5 bg-white/60 border-2 border-[#6B4423]/30 rounded-xl 
                           text-[#3D3229] placeholder-[#9C8B78]/60 text-sm sm:text-base
                           focus:outline-none focus:border-[#6B4423] focus:ring-4 focus:ring-[#6B4423]/10
                           transition-all shadow-soft hover:shadow-medium"
                />
              </div>
            </div>

            {/* Botón Seguir */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#8FBC8F] hover:bg-[#7FA97F] border-2 border-[#3D3229] text-[#3D3229] 
                       font-bold text-lg sm:text-xl rounded-xl shadow-medium hover:shadow-elevated active:scale-[0.99] 
                       transition-all mt-6 focus:outline-none focus:ring-4 focus:ring-[#8FBC8F]/30"
            >
              Seguir con turno
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LawyerNewAppointmentClient;
