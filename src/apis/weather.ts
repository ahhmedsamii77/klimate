import {
  CoordType,
  CurrentWeatherType,
  GeoLocationDataType,
} from "@/types/wather.types";
import axios from "axios";
export function getCurrentWeather(coords: CoordType) {
  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;
  return axios.get<CurrentWeatherType>(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        appid: API_KEY,
        lat: coords.lat,
        lon: coords.lon,
        units: "metric",
      },
    }
  );
}

export function reverseGeoLocation(coords: CoordType) {
  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;
  return axios.get<GeoLocationDataType[]>(
    "http://api.openweathermap.org/geo/1.0/reverse",
    {
      params: {
        appid: API_KEY,
        lat: coords.lat,
        lon: coords.lon,
        units: "metric",
      },
    }
  );
}

export function getForecast(coords: CoordType) {
  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;
  return axios.get("https://api.openweathermap.org/data/2.5/forecast", {
    params: {
      appid: API_KEY,
      lat: coords.lat.toString(),
      lon: coords.lon.toString(),
      units: "metric",
    },
  });
}

export function searchCity(query: string) {
  const API_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;
  return axios.get("https://api.openweathermap.org/geo/1.0/direct", {
    params: {
      appid: API_KEY,
      q: query,
    },
  });
}
