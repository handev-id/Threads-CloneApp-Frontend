import { useMutateSingleData, useSingleData } from "@/lib/hooks";
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
import React from "react";
import { AvatarImg } from "../Avatar";
import { Muted } from "../ui/Typography";
import { Skeleton } from "../ui/skeleton";

interface ModalProps {
  children?: React.ReactNode;
  userId?: string;
}

export function ModalUserData({ children, userId }: ModalProps) {
  const { data, mutate } = useMutateSingleData({
    endpoint: "/users/profile/" + userId,
  });

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button onClick={() => mutate()} type="button" className="p-0">
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
                <div className="flex flex-col gap-3 mt-3">
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
            <div className="flex space-x-4 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[270px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          )}
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button type="button" className="w-full" variant="secondary">
            Follow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
