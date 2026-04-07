import { useQuery } from "@tanstack/react-query";
import { getForecast } from "@/app/services/WeatherApi";

export function useForecast(latitude: number | null, longitude: number | null) {
  return useQuery({
    queryKey: ["forecast", latitude, longitude],
    queryFn: () => getForecast(latitude!, longitude!),
    enabled: latitude !== null && longitude !== null,
  });
}