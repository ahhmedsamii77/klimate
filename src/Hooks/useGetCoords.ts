import { CoordsStateType } from "@/types/wather.types";
import { useEffect, useState } from "react";

export default function useGetCoords() {
  const [location, setlocation] = useState<CoordsStateType>({
    coords: null,
    error: null,
    isLoading: true,
  });
  function getCoords() {
    if (!navigator.geolocation) {
      setlocation({
        coords: null,
        isLoading: false,
        error: "your browser don't support this feature.",
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setlocation({
            coords: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
            error: null,
            isLoading: false,
          });
        },
        () => {
          setlocation({
            coords: null,
            error: "error occured. Please try again.",
            isLoading: false,
          });
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5 * 1000 * 60,
        }
      );
    }
  }
  useEffect(() => {
    getCoords();
  }, []);
  return {
    ...location,
    getCoords,
  };
}
