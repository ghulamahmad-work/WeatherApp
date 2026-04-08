"use client";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import EmptyState from "./components/EmptyState";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import Forecast from "./components/Forecast";
import {
  CurrentWeatherSkeleton,
  HourlyForecastSkeleton,
  ForecastSkeleton,
} from "./components/WeatherSkeleton";
import { useWeather } from "@/app/hooks/UseWeather";
import { useForecast } from "@/app/hooks/UseForecast";
import { reverseGeocode } from "@/app/services/WeatherApi";

interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface City {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [location, setLocation] = useState<Location | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");

  const {
    data: weather,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
  } = useWeather(location?.latitude ?? null, location?.longitude ?? null);

  const {
    data: forecast,
    isLoading: isForecastLoading,
    isError: isForecastError,
  } = useForecast(location?.latitude ?? null, location?.longitude ?? null);

  function handleCitySelect(city: City) {
    setLocation({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    });
  }

  function handleGeolocation() {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const locationData = await reverseGeocode(latitude, longitude);
          setLocation({
            name: locationData.name,
            country: locationData.country,
            latitude,
            longitude,
          });
        } catch (err) {
          console.error("Geocoding error:", err);
          setLocation({
            name: "Current Location",
            country: "",
            latitude,
            longitude,
          });
        }
      },
      (err) => console.error("Geolocation error:", err),
    );
  }

  const isLoading = isWeatherLoading || isForecastLoading;
  const isError = isWeatherError || isForecastError;

  return (
    <div className="h-screen flex flex-col overflow-hidden ">
      <NavBar
        onLocationSelect={handleCitySelect}
        unit={unit}
        onUnitChange={setUnit}
        onRequestLocation={handleGeolocation}
      />
      <main className="flex-1 w-full h-full overflow-hidden flex flex-col relative">
        {!location ? (
          <div
            className="flex-1 flex flex-col items-center justify-center w-full h-full"
            style={{
              backgroundImage: 'url("/map.jpg")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <EmptyState onRequestLocation={handleGeolocation} />
            </div>
          </div>
        ) : (
          <div className="flex-1 w-full h-full overflow-y-auto custom-scroll">
            <div className="min-h-full w-full p-4 md:p-6 lg:p-8">
              {isLoading ? (
                <div className="w-full max-w-8xl mx-auto grid grid-cols-1 gap-4">
                  <div className="w-full">
                    <CurrentWeatherSkeleton />
                  </div>
                  <div className="w-full">
                    <HourlyForecastSkeleton />
                  </div>
                  <div className="w-full">
                    <ForecastSkeleton />
                  </div>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                  <div className="text-red-500 bg-red-100 dark:bg-red-500/10 px-6 py-4 rounded-xl border border-red-200 dark:border-red-500/20">
                    Failed to load weather data. Please try again.
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-8xl mx-auto grid grid-cols-1 gap-4">
                  <div className="w-full">
                    <CurrentWeather
                      location={location}
                      weather={weather}
                      unit={unit}
                    />
                  </div>

                  <div className="w-full">
                    <HourlyForecast weather={weather} unit={unit} />
                  </div>

                  <div className="w-full">
                    <Forecast forecast={forecast} unit={unit} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
