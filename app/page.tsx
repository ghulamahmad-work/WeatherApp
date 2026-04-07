"use client";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import EmptyState from "./components/EmptyState";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import Forecast from "./components/Forecast";
import { useCitySearch, useWeather } from "@/app/hooks/UseWeather";
import { useForecast } from "@/app/hooks/UseForecast";
import { reverseGeocode } from "@/app/services/WeatherApi";

interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState<Location | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");

  const { data: cities, isLoading: isCitySearching } = useCitySearch(query);

  const { data: weather, isLoading: isWeatherLoading, isError: isWeatherError } = useWeather(
    location?.latitude ?? null,
    location?.longitude ?? null
  );

  const { data: forecast, isLoading: isForecastLoading, isError: isForecastError } = useForecast(
    location?.latitude ?? null,
    location?.longitude ?? null
  );

  function handleCitySelect(city: any) {
    setLocation({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    });
    setQuery("");
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
      (err) => console.error("Geolocation error:", err)
    );
  }

  const isLoading = isWeatherLoading || isForecastLoading;
  const isError = isWeatherError || isForecastError;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <NavBar
        query={query}
        onQueryChange={setQuery}
        cities={cities ?? []}
        isCitySearching={isCitySearching}
        onCitySelect={handleCitySelect}
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
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black/20" /> {/* Optional subtle overlay for better text readability */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              <EmptyState onRequestLocation={handleGeolocation} />
            </div>
          </div>
        ) : (
          <div className="flex-1 w-full h-full overflow-y-auto">
            {/* Dark background for weather display, replacing the background image stretching */}
            <div className="min-h-full w-full bg-slate-100 dark:bg-[#0B131E] p-4 md:p-6 lg:p-8">
              {isLoading ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                  <div className="text-gray-500 dark:text-gray-400 text-xl animate-pulse">
                    Loading weather...
                  </div>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                  <div className="text-red-500 bg-red-100 dark:bg-red-500/10 px-6 py-4 rounded-xl border border-red-200 dark:border-red-500/20">
                    Failed to load weather data. Please try again.
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 lg:gap-8">
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
                    {/* Left Column: Current Weather */}
                    <div className="xl:col-span-4 flex flex-col">
                      <CurrentWeather location={location} weather={weather} unit={unit} />
                    </div>

                    {/* Right Column: Hourly & 5-Day Forecast */}
                    <div className="xl:col-span-8 flex flex-col gap-6 lg:gap-8">
                      {/* Top: Hourly Forecast */}
                      <div className="w-full">
                        <HourlyForecast weather={weather} unit={unit} />
                      </div>

                      {/* Bottom: 5-Day Forecast */}
                      <div className="w-full">
                        <Forecast forecast={forecast} unit={unit} />
                      </div>
                    </div>
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