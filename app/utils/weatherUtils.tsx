import { Cloud, Sun, CloudRain, Snowflake, Zap, Eye } from "lucide-react";

export function convertTemp(celsius: number, unit: "C" | "F"): string {
  if (unit === "F") return Math.round((celsius * 9) / 5 + 32).toString();
  return Math.round(celsius).toString();
}

export function getWeatherIcon(weatherCode: number, className: string = "w-6 h-6") {
  switch (true) {
    case weatherCode === 0:
      return <Sun className={`${className} text-yellow-400`} />;
    case weatherCode >= 1 && weatherCode <= 3:
      return <Cloud className={`${className} text-gray-100`} />;
    case weatherCode >= 45 && weatherCode <= 48:
      // Note: CurrentWeather uses Eye icon here, while others use Cloud.
      // We can use Eye as it is more specific for fog/mist.
      return <Eye className={`${className} text-gray-300`} />;
    case weatherCode >= 51 && weatherCode <= 55:
      return <CloudRain className={`${className} text-blue-400`} />;
    case weatherCode >= 56 && weatherCode <= 57:
      return <Snowflake className={`${className} text-blue-200`} />;
    case weatherCode >= 61 && weatherCode <= 65:
      return <CloudRain className={`${className} text-blue-500`} />;
    case weatherCode >= 66 && weatherCode <= 67:
      return <Snowflake className={`${className} text-blue-300`} />;
    case weatherCode >= 71 && weatherCode <= 75:
      return <Snowflake className={`${className} text-gray-400`} />;
    case weatherCode >= 77 && weatherCode < 80:
      return <Snowflake className={`${className} text-gray-300`} />;
    case weatherCode >= 80 && weatherCode <= 82:
      return <CloudRain className={`${className} text-blue-600`} />;
    case weatherCode >= 85 && weatherCode <= 86:
      return <Snowflake className={`${className} text-gray-400`} />;
    case weatherCode >= 95:
      return <Zap className={`${className} text-yellow-500`} />;
    default:
      return <Cloud className={`${className} text-gray-400`} />;
  }
}

export function getUVLabel(uv: number): string {
  switch (true) {
    case uv <= 2:
      return "Low";
    case uv <= 5:
      return "Moderate";
    case uv <= 7:
      return "High";
    case uv <= 10:
      return "Very High";
    default:
      return "Extreme";
  }
}
