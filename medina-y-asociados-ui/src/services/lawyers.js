const LAWYERS = [
  { id: 'l1', name: 'Dra. Ana Pérez', specialties: ['familia', 'civil'], rating: 4.8, years: 10 },
  { id: 'l2', name: 'Dr. Juan López', specialties: ['penal'], rating: 4.6, years: 8 },
  { id: 'l3', name: 'Dra. María González', specialties: ['laboral', 'comercial'], rating: 4.9, years: 12 },
  { id: 'l4', name: 'Dr. Carlos Rodríguez', specialties: ['civil', 'administrativo'], rating: 4.7, years: 9 },
  { id: 'l5', name: 'Dra. Lucía Martínez', specialties: ['familia'], rating: 4.5, years: 6 },
  { id: 'l6', name: 'Dr. Pablo Fernández', specialties: ['comercial'], rating: 4.4, years: 7 }
];

export async function getLawyersBySpecialty(specialtyId) {
  await new Promise(r => setTimeout(r, 300));
  return LAWYERS.filter(l => l.specialties.includes(specialtyId));
}

export default LAWYERS;
