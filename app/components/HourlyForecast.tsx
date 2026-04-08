import { useMemo } from "react";
import { CloudRain } from "lucide-react";
import { convertTemp, getWeatherIcon } from "@/app/utils/weatherUtils";

interface HourlyForecastProps {
  weather: any;
  unit: "C" | "F";
}

export default function HourlyForecast({ weather, unit }: HourlyForecastProps) {
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
    <div className="backdrop-blur-sm rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-6 text-black">Hourly Breakdown</h3>

      <div className="overflow-x-auto custom-hourly-scroll">
        <div className="flex gap-4 pb-2 min-w-max">
          {hourlyData.map((time: string, i: number) => {
            const hourTime = new Date(time);
            const isNow = i === 0;
            const tempIndex = startIndex + i;

            return (
              <div
                key={time}
                className={`flex flex-col items-center gap-2 p-12 rounded-xl min-w-[80px] transition-colors ${
                  isNow
                    ? "bg-black/30 border border-black"
                    : "bg-black/10 hover:bg-black/10"
                }`}
              >
                <span className={`text-xs font-medium ${
                  isNow ? "text-black" : "text-gray-900"
                }`}>
                  {isNow ? "Now" : hourTime.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true,
                  })}
                </span>

                <div className="flex justify-center">
                  {getWeatherIcon(hourly.weather_code[tempIndex], "w-5 h-5")}
                </div>

                <span className="text-black font-semibold text-sm">
                  {convertTemp(hourly.temperature_2m[tempIndex], unit)}{unitSymbol}
                </span>

                {hourly.precipitation_probability && (
                  <div className="flex items-center gap-1">
                    <CloudRain className="w-3 h-3 text-white" />
                    <span className="text-xs text-black">
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