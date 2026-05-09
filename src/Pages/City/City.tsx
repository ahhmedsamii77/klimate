import CurrentWeather from "@/components/CurrentWeather/CurrentWeather";
import Forecast from "@/components/Forecast/Forecast";
import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails/WeatherDetails";
import WeatherGraph from "@/components/WeatherGraph/WeatherGraph";
import {
  useAddTofav,
  useGetCurrentWeather,
  useGetForecast,
  useReverseGeoLocation,
} from "@/lib/react-query";
import { CoordType, FavType, GeoLocationDataType } from "@/types/wather.types";
import { Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Helmet } from "react-helmet";

export default function City() {
  const { cityName } = useParams();
  const [searchParams] = useSearchParams();
  const country = searchParams.get("country");

  // ✅ Memoized so React Query gets a stable reference across renders
  const coords: CoordType = useMemo(
    () => ({
      lat: Number(searchParams.get("lat")),
      lon: Number(searchParams.get("lon")),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams.get("lat"), searchParams.get("lon")]
  );

  const { data: weather, isFetching: weatherLoading } = useGetCurrentWeather(coords);
  const { isFetching: forecastLoading, data: forecast } = useGetForecast(coords);
  const { data: geoLocation, isLoading: geoLocationLoading } = useReverseGeoLocation(coords);
  const { mutateAsync: addToFav } = useAddTofav();

  const forecastData = forecast?.data?.list;
  const weatherData = weather?.data;
  // ✅ Correct type — reverse geocoding returns GeoLocationDataType[]
  const geoLocationData: GeoLocationDataType[] | undefined = geoLocation?.data;

  const [isFav, setIsFav] = useState<boolean>(false);

  // ✅ Stable function reference via useCallback, geoLocationData in deps
  const checkIsFav = useCallback(() => {
    if (!geoLocationData?.[0]) return;
    const allFavs: FavType[] = JSON.parse(localStorage.getItem("fav") ?? "[]");
    const id = `${geoLocationData[0].name}${geoLocationData[0].country}`;
    setIsFav(allFavs.some((city) => city.id === id));
  }, [geoLocationData]);

  useEffect(() => {
    if (geoLocationData && geoLocationData.length > 0) {
      checkIsFav();
    }
  }, [geoLocationData, checkIsFav]);

  async function handleAddToFav() {
    if (!geoLocationData?.[0] || !weatherData) return;
    const city = geoLocationData[0];
    const isAdded = await addToFav({
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon,
      state: city.state,
      main: weatherData.main,
      weather: weatherData.weather,
      id: `${city.name}${city.country}`,
    });
    setIsFav(isAdded);
    toast.success(
      isAdded
        ? "City added to favorites successfully."
        : "City removed from favorites successfully."
    );
  }

  const isLoading = weatherLoading || forecastLoading || geoLocationLoading;

  if (isLoading || !geoLocation) {
    return <SkeletonLoader />;
  }

  // ✅ Guard: if data is missing after loading, show nothing harmful
  if (!weatherData || !forecastData) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-muted-foreground">No weather data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Helmet>
        <title>{cityName}, {country} – Klimate</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h1 className="font-bold text-2xl sm:text-3xl tracking-tight truncate">
          {cityName}, {country}
        </h1>
        <Button
          onClick={handleAddToFav}
          size="icon"
          className={`shrink-0 cursor-pointer transition-colors ${
            isFav
              ? "bg-yellow-500! border-yellow-500! hover:bg-yellow-400!"
              : "bg-background/60!"
          }`}
          variant="outline"
          aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
        >
          <Star
            className={`w-4 h-4 transition-all ${
              isFav ? "fill-black text-black" : "fill-transparent text-current"
            }`}
          />
        </Button>
      </div>

      {/* Current weather + temperature graph */}
      <div className="flex flex-col lg:flex-row gap-6">
        <CurrentWeather weatherData={weatherData} />
        <WeatherGraph forecastData={forecastData} />
      </div>

      {/* Details + 5-day forecast */}
      <div className="grid lg:grid-cols-2 gap-6">
        <WeatherDetails weatherData={weatherData} />
        <Forecast list={forecastData} />
      </div>
    </div>
  );
}
