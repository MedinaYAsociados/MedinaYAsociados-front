import api from './apiClient';

export async function listarAbogados(page = 0, size = 50) {
  const data = await api.get(`/abogados?page=${page}&size=${size}`);
  return (data.content || []).map(l => ({
    id: l.idAbogado,
    idAbogado: l.idAbogado,
    name: `${l.nombre || ''} ${l.apellido || ''}`.trim(),
    matricula: l.matricula || '',
    especialidadesAbogado: l.especialidadesAbogado || [],
    email: l.email || '',
    phone: l.telefono || '',
    localidad: l.localidad?.nombreLocalidad || '',
  }));
}

export async function getAbogadoById(id) {
  return api.get(`/abogados/${id}`);
}

export async function crearAbogado(idUsuario, payload) {
  return api.post(`/abogados/${idUsuario}`, payload);
}

export async function actualizarMatricula(id, matricula) {
  return api.patch(`/abogados/${id}/matricula`, { matricula });
}

export async function actualizarEspecialidades(idAbogado, especialidadesAbogado) {
  return api.put(`/abogados/${idAbogado}/especialidades`, { especialidadesAbogado });
}
