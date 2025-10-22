const SPECIALTIES = [
  {
    id: 'familia',
    title: 'FAMILIA ⚖️',
    description:
      'Se ocupa de los asuntos relacionados con las relaciones familiares: divorcios, adopciones, alimentos, tenencia, régimen de visitas y cuestiones de filiación.'
  },
  {
    id: 'penal',
    title: 'PENAL 👮',
    description:
      'Trata los delitos y las sanciones establecidas por la ley. Incluye la defensa o acusación de personas implicadas en procesos penales.'
  },
  {
    id: 'laboral',
    title: 'LABORAL💼',
    description:
      'Regula las relaciones entre empleadores y trabajadores. Abarca despidos, accidentes laborales, sueldos y condiciones de trabajo.'
  },
  {
    id: 'civil',
    title: 'CIVIL 🏠',
    description:
      'Se ocupa de relaciones entre particulares: contratos, daños, familia, adopciones, alimentos y cuestiones de filiación.'
  },
  {
    id: 'comercial',
    title: 'COMERCIAL 🧾',
    description:
      'Regula actividades comerciales y empresariales: sociedades, contratos mercantiles, cheques y concursos.'
  },
  {
    id: 'administrativo',
    title: 'ADMINISTRATIVO 🏛️',
    description:
      'Relaciones entre ciudadanos y el Estado: reclamos contra decisiones o actos de la administración pública.'
  },
];

export async function getSpecialties() {
  await new Promise(r => setTimeout(r, 300));
  return SPECIALTIES;
}

export default SPECIALTIES;
