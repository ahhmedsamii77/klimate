import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import useDebounce from "@/Hooks/useDebounce";
import { useAddToHistory, useSearchCity } from "@/lib/react-query";
import { CityHistoryType, SearchCityType } from "@/types/wather.types";
import { useNavigate } from "react-router-dom";

export default function SearchButton() {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState('');
  const { debounceValue } = useDebounce(query.trim(), 500);
  const { data } = useSearchCity(debounceValue);
  const searchedCities: SearchCityType[] = data?.data;
  const { mutateAsync: addToHistory } = useAddToHistory();
  const navigate = useNavigate();

  async function handleSelected(value: string) {
    const [country, name, lon, lat, state] = value.split('|');
    navigate(`city/${name}?lat=${lat}&lon=${lon}&country=${country}`);
    setOpen(false);
    setQuery('');
    await addToHistory({
      country,
      name,
      state,
      id: `${name}${country}`,
      lat: Number(lat),
      lon: Number(lon),
    });
  }

  const history: CityHistoryType[] = JSON.parse(localStorage.getItem('history')!) ?? [];

  return (
    <>
      {/* Icon-only on mobile, full button from sm up */}
      <Button
        onClick={() => setOpen(true)}
        className="bg-background/60! cursor-pointer"
        variant="outline"
        aria-label="Search cities"
      >
        <Search className="w-4 h-4 shrink-0" />
        <span className="hidden sm:inline ml-2 text-muted-foreground text-sm">Search Cities...</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput value={query} onValueChange={setQuery} placeholder="Search Cities..." />
        <CommandList>
          {(query.length < 2 || searchedCities?.length === 0) && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}

          {query.length >= 2 && searchedCities?.length > 0 && (
            <CommandGroup heading="Suggestions">
              {searchedCities.map(city => (
                <CommandItem
                  key={`${city.lat}-${city.lon}`}
                  onSelect={handleSelected}
                  className="cursor-pointer gap-1"
                  value={`${city.country}|${city.name}|${city.lon}|${city.lat}|${city.state}`}
                >
                  <span className="text-sm font-semibold">{city.name}</span>
                  {city.state && <span className="text-sm text-muted-foreground">, {city.state}</span>}
                  <span className="text-sm text-muted-foreground">, {city.country}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandSeparator />

          {history.length > 0 && (
            <CommandGroup heading="Recent">
              {history.map(city => (
                <CommandItem
                  key={city.id}
                  onSelect={handleSelected}
                  className="cursor-pointer gap-1"
                  value={`${city.country}|${city.name}|${city.lon}|${city.lat}|${city.state}`}
                >
                  <span className="text-sm font-semibold">{city.name}</span>
                  {city.state && <span className="text-sm text-muted-foreground">, {city.state}</span>}
                  <span className="text-sm text-muted-foreground">, {city.country}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
