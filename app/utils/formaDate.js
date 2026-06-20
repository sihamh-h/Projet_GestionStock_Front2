export function toBackendDate(dateString) {
  if (!dateString) return dateString;

  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
}

export function toFrontendDate(value) {
  if (!value) return "";

  // Format array backend [year, month, day, ...]
  if (Array.isArray(value)) {
    const [y, m, d] = value;
    return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  }

  // Format string "dd-mm-yyyy"
  if (typeof value === "string") {
    const [day, month, year] = value.split("-");
    return `${day}/${month}/${year}`;
  }

  return "";
}

export function toInputDate(value) {
  if (!value) return "";

  // Format array backend [year, month, day, ...]
  if (Array.isArray(value)) {
    const [y, m, d] = value;
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  // Format string "dd-mm-yyyy"
  if (typeof value === "string") {
    const [day, month, year] = value.split("-");
    return `${year}-${month}-${day}`;
  }

  return "";
}

export function parseCreatedAt(value) {
  if (!value) return null;
  // Format ISO avec espace : "2026-06-05 00:27:01.33034"
  if (typeof value === "string") {
    return new Date(value.replace(" ", "T"));
  }
  // Format array [year, month, day, hour, min]
  if (Array.isArray(value)) {
    const [y, m, d, h = 0, min = 0] = value;
    return new Date(y, m - 1, d, h, min);
  }
  return new Date(value);
}





