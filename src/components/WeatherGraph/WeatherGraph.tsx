import { ListType } from "@/types/wather.types";
import { Card, CardContent } from "../ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format } from 'date-fns';

type TooltipProps = {
  active?: boolean;
  payload?: { value: number }[];
};

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="bg-background border border-border rounded-lg flex items-center gap-4 px-3 py-2 shadow-md text-sm">
        <div>
          <p className="font-bold text-muted-foreground">Temp</p>
          <p className="font-semibold">{payload[0]?.value}°</p>
        </div>
        <div>
          <p className="font-bold text-muted-foreground">Feels Like</p>
          <p className="font-semibold">{payload[1]?.value}°</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function WeatherGraph({ forecastData }: { forecastData: ListType[] }) {
  const chartData = forecastData?.slice(0, 8).map(forecast => ({
    time: format(new Date(forecast?.dt * 1000), 'ha'),
    temp: Math.round(forecast?.main.temp),
    feels_like: Math.round(forecast?.main.feels_like),
  }));

  return (
    <Card className="bg-background/60 flex-1 flex flex-col">
      <CardContent className="flex flex-col flex-1 pb-3 space-y-2 w-full">
        <h2 className="text-xl tracking-tighter font-bold">Today's Temperature</h2>
        <div className="flex-1 w-full min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <XAxis
                stroke="#888"
                tickLine={false}
                dataKey="time"
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                stroke="#888"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                dot={false}
                strokeWidth={2}
                stroke="#2563eb"
                type="monotone"
                dataKey="temp"
              />
              <Line
                dot={false}
                strokeDasharray="5 5"
                strokeWidth={2}
                stroke="#64748b"
                type="monotone"
                dataKey="feels_like"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground px-1">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-blue-600 rounded" />
            <span>Temperature</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 bg-slate-500 rounded border-dashed" style={{ borderTop: '2px dashed #64748b', background: 'none' }} />
            <span>Feels Like</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
