"use client";

import { useState, useCallback } from "react";

export interface GeoLocationData {
  latitude: number;
  longitude: number;
}

export interface GeoError {
  code: number | "UNKNOWN";
  message: string;
}

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<GeoError | null>(null);
  const [coords, setCoords] = useState<GeoLocationData | null>(null);

  const getPosition = useCallback((options?: PositionOptions) => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError({
        code: "UNKNOWN",
        message: "Geolocation is not supported by your browser.",
      });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        let message = "An unknown error occurred while getting your location.";
        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = "Location permission denied. Please enable it in browser settings.";
            break;
          case err.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
          case err.TIMEOUT:
            message = "The request to get user location timed out.";
            break;
        }
        setError({ code: err.code, message });
        setIsLoading(false);
      },
      options
    );
  }, []);

  return { isLoading, error, coords, getPosition, setError };
}
