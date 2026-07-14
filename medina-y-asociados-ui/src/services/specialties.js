import api from './apiClient';

export async function getSpecialties() {
  const data = await api.get('/especialidades?page=0&size=50');
  return (data.content || []).map(sp => ({
    id: sp.idEspecialidad,
    title: sp.nombreEspecialidad,
    description: sp.descripcionEspecialidad || '',
  }));
}
