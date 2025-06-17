export type CurrentWeatherType = {
  coord: CoordType;
  weather: WeatherType[];
  base: string;
  main: MainType;
  visibility: number;
  wind: WindType;
  dt: number;
  sys: SYSType;
  name: string;
};
export type ForecastType = {
  list: ListType[];
};
export type ListType = {
  dt: number;
  main: MainType;
  weather: WeatherType[];
  wind: WindType;
};
export type CityHistoryType = {
  name: string;
  country: string;
  state: string;
  id: string;
  lon: number;
  lat: number
};
export type SearchCityType = {
  country: string;
  name: string;
  state: string;
  lat: number;
  lon: number;
};
export type FavType = {
    country: string;
  name: string;
  state: string;
  lat: number;
  lon: number;
  id: string;
  main: MainType;
  weather: WeatherType[];
}
export type GeoLocationDataType = {
  country: string;
  state: string;
  name: string;
  lon: number;
  lat: number;
};
export type CoordsStateType = {
  coords: CoordType | null;
  error: string | null;
  isLoading: boolean;
};
export type SYSType = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};
export type WindType = {
  speed: number;
  gust: number;
  deg: number;
};
export type CoordType = {
  lon: number ;
  lat: number;
};

export type WeatherType = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MainType = {
  grnd_level: number;
  sea_level: number;
  humidity: number;
  temp_max: number;
  pressure: number;
  temp_min: number;
  feels_like: number;
  temp: number;
};
