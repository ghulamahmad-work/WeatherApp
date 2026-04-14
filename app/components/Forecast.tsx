import { useMemo } from "react";
import { Wind, Droplets, Sunset, Sunrise } from "lucide-react";
import { convertTemp, getWeatherIcon, getUVLabel } from "@/app/utils/weatherUtils";
import { useWeatherContext } from "@/app/context/WeatherContext";
import { ForecastData } from "../types/weather";

interface ForecastProps {
  forecast: ForecastData;
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function Forecast({ forecast }: ForecastProps) {
  const { unit } = useWeatherContext();
  const daily = forecast?.daily;
  const unitSymbol = unit === "C" ? "°C" : "°F";

  const { maxTemp, minTemp } = useMemo(() => {
    if (!daily) return { maxTemp: 0, minTemp: 0 };
    return {
      maxTemp: Math.max(...daily.temperature_2m_max.slice(0, 7)),
      minTemp: Math.min(...daily.temperature_2m_min.slice(0, 7)),
    };
  }, [daily]);

  if (!daily) return null;

  return (
    <div className="backdrop-blur-sm rounded-2xl p-2">
      <h3 className="text-lg font-semibold mb-6 text-black">Weekly Outlook</h3>

      <div className="space-y-2">
        {daily.time.slice(0, 7).map((date: string, i: number) => {
          const uv = daily.uv_index_max?.[i];
          const rainChance = daily.precipitation_probability_max?.[i];
          const wind = daily.wind_speed_10m_max?.[i];
          const sunrise = daily.sunrise?.[i];
          const sunset = daily.sunset?.[i];

          return (
            <div
              key={date}
              className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-4 md:gap-y-0 py-3 px-4 rounded-xl bg-black/9 hover:bg-black/10 transition-colors"
            >
              {/* Icon + Day */}
              <div className="flex items-center gap-3 w-1/2 md:w-32 shrink-0">
                {getWeatherIcon(daily.weather_code[i], "w-6 h-6")}
                <span className="text-black font-medium text-sm">
                  {i === 0 ? "Today" : i === 1 ? "Tomorrow" :
                    new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
                </span>
              </div>

              {/* Temp range bar */}
              <div className="flex items-center justify-end md:justify-center gap-3 md:gap-4 text-sm shrink-0 w-1/2 md:w-auto md:order-last">
                <span className="text-black w-14 md:w-16 text-right whitespace-nowrap tabular-nums">
                  {convertTemp(daily.temperature_2m_min[i], unit)}{unitSymbol}
                </span>

                <span className="text-black font-medium w-14 md:w-16 whitespace-nowrap tabular-nums">
                  {convertTemp(daily.temperature_2m_max[i], unit)}{unitSymbol}
                </span>
              </div>

              {/* Rain chance */}
              <div className="flex items-center gap-1 w-1/4 md:w-16 shrink-0 md:justify-center">
                <Droplets className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                <span className="text-black text-xs md:text-sm">
                  {rainChance !== undefined ? `${rainChance}%` : "—"}
                </span>
              </div>

              {/* Wind */}
              <div className="flex items-center gap-1 w-1/4 md:w-20 shrink-0 md:justify-center">
                <Wind className="w-3 h-3 md:w-4 md:h-4 text-white" />
                <span className="text-black text-xs md:text-sm">
                  {wind !== undefined ? `${Math.round(wind)} km/h` : "—"}
                </span>
              </div>

              {/* UV Index */}
              <div className="w-1/4 md:w-24 shrink-0 md:text-center flex items-center">
                {uv !== undefined && (
                  <span className="text-xs md:text-sm font-medium text-black">
                    UV {Math.round(uv)}<span className="hidden lg:inline"> · {getUVLabel(uv)}</span>
                  </span>
                )}
              </div>

              {/* Sunrise / Sunset */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center justify-center gap-1 sm:gap-3 w-1/4 md:w-36 shrink-0 md:justify-center">
                {sunrise && (
                  <div className="flex items-center gap-1">
                    <Sunrise className="w-3 h-3 md:w-4 md:h-4 text-orange-300" />
                    <span className="text-black text-[10px] md:text-xs">{formatTime(sunrise)}</span>
                  </div>
                )}
                {sunset && (
                  <div className="flex items-center gap-1">
                    <Sunset className="w-3 h-3 md:w-4 md:h-4 text-blue-800" />
                    <span className="text-black text-[10px] md:text-xs">{formatTime(sunset)}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}