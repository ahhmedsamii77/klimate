import {
  getCurrentWeather,
  getForecast,
  reverseGeoLocation,
  searchCity,
} from "@/apis/weather";
import { CityHistoryType, CoordType, FavType } from "@/types/wather.types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetCurrentWeather(coords: CoordType) {
  return useQuery({
    queryKey: ["currentWeather", coords],
    queryFn: () => getCurrentWeather(coords),
    enabled: !!coords,
  });
}

export function useReverseGeoLocation(coords: CoordType) {
  return useQuery({
    queryKey: ["reverseGeoLocation", coords],
    queryFn: () => reverseGeoLocation(coords),
    enabled: !!coords,
  });
}

export function useGetForecast(coords: CoordType) {
  return useQuery({
    queryKey: ["forecast", coords],
    queryFn: () => getForecast(coords),
    enabled: !!coords,
  });
}

export function useSearchCity(query: string) {
  return useQuery({
    queryKey: ["searchCity", query],
    queryFn: () => searchCity(query),
    enabled: query.length > 2,
  });
}

export function useAddToHistory() {
  return useMutation({
    mutationFn: (city: CityHistoryType) => {
      const allCities = JSON.parse(localStorage.getItem("history")!) ?? [];
      const isExist = allCities?.some(
        (item: CityHistoryType) => item.id == city.id
      );
      if (!isExist) {
        allCities.push(city);
        localStorage.setItem("history", JSON.stringify(allCities));
        return allCities;
      }
      return allCities;
    },
  });
}

export function useAddTofav() {
  return useMutation({
    mutationFn: async (city: FavType) => {
      const allCities = JSON.parse(localStorage.getItem("fav")!) ?? [];
      const index = allCities?.findIndex(
        (item: CityHistoryType) => item.id == city.id
      );
      if (index == -1) {
        allCities.push(city);
        localStorage.setItem("fav", JSON.stringify(allCities));
        return true;
      } else {
        allCities.splice(index, 1);
        localStorage.setItem("fav", JSON.stringify(allCities));
        return false;
      }
    },
  });
}
