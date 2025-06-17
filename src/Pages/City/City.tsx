import CurrentWeather from "@/components/CurrentWeather/CurrentWeather";
import Forecast from "@/components/Forecast/Forecast";
import SkeletonLoader from "@/components/SkeletonLoader/SkeletonLoader";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails/WeatherDetails";
import WeatherGraph from "@/components/WeatherGraph/WeatherGraph";
import { useAddTofav, useGetCurrentWeather, useGetForecast, useReverseGeoLocation } from "@/lib/react-query";
import { CoordType, FavType, SearchCityType } from "@/types/wather.types";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom"
import { toast } from "sonner";

export default function City() {
  const { cityName } = useParams();
  const [searchParams] = useSearchParams();
  const country = searchParams.get('country');
  const coords: CoordType | any = {
    lat: searchParams.get('lat'),
    lon: searchParams.get('lon')
  }!
  const { data: weather, isFetching: weatherLoading } = useGetCurrentWeather(coords);
  const { isFetching: forecastLoading, data: forecast } = useGetForecast(coords!);
  const { data: geoLocation } = useReverseGeoLocation(coords)
  const { mutateAsync: addToFav } = useAddTofav();
  const forecastData = forecast?.data.list;
  const weatherData = weather?.data!;
  const geoLocationData: SearchCityType[] = geoLocation?.data ?? []
  const [isFav, setIsFav] = useState<boolean>(false)
  const { name, country: myCountry, lat, lon, state } = geoLocationData?.[0] ?? [];
  async function handleAddToFav() {
    const res = await addToFav({
      name: name,
      country: myCountry!,
      lat: lat,
      lon: lon,
      state: state,
      main: weatherData.main,
      weather: weatherData.weather,
      id: `${name}${myCountry}`,
    });
    setIsFav(res);
    if (res) {
      toast.success('city added to favorites successfully.')
      return;
    }
    toast.success('city removed from favorites successfully.')
  }
  function checkIsFav() {
    const allfavs: FavType[] = JSON.parse(localStorage.getItem('fav')!);
    const isExist = allfavs?.find(city => city.id == `${name}${myCountry}`,);
    if (isExist) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }
  useEffect(() => {
    checkIsFav();
  }, [forecastData, weatherData, geoLocationData]);
  if (weatherLoading || forecastLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold  text-3xl tracking-tight">{cityName}, {country}</h1>
        <Button onClick={handleAddToFav} className={` ${isFav ? 'bg-yellow-500!' : 'bg-background/60! '} cursor-pointer`} variant={'outline'}>
          <Star className={`w-5! h-5! fill-current ${isFav ? 'text-black!' : 'text-white'!}`} />
        </Button>
      </div>
      <div className="space-y-4">
        <CurrentWeather weatherData={weatherData!} />
        <WeatherGraph forecastData={forecastData} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <WeatherDetails weatherData={weatherData} />
        <Forecast list={forecastData} />
      </div>
    </div>
  )
}
