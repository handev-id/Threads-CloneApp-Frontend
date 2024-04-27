import {
  useCreateData,
  useGetLocalUser,
  useMutateSingleData,
  useSingleData,
} from "@/lib/hooks";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React, { useEffect } from "react";
import { AvatarImg } from "../Avatar";
import { Muted } from "../ui/Typography";
import { Skeleton } from "../ui/skeleton";
import { LoadingSmall } from "../ui/Loading";

interface ModalProps {
  children?: React.ReactNode;
  userId?: string;
}

export function ModalUserData({ children, userId }: ModalProps) {
  const { data, mutate: getUserData } = useMutateSingleData({
    endpoint: "/users/profile/" + userId,
  });

  const {
    response,
    isPending,
    mutate: follow,
    error,
  } = useCreateData({
    endpoint: `/follow/${userId}`,
    data: {},
  });

  useEffect(() => {
    if (response?.success) {
      getUserData();
    }
  }, [response]);

  const { userData } = useGetLocalUser();

  const isFollowing = () => {
    if (data?.result?.followers) {
      return data?.result?.followers?.includes(userData._id);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button onClick={() => getUserData()} type="button" className="p-0">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95%] text-white bg-[#101010] border border-zinc-700 rounded-xl sm:max-w-md">
        <DialogHeader>
          {data ? (
            <div className="flex justify-between">
              <div>
                <DialogTitle className="text-[24px]">
                  {data?.result?.fullname}
                </DialogTitle>
                <DialogDescription className="text-white text-start">
                  {data?.result?.username}
                </DialogDescription>
                <div className="flex flex-col gap-3 justify-start text-start mt-3">
                  <p>{data?.result?.bio}</p>
                  <Muted>{data?.result?.followers?.length} Pengikut</Muted>
                </div>
              </div>
              <div className="mr-3">
                <img
                  src={data?.result?.avatar}
                  className="mr-3 w-[55px] overflow-hidden h-[55px] object-cover rounded-full"
                  alt="avatar threads clone handev"
                />
              </div>
            </div>
          ) : (
            <div className="flex w-full space-x-4 mb-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[200px] sm:w-[300px]" />
                <Skeleton className="h-4 w-[200px] sm:w-[200px]" />
              </div>
              <Skeleton className="h-14 w-14 rounded-full" />
            </div>
          )}
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            onClick={() => follow()}
            disabled={isPending}
            type="button"
            className="w-full"
            variant="secondary"
          >
            {isPending ? (
              <LoadingSmall />
            ) : isFollowing() ? (
              "Unfollow"
            ) : (
              "Follow"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
