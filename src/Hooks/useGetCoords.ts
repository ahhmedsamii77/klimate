import { CoordsStateType } from "@/types/wather.types";
import { useEffect, useState } from "react";

export default function useGetCoords() {
  const [location, setLocation] = useState<CoordsStateType>({
    coords: null,
    error: null,
    isLoading: true,
  });

  function getCoords() {
    if (!navigator.geolocation) {
      setLocation({
        coords: null,
        isLoading: false,
        error: "Your browser doesn't support geolocation.",
      });
      return;
    }

    setLocation((prev) => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      () => {
        setLocation({
          coords: null,
          error: "Location access denied. Please allow location and retry.",
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10_000, // 10 seconds — reasonable default
      }
    );
  }

  useEffect(() => {
    getCoords();
  }, []);

  return {
    ...location,
    getCoords,
  };
}
