export default function dateToString(timestamp: string) {
  const date = new Date(timestamp);
  const monthMap = [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = monthMap[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}
