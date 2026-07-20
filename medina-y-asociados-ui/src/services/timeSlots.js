import api from './apiClient';

export async function getAvailableTimeSlots(idUsuario, date) {
  if (!date) return [];
  const fechaStr = date instanceof Date
    ? date.toISOString().split('T')[0]
    : date;
  const data = await api.get(`/abogados/${idUsuario}/horarios-disponibles?fecha=${fechaStr}`);
  return (data || []).map(t => {
    const [h, m] = t.split(':');
    return `${h}:${m}hs`;
  });
}
