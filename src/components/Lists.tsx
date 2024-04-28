import React from "react";
import { ModalUserData } from "./post/userDataCard";
import { AvatarImg } from "./Avatar";
import { useGetLocalUser, usePostingTimeHistory } from "@/lib/hooks";
import { Muted } from "./ui/Typography";
import { Button } from "./ui/button";
import { SlOptions } from "react-icons/sl";
import { MoreButtonReply } from "./post/MoreButtonReply";

interface ListsProps {
  replyId?: string;
  userId: string;
  username: string;
  avatar: string;
  fullname?: string;
  data?: string;
  createdAt?: string;
  followers?: number;
  isButtonFollow?: boolean;
  isMorebutton?: boolean;
}

const Lists: React.FC<ListsProps> = ({
  replyId,
  username,
  avatar,
  data,
  userId,
  createdAt,
  fullname,
  followers,
  isButtonFollow,
  isMorebutton,
}) => {
  const { userData } = useGetLocalUser();

  return (
    <div className="py-4 pl-3 pr-3 border-b border-white/20 flex gap-2 relative">
      <div className="flex items-center flex-col gap-2">
        <ModalUserData userId={userId}>
          <AvatarImg image={avatar} />
        </ModalUserData>
      </div>
      <div className="w-full">
        <h3 className="font-semibold">
          {username}
          <span className="text-white/40 ml-1 font-light">
            {" "}
            {usePostingTimeHistory({ inputTime: createdAt })}
          </span>
        </h3>
        {fullname && <Muted>{fullname}</Muted>}
        <div className="flex justify-between w-full items-center">
          <p className="text-[14px] my-2">{data}</p>
          {isButtonFollow && (
            <Button className="bg-transpare   nt px-8 rounded-xl border border-white/40">
              ikuti
            </Button>
          )}
        </div>
        {followers && <h3 className="mt-3">{followers} pengikut</h3>}
      </div>
      {isMorebutton && (
        <MoreButtonReply isSameUser={userId === userData._id} id={replyId}>
          <div className="absolute top-3 right-3">
            <div className="text-sm p-3 hover:bg-zinc-900 rounded-full cursor-pointer">
              <SlOptions />
            </div>
          </div>
        </MoreButtonReply>
      )}
    </div>
  );
};

export default Lists;
