import api from './apiClient';

// --- Turno CRUD ---
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

const mockHistorial = [
  {
    idTurno: 1,
    idCliente: 1,
    nombreCliente: 'Ramiro Doglio',
    idAbogado: 1,
    nombreAbogado: 'Dr. Alejandro Forneris',
    idEspecialidad: 1,
    nombreEspecialidad: 'CIVIL',
    observacionesCliente: 'Caso de sucesión',
    observacionesAbogado: null,
    horarioTurno: '2025-12-12T13:00:00',
    idEstado: 3,
    nombreEstado: 'Completado',
    historial: [
      {
        idHistorial: 1,
        fechaHoraInicio: '2025-12-12T13:00:00',
        fechaHoraFin: null,
        idEstado: 1,
        nombreEstado: 'Pendiente',
        ambitoEstado: 'Cliente'
      },
      {
        idHistorial: 2,
        fechaHoraInicio: '2025-12-12T13:05:00',
        fechaHoraFin: null,
        idEstado: 2,
        nombreEstado: 'Confirmado',
        ambitoEstado: 'Abogado'
      },
      {
        idHistorial: 3,
        fechaHoraInicio: '2025-12-12T14:00:00',
        fechaHoraFin: null,
        idEstado: 5,
        nombreEstado: 'Asistió',
        ambitoEstado: 'Abogado'
      },
      {
        idHistorial: 4,
        fechaHoraInicio: '2025-12-12T14:00:00',
        fechaHoraFin: '2025-12-12T14:30:00',
        idEstado: 10,
        nombreEstado: 'Pagado',
        ambitoEstado: 'Sistema'
      },
      {
        idHistorial: 5,
        fechaHoraInicio: '2025-12-12T14:30:00',
        fechaHoraFin: null,
        idEstado: 8,
        nombreEstado: 'En Curso',
        ambitoEstado: 'Abogado'
      },
      {
        idHistorial: 6,
        fechaHoraInicio: '2025-12-12T15:00:00',
        fechaHoraFin: null,
        idEstado: 3,
        nombreEstado: 'Completado',
        ambitoEstado: 'Abogado'
      }
    ]
  }
];

const mockCobro = {
  idCobro: 1,
  idTurno: 1,
  importeTotal: 2500.00,
  idEstado: 2,
};

const mockCobroDetalles = {
  idCobro: 1,
  idTurno: 1,
  importeTotal: 2500.00,
  idEstado: 2,
  nombreEstado: 'Pagado',
  ambitoEstado: 'Sistema',
  detalles: [
    {
      idDetalleCobro: 1,
      fecha: '2025-12-12T14:00:00',
      descripcionCobro: 'Honorarios profesionales - Consulta inicial',
      subTotal: 1500.00,
      tipoCobro: {
        idTipoCobro: 1,
        nombreTipoCobro: 'Honorarios',
        descripcionTipoCobro: 'Honorarios por servicio profesional'
      }
    },
    {
      idDetalleCobro: 2,
      fecha: '2025-12-12T14:00:00',
      descripcionCobro: 'Gastos administrativos',
      subTotal: 1000.00,
      tipoCobro: {
        idTipoCobro: 2,
        nombreTipoCobro: 'Gastos',
        descripcionTipoCobro: 'Gastos administrativos y de gestión'
      }
    }
  ]
};

export async function getHistorial(idTurno) {
  try {
    const data = await api.get(`/turnos/${idTurno}/historial`);
    return data;
  } catch {
    await new Promise(r => setTimeout(r, 500));
    const entry = mockHistorial.find(h => h.idTurno === Number(idTurno) || String(h.idTurno) === String(idTurno));
    return entry || mockHistorial[0];
  }
}

export async function getCobroPorTurno(turnoId) {
  try {
    const data = await api.get(`/cobros/turno/${turnoId}`);
    return data;
  } catch {
    await new Promise(r => setTimeout(r, 500));
    return { ...mockCobro, idTurno: Number(turnoId) };
  }
}

export async function getDetallesCobro(turnoId) {
  try {
    const cobro = await api.get(`/cobros/turno/${turnoId}`);
    if (!cobro?.idCobro) return cobro;
    const detalles = await api.get(`/cobros/${cobro.idCobro}/detalles`);
    return { ...cobro, ...detalles };
  } catch {
    await new Promise(r => setTimeout(r, 500));
    return { ...mockCobroDetalles, idTurno: Number(turnoId) };
  }
}
