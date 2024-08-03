export const formatTime = (time24) => {
  // Dividir la cadena en horas y minutos
  const [hours, minutes] = time24.split(':').map(Number);

  // Caso especial para 24:00 o 00:00
  if (hours === 24 || hours === 0) {
    return `12:${minutes.toString().padStart(2, '0')} AM`;
  }

  // Determinar si es AM o PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convertir horas a formato 12 horas
  const hours12 = hours % 12 || 12; // 0 se convierte en 12

  // Retornar la hora formateada
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};