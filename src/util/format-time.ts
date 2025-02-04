const formatTime = (value: string): string => {
  if (!value) {
    return ""; // Gestisce sia undefined che null
  }

  // Converti la stringa in un numero
  const numericValue = parseFloat(value);

  // Estrai l'anno usando Math.floor
  const year = Math.floor(numericValue);

  // Estrai la parte decimale e calcola il mese
  const month = Math.round((numericValue - year) * 12);

  // Restituisci il formato "YYYY-MM"
  return month > 0
    ? `${year}-${month.toString().padStart(2, "0")}`
    : year.toString();
};

export default formatTime;
