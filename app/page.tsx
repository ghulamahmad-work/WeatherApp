"use client";
import NavBar from "./components/NavBar";
import EmptyState from "./components/EmptyState";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import Forecast from "./components/Forecast";
import { AlertCircle } from "lucide-react";
import {
  CurrentWeatherSkeleton,
  HourlyForecastSkeleton,
  ForecastSkeleton,
} from "./components/WeatherSkeleton";
import { useWeather, useForecast } from "@/app/hooks/UseWeather";
import { useWeatherContext } from "./context/WeatherContext";
import { useEffect } from "react";

export default function Home() {
  const { 
    location, 
    unit, 
    geoError, 
    setGeoError, 
    isLoading: isGeolocationLoading
  } = useWeatherContext();

  // Dynamic Browser Title
  useEffect(() => {
    if (location?.name) {
      document.title = `Weather in ${location.name}`;
    } else {
      document.title = "Weather App";
    }
  }, [location]);

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

  const isLoading = isWeatherLoading || isForecastLoading;
  const isError = isWeatherError || isForecastError;

  return (
    <div className="h-screen flex flex-col overflow-hidden ">
      <NavBar />
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
                      <p className="text-sm font-medium text-red-500">{geoError.message}</p>
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
                <EmptyState />
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
              ) : weather && forecast ? (
                <div className="w-full max-w-8xl mx-auto grid grid-cols-1 gap-4">
                  <div className="w-full">
                    <CurrentWeather weather={weather!} />
                  </div>

                  <div className="w-full">
                    <HourlyForecast weather={weather!} />
                  </div>

                  <div className="w-full">
                    <Forecast forecast={forecast!} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

