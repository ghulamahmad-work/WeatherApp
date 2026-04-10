import { useMemo } from "react";
import { CloudRain } from "lucide-react";
import { convertTemp, getWeatherIcon } from "@/app/utils/weatherUtils";
import { useWeatherContext } from "@/app/context/WeatherContext";
import { WeatherData } from "@/app/types/weather";

interface HourlyForecastProps {
  weather: WeatherData;
}

export default function HourlyForecast({ weather }: HourlyForecastProps) {
  const { unit } = useWeatherContext();
  const hourly = weather?.hourly;
  const unitSymbol = unit === "C" ? "°C" : "°F";

  const { hourlyData, startIndex } = useMemo(() => {
    if (!hourly) return { hourlyData: [], startIndex: -1 };

    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    const startIdx = hourly.time.findIndex((time: string) => {
      const hourTime = new Date(time);
      return hourTime.getHours() === currentHour;
    });

    const hoursToShow = Math.min(24, hourly.time.length - startIdx);
    return {
      hourlyData: hourly.time.slice(startIdx, startIdx + hoursToShow),
      startIndex: startIdx,
    };
  }, [hourly]);

  if (!hourly || startIndex === -1) return null;

  return (
    <div className="backdrop-blur-sm rounded-2xl p-1">
      <h3 className="text-lg font-semibold mb-6 text-black">Hourly Breakdown</h3>

<div className="overflow-x-auto custom-hourly-scroll">
  <div className="flex gap-2 sm:gap-4 pb-2 min-w-max">
    {hourlyData.map((time: string, i: number) => {
      const hourTime = new Date(time);
      const isNow = i === 0;
      const tempIndex = startIndex + i;

      return (
        <div
          key={time}
          className={`flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 md:p-12 rounded-xl min-w-15 sm:min-w-20 transition-colors ${
            isNow
              ? "bg-black/30 border border-black"
              : "bg-black/10 hover:bg-black/10"
          }`}
        >
          {/* Hour */}
          <span
            className={`text-[9px] sm:text-xs md:text-xs font-medium ${
              isNow ? "text-black" : "text-gray-900"
            }`}
          >
            {isNow
              ? "Now"
              : hourTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  hour12: true,
                })}
          </span>

          {/* Weather Icon */}
          <div className="flex justify-center">
            {getWeatherIcon(hourly.weather_code[tempIndex], "w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5")}
          </div>

          {/* Temperature */}
          <span className="text-black font-semibold text-[10px] sm:text-sm md:text-sm">
            {convertTemp(hourly.temperature_2m[tempIndex], unit)}
            {unitSymbol}
          </span>

          {/* Precipitation */}
          {hourly.precipitation_probability && (
            <div className="flex items-center gap-1">
              <CloudRain className="w-3 h-3 text-white" />
              <span className="text-[8px] sm:text-xs text-black">
                {hourly.precipitation_probability[tempIndex]}%
              </span>
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>
    </div>
  );
}