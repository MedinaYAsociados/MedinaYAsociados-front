import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowBack, MdHome, MdSearch } from 'react-icons/md';
import { buscarPorDni } from '../services/usuarios';

function normalizeUser(u) {
  return {
    ...u,
    id: u.idUsuario || u.id,
    name: `${u.nombre || ''} ${u.apellido || ''}`.trim(),
    phone: u.telefono,
    localidad: u.localidad?.nombreLocalidad || u.localidad,
    calle: u.direccion?.calle,
    numero: u.direccion?.numeroCalle?.toString(),
    piso: u.direccion?.piso,
    departamento: u.direccion?.dpto || u.direccion?.departamento,
  };
}

function LawyerSearchClient() {
  const navigate = useNavigate();
  const [dni, setDni] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!dni.trim()) {
      setResults([]);
      setMessage('Escriba un DNI para buscar clientes');
      return;
    }
    setLoading(true);
    setMessage('');
    timerRef.current = setTimeout(async () => {
      try {
        const data = await buscarPorDni(dni.trim());
        const rawList = data.content || [data];
        const normalized = rawList.filter(Boolean).map(normalizeUser);
        setResults(normalized);
        if (normalized.length === 0) setMessage('No se encontraron clientes con ese DNI');
      } catch {
        setResults([]);
        setMessage('Error al buscar clientes');
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [dni]);

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6 animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6 animate-slide-up">
          <button 
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
            aria-label="Volver"
          >
            <MdOutlineArrowBack className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2.5 rounded-full border-2 border-[#C6A15B] text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors"
            aria-label="Inicio"
          >
            <MdHome className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-[#53667B]">
            Buscar cliente
          </h1>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-6 sm:p-8 animate-slide-up space-y-4">
          <div className="flex items-center gap-3 bg-white/90 rounded-2xl px-4 py-3 shadow-soft border-2 border-[#C6A15B]/20">
            <MdSearch className="w-6 h-6 text-[#53667B]" />
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="escriba aqui"
              autoFocus
              className="flex-1 bg-transparent text-[#53667B] text-lg placeholder:text-gray-400 
                       focus:outline-none"
            />
            {loading && (
              <span className="text-[#53667B] text-sm font-semibold">Buscando...</span>
            )}
          </div>

          {message && !loading && (
            <p className="text-center text-[#53667B] text-base">{message}</p>
          )}

          {results.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map(client => (
                <button
                  key={client.id}
                  onClick={() => navigate(`/lawyer/clients/${client.id}`)}
                  className="w-full rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden 
                           hover:shadow-medium transition-shadow text-left"
                >
                  <div className="p-4">
                    <p className="text-[#53667B] text-xl font-bold text-center">
                      {client.name || `${client.nombre || ''} ${client.apellido || ''}`}
                    </p>
                    <p className="text-[#53667B] text-sm font-semibold text-center mt-1">
                      DNI: {client.dni}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LawyerSearchClient;
