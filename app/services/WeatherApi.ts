const GEO_URL = "https://geocoding-api.open-meteo.com/v1";
const WEATHER_URL = "https://api.open-meteo.com/v1";

interface RequestOptions extends RequestInit {
  timeout?: number;
}

/**
 * Standardized fetch wrapper with timeout support
 */
async function weatherFetch(url: string, options: RequestOptions = {}) {
  const { timeout = 8000, ...rest } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...rest,
      signal: controller.signal,
      cache: "no-cache", // Prevent browser from returning stale JSON
    });

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function searchCity(query: string) {
  const data = await weatherFetch(
    `${GEO_URL}/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
  );
  return data.results ?? [];
}

export async function reverseGeocode(latitude: number, longitude: number) {
  const data = await weatherFetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`
  );
  
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

export async function getCurrentWeather(latitude: number, longitude: number) {
  return weatherFetch(
    `${WEATHER_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation&hourly=temperature_2m,weather_code,precipitation_probability&timezone=auto`
  );
}

export async function getForecast(latitude: number, longitude: number) {
  return weatherFetch(
    `${WEATHER_URL}/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset&timezone=auto`
  );
}