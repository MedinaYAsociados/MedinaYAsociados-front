import api from './apiClient';

export async function getLawyersBySpecialty(specialtyId) {
  const data = await api.get(`/abogados/especialidad/${specialtyId}?page=0&size=50`);
  return (data.content || []).map(l => ({
    id: l.idAbogado,
    idAbogado: l.idAbogado,
    idUsuario: l.idUsuario,
    name: `${l.nombre || ''} ${l.apellido || ''}`.trim() || `Abogado #${l.idAbogado}`,
  }));
}
