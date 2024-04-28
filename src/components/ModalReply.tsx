import { CopyIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCreateData,
  useGetLocalUser,
  usePostingTimeHistory,
} from "@/lib/hooks";
import { AvatarImg } from "./Avatar";
import { useActionPost, useIsLoading } from "@/lib/zustand";
import { LoadingSmall } from "./ui/Loading";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  children: React.ReactNode;
  postId: string;
  username: string;
  caption: string;
  createdAt: string;
  avatar: string;
  recipientId: string;
  image?: string;
}

export function ModalReply({
  postId,
  children,
  username,
  avatar,
  caption,
  image,
  createdAt,
  recipientId,
}: ModalProps) {
  const { setIsReply } = useActionPost();
  const { isLoading } = useIsLoading();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-lg:h-screen h-full overflow-y-auto sm:max-w-md bg-zinc-900 border border-zinc-700 rounded-lg ">
        <DialogHeader>
          <DialogDescription>
            <div className="flex justify-between w-full lg:mb-3 max-lg:mt-5">
              <DialogClose asChild>
                <button className="hover:text-white lg:hidden">Batal</button>
              </DialogClose>
              <h4 className="font-bold text-white text-center mx-auto">
                Balasan
              </h4>
              <button></button>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <div className="flex text-white gap-3">
            <div className="flex items-center flex-col gap-2">
              <AvatarImg image={avatar} />
              <div className="w-[2px] bg-white/20 h-full"></div>
            </div>

            <div>
              <h3 className="font-semibold tracking-tight">
                {username}{" "}
                <span className="text-white/40 font-light">
                  {" "}
                  {usePostingTimeHistory({ inputTime: createdAt })}
                </span>
              </h3>
              <p className="text-[14px] my-2">{caption}</p>
              {image && (
                <div className="w-full overflow-hidden rounded-lg border border-white/20">
                  <img src={image} alt={"@threads_clone - image"} />
                </div>
              )}
            </div>
          </div>
          <ReplyInput
            whoPost={username}
            postId={postId}
            recippientId={recipientId}
          />
        </div>

        <DialogFooter className="flex gap-4 flex-row justify-between mt-5">
          <DialogClose asChild>
            <Button type="button" variant="default">
              Batal
            </Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            onClick={() => setIsReply(true)}
            type="button"
            variant="secondary"
            className="disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? <LoadingSmall /> : "Balas"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ReplyInput = ({
  whoPost,
  postId,
  recippientId,
}: {
  whoPost: string;
  postId: string;
  recippientId: string;
}) => {
  const { userData } = useGetLocalUser();
  const [reply, setReply] = useState<string>("");
  const { isReply, setIsReply } = useActionPost();
  const { setIsLoading } = useIsLoading();
  const navigate = useNavigate();

  const {
    mutate: createReply,
    response,
    error,
  } = useCreateData({
    endpoint: `/post/create-reply/${postId}?recipientId=${recippientId}`,
    data: {
      reply,
    },
  });

  useEffect(() => {
    if (isReply) {
      createReply();
      setIsLoading(true);
      return;
    }
    console.log("ERROR: ", error);
  }, [isReply]);

  useEffect(() => {
    if (response) {
      setIsReply(false);
      setIsLoading(false);
      window.location.href = `/post/${postId}`;
    }
  }, [response]);

  return (
    <div className="flex gap-3 text-white w-full">
      <div className="flex items-center flex-col gap-2">
        <AvatarImg image={userData.avatar} />
      </div>
      <div className="w-full flex flex-col">
        <h3 className="font-semibold tracking-tight">{userData.username} </h3>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder={`Balas ${whoPost}...`}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 outline-none mt-3 h-auto"
          rows={4}
        ></textarea>
      </div>
    </div>
  );
};
