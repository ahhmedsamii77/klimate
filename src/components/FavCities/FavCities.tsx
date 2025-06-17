import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { FavType } from "@/types/wather.types";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useAddTofav } from "@/lib/react-query";
import { toast } from "sonner";
import React from "react";

export default function FavCities({ fav, setfavCities }: { fav: FavType, setfavCities: React.Dispatch<React.SetStateAction<FavType[]>> }) {
  const { mutateAsync: removeFromFav } = useAddTofav();
  async function handleRemoveFromFav(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const res = await removeFromFav(fav);
    if (!res) {
      setfavCities(prev => prev.filter(city => city.id != fav.id));
      toast.success('city removed from favorites successfully.')
    }
  }
  return (
    <Link to={`city/${fav.name}?lat=${fav.lat}&lon=${fav.lon}&country=${fav.country}`} className="min-w-[200px]">
      <Card className="bg-background/60 relative w-full p-3 shadow">
        <CardContent>
          <Button onClick={handleRemoveFromFav} variant={'link'} className="cursor-pointer absolute top-0 right-0">
            <X className="w-4! h-4!" />
          </Button>
          <div className="mt-2 flex justify-between items-center gap-15">
            <div className="flex gap-1 items-center">
              <img className="w-[50px]" src={`https://openweathermap.org/img/wn/${fav.weather[0].icon}@4x.png`} alt={fav.name} />
              <div>
                <p className="font-bold">{fav.name}</p>
                <p className="text-muted-foreground text-sm">{fav.country}</p>
              </div>
            </div>
            <div>
              <p className="font-bold text-2xl">{Math.round(fav.main.temp)}°</p>
              <p className="text-sm text-muted-foreground">{fav.weather[0].description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
