import { useEffect, useMemo, useState } from 'react';
import { getAppointments } from '../services/appointments';
import { formatAppointmentDate, isPast } from '../utils/date';
import { MdOutlineArrowBack, MdPerson } from 'react-icons/md';

const iconBtn = 'p-2 rounded-xl border-2 border-[#3D3229]/30 text-[#3D3229] hover:bg-white/40 transition-colors';

function AppointmentCard({ appt, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full rounded-2xl shadow-soft bg-white/70 backdrop-blur-sm overflow-hidden hover:shadow-medium transition-shadow"
    >
      <div className="bg-white/60 px-4 py-3 border-b border-black/5 text-center font-extrabold text-[#3D3229]">
        Nº Turno: {appt.number}
      </div>
      <div className="p-4">
        <div className="bg-black/5 rounded-xl p-4 shadow-soft">
          <p className="text-[#3D3229] text-lg font-semibold">Abogado: {appt.lawyer}</p>
          <p className="text-[#3D3229] text-lg font-semibold mt-3">Fecha Hora: {formatAppointmentDate(appt.date)}</p>
        </div>
      </div>
    </button>
  );
}

function ClientDashboard({ onLogout, onNewAppointment, onViewAppointment, user = { name: 'Nombre' } }) {
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
    <div className="min-h-screen bg-linear-to-br from-[#C9B896] to-[#D4C3A4] px-4 sm:px-6 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D3229] leading-tight">
              Bienvenido/a
            </h1>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#3D3229]">[{user.name}]</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onLogout} className={iconBtn} aria-label="Volver">
              <MdOutlineArrowBack className="w-8 h-8" />
            </button>
            <div className="p-2 rounded-full border-2 border-[#3D3229]/30 bg-white/40 text-[#3D3229]">
              <MdPerson className="w-14 h-14 opacity-90" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3D3229] text-center mb-4">Sus turnos</h2>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 mb-5">
          <button
            onClick={() => setTab('upcoming')}
            className={`px-5 py-2 rounded-full font-bold shadow-soft border border-black/5 ${tab==='upcoming' ? 'bg-[#9F8A66] text-white' : 'bg-white/50 text-[#3D3229]'}`}
          >
            Próximos
          </button>
          <button
            onClick={() => setTab('past')}
            className={`px-5 py-2 rounded-full font-bold shadow-soft border border-black/5 ${tab==='past' ? 'bg-[#9F8A66] text-white' : 'bg-white/50 text-[#3D3229]'}`}
          >
            Pasados
          </button>
        </div>

        {/* List container */}
        <div className="bg-white/40 backdrop-blur-sm rounded-3xl shadow-elevated p-4 sm:p-6">
          {loading ? (
            <p className="text-center text-[#3D3229]">Cargando turnos…</p>
          ) : items.length === 0 ? (
            <p className="text-center text-[#3D3229]">No hay turnos {tab === 'upcoming' ? 'próximos' : 'pasados'}.</p>
          ) : (
            <div className="grid gap-4">
              {items.map(appt => (
                <AppointmentCard 
                  key={appt.id} 
                  appt={appt} 
                  onClick={() => onViewAppointment && onViewAppointment(appt)}
                />
              ))}
            </div>
          )}
        </div>

        {/* New appointment button */}
        <div className="mt-6 sm:mt-8">
          <button
            onClick={onNewAppointment}
            className="w-full px-8 py-4 bg-[#D6C59F]/70 hover:bg-[#D6C59F]/90 border-2 border-[#3D3229] text-[#3D3229] 
                     font-extrabold rounded-2xl shadow-medium hover:shadow-elevated active:scale-[0.99] transition-all"
          >
            Nuevo turno
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;
