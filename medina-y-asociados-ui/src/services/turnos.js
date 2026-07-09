import api from './apiClient';

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

export async function getDetallesCobro(idCobro) {
  try {
    const data = await api.get(`/cobros/${idCobro}/detalles`);
    return data;
  } catch {
    await new Promise(r => setTimeout(r, 300));
    return { ...mockCobroDetalles, idCobro: Number(idCobro) };
  }
}
