import { ListType } from "@/types/wather.types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format, startOfDay } from "date-fns";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

export default function Forecast({ list }: { list: ListType[] }) {
  function getDailyForecast(data: ListType[]) {
    const seenDates = new Set<string>();
    const dailyForecast: ListType[] = [];
    for (const item of data) {
      const date = format(startOfDay(new Date(item.dt * 1000)), 'yyyy-MM-dd');
      if (!seenDates.has(date)) {
        seenDates.add(date);
        dailyForecast.push(item);
      }
    }
    return dailyForecast.slice(0, 5);
  }

  const daily = getDailyForecast(list);

  return (
    <Card className="bg-background/60 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tighter">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between space-y-2">
        {daily.map((day, idx) => (
          <div key={idx} className="p-3 border rounded-lg flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
            {/* Date + description */}
            <div className="min-w-[110px]">
              <p className="font-bold text-sm">{format(new Date(day.dt * 1000), 'EEE, dd MMM')}</p>
              <p className="text-xs text-muted-foreground capitalize">{day?.weather[0].description}</p>
            </div>

            {/* Min / Max */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-blue-500 text-sm">
                <ArrowDown className="w-3 h-3" />
                <span>{Math.round(day?.main.temp_min)}°</span>
              </div>
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <ArrowUp className="w-3 h-3" />
                <span>{Math.round(day?.main.temp_max)}°</span>
              </div>
            </div>

            {/* Humidity + Wind – hidden on very small screens */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold">Humidity</p>
                  <p className="text-xs text-muted-foreground">{day?.main.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold">Wind</p>
                  <p className="text-xs text-muted-foreground">{day?.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
