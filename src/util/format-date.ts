export const formatDate = (dateStr: string): string => {
  const [year] = dateStr.split(".");
  return year && !isNaN(Number(year)) ? year : dateStr;
};

export const formatCO2Date = (
  year: string,
  month: string,
  day: string
): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = parseInt(month, 10) - 1;
  return `${day} ${monthNames[monthIndex]} ${year}  `;
};
