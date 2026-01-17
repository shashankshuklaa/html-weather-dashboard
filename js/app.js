import { fetchWeather } from "./api.js";
import { savePreferences, loadPreferences } from "./storage.js";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");

const weatherBox = document.querySelector(".weather-current");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temperature");
const desc = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// Load saved city
const prefs = loadPreferences();
cityInput.value = prefs.city;

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  loading.hidden = false;
  error.textContent = "";
  weatherBox.hidden = true;

  try {
    const data = await fetchWeather(city);

    cityName.textContent = data.city;
    temp.textContent = `Temperature: ${data.temperature} °C`;
    desc.textContent = `Condition: ${data.description}`;
    humidity.textContent = `Humidity: ${data.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind} m/s`;

    weatherBox.hidden = false;
    savePreferences({ city });

  } catch (err) {
    error.textContent = err.message;
  } finally {
    loading.hidden = true;
  }
});
