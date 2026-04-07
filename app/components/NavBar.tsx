"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, MapPin } from "lucide-react";

interface City {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

interface NavBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  cities: City[];
  isCitySearching: boolean;
  onCitySelect: (city: City) => void;
  unit: "C" | "F";
  onUnitChange: (unit: "C" | "F") => void;
  onRequestLocation: () => void;
}

export default function NavBar({
  query,
  onQueryChange,
  cities,
  isCitySearching,
  onCitySelect,
  unit,
  onUnitChange,
  onRequestLocation,
}: NavBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setShowDropdown(query.length > 2 && (isCitySearching || cities.length > 0));
  }, [query, cities, isCitySearching]);

  return (
    <nav className="w-full border-b border-[#2c2c2c] bg-[#080808] px-7 py-2.5 grid grid-cols-3 items-center gap-4 relative z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/devnodes.webp"
          alt="Devnodes"
          width={120}
          height={40}
          style={{ height: "64px", width: "auto" }}
          priority
        />
      </div>

      {/* Search + Dropdown */}
      <div className="flex justify-center">
        <div className="max-w-md w-full relative">
          <div className="flex items-center gap-2 bg-[#979797] border-gray-200 rounded-lg px-3.5 py-2.5">
            <Search size={24} color="#FFFFFF" />
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search any city or location"
              autoFocus
              className="bg-transparent text-md text-white placeholder:text-white outline-none w-full"
            />
          </div>

        {showDropdown && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#2c2c2c] rounded-lg overflow-hidden shadow-xl">
            {isCitySearching ? (
              <div className="px-4 py-3 text-white text-sm">Searching...</div>
            ) : cities.length === 0 ? (
              <div className="px-4 py-3 text-gray-400 text-sm">No cities found</div>
            ) : (
              cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    onCitySelect(city);
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-3 text-white text-sm hover:bg-[#2c2c2c] transition-colors border-b border-[#2c2c2c] last:border-0"
                >
                  {city.name}
                  {city.admin1 ? `, ${city.admin1}` : ""}, {city.country}
                </button>
              ))
            )}
          </div>
        )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3">
        {/* Current Location Button */}
        <button
          onClick={onRequestLocation}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1a1a1a] text-white text-sm font-medium hover:bg-[#2c2c2c] transition-colors border border-[#2c2c2c]"
          title="Use current location"
        >
          <MapPin size={16} />
           Use Current Location
        </button>
        
        {/* Unit Toggle */}
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => onUnitChange("C")}
            className={`px-3 py-1.5 rounded-md text-sm cursor-pointer font-medium transition-all ${
              unit === "C" ? "bg-white text-black" : "text-white hover:text-gray-300"
            }`}
          >
            °C
          </button>
          <button
            onClick={() => onUnitChange("F")}
            className={`px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium transition-all ${
              unit === "F" ? "bg-white text-black" : "text-white hover:text-gray-300"
            }`}
          >
            °F
          </button>
        </div>
      </div>
    </nav>
  );
}