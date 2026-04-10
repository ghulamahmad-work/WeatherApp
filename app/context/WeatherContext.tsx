"use client";

import React, { 
  createContext, 
  useContext, 
  useState, 
  useMemo, 
  useCallback, 
  useEffect,
  ReactNode 
} from "react";
import { reverseGeocode } from "@/app/services/WeatherApi";
import { useGeolocation, GeoError } from "@/app/hooks/useGeolocation";
import { Location, City } from "@/app/types/weather";

interface WeatherContextType {
  location: Location | null;
  unit: "C" | "F";
  isLoading: boolean;
  geoError: GeoError | null;
  hasLocation: boolean;
  onUnitChange: (unit: "C" | "F") => void;
  setGeoError: (error: GeoError | null) => void;
  onLocationSelect: (city: City) => void;
  onRequestLocation: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LOCATION: "weather_app_location",
  UNIT: "weather_app_unit",
};

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location | null>(null);
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [isSyncing, setIsSyncing] = useState(true);

  const { 
    isLoading: isGeoLoading, 
    error: geoError, 
    coords, 
    getPosition, 
    setError: setGeoError 
  } = useGeolocation();

  useEffect(() => {
    const savedLocation = localStorage.getItem(STORAGE_KEYS.LOCATION);
    const savedUnit = localStorage.getItem(STORAGE_KEYS.UNIT);

    if (savedLocation) {
      try {
        setLocation(JSON.parse(savedLocation));
      } catch (e) {
        console.error("Failed to parse saved location", e);
      }
    }
    
    if (savedUnit === "C" || savedUnit === "F") {
      setUnit(savedUnit);
    }
    
    setIsSyncing(false);
  }, []);

  // 4. PERSISTENCE: SAVE ON CHANGE
  useEffect(() => {
    if (!isSyncing) {
      if (location) {
        localStorage.setItem(STORAGE_KEYS.LOCATION, JSON.stringify(location));
      } else {
        localStorage.removeItem(STORAGE_KEYS.LOCATION);
      }
    }
  }, [location, isSyncing]);

  useEffect(() => {
    if (!isSyncing) {
      localStorage.setItem(STORAGE_KEYS.UNIT, unit);
    }
  }, [unit, isSyncing]);

  useEffect(() => {
    if (coords) {
      const fetchCity = async () => {
        try {
          const locationData = await reverseGeocode(coords.latitude, coords.longitude);
          setLocation({
            name: locationData.name,
            country: locationData.country,
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        } catch (err) {
          console.error("Geocoding error:", err);
          setLocation({
            name: "Current Location",
            country: "",
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        }
      };
      fetchCity();
    }
  }, [coords]);
  const onUnitChange = useCallback((newUnit: "C" | "F") => {
    setUnit(newUnit);
  }, []);

  const onLocationSelect = useCallback((city: City) => {
    setLocation({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    });
  }, []);

  const onRequestLocation = useCallback(() => {
    getPosition({ enableHighAccuracy: true, timeout: 10000 });
  }, [getPosition]);

  const clearGeoError = useCallback((error: GeoError | null) => {
    setGeoError(error);
  }, [setGeoError]);


  const hasLocation = !!location;
  const isLoading = isGeoLoading || isSyncing;


  const value = useMemo(() => ({
    location,
    unit,
    isLoading,
    geoError,
    hasLocation,
    onUnitChange,
    setGeoError: clearGeoError,
    onLocationSelect,
    onRequestLocation,
  }), [
    location, 
    unit, 
    isLoading, 
    geoError, 
    hasLocation, 
    onUnitChange, 
    clearGeoError, 
    onLocationSelect, 
    onRequestLocation
  ]);

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
}
