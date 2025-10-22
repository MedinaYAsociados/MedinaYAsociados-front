// Mock service para horarios disponibles
const TIME_SLOTS = [
  '12:00hs',
  '12:45hs',
  '13:30hs',
  '14:15hs',
  '15:00hs',
  '15:45hs',
  '16:15hs',
  '17:00hs'
];

export async function getAvailableTimeSlots(lawyerId, date) {
  await new Promise(r => setTimeout(r, 300));
  
  // Simular algunos horarios ocupados aleatoriamente
  const availableSlots = TIME_SLOTS.filter(() => Math.random() > 0.25);
  
  return availableSlots.length > 0 ? availableSlots : TIME_SLOTS.slice(0, 4);
}

export default TIME_SLOTS;
