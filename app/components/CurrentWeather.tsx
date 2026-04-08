import { convertTemp, getWeatherIcon } from "@/app/utils/weatherUtils";

interface CurrentWeatherProps {
  location: { name: string; country: string };
  weather: any;
  unit: "C" | "F";
}

export default function CurrentWeather({
  location,
  weather,
  unit,
}: CurrentWeatherProps) {
  const current = weather?.current;
  const unitSymbol = unit === "C" ? "°C" : "°F";

  if (!current) return null;

  return (
    <div className="bg-black/10 rounded-2xl p-6 md:p-8 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8">
      <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 md:gap-8 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-bold">
            {location.name}
            {location.country ? `, ${location.country}` : ""}
          </h2>
          <p className="text-7xl sm:text-8xl md:text-9xl font-extrabold leading-none my-2 md:my-0">
            {convertTemp(current.temperature_2m, unit)}
            {unitSymbol}
          </p>
          <p className="text-black text-lg md:text-xl">
            Feels like {convertTemp(current.apparent_temperature, unit)}
            {unitSymbol}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 self-center md:self-end pb-2 text-black text-sm md:text-base text-left">
          <div>
            <p className="font-bold">Humidity</p>
            <p>{current.relative_humidity_2m}%</p>
          </div>
          <div>
            <p className="font-bold">Wind Speed</p>
            <p>{current.wind_speed_10m} km/h</p>
          </div>
          <div>
            <p className="font-bold">Precipitation</p>
            <p>{current.precipitation} mm</p>
          </div>
          <div>
            <p className="font-bold">Visibility</p>
            <p>Good</p>
          </div>
        </div>
      </div>

      {/* RIGHT: Animated Weather Icon */}
      <div
        className="flex items-center justify-center shrink-0 scale-75 md:scale-100 origin-center"
        style={{ animation: "float 3s ease-in-out infinite" }}
      >
        {getWeatherIcon(current.weather_code, "w-48 h-48")}
      </div>

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px) scale(0.75); }
          50%  { transform: translateY(-14px) scale(0.75); }
          100% { transform: translateY(0px) scale(0.75); }
        }
        @media (min-width: 768px) {
          @keyframes float {
            0%   { transform: translateY(0px) scale(1); }
            50%  { transform: translateY(-14px) scale(1); }
            100% { transform: translateY(0px) scale(1); }
          }
        }
      `}</style>
    </div>
  );
}
