import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { FavType } from "@/types/wather.types";
import { Button } from "../ui/button";
import { Cloud, CloudRain, CloudSnow, Sun, X, Zap } from "lucide-react";
import { useAddTofav } from "@/lib/react-query";
import { toast } from "sonner";
import React, { useState } from "react";

/** Lucide fallback when OpenWeatherMap CDN icon fails to load */
function WeatherFallbackIcon({ icon, className }: { icon: string; className?: string }) {
  const code = icon.slice(0, 2);
  const props = { className: className ?? "w-8 h-8 text-yellow-400" };
  if (code === "01") return <Sun {...props} />;
  if (code === "09" || code === "10") return <CloudRain {...props} />;
  if (code === "11") return <Zap {...props} />;
  if (code === "13") return <CloudSnow {...props} />;
  return <Cloud {...props} />;
}

export default function FavCities({
  fav,
  setfavCities,
}: {
  fav: FavType;
  setfavCities: React.Dispatch<React.SetStateAction<FavType[]>>;
}) {
  const { mutateAsync: removeFromFav } = useAddTofav();
  const [imgError, setImgError] = useState(false);

  async function handleRemoveFromFav(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const res = await removeFromFav(fav);
    if (!res) {
      setfavCities((prev) => prev.filter((city) => city.id !== fav.id));
      toast.success("City removed from favorites successfully.");
    }
  }

  if (!fav?.name || !fav?.lat || !fav?.lon || !fav?.country) return null;

  const icon = fav.weather?.[0]?.icon ?? "";

  return (
    <Link
      to={`city/${fav.name}?lat=${fav.lat}&lon=${fav.lon}&country=${fav.country}`}
      className="block min-w-[220px] max-w-[280px]"
    >
      <Card className="bg-background/60 relative w-full h-full shadow hover:shadow-md transition-shadow">
        <CardContent className="pt-5 pb-3 px-3">
          <Button
            onClick={handleRemoveFromFav}
            variant="ghost"
            size="icon"
            className="cursor-pointer absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-destructive"
            aria-label="Remove from favourites"
          >
            <X className="w-3.5 h-3.5" />
          </Button>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              {/* Weather icon with CDN fallback */}
              {icon && (
                imgError ? (
                  <WeatherFallbackIcon icon={icon} className="w-10 h-10 shrink-0 text-yellow-400" />
                ) : (
                  <img
                    className="w-10 h-10 shrink-0"
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={fav.name}
                    onError={() => setImgError(true)}
                  />
                )
              )}
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">{fav.name}</p>
                <p className="text-muted-foreground text-xs">{fav.country}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-xl">{Math.round(fav.main.temp)}°</p>
              <p className="text-xs text-muted-foreground capitalize">
                {fav.weather?.[0]?.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
