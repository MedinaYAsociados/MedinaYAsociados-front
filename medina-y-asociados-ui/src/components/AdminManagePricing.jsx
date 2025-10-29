import React, { useState } from "react";

export default function AdminManagePricing({ onBack, onHome }) {
  // Mock: precio actual
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e2ceaa] rounded-4xl">
      <div className="w-[370px] p-6 rounded-3xl bg-[#cdb88f] flex flex-col items-center shadow-lg">
        {/* Header */}
        <div className="flex w-full justify-between mb-2">
          <button onClick={onBack} className="text-3xl text-[#3d3d3d] hover:scale-110 transition">←</button>
          <button onClick={onHome} className="text-3xl text-[#3d3d3d] hover:scale-110 transition">🏠</button>
        </div>
        <h2 className="text-3xl font-bold text-[#3d3d3d] mb-8 text-center">Gestionar precios</h2>
        {/* Precio actual */}
        <div className="w-full mb-6">
          <div className="bg-[#f7f3ea] rounded-t-2xl px-4 py-2 text-xl font-semibold text-center">Precio actual</div>
          <div className="bg-[#d9d9d9] rounded-b-2xl px-4 py-2 text-xl font-bold text-center shadow">{currentPrice.toLocaleString()} ARS</div>
        </div>
        {/* Nuevo precio */}
        <div className="w-full mb-8">
          <div className="bg-[#f7f3ea] rounded-t-2xl px-4 pt-2 pb-0 text-xl font-semibold text-left">Nuevo Precio:</div>
          <div className="bg-[#f7f3ea] rounded-b-2xl px-4 pb-2 pt-2 flex items-center">
            <input
              className="w-full bg-[#d9d9d9] rounded-2xl px-3 py-2 text-xl font-semibold text-[#7c7c7c] focus:outline-none"
              type="number"
              min="0"
              placeholder="escriba aqui"
              value={newPrice}
              onChange={e => setNewPrice(e.target.value)}
            />
          </div>
        </div>
        {/* Botones */}
        <button
          className="w-full py-3 mb-3 rounded-2xl bg-[#b6e7b0] text-white text-xl font-bold shadow hover:scale-[1.03] transition"
          onClick={handleConfirm}
        >
          Confirmar precio
        </button>
        <button
          className="w-full py-3 rounded-2xl bg-[#a98c6f] text-white text-xl font-bold shadow hover:scale-[1.03] transition border border-[#7c5c3b]"
          onClick={onBack}
        >
          Cancelar precio
        </button>
      </div>
      {/* Mensaje de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-[#f7f3ea] rounded-3xl p-8 shadow-xl text-center">
            <h3 className="text-2xl font-bold text-[#3d3d3d] mb-4">¡Precio actualizado!</h3>
            <p className="text-lg text-[#3d3d3d] mb-6">El nuevo precio de la consulta es <span className="font-bold">{currentPrice.toLocaleString()} ARS</span></p>
            <button
              className="px-6 py-2 rounded-2xl bg-[#b6e7b0] text-white text-lg font-bold shadow hover:scale-[1.03] transition"
              onClick={handleCloseConfirm}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
