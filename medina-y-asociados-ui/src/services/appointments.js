

const mockData = [
  { 
    id: 't1', 
    number: 1, 
    lawyer: 'Dr. Alejandro Forneris', 
    date: new Date(Date.now() + 1000*60*60*24*2).toISOString(),
    specialty: 'CIVIL 🏠',
    observations: 'Caso de sucesión',
    status: 'confirmed'
  },
  { 
    id: 't2', 
    number: 2, 
    lawyer: 'Dra. María López', 
    date: new Date(Date.now() - 1000*60*60*24*3).toISOString(),
    specialty: 'FAMILIA ⚖️',
    observations: 'Consulta sobre divorcio',
    status: 'completed'
  },
  { 
    id: 't3', 
    number: 3, 
    lawyer: 'Dr. Alejandro Forneris', 
    date: new Date(Date.now() + 1000*60*60*24*7 + 1000*60*60*2).toISOString(),
    specialty: 'LABORAL 💼',
    observations: 'Despido sin causa',
    status: 'pending'
  },
  { 
    id: 't4', 
    number: 4, 
    lawyer: 'Dr. Carlos Pérez', 
    date: new Date(Date.now() - 1000*60*60*24*10).toISOString(),
    specialty: 'PENAL 👮',
    observations: 'Defensa penal',
    status: 'completed'
  },
];

export async function getAppointments(/* userId */) {
  await new Promise(r => setTimeout(r, 500));
  return mockData;
}
