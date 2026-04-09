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
    <div className="bg-black/10 rounded-2xl p-4 sm:p-6 md:p-8 w-full">
      {/* ── Shared layout: always flex-row, icon always on the right ── */}
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 md:gap-8">
        {/* LEFT BLOCK */}
        <div className="flex flex-row items-center gap-2 sm:gap-6 md:gap-8 min-w-0 flex-1">
          {/* Temperature + City stacked */}
          <div className="flex flex-col shrink-0">
            <p className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-none tracking-tight">
              {convertTemp(current.temperature_2m, unit)}
              <span className="text-2xl sm:text-4xl md:text-5xl font-bold align-top mt-1 inline-block">
                {unitSymbol}
              </span>
            </p>
            <h2 className="text-sm sm:text-2xl md:text-3xl font-bold mt-1 truncate max-w-32.5 sm:max-w-none">
              {location.name}
              {location.country ? `, ${location.country}` : ""}
            </h2>
            <p className="text-black/60 text-[10px] sm:text-sm md:text-base font-medium mt-0.5">
              Feels like {convertTemp(current.apparent_temperature, unit)}
              {unitSymbol}
            </p>
          </div>

          {/* Stats grid — sits right next to temp on all sizes */}
          <div className="hidden sm:grid grid-cols-2 gap-x-2 sm:gap-x-8 md:gap-x-10 gap-y-1.5 sm:gap-y-3 text-black self-center">
            <div className="flex flex-col">
              <p className="font-bold  uppercase tracking-wider text-[8px] sm:text-xs">
                Humidity
              </p>
              <p className="font-semibold text-xs sm:text-sm md:text-base">
                {current.relative_humidity_2m}%
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold  uppercase tracking-wider text-[8px] sm:text-xs">
                Wind
              </p>
              <p className="font-semibold text-xs sm:text-sm md:text-base">
                {current.wind_speed_10m}{" "}
                <span className="text-[10px] sm:text-xs">km/h</span>
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold  uppercase tracking-wider text-[8px] sm:text-xs">
                Rain
              </p>
              <p className="font-semibold text-xs sm:text-sm md:text-base">
                {current.precipitation}{" "}
                <span className="text-[10px] sm:text-xs">mm</span>
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold  uppercase tracking-wider text-[8px] sm:text-xs">
                Visibility
              </p>
              <p className="font-semibold text-xs sm:text-sm md:text-base">
                Good
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Animated Weather Icon */}
        <div className="shrink-0 flex items-center justify-center weather-icon-wrap">
          {getWeatherIcon(current.weather_code, "w-full h-full")}
        </div>
      </div>

      <style>{`
        .weather-icon-wrap {
          width: 72px;
          height: 72px;
          animation: float 3s ease-in-out infinite;
        }
        @media (min-width: 640px) {
          .weather-icon-wrap { width: 120px; height: 120px; }
        }
        @media (min-width: 768px) {
          .weather-icon-wrap { width: 160px; height: 160px; }
        }
        @media (min-width: 1024px) {
          .weather-icon-wrap { width: 192px; height: 192px; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
