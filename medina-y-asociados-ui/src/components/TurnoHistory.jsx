import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome } from 'react-icons/md';
import { getHistorial } from '../services/turnos';
import { formatAppointmentDate } from '../utils/date';

function TurnoHistory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getHistorial(id)
      .then((res) => { if (!cancelled) setData(res); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const statusColors = {
    Pendiente: 'bg-yellow-200 text-yellow-800',
    Confirmado: 'bg-green-200 text-green-800',
    Completado: 'bg-blue-200 text-blue-800',
    Cancelado: 'bg-red-200 text-red-800',
    Reprogramado: 'bg-purple-200 text-purple-800',
    Asistió: 'bg-teal-200 text-teal-800',
    'No Asistió': 'bg-orange-200 text-orange-800',
    Pagado: 'bg-indigo-200 text-indigo-800',
    'En Curso': 'bg-cyan-200 text-cyan-800',
  };

  function formatDate(iso) {
    if (!iso) return '—';
    return formatAppointmentDate(iso);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 flex items-center justify-center">
        <p className="text-[#53667B] text-lg font-semibold">Cargando historial...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 flex items-center justify-center">
        <p className="text-[#53667B] text-lg font-semibold">{error || 'No se encontró el historial del turno.'}</p>
      </div>
    );
  }

  const isLawyerRoute = window.location.pathname.startsWith('/lawyer');

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button onClick={() => navigate(-1)} className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors" aria-label="Volver">
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button onClick={() => navigate(isLawyerRoute ? '/dashboard/lawyer' : '/dashboard')} className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors" aria-label="Inicio">
            <MdHome className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#53667B]">Historial - N° Turno: {data.idTurno}</h1>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-5 sm:p-8 space-y-5">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft overflow-hidden">
            <div className="bg-white px-5 py-3 text-center">
              <h3 className="text-xl font-extrabold text-black">Información del Turno</h3>
            </div>
            <div className="bg-gray-100 px-5 py-4 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-[#53667B]">Cliente:</span>
                <span className="font-bold text-black">{data.nombreCliente}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#53667B]">Abogado:</span>
                <span className="font-bold text-black">{data.nombreAbogado}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#53667B]">Especialidad:</span>
                <span className="font-bold text-black">{data.nombreEspecialidad}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-[#53667B]">Fecha y Hora:</span>
                <span className="font-bold text-black">{formatDate(data.horarioTurno)}</span>
              </div>
              {data.observacionesCliente && (
                <div className="flex justify-between">
                  <span className="font-semibold text-[#53667B]">Obs. Cliente:</span>
                  <span className="font-bold text-black">{data.observacionesCliente}</span>
                </div>
              )}
              {data.observacionesAbogado && (
                <div className="flex justify-between">
                  <span className="font-semibold text-[#53667B]">Obs. Abogado:</span>
                  <span className="font-bold text-black">{data.observacionesAbogado}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-4 flex items-center justify-between gap-3">
            <div className="flex-1 bg-gray-200 rounded-xl px-5 py-3 text-center">
              <p className="text-lg font-bold text-black">Estado Actual</p>
            </div>
            <div className={`flex-1 rounded-xl px-5 py-3 text-center font-bold text-lg ${statusColors[data.nombreEstado] || 'bg-gray-200 text-black'}`}>
              {data.nombreEstado}
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft p-5 sm:p-6">
            <h3 className="text-xl font-extrabold text-black text-center mb-6">Línea de Tiempo</h3>
            {data.historial && data.historial.length > 0 ? (
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#C6A15B]/40"></div>
                {data.historial.map((entry, index) => (
                  <div key={entry.idHistorial || index} className="relative pl-12 pb-6 last:pb-0">
                    <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-[#C6A15B] border-2 border-white"></div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusColors[entry.nombreEstado] || 'bg-gray-200 text-black'}`}>
                          {entry.nombreEstado}
                        </span>
                        <span className="text-sm text-[#53667B] font-semibold">
                          {formatDate(entry.fechaHoraInicio)}
                        </span>
                      </div>
                      {entry.ambitoEstado && (
                        <p className="text-sm text-[#53667B]">
                          <span className="font-semibold">Ámbito:</span> {entry.ambitoEstado}
                        </p>
                      )}
                      {entry.fechaHoraFin && (
                        <p className="text-sm text-[#53667B] mt-1">
                          <span className="font-semibold">Hasta:</span> {formatDate(entry.fechaHoraFin)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-[#53667B]">No hay entradas en el historial.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurnoHistory;
