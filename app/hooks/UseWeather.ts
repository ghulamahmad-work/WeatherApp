import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather, searchCity } from "@/app/services/WeatherApi";

export function useWeather(latitude: number | null, longitude: number | null) {
  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => getCurrentWeather(latitude!, longitude!),
    enabled: latitude !== null && longitude !== null,
  });
}

export function useCitySearch(query: string) {
  return useQuery({
    queryKey: ["citySearch", query],
    queryFn: () => searchCity(query),
    enabled: query.length > 2,
  });
}