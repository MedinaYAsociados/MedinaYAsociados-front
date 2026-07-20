import api from './apiClient';

export async function crearTurno(payload) {
  return api.post('/turnos', payload);
}

export async function crearTurnoOffline(payload) {
  return api.post('/turnos/offline', payload);
}

export async function listarTurnosCliente(idUsuario, page = 0, size = 10) {
  return api.get(`/turnos/cliente/${idUsuario}?page=${page}&size=${size}`);
}

export async function listarTurnosAbogado(idUsuario, page = 0, size = 10, filters = {}) {
  const params = new URLSearchParams({ page, size });
  if (filters.fechaDesde) params.append('fechaDesde', filters.fechaDesde);
  if (filters.fechaHasta) params.append('fechaHasta', filters.fechaHasta);
  if (filters.estado) params.append('estado', filters.estado);
  if (filters.cliente) params.append('cliente', filters.cliente);
  return api.get(`/turnos/abogado/${idUsuario}?${params}`);
}

export async function detalleCliente(idTurno) {
  return api.get(`/turnos/${idTurno}/detalle-cliente`);
}

export async function detalleAbogado(idTurno) {
  return api.get(`/turnos/${idTurno}/detalle-abogado`);
}

export async function cancelarTurno(idTurno) {
  return api.post(`/turnos/${idTurno}/cancelar`);
}

export async function reprogramarTurno(idTurno, fechaHora) {
  return api.put(`/turnos/${idTurno}/reprogramar?fecha=${encodeURIComponent(fechaHora)}`);
}

export async function pagarTurno(idTurno) {
  return api.post(`/turnos/${idTurno}/pagar`);
}

export async function noAsistio(idTurno) {
  return api.post(`/turnos/${idTurno}/noAsistio`);
}

export async function enCurso(idTurno) {
  return api.post(`/turnos/${idTurno}/enCurso`);
}

export async function finalizar(idTurno) {
  return api.post(`/turnos/${idTurno}/finalizar`);
}

export async function marcarPagado(idTurno) {
  return api.post(`/turnos/${idTurno}/marcar-pagado`);
}

export async function getHistorial(idTurno) {
  return api.get(`/turnos/${idTurno}/historial`);
}

export async function getCobroPorTurno(turnoId) {
  return api.get(`/cobros/turno/${turnoId}`);
}

export async function getDetallesCobro(turnoId) {
  const cobro = await api.get(`/cobros/turno/${turnoId}`);
  if (!cobro?.idCobro) return cobro;
  const detalles = await api.get(`/cobros/${cobro.idCobro}/detalles`);
  return { ...cobro, ...detalles };
}
