/** Pulse skeleton blocks that mirror CurrentWeather, HourlyForecast, and Forecast */

// ─── Shared helper ────────────────────────────────────────────────────────────
function Bone({ className }: { className: string }) {
  return (
    <div
      className={`bg-black/10 rounded-lg animate-pulse ${className}`}
    />
  );
}

// ─── CurrentWeather skeleton ──────────────────────────────────────────────────
export function CurrentWeatherSkeleton() {
  return (
    <div className="bg-black/5 rounded-2xl p-6 md:p-8 w-full flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8">
      {/* Left: city name + temp + feels-like + stats grid */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 w-full">
        <div className="flex flex-col items-center md:items-start gap-3 w-full">
          {/* City name */}
          <Bone className="h-8 md:h-10 w-40 md:w-52 rounded-xl" />
          {/* Big temperature */}
          <Bone className="h-24 md:h-28 w-48 md:w-64 rounded-2xl" />
          {/* Feels like */}
          <Bone className="h-5 md:h-6 w-32 md:w-40" />

          {/* Stats 2×2 grid */}
          <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 mt-2 w-full md:w-auto self-center md:self-end md:text-left">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-1 items-start">
                <Bone className="h-4 w-16" />
                <Bone className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: big weather icon placeholder */}
      <Bone className="w-36 h-36 md:w-48 md:h-48 rounded-full shrink-0" />
    </div>
  );
}

// ─── HourlyForecast skeleton ──────────────────────────────────────────────────
export function HourlyForecastSkeleton() {
  return (
    <div className="backdrop-blur-sm rounded-2xl p-6">
      {/* Section heading */}
      <Bone className="h-5 w-36 mb-6" />

      <div className="overflow-x-hidden">
        <div className="flex gap-4 pb-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 p-12 rounded-xl min-w-20 bg-black/5"
            >
              {/* Time label */}
              <Bone className="h-3 w-10" />
              {/* Icon circle */}
              <Bone className="h-5 w-5 rounded-full" />
              {/* Temperature */}
              <Bone className="h-4 w-12" />
              {/* Rain % */}
              <Bone className="h-3 w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Forecast (7-day) skeleton ────────────────────────────────────────────────
export function ForecastSkeleton() {
  return (
    <div className="backdrop-blur-sm rounded-2xl p-6">
      {/* Section heading */}
      <Bone className="h-5 w-32 mb-6" />

      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-4 md:gap-y-0 py-3 px-4 rounded-xl bg-black/5"
          >
            {/* Icon + day */}
            <div className="flex items-center gap-3 w-1/2 md:w-36 shrink-0">
              <Bone className="h-6 w-6 rounded-full" />
              <Bone className="h-4 w-16 md:w-20" />
            </div>

            {/* Temp range */}
            <div className="flex items-center justify-end md:justify-center gap-2 shrink-0 w-1/2 md:w-auto md:order-last">
              <Bone className="h-4 w-6 md:w-8" />
              <Bone className="h-1.5 w-16 md:w-20 rounded-full" />
              <Bone className="h-4 w-6 md:w-8" />
            </div>

            {/* Rain chance */}
            <div className="flex items-center gap-2 w-1/4 md:w-16 shrink-0 md:justify-center">
              <Bone className="h-4 w-4 rounded-full" />
              <Bone className="h-3 w-6" />
            </div>

            {/* Wind */}
            <div className="flex items-center gap-2 w-1/4 md:w-24 shrink-0 md:justify-center">
              <Bone className="h-4 w-4 rounded-full" />
              <Bone className="h-3 w-8" />
            </div>

            {/* UV */}
            <div className="w-1/4 md:w-30 shrink-0 md:flex md:justify-center">
              <Bone className="h-3 md:h-4 w-12 md:w-16" />
            </div>

            {/* Sunrise / Sunset */}
            <div className="flex flex-col sm:flex-row gap-2 w-1/4 md:w-40 shrink-0 md:justify-center">
              <div className="flex gap-1 items-center"><Bone className="h-3 w-3 rounded-full" /><Bone className="h-2 md:h-3 w-6 md:w-8" /></div>
              <div className="flex gap-1 items-center"><Bone className="h-3 w-3 rounded-full" /><Bone className="h-2 md:h-3 w-6 md:w-8" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
