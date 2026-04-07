interface WeatherDisplayProps {
  location: { name: string; country: string };
  weather: any;
  forecast: any;
  unit: "C" | "F";
}

function convertTemp(celsius: number, unit: "C" | "F"): string {
  if (unit === "F") {
    return Math.round((celsius * 9) / 5 + 32).toString();
  }
  return Math.round(celsius).toString();
}

export default function WeatherDisplay({ location, weather, forecast, unit }: WeatherDisplayProps) {
  const current = weather?.current;
  const daily = forecast?.daily;
  const unitSymbol = unit === "C" ? "°C" : "°F";

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-10 text-white flex flex-col gap-8">

      {/* Current Weather */}
      <div className="bg-[#1a1a1a] rounded-2xl p-6 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">
          {location.name}{location.country ? `, ${location.country}` : ""}
        </h2>
        <p className="text-6xl font-bold">{convertTemp(current?.temperature_2m, unit)}{unitSymbol}</p>
        <p className="text-gray-400">Feels like {convertTemp(current?.apparent_temperature, unit)}{unitSymbol}</p>
        <div className="flex gap-6 mt-2 text-sm text-gray-300">
          <span>💧 Humidity: {current?.relative_humidity_2m}%</span>
          <span>💨 Wind: {current?.wind_speed_10m} km/h</span>
          <span>🌧 Precipitation: {current?.precipitation} mm</span>
        </div>
      </div>

      {/* 7-Day Forecast */}
      {daily && (
        <div className="bg-[#1a1a1a] rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
          <div className="flex flex-col gap-3">
            {daily.time.map((date: string, i: number) => (
              <div key={date} className="flex justify-between items-center text-sm">
                <span className="text-gray-400 w-24">
                  {new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </span>
                <span className="text-blue-400">{convertTemp(daily.temperature_2m_min[i], unit)}{unitSymbol}</span>
                <span className="text-white font-medium">{convertTemp(daily.temperature_2m_max[i], unit)}{unitSymbol}</span>
                <span className="text-gray-400">💧 {daily.precipitation_sum[i]}mm</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
