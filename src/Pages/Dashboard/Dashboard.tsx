import CurrentWeather from '@/components/CurrentWeather/CurrentWeather'
import ErrorWeatherData from '@/components/ErrorWeatherData/ErrorWeatherData'
import FavCities from '@/components/FavCities/FavCities'
import Forecast from '@/components/Forecast/Forecast'
import SkeletonLoader from '@/components/SkeletonLoader/SkeletonLoader'
import { Button } from '@/components/ui/button'
import WeatherDetails from '@/components/WeatherDetails/WeatherDetails'
import WeatherGraph from '@/components/WeatherGraph/WeatherGraph'
import useGetCoords from '@/Hooks/useGetCoords'
import { useGetCurrentWeather, useGetForecast, useReverseGeoLocation } from '@/lib/react-query'
import { CurrentWeatherType, FavType } from '@/types/wather.types'
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
export default function Dashboard() {
  const { error, isLoading, coords, getCoords } = useGetCoords();
  const { isFetching: CurrentWeatherFetching, data: weather, refetch: weatherRefetch } = useGetCurrentWeather(coords!);
  const { isFetching: geoLocationFetching, data: geoLocation, refetch: geoLocationRefetch } = useReverseGeoLocation(coords!);
  const { isFetching: forecastFetch, data: forecast, refetch: forecastRefetch } = useGetForecast(coords!);
  const weatherData: CurrentWeatherType = weather?.data!;
  const geoLocationData: any = geoLocation?.data!;
  const forecastData = forecast?.data.list;
  const [favCities, setfavCities] = useState<FavType[]>(() => {
    const storedFav = localStorage.getItem('fav');
    return storedFav ? JSON.parse(storedFav) : [];
  })
  function handleRefersh() {
    getCoords();
    if (coords) {
      weatherRefetch();
      geoLocationRefetch();
      forecastRefetch();
    }
  }
  if (isLoading || CurrentWeatherFetching || geoLocationFetching || forecastFetch) {
    return <SkeletonLoader />;
  }
  if (error) {
    return <ErrorWeatherData getCoords={getCoords} error={error} />
  }
  return (
    <div className='space-y-5'>
      <Helmet>Dashboard</Helmet>
      {(!favCities || favCities?.length != 0) && <h2 className='text-2xl font-bold tracking-tight'>Favorites</h2>}
      <div className='flex items-center flex-wrap gap-3'>
        {favCities?.map(fav => <FavCities setfavCities={setfavCities} fav={fav} key={fav.id} />)}
      </div>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold tracking-tight'>My Location</h2>
        <Button onClick={handleRefersh} variant={'outline'} className='cursor-pointer bg-background/60!'>
          <RefreshCw className='w-6 h-6' />
        </Button>
      </div>
      <div className='flex flex-col lg:flex-row  gap-6'>
        <CurrentWeather geoLocationData={geoLocationData?.[0]} weatherData={weatherData} />
        <WeatherGraph forecastData={forecastData} />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <WeatherDetails weatherData={weatherData} />
        <Forecast list={forecastData} />
      </div>
    </div>
  )
}
