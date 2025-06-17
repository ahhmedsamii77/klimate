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
    <Card className="bg-background/60">
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tighter">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {daily.map((day, idx) => (
          <div key={idx} className="p-4 border rounded-lg flex items-center justify-between">
            <div>
              <p className="font-bold">{format(new Date(day.dt * 1000), 'EEE dd MMM')}</p>
              <p className="text-sm text-muted-foreground">{day?.weather[0].description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-blue-500">
                <ArrowDown className="w-3 h-3" />
                <p>{Math.round(day?.main.temp_min)}</p>
              </div>
              <div className="flex items-center gap-1 text-red-500">
                <ArrowUp className="w-3 h-3" />
                <p>{Math.round(day?.main.temp_max)}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <div className="">
                  <p className="text-sm font-bold">Humininty</p>
                  <p className="text-sm text-muted-foreground">{day?.main.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-blue-500" />
                <div className="">
                  <p className="text-sm font-bold">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">{day?.wind.speed} m/s</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
