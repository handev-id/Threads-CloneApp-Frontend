import React from "react";
import { Skeleton } from "./ui/skeleton";

const UserSkeleton = () => {
  return (
    <div className="flex w-full space-x-4 mb-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[200px] sm:w-[300px]" />
        <Skeleton className="h-4 w-[200px] sm:w-[200px]" />
      </div>
      <Skeleton className="h-14 w-14 rounded-full" />
    </div>
  );
};
export const ProfileSkeleton = () => {
  return (
    <div className="flex w-full justify-between space-x-4 mb-4">
      <div>
        <Skeleton className="h-8 rounded-xl w-[180px]" />
        <Skeleton className="h-4 mt-2 rounded-xl w-[130px]" />
        <Skeleton className="h-4 mt-5 rounded-xl w-[200px]" />
        <Skeleton className="h-4 mt-5 rounded-xl w-[100px]" />
      </div>
      <Skeleton className="h-[70px] w-[70px] rounded-full" />
    </div>
  );
};

export default UserSkeleton;
