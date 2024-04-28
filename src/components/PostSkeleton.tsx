import { Skeleton } from "./ui/skeleton";

export function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 mx-3 my-5 gap-10">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[270px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SingleSkeleton() {
  return (
    <div className="flex space-x-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[270px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
