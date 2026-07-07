import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getAppointments } from '../services/appointments';
import { formatAppointmentDate, isPast } from '../utils/date';

function AppointmentCard({ appt, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden hover:shadow-medium transition-shadow"
    >
      <div className="bg-white/60 px-4 py-3 border-b border-black/5 text-center font-extrabold text-[#53667B]">
        N° Turno: {appt.number}
      </div>
      <div className="p-4">
        <div className="bg-black/5 rounded-xl p-4 shadow-soft">
          <p className="text-[#53667B] text-lg font-semibold">Abogado: {appt.lawyer}</p>
          <p className="text-[#53667B] text-lg font-semibold mt-3">Fecha Hora: {formatAppointmentDate(appt.date)}</p>
        </div>
      </div>
    </button>
  );
}

function ClientDashboard() {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const multiRole = user?.roles?.length > 1;
  const iconBtn = 'p-2 rounded-xl border-2 border-[#C6A15B]/30 text-[#53667B] hover:bg-[#C6A15B]/20 transition-colors';
  const [tab, setTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await getAppointments();
      if (mounted) setList(data);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const upcoming = useMemo(() => list.filter(a => !isPast(a.date)), [list]);
  const past = useMemo(() => list.filter(a => isPast(a.date)), [list]);
  const items = tab === 'upcoming' ? upcoming : past;

  return (
    <div className="min-h-screen bg-[#ECEFF3] px-4 sm:px-6 py-6">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#53667B] leading-tight">
              Bienvenido/a
            </h1>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#53667B]">[{user?.name}]</p>
          </div>
          {multiRole && (
            <button onClick={() => navigate('/role-selector')} className={iconBtn} aria-label="Cambiar rol">
              ←
            </button>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#53667B] text-center mb-4">Sus turnos</h2>

        <div className="flex items-center justify-center gap-2 mb-5">
          <button
            onClick={() => setTab('upcoming')}
            className={`px-5 py-2 rounded-full font-bold shadow-soft border border-black/5 ${tab==='upcoming' ? 'bg-[#C6A15B] text-white' : 'bg-white/50 text-[#53667B]'}`}
          >
            Próximos
          </button>
          <button
            onClick={() => setTab('past')}
            className={`px-5 py-2 rounded-full font-bold shadow-soft border border-black/5 ${tab==='past' ? 'bg-[#C6A15B] text-white' : 'bg-white/50 text-[#53667B]'}`}
          >
            Pasados
          </button>
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6">
          {loading ? (
            <p className="text-center text-[#53667B]">Cargando turnos…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-[#53667B]">No hay turnos {tab === 'upcoming' ? 'próximos' : 'pasados'}.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map(appt => (
                <AppointmentCard
                  key={appt.id}
                  appt={appt}
                  onClick={() => navigate(`/appointments/${appt.id}`, { state: { appointment: appt } })}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8">
          <button
            onClick={() => navigate('/appointments/new/specialty')}
            className="w-full px-6 py-3.5 bg-[#C6A15B]
                     border-2 border-[#C6A15B] rounded-xl
                     text-[#53667B] text-lg sm:text-xl font-bold
                     shadow-medium hover:shadow-elevated hover:bg-[#A8C495]
                     active:scale-[0.98] transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-[#C6A15B]/30"
          >
            Nuevo turno
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
