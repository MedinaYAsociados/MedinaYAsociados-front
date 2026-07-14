import api from './apiClient';

export async function getLocalidades() {
  const data = await api.get('/localidades');
  return data || [];
}
