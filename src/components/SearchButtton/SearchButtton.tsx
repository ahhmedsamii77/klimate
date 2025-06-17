import { useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../ui/command";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import useDebounce from "@/Hooks/useDebounce";
import { useAddToHistory, useSearchCity } from "@/lib/react-query";
import { CityHistoryType, SearchCityType } from "@/types/wather.types";
import { useNavigate } from "react-router-dom";

export default function SearchButtton() {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setquery] = useState('');
  const { debounceValue } = useDebounce(query.trim(), 500);
  const { data } = useSearchCity(debounceValue);
  const searchedCities: SearchCityType[] = data?.data;
  const { mutateAsync: addToHistory } = useAddToHistory();
  const navigate = useNavigate();
  async function handleSelected(value: string) {
    const [country, name, lon, lat, state] = value.split('|');
    navigate(`city/${name}?lat=${lat}&lon=${lon}&country=${country}`);
    setOpen(false);
    setquery('');
    await addToHistory({
      country,
      name,
      state,
      id: `${name}${country}`,
      lat: Number(lat),
      lon: Number(lon)
    });
  }
  console.log(searchedCities)
  const history: CityHistoryType[] = JSON.parse(localStorage.getItem('history')!) ?? [];
  return (
    <>
      <Button onClick={() => setOpen(true)} className="bg-background/60! flex items-center gap-3 rounded cursor-pointer text-muted-foreground pr-25!" variant={'outline'}>
        <Search className="w-4 h-4" />
        <span>Search Cities...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput value={query} onValueChange={setquery} placeholder="Search Cities..." />
        <CommandList>
          {(query.length < 2 || searchedCities?.length == 0) && <CommandEmpty>No cities found.</CommandEmpty>}
          {query.length > 2 && <CommandGroup heading="Suggestions">
            {searchedCities?.map(city => <CommandItem
              onSelect={handleSelected}
              className="cursor-pointer"
              value={`${city.country}|${city.name}|${city.lon}|${city.lat}|${city.state}`} key={city.lat}>
              <p className="text-sm font-semibold">{city.name} , </p>
              <p className="text-sm text-muted-foreground">{city.state} , </p>
              <p className="text-sm text-muted-foreground">{city.country}</p>
            </CommandItem>)}
          </CommandGroup>}
          <CommandSeparator />
          {(history?.length != 0) && (
            <CommandGroup heading="History">
              {history?.map(city => <CommandItem
                key={city.id}
                onSelect={handleSelected}
                className="cursor-pointer"
                value={`${city.country}|${city.name}|${city.lon}|${city.lat}|${city.state}`}>
                <p className="text-sm font-semibold">{city.name} , </p>
                <p className="text-sm text-muted-foreground">{city.state} , </p>
                <p className="text-sm text-muted-foreground">{city.country}</p>
              </CommandItem>)}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
