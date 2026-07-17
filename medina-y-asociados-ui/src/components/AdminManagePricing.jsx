import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { getPrecio, updatePrecio } from '../services/config';

function AdminManagePricing() {
  const navigate = useNavigate();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [newPrice, setNewPrice] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPrecio();
        setCurrentPrice(data.precio || data || 0);
      } catch {
      } finally {
        setFetching(false);
      }
    })();
  }, []);

  const handleConfirm = async () => {
    if (!newPrice || isNaN(Number(newPrice))) {
      alert("Ingrese un precio válido");
      return;
    }
    setLoading(true);
    try {
      await updatePrecio(Number(newPrice));
      setCurrentPrice(Number(newPrice));
      setShowConfirm(true);
    } catch (err) {
      alert(err.message || 'Error al actualizar el precio');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setNewPrice("");
  };

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-start justify-between mb-6 animate-slide-up">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#53667B] mt-2">
            Gestionar precios
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

        <div className="bg-white/70 rounded-3xl p-6 sm:p-8 space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-white/90 rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white/60 px-4 py-3 text-center border-b border-black/5">
              <h3 className="text-lg font-bold text-[#53667B]">Precio actual</h3>
            </div>
            <div className="bg-black/5 p-4">
              <p className="text-[#53667B] text-xl font-bold text-center">
                {fetching ? 'Cargando...' : `${currentPrice.toLocaleString()} ARS`}
              </p>
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl px-4 py-4 shadow-soft border border-[#C6A15B]/10">
            <div className="flex items-center gap-3">
              <label className="text-[#53667B] font-bold text-lg whitespace-nowrap">
                Nuevo Precio:
              </label>
              <input
                type="number"
                min="0"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                placeholder="escriba aqui"
                className="flex-1 bg-transparent text-[#53667B] text-lg placeholder:text-gray-400 
                         focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={handleConfirm}
              disabled={loading || fetching}
              className="w-full px-6 py-4 bg-[#C6A15B] hover:bg-[#A8C495]
                       border-2 border-[#C6A15B] rounded-2xl
                       text-[#53667B] text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Guardando...' : 'Confirmar precio'}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full px-6 py-4 bg-[#C6A15B] hover:bg-[#B08F3F]
                       border-2 border-[#C6A15B] rounded-2xl
                       text-white text-lg sm:text-xl font-bold
                       shadow-medium hover:shadow-elevated
                       active:scale-[0.98] transition-all duration-200
                       focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
            >
              Cancelar
            </button>
          </div>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-[#f7f3ea] rounded-3xl p-8 shadow-xl text-center">
              <h3 className="text-2xl font-bold text-[#53667B] mb-4">¡Precio actualizado!</h3>
              <p className="text-lg text-[#53667B] mb-6">
                El nuevo precio de la consulta es <span className="font-bold">{currentPrice.toLocaleString()} ARS</span>
              </p>
              <button
                onClick={handleCloseConfirm}
                className="px-6 py-3 bg-[#C6A15B] hover:bg-[#A8C495]
                         border-2 border-[#C6A15B] rounded-2xl
                         text-[#53667B] text-lg font-bold
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
