import { useState } from "react";
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';

function AdminManagePricing({ onBack, onHome }) {
  const [currentPrice, setCurrentPrice] = useState(10000);
  const [newPrice, setNewPrice] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    if (!newPrice || isNaN(Number(newPrice))) {
      alert("Ingrese un precio válido");
      return;
    }
    setCurrentPrice(Number(newPrice));
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setNewPrice("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#3D3229] mt-2">
            Gestionar precios
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

        <div className="bg-[#D4C3A4]/70 rounded-3xl p-6 sm:p-8 space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-white/90 rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white/60 px-4 py-3 text-center border-b border-black/5">
              <h3 className="text-lg font-bold text-[#3D3229]">Precio actual</h3>
            </div>
            <div className="bg-black/5 p-4">
              <p className="text-[#3D3229] text-xl font-bold text-center">
                {currentPrice.toLocaleString()} ARS
              </p>
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl px-4 py-4 shadow-soft border border-[#3D3229]/10">
            <div className="flex items-center gap-3">
              <label className="text-[#3D3229] font-bold text-lg whitespace-nowrap">
                Nuevo Precio:
              </label>
              <input
                type="number"
                min="0"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                placeholder="escriba aqui"
                className="flex-1 bg-transparent text-[#3D3229] text-lg placeholder:text-gray-400 
                         focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={handleConfirm}
              className="w-full px-6 py-4 bg-[#B8D4A5] hover:bg-[#A8C495]
                       border-2 border-[#3D3229] rounded-2xl
                       text-[#3D3229] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#B8D4A5]/30"
            >
              Confirmar precio
            </button>
            <button
              onClick={onBack}
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

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-[#f7f3ea] rounded-3xl p-8 shadow-xl text-center">
              <h3 className="text-2xl font-bold text-[#3D3229] mb-4">¡Precio actualizado!</h3>
              <p className="text-lg text-[#3D3229] mb-6">
                El nuevo precio de la consulta es <span className="font-bold">{currentPrice.toLocaleString()} ARS</span>
              </p>
              <button
                onClick={handleCloseConfirm}
                className="px-6 py-3 bg-[#B8D4A5] hover:bg-[#A8C495]
                         border-2 border-[#3D3229] rounded-2xl
                         text-[#3D3229] text-lg font-bold
                         shadow-medium hover:shadow-elevated
                         active:scale-[0.98] transition-all duration-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminManagePricing;
