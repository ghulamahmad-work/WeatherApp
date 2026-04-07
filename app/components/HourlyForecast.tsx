import { Cloud, Sun, CloudRain, Snowflake, Zap } from "lucide-react";

interface HourlyForecastProps {
  weather: any;
  unit: "C" | "F";
}

function convertTemp(celsius: number, unit: "C" | "F"): string {
  if (unit === "F") {
    return Math.round((celsius * 9) / 5 + 32).toString();
  }
  return Math.round(celsius).toString();
}

function getWeatherIcon(weatherCode: number) {
  // WMO Weather interpretation codes
  if (weatherCode === 0) return <Sun className="w-5 h-5 text-yellow-400" />; // Clear sky
  if (weatherCode >= 1 && weatherCode <= 3) return <Cloud className="w-5 h-5 text-gray-400" />; // Partly cloudy
  if (weatherCode >= 45 && weatherCode <= 48) return <Cloud className="w-5 h-5 text-gray-300" />; // Fog
  if (weatherCode >= 51 && weatherCode <= 55) return <CloudRain className="w-5 h-5 text-blue-400" />; // Drizzle
  if (weatherCode >= 56 && weatherCode <= 57) return <Snowflake className="w-5 h-5 text-blue-200" />; // Freezing drizzle
  if (weatherCode >= 61 && weatherCode <= 65) return <CloudRain className="w-5 h-5 text-blue-500" />; // Rain
  if (weatherCode >= 66 && weatherCode <= 67) return <Snowflake className="w-5 h-5 text-blue-300" />; // Freezing rain
  if (weatherCode >= 71 && weatherCode <= 75) return <Snowflake className="w-5 h-5 text-white" />; // Snow
  if (weatherCode >= 77) return <Snowflake className="w-5 h-5 text-gray-200" />; // Snow grains
  if (weatherCode >= 80 && weatherCode <= 82) return <CloudRain className="w-5 h-5 text-blue-600" />; // Rain showers
  if (weatherCode >= 85 && weatherCode <= 86) return <Snowflake className="w-5 h-5 text-white" />; // Snow showers
  if (weatherCode >= 95) return <Zap className="w-5 h-5 text-yellow-500" />; // Thunderstorm
  return <Cloud className="w-5 h-5 text-gray-400" />; // Default
}

export default function HourlyForecast({ weather, unit }: HourlyForecastProps) {
  const hourly = weather?.hourly;
  const unitSymbol = unit === "C" ? "°C" : "°F";

  if (!hourly) return null;

  // Get next 24 hours starting from current hour
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  // Find the index of the current hour in the hourly data
  const startIndex = hourly.time.findIndex((time: string) => {
    const hourTime = new Date(time);
    return hourTime.getHours() === currentHour;
  });

  // Get next 24 hours (or available data)
  const hoursToShow = Math.min(24, hourly.time.length - startIndex);
  const hourlyData = hourly.time.slice(startIndex, startIndex + hoursToShow);

  return (
    <div className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl p-6 w-full">
      <h3 className="text-lg font-semibold mb-6 text-white">24-Hour Forecast</h3>

      {/* Horizontal scrollable container */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2 min-w-max">
          {hourlyData.map((time: string, i: number) => {
            const hourTime = new Date(time);
            const isNow = i === 0;
            const tempIndex = startIndex + i;

            return (
              <div
                key={time}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[80px] ${
                  isNow
                    ? "bg-blue-600/20 border border-blue-500/50"
                    : "bg-[#2a2a2a]/50 hover:bg-[#2a2a2a]/70"
                } transition-colors`}
              >
                {/* Time */}
                <span className={`text-xs font-medium ${
                  isNow ? "text-blue-400" : "text-gray-400"
                }`}>
                  {isNow ? "Now" : hourTime.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    hour12: true
                  })}
                </span>

                {/* Weather Icon */}
                <div className="flex justify-center">
                  {getWeatherIcon(hourly.weather_code[tempIndex])}
                </div>

                {/* Temperature */}
                <span className="text-white font-semibold text-sm">
                  {convertTemp(hourly.temperature_2m[tempIndex], unit)}{unitSymbol}
                </span>

                {/* Precipitation Probability */}
                {hourly.precipitation_probability && (
                  <div className="flex items-center gap-1">
                    <CloudRain className="w-3 h-3 text-blue-400" />
                    <span className="text-xs text-blue-400">
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