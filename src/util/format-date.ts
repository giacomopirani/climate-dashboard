export const formatDate = (dateStr: string): string => {
  const parts = dateStr.split(".");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  if (!isNaN(year) && !isNaN(month)) {
    const date = new Date(year, month - 1);

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  return dateStr;
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

export const formatPolarIceDate = (dateStr: string): string => {
  if (dateStr.length !== 6) return dateStr;

  const year = dateStr.substring(0, 4);
  const monthIndex = parseInt(dateStr.substring(4, 6), 10) - 1;
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

  return `${monthNames[monthIndex]} ${year}`;
};
