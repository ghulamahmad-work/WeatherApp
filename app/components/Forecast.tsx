import { Cloud, Sun, CloudRain, Snowflake, Zap } from "lucide-react";

interface ForecastProps {
  forecast: any;
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
  if (weatherCode === 0) return <Sun className="w-6 h-6 text-yellow-400" />; // Clear sky
  if (weatherCode >= 1 && weatherCode <= 3) return <Cloud className="w-6 h-6 text-gray-400" />; // Partly cloudy
  if (weatherCode >= 45 && weatherCode <= 48) return <Cloud className="w-6 h-6 text-gray-300" />; // Fog
  if (weatherCode >= 51 && weatherCode <= 55) return <CloudRain className="w-6 h-6 text-blue-400" />; // Drizzle
  if (weatherCode >= 56 && weatherCode <= 57) return <Snowflake className="w-6 h-6 text-blue-200" />; // Freezing drizzle
  if (weatherCode >= 61 && weatherCode <= 65) return <CloudRain className="w-6 h-6 text-blue-500" />; // Rain
  if (weatherCode >= 66 && weatherCode <= 67) return <Snowflake className="w-6 h-6 text-blue-300" />; // Freezing rain
  if (weatherCode >= 71 && weatherCode <= 75) return <Snowflake className="w-6 h-6 text-white" />; // Snow
  if (weatherCode >= 77) return <Snowflake className="w-6 h-6 text-gray-200" />; // Snow grains
  if (weatherCode >= 80 && weatherCode <= 82) return <CloudRain className="w-6 h-6 text-blue-600" />; // Rain showers
  if (weatherCode >= 85 && weatherCode <= 86) return <Snowflake className="w-6 h-6 text-white" />; // Snow showers
  if (weatherCode >= 95) return <Zap className="w-6 h-6 text-yellow-500" />; // Thunderstorm
  return <Cloud className="w-6 h-6 text-gray-400" />; // Default
}

export default function Forecast({ forecast, unit }: ForecastProps) {
  const daily = forecast?.daily;
  const unitSymbol = unit === "C" ? "°C" : "°F";

  if (!daily) return null;

  return (
    <div className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl p-6 w-full">
      <h3 className="text-lg font-semibold mb-6 text-white">7-Day Forecast</h3>
      <div className="space-y-4">
        {daily.time.slice(0, 7).map((date: string, i: number) => (
          <div key={date} className="flex items-center justify-between py-2">
            {/* Day */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-8 text-center">
                {getWeatherIcon(daily.weather_code[i])}
              </div>
              <span className="text-white font-medium text-sm truncate">
                {i === 0 ? "Today" :
                 i === 1 ? "Tomorrow" :
                 new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
              </span>
            </div>

            {/* Precipitation */}
            <div className="text-blue-400 text-sm mr-4">
              {daily.precipitation_sum[i] > 0 ? `${daily.precipitation_sum[i]}mm` : ""}
            </div>

            {/* Temperatures */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">{convertTemp(daily.temperature_2m_min[i], unit)}{unitSymbol}</span>
              <div className="w-12 h-1 bg-gray-600 rounded-full relative">
                <div
                  className="h-1 bg-white rounded-full absolute left-0 top-0"
                  style={{
                    width: `${((daily.temperature_2m_max[i] - daily.temperature_2m_min[i]) /
                           (Math.max(...daily.temperature_2m_max.slice(0, 7)) - Math.min(...daily.temperature_2m_min.slice(0, 7)))) * 100}%`
                  }}
                />
              </div>
              <span className="text-white font-medium">{convertTemp(daily.temperature_2m_max[i], unit)}{unitSymbol}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}