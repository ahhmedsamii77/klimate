import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CurrentWeatherType } from '@/types/wather.types';
import { format } from "date-fns";

export default function WeatherDetails({ weatherData }: { weatherData: CurrentWeatherType }) {
  function getWindDirectionLabel(degree: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.floor((degree + 22.5) / 45) % 8;
    const dir = directions[index];
    return `${dir}(${index}°)`;
  }
  const details = [
    {
      icon: Sunrise,
      description: "Sunrise",
      content: format(new Date(weatherData.sys.sunrise * 1000), 'h:mm a'),
      color: 'text-yellow-500'
    },
    {
      icon: Sunset,
      description: "Sunset",
      content: format(new Date(weatherData.sys.sunset * 1000), 'h:mm a'),
      color: 'text-blue-500'
    },
    {
      icon: Compass,
      description: "Wind Direction",
      content: getWindDirectionLabel(weatherData.wind.deg),
      color: 'text-green-500'
    },
    {
      icon: Gauge,
      description: "Pressure",
      content: `${weatherData.main.pressure}hPa`,
      color: 'text-purple-400'
    },
  ]
  return (
    <div className="items-start">
      <Card className="bg-background/60">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tighter">Weather Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {details?.map(detail => (
            <div key={detail?.color} className="flex items-center gap-3 border p-4 rounded-lg">
              <detail.icon className={`w-5 h-5 ${detail?.color}`} />
              <div>
                <p className="font-bold leading-none">{detail?.description}</p>
                <p className="text-muted-foreground text-sm">{detail?.content}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
