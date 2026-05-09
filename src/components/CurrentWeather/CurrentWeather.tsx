import { CurrentWeatherType, GeoLocationDataType } from "@/types/wather.types";
import { Card, CardContent } from "../ui/card";
import { ArrowDown, ArrowUp, Cloud, CloudRain, CloudSnow, Droplets, Sun, Wind, Zap } from "lucide-react";
import { useState } from "react";

/** Fallback lucide icon when OpenWeatherMap CDN is unreachable */
function WeatherFallbackIcon({ icon, className }: { icon: string; className?: string }) {
  const code = icon.slice(0, 2); // e.g. "01", "09", "11"
  const props = { className: className ?? "w-16 h-16 text-yellow-400" };
  if (code === "01") return <Sun {...props} />;
  if (code === "09" || code === "10") return <CloudRain {...props} />;
  if (code === "11") return <Zap {...props} />;
  if (code === "13") return <CloudSnow {...props} />;
  return <Cloud {...props} />;
}

export default function CurrentWeather({
  weatherData,
  geoLocationData,
}: {
  weatherData: CurrentWeatherType;
  geoLocationData?: GeoLocationDataType;
}) {
  const [imgError, setImgError] = useState(false);
  const icon = weatherData?.weather[0]?.icon ?? "";
  const description = weatherData?.weather[0]?.description ?? "";
  const capitalizedDesc = description
    ? description.charAt(0).toUpperCase() + description.slice(1)
    : "";

  return (
    <Card className="bg-background/60 flex-1 flex flex-col justify-center">
      <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 h-full">
        <div className="space-y-3 flex-1 min-w-0">
          {geoLocationData && (
            <>
              <div className="flex items-end gap-1 flex-wrap">
                <h3 className="text-2xl font-bold tracking-tighter">{geoLocationData.name},</h3>
                <span className="text-sm text-muted-foreground">{geoLocationData.state}</span>
              </div>
              <p className="text-muted-foreground font-bold text-sm">{geoLocationData.country}</p>
            </>
          )}
          <div className="flex items-center gap-2">
            <p className="text-6xl sm:text-7xl font-bold">{Math.round(weatherData?.main.temp)}°</p>
            <div>
              <p className="text-muted-foreground text-sm">
                Feels Like {Math.round(weatherData?.main.feels_like)}°
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-blue-500 text-sm">
                  <ArrowDown className="w-3 h-3" />
                  <span>{Math.round(weatherData?.main.temp_min)}°</span>
                </div>
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <ArrowUp className="w-3 h-3" />
                  <span>{Math.round(weatherData?.main.temp_max)}°</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <p className="text-sm font-bold">Humidity</p>
                <p className="text-sm text-muted-foreground">{weatherData?.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <p className="text-sm font-bold">Wind Speed</p>
                <p className="text-sm text-muted-foreground">{weatherData?.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weather icon — falls back to a Lucide icon if CDN is down */}
        <div className="text-center shrink-0">
          {imgError || !icon ? (
            <WeatherFallbackIcon icon={icon} className="w-20 h-20 sm:w-28 sm:h-28 mx-auto" />
          ) : (
            <img
              className="w-[120px] sm:w-[160px] md:w-[200px]"
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={description}
              onError={() => setImgError(true)}
            />
          )}
          <p className="font-semibold text-sm mt-1">{capitalizedDesc}</p>
        </div>
      </CardContent>
    </Card> 
  );
}
