export const formatDate = (dateInput, format) => {
  if (!dateInput) return "N/A";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "N/A";

  if (!format) {
    return date.toLocaleDateString();
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return format
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day);
};
