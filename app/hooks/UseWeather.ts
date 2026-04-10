import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather, getForecast, searchCity } from "@/app/services/WeatherApi";
import { WeatherData, ForecastData } from "@/app/types/weather";

/**
 * Query Key Factory for centralized key management
 */
export const weatherKeys = {
  all: ["weather"] as const,
  current: (lat: number | null, lon: number | null) => [...weatherKeys.all, "current", lat, lon] as const,
  forecast: (lat: number | null, lon: number | null) => [...weatherKeys.all, "forecast", lat, lon] as const,
  search: (query: string) => [...weatherKeys.all, "search", query] as const,
};

export function useWeather(latitude: number | null, longitude: number | null) {
  return useQuery<WeatherData>({
    queryKey: weatherKeys.current(latitude, longitude),
    queryFn: () => getCurrentWeather(latitude!, longitude!),
    enabled: latitude !== null && longitude !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes fresh
    gcTime: 1000 * 60 * 30,    // 30 minutes in cache
  });
}

export function useForecast(latitude: number | null, longitude: number | null) {
  return useQuery<ForecastData>({
    queryKey: weatherKeys.forecast(latitude, longitude),
    queryFn: () => getForecast(latitude!, longitude!),
    enabled: latitude !== null && longitude !== null,
    staleTime: 1000 * 60 * 15, // Forecasts change even less often
  });
}

export function useCitySearch(query: string) {
  return useQuery({
    queryKey: weatherKeys.search(query),
    queryFn: () => searchCity(query),
    enabled: query.trim().length > 2,
    staleTime: 1000 * 60 * 60, // City names don't change
  });
}