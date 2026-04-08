const GEO_URL = "https://geocoding-api.open-meteo.com/v1";
const WEATHER_URL = "https://api.open-meteo.com/v1";

// Search cities by name
export async function searchCity(query: string) {
  const res = await fetch(
    `${GEO_URL}/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
  );
  if (!res.ok) throw new Error("Failed to search city");
  const data = await res.json();
  return data.results ?? [];
}

// Reverse geocode coordinates to get location name using Nominatim
export async function reverseGeocode(latitude: number, longitude: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`
  );
  if (!res.ok) throw new Error("Failed to reverse geocode");
  const data = await res.json();
  
  // Extract city name from address
  const address = data.address || {};
  const cityName = address.city || address.town || address.village || address.county || "Current Location";
  const country = address.country || "";
  
  return {
    name: cityName,
    country: country,
    latitude,
    longitude
  };
}

// Get current weather + hourly forecast by coordinates
export async function getCurrentWeather(latitude: number, longitude: number) {
  const res = await fetch(
    `${WEATHER_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation&hourly=temperature_2m,weather_code,precipitation_probability&timezone=auto`
  );
  if (!res.ok) throw new Error("Failed to fetch current weather");
  return res.json();
}

// Get 7-day daily forecast by coordinates
// Get 7-day daily forecast by coordinates
export async function getForecast(latitude: number, longitude: number) {
  const res = await fetch(
    `${WEATHER_URL}/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset&timezone=auto`
  );
  if (!res.ok) throw new Error("Failed to fetch forecast");
  return res.json();
}