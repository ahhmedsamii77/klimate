import { Skeleton } from "../ui/skeleton";

export default function SkeletonLoader() {
  return (
    <div className="space-y-5">
      <div className="space-y-5">
        <Skeleton className="w-full h-[200px] rounded" />
        <Skeleton className="w-full h-[200px] rounded" />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="w-full h-[200px] rounded" />
        <Skeleton className="w-full h-[200px] rounded" />
      </div>
    </div>
  )
}
