import { CopyIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

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
import { Input } from "@/components/ui/input";
import { PostType } from "@/types/data.type";
import { useGetLocalUser, usePostingTimeHistory } from "@/lib/hooks";
import { AvatarImg } from "./Avatar";

interface ModalProps {
  children: React.ReactNode;
  username: string;
  caption: string;
  createdAt: string;
  avatar: string;
  image?: string;
}

export function ModalReply({
  children,
  username,
  avatar,
  caption,
  image,
  createdAt,
}: ModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='max-lg:h-screen sm:max-w-md bg-zinc-900 border border-zinc-700 rounded-lg '>
        <DialogHeader>
          <DialogDescription>
            <div className='flex justify-between w-full lg:mb-3'>
              <DialogClose asChild>
                <button className='hover:text-white lg:hidden'>Cancel</button>
              </DialogClose>
              <h4 className='font-bold text-white text-center mx-auto'>
                Reply
              </h4>
              <button></button>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className='max-lg:mb-[300px] flex flex-col gap-3'>
          <div className='flex text-white gap-3'>
            <div className='flex items-center flex-col gap-2'>
              <AvatarImg image={avatar} />
              <div className='w-[2px] bg-white/20 h-[50px]'></div>
            </div>

            <div>
              <h3 className='font-semibold tracking-tight'>
                {username}{" "}
                <span className='text-white/40 font-light'>
                  {" "}
                  {usePostingTimeHistory({ inputTime: createdAt })}
                </span>
              </h3>
              <p className='text-[14px] my-2'>{caption}</p>
              {image && (
                <div className='w-full overflow-hidden rounded-lg border border-white/20'>
                  <img src={image} alt={"@threads_clone - image"} />
                </div>
              )}
            </div>
          </div>
          <ReplyInput whoPost={username} />
        </div>

        <DialogFooter className='flex gap-4 flex-row justify-between mt-5'>
          <DialogClose asChild>
            <Button type='button' variant='default'>
              Batal
            </Button>
          </DialogClose>
          <Button type='button' variant='secondary'>
            Balas
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const ReplyInput = ({ whoPost }: { whoPost: string }) => {
  const { userData } = useGetLocalUser();
  return (
    <div className='flex gap-3 text-white w-full'>
      <div className='flex items-center flex-col gap-2'>
        <AvatarImg image={userData.avatar} />
      </div>
      <div className='w-full flex flex-col'>
        <h3 className='font-semibold tracking-tight'>{userData.username} </h3>
        <textarea
          placeholder={`Balas ${whoPost}...`}
          className='bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 outline-none mt-3 h-auto'
          rows={4}
        ></textarea>
      </div>
    </div>
  );
};
