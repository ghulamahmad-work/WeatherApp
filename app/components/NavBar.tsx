"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, MapPin, Loader2 } from "lucide-react";
import { useCitySearch } from "@/app/hooks/UseWeather";
import { useWeatherContext } from "@/app/context/WeatherContext";
import { City } from "@/app/types/weather";

export default function NavBar() {
  const {
    unit,
    onUnitChange,
    onLocationSelect,
    onRequestLocation,
    isLoading,
  } = useWeatherContext();

  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { data: cities = [], isLoading: isCitySearching } = useCitySearch(query);

  const showDropdown = useMemo(() => {
    return (
      dropdownOpen &&
      query.length > 2 &&
      (isCitySearching || cities.length > 0)
    );
  }, [query, isCitySearching, cities, dropdownOpen]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setDropdownOpen(true);
  };

  const onCityClick = (city: City) => {
    onLocationSelect(city);
    setQuery("");
    setDropdownOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full border-b border-[#2c2c2c] bg-[#080808] px-4 md:px-7 py-3 md:py-2.5 flex items-center justify-between md:grid md:grid-cols-3 md:items-center relative z-50">

        {/* LEFT: Logo */}
        <div className="flex items-center md:justify-start w-auto md:w-full">
          <Image
            src="/devnodes.webp"
            alt="Devnodes"
            width={150}
            height={50}
            style={{ height: "58px", width: "auto" }}
            priority
          />
        </div>

        {/* CENTER: Search (Desktop only) */}
        <div className="hidden md:flex justify-center w-full">
          <div className="w-full px-2 md:px-4 relative">
            <div className="flex items-center gap-2 bg-[#979797] rounded-lg px-3.5 py-3.5">
              <Search size={24} color="#FFFFFF" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search any city"
                className="bg-transparent text-md text-white placeholder:text-white outline-none w-full"
              />
            </div>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#2c2c2c] rounded-lg overflow-hidden shadow-xl">
                {isCitySearching ? (
                  <div className="px-4 py-3 text-white text-sm">Searching...</div>
                ) : cities.length === 0 ? (
                  <div className="px-4 py-3 text-gray-400 text-sm">
                    No cities found
                  </div>
                ) : (
                  cities.map((city: City) => (
                    <button
                      key={city.id}
                      onClick={() => onCityClick(city)}
                      className="w-full text-left px-4 py-3 text-white text-sm hover:bg-[#2c2c2c] transition-colors border-b border-[#2c2c2c] last:border-0"
                    >
                      {city.name}
                      {city.admin1 ? `, ${city.admin1}` : ""},{" "}
                      {city.country}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3 md:justify-end w-auto md:w-full">

          {/* Mobile Search Icon */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="md:hidden text-white"
          >
            <Search size={22} />
          </button>

          {/* Location */}
          <>
            {/* Mobile + Tablet → Icon */}
            <button
              onClick={onRequestLocation}
              disabled={isLoading}
              className={`lg:hidden text-white ${isLoading ? "opacity-50" : ""}`}
            >
              {isLoading ? <Loader2 size={22} className="animate-spin" /> : <MapPin size={22} />}
            </button>

            {/* Desktop only → Full button */}
            <button
              onClick={onRequestLocation}
              disabled={isLoading}
              className={`hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a1a1a] text-white text-sm font-medium transition-all border border-[#2c2c2c] ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#2c2c2c]"
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Locating...
                </>
              ) : (
                <>
                  <MapPin size={16} />
                  Use Current Location
                </>
              )}
            </button>
          </>

          {/* Unit Toggle */}
          <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 scale-90 md:scale-100">
            <button
              onClick={() => onUnitChange("C")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${unit === "C"
                  ? "bg-white text-black"
                  : "text-white hover:text-gray-300"
                }`}
            >
              °C
            </button>
            <button
              onClick={() => onUnitChange("F")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${unit === "F"
                  ? "bg-white text-black"
                  : "text-white hover:text-gray-300"
                }`}
            >
              °F
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SEARCH OVERLAY */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#080808] z-999 transition-transform duration-300 ${mobileSearchOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-[#2c2c2c]">

          {/* Back */}
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="text-white text-lg font-bold"
          >
            ←
          </button>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search city or location"
            autoFocus
            className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded-lg outline-none"
          />
        </div>

        {/* Results */}
        {showDropdown && (
          <div className="bg-[#646464]">
            {isCitySearching ? (
              <div className="px-4 py-3 text-white text-sm">Searching...</div>
            ) : cities.length === 0 ? (
              <div className="px-4 py-3 text-gray-400 text-sm">
                No cities found
              </div>
            ) : (
              cities.map((city: City) => (
                <button
                  key={city.id}
                  onClick={() => {
                    onCityClick(city);
                    setMobileSearchOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-white text-sm border-b border-[#2c2c2c]"
                >
                  {city.name}
                  {city.admin1 ? `, ${city.admin1}` : ""}, {city.country}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}

