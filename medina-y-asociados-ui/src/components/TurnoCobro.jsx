import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { getDetallesCobro } from '../services/turnos';
import { formatAppointmentDate } from '../utils/date';

function TurnoCobro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cobro, setCobro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getDetallesCobro(id)
      .then((res) => { if (!cancelled) setCobro(res); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const statusColors = {
    Pendiente: 'bg-yellow-200 text-yellow-800',
    Pagado: 'bg-green-200 text-green-800',
    Cancelado: 'bg-red-200 text-red-800',
    Reembolsado: 'bg-purple-200 text-purple-800',
  };

  function formatDate(iso) {
    if (!iso) return '—';
    return formatAppointmentDate(iso);
  }

  function formatCurrency(amount) {
    if (amount == null) return '—';
    return `$${Number(amount).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 flex items-center justify-center">
        <p className="text-[#53667B] text-lg font-semibold">Cargando datos del cobro...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 flex items-center justify-center">
        <p className="text-[#53667B] text-lg font-semibold">{error}</p>
      </div>
    );
  }

  const displayCobro = cobro;

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button onClick={() => navigate(-1)} className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors" aria-label="Volver">
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button onClick={() => navigate('/dashboard/lawyer')} className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors" aria-label="Inicio">
            <MdHome className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#53667B]">Cobro - N° Turno: {id}</h1>
        </div>

        {!displayCobro ? (
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-5 sm:p-8">
            <p className="text-center text-[#53667B] text-lg font-semibold">
              No hay información de cobro para este turno.
            </p>
          </div>
        ) : (
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-5 sm:p-8 space-y-5">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
              <div className="bg-white px-5 py-3 text-center">
                <h3 className="text-xl font-extrabold text-black">Resumen del Cobro</h3>
              </div>
              <div className="bg-gray-100 px-5 py-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#53667B] text-lg">Importe Total</span>
                  <span className="font-bold text-2xl text-black">{formatCurrency(displayCobro.importeTotal)}</span>
                </div>
                {displayCobro.nombreEstado && (
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#53667B]">Estado</span>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${statusColors[displayCobro.nombreEstado] || 'bg-gray-200 text-black'}`}>
                      {displayCobro.nombreEstado}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {displayCobro.detalles && displayCobro.detalles.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
                <div className="bg-white px-5 py-3 text-center">
                  <h3 className="text-xl font-extrabold text-black">Detalles del Cobro</h3>
                </div>
                <div className="bg-gray-100 px-5 py-4 space-y-3">
                  {displayCobro.detalles.map((det, index) => (
                    <div key={det.idDetalleCobro || index} className="bg-white rounded-xl p-4 border border-gray-200 space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-black">{det.tipoCobro?.nombreTipoCobro || 'Detalle'}</p>
                          {det.descripcionCobro && (
                            <p className="text-sm text-[#53667B]">{det.descripcionCobro}</p>
                          )}
                        </div>
                        <span className="font-bold text-lg text-black">{formatCurrency(det.subTotal)}</span>
                      </div>
                      {det.fecha && (
                        <p className="text-xs text-[#53667B]">{formatDate(det.fecha)}</p>
                      )}
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                    <span className="font-bold text-lg text-[#53667B]">Total</span>
                    <span className="font-bold text-2xl text-black">{formatCurrency(displayCobro.importeTotal)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TurnoCobro;
