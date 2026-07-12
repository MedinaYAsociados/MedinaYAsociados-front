import api from './apiClient';

export async function detalleUsuario(id) {
  const res = await api.get(`/usuarios/${id}/detalle`);
  return res.data || res;
}

export async function buscarPorDni(dni) {
  return api.get(`/usuarios/buscar-por-dni?dni=${encodeURIComponent(dni)}&page=0&size=10`);
}
