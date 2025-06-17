import { ListType } from "@/types/wather.types";
import { Card, CardContent } from "../ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { format } from 'date-fns'
export default function WeatherGraph({ forecastData }: { forecastData: ListType[] }) {
  type TooltipProps = {
    active?: boolean;
    payload?: any[];
  };
  const chartData = forecastData?.slice(0, 8).map(forecast => (
    {
      time: format(new Date(forecast?.dt * 1000), 'ha'),
      temp: Math.round(forecast?.main.temp),
      feels_like: Math.round(forecast?.main.feels_like)
  }
  ));
  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-background/90 rounded flex items-center gap-2 p-3">
          <div className="text-muted-foreground">
            <p className="font-bold text-sm">Temperature</p>
            <p className="text-sm font-medium">{payload[0].value}°</p>
          </div>
          <div className="text-muted-foreground">
            <p className="font-bold text-sm">Feels Like</p>
            <p className="text-sm font-medium">{payload[1].value}°</p>
          </div>
        </div>
      )
    }
    return null;
  }
  return (
    <Card className="bg-background/60 flex-[1]">
      <CardContent className="h-[200px] pb-3 space-y-2 w-full">
        <h2 className="text-xl tracking-tighter font-bold">Today's Temperature</h2>
        <ResponsiveContainer className='mb-3' width={'100%'} height={'100%'}>
          <LineChart data={chartData}>
            <XAxis stroke="#888" tickLine={false} dataKey='time' axisLine={false} />
            <YAxis stroke="#888" tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line dot={false} strokeWidth={2} stroke="#2563eb" type={'monotone'} dataKey='temp' />
            <Line dot={false} strokeDasharray={'5 5'} strokeWidth={2} stroke="#64748b" type={'monotone'} dataKey='feels_like' />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
