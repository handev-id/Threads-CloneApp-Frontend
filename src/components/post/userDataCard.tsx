import {
  useCreateData,
  useGetLocalUser,
  useMutateSingleData,
} from "@/lib/hooks";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React, { useEffect } from "react";
import { Muted } from "../ui/Typography";
import { LoadingSmall } from "../ui/Loading";
import UserSkeleton from "../UserSkeleton";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  children?: React.ReactNode;
  userId?: string;
}

export function ModalUserData({ children, userId }: ModalProps) {
  const {
    data,
    mutate: getUserData,
    error: erruser,
  } = useMutateSingleData({
    endpoint: "/users/user/" + userId,
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
  const navigate = useNavigate();

  const isFollowing = () => {
    if (data?.result?.followers) {
      return data?.result?.followers?.includes(userData?._id);
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
            <div
              onClick={() => navigate(`/@${data?.result?.username}`)}
              className="flex justify-between"
            >
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
            <UserSkeleton />
          )}
        </DialogHeader>
        {userData?._id !== userId && (
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
                "unfollow"
              ) : (
                "follow"
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
