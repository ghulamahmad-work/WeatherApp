import { Cloud, Sun, CloudRain, Snowflake, Zap, Eye } from "lucide-react";

interface CurrentWeatherProps {
  location: { name: string; country: string };
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
  if (weatherCode === 0) return <Sun className="w-16 h-16 text-yellow-400" />; // Clear sky
  if (weatherCode >= 1 && weatherCode <= 3) return <Cloud className="w-16 h-16 text-gray-400" />; // Partly cloudy
  if (weatherCode >= 45 && weatherCode <= 48) return <Eye className="w-16 h-16 text-gray-300" />; // Fog
  if (weatherCode >= 51 && weatherCode <= 55) return <CloudRain className="w-16 h-16 text-blue-400" />; // Drizzle
  if (weatherCode >= 56 && weatherCode <= 57) return <Snowflake className="w-16 h-16 text-blue-200" />; // Freezing drizzle
  if (weatherCode >= 61 && weatherCode <= 65) return <CloudRain className="w-16 h-16 text-blue-500" />; // Rain
  if (weatherCode >= 66 && weatherCode <= 67) return <Snowflake className="w-16 h-16 text-blue-300" />; // Freezing rain
  if (weatherCode >= 71 && weatherCode <= 75) return <Snowflake className="w-16 h-16 text-white" />; // Snow
  if (weatherCode >= 77) return <Snowflake className="w-16 h-16 text-gray-200" />; // Snow grains
  if (weatherCode >= 80 && weatherCode <= 82) return <CloudRain className="w-16 h-16 text-blue-600" />; // Rain showers
  if (weatherCode >= 85 && weatherCode <= 86) return <Snowflake className="w-16 h-16 text-white" />; // Snow showers
  if (weatherCode >= 95) return <Zap className="w-16 h-16 text-yellow-500" />; // Thunderstorm
  return <Cloud className="w-16 h-16 text-gray-400" />; // Default
}

export default function CurrentWeather({ location, weather, unit }: CurrentWeatherProps) {
  const current = weather?.current;
  const unitSymbol = unit === "C" ? "°C" : "°F";

  if (!current) return null;

  return (
    <div className="bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl p-8 flex flex-col items-center gap-4 text-white max-w-md w-full">
      {/* Location */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold">
          {location.name}{location.country ? `, ${location.country}` : ""}
        </h2>
      </div>

      {/* Weather Icon */}
      <div className="flex justify-center">
        {getWeatherIcon(current.weather_code)}
      </div>

      {/* Temperature */}
      <div className="text-center">
        <p className="text-7xl font-bold">{convertTemp(current.temperature_2m, unit)}{unitSymbol}</p>
        <p className="text-gray-400 text-lg">Feels like {convertTemp(current.apparent_temperature, unit)}{unitSymbol}</p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Humidity</p>
          <p className="text-white font-medium">{current.relative_humidity_2m}%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">Wind Speed</p>
          <p className="text-white font-medium">{current.wind_speed_10m} km/h</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">Precipitation</p>
          <p className="text-white font-medium">{current.precipitation} mm</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">Visibility</p>
          <p className="text-white font-medium">Good</p>
        </div>
      </div>
    </div>
  );
}