export function savePreferences(data) {
  localStorage.setItem("weatherPrefs", JSON.stringify(data));
}

export function loadPreferences() {
  const saved = localStorage.getItem("weatherPrefs");
  return saved ? JSON.parse(saved) : { city: "Delhi" };
}