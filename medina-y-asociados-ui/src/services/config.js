import api from './apiClient';

export async function getPrecio() {
  return api.get('/config/precio-turno');
}

export async function updatePrecio(nuevoPrecio) {
  return api.put('/config/precio-turno', nuevoPrecio);
}
