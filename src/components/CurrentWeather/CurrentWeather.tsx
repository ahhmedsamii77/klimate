import { CurrentWeatherType, GeoLocationDataType } from "@/types/wather.types";
import { Card, CardContent } from "../ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

export default function CurrentWeather({ weatherData, geoLocationData }: { weatherData: CurrentWeatherType, geoLocationData?: GeoLocationDataType }) {
  return (
    <Card className="bg-background/60 ">
      <CardContent className="flex items-center justify-between">
        <div className="space-y-3">
          {geoLocationData && <>
            <div className="flex items-end gap-1">
              <h3 className="text-2xl font-bold tracking-tighter">{geoLocationData?.name} , </h3>
              <span className="text-sm text-muted-foreground">{geoLocationData?.state}</span>
            </div>
            <p className="text-muted-foreground font-bold text-sm">{geoLocationData?.country}</p>
          </>}
          <div className="flex items-center gap-2">
            <p className="text-7xl font-bold">{Math.round(weatherData?.main.temp)}°</p>
            <div>
              <p className="text-muted-foreground">Feels Like {Math.round(weatherData?.main.feels_like)}°</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-blue-500">
                  <ArrowDown className="w-3 h-3" />
                  <p>{Math.round(weatherData?.main.temp_min)}</p>
                </div>
                <div className="flex items-center gap-1 text-red-500">
                  <ArrowUp className="w-3 h-3" />
                  <p>{Math.round(weatherData?.main.temp_max)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-15">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div className="">
                <p className="text-sm font-bold">Humininty</p>
                <p className="text-sm text-muted-foreground">{weatherData?.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-blue-500" />
              <div className="">
                <p className="text-sm font-bold">Wind Speed</p>
                <p className="text-sm text-muted-foreground">{weatherData?.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <img className="max-w-[200px]" src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`} alt={weatherData.weather[0].description} />
          <p className="font-semibold">{weatherData?.weather[0].description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
