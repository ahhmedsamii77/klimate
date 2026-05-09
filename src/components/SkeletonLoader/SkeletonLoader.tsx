import { Skeleton } from "../ui/skeleton";

export default function SkeletonLoader() {
  return (
    <div className="space-y-6">
      {/* Favorites row placeholder */}
      <div className="flex gap-3 overflow-hidden">
        <Skeleton className="h-[90px] w-[200px] rounded-lg shrink-0" />
        <Skeleton className="h-[90px] w-[200px] rounded-lg shrink-0" />
      </div>

      {/* "My Location" header placeholder */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40 rounded" />
        <Skeleton className="h-9 w-9 rounded" />
      </div>

      {/* CurrentWeather + WeatherGraph row */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Skeleton className="flex-1 h-[220px] rounded-xl" />
        <Skeleton className="flex-1 h-[220px] rounded-xl" />
      </div>

      {/* WeatherDetails + Forecast grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Skeleton className="h-[260px] rounded-xl" />
        <Skeleton className="h-[260px] rounded-xl" />
      </div>
    </div>
  );
}
