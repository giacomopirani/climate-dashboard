const formatData = (value: string): string => {
  if (!value) {
    return "";
  }

  const numericValue = parseFloat(value);

  const year = Math.floor(numericValue);

  const month = Math.round((numericValue - year) * 12);

  return month > 0
    ? `${year}-${month.toString().padStart(2, "0")}`
    : year.toString();
};

export default formatData;
