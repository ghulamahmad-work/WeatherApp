"use client";
import { useState } from "react";
import NavBar from "./components/NavBar";
import EmptyState from "./components/EmptyState";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import Forecast from "./components/Forecast";
import { AlertCircle, RotateCcw, Loader2, MapPin } from "lucide-react";
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
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

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
    setIsLocating(true);
    setGeoError(null);

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
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setIsLocating(false);
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setGeoError("Location permission denied. Please allow access to use this feature.");
            break;
          case err.POSITION_UNAVAILABLE:
            setGeoError("Location unavailable. Please ensure your device's GPS is turned on.");
            break;
          case err.TIMEOUT:
            setGeoError("Location request timed out. Please try again.");
            break;
          default:
            setGeoError("An unknown error occurred while getting your location.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
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
        isLocating={isLocating}
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
              <div className="max-w-xl md:max-w-4xl w-full">
                {geoError && (
                  <div className="mx-4 mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-md flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-500">{geoError}</p>
                      <p className="text-xs text-red-500/70 mt-1">
                        Try turning on your device's location switch and refreshing.
                      </p>
                    </div>
                    <button 
                      onClick={() => setGeoError(null)}
                      className="text-red-500/50 hover:text-red-500 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
                <EmptyState onRequestLocation={handleGeolocation} isLocating={isLocating} />
              </div>
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

