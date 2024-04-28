import React, { useEffect, useState } from "react";
import { ModalUserData } from "./post/userDataCard";
import { AvatarImg } from "./Avatar";
import {
  useCreateData,
  useGetLocalUser,
  usePostingTimeHistory,
} from "@/lib/hooks";
import { Muted } from "./ui/Typography";
import { Button } from "./ui/button";
import { SlOptions } from "react-icons/sl";
import { MoreButtonReply } from "./post/MoreButtonReply";
import { LoadingSmall } from "./ui/Loading";

interface ListsProps {
  replyId?: string;
  userId: string;
  username: string;
  avatar: string;
  fullname?: string;
  data?: string;
  createdAt?: string;
  followers?: string[];
  isButtonFollow?: boolean;
  isFollow?: boolean;
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
  isFollow,
  isButtonFollow,
  isMorebutton,
}) => {
  const { userData } = useGetLocalUser();
  const [btnFollow, setBtnFollow] = useState(isFollow ? "Following" : "Follow");
  const [followersLength, setFollowersLength] = useState(followers.length);
  const {
    response,
    isPending,
    mutate: follow,
    error,
  } = useCreateData({
    endpoint: `/follow/${userId}`,
    data: {},
  });

  const followAction = () => {
    follow();
  };

  useEffect(() => {
    if (response?.success) {
      if (btnFollow === "Follow") {
        setBtnFollow("Following");
        setFollowersLength(followersLength + 1);
      } else {
        setBtnFollow("Follow");
        setFollowersLength(followersLength - 1);
      }
    }
  }, [response]);
  console.log(username, isFollow);

  return (
    <div className="py-4 pl-3 pr-3 border-b border-white/20 flex gap-2 relative">
      <div>
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
          {data && <p className="text-[14px] my-2">{data}</p>}
          {isButtonFollow && (
            <Button
              onClick={() => followAction()}
              className={`bg-transparent absolute top-5 right-3 w-[100px] rounded-xl border border-white/40 ${
                btnFollow === "Following" && "opacity-50"
              }`}
            >
              {isPending ? <LoadingSmall /> : btnFollow}
            </Button>
          )}
        </div>
        {followers && <h3 className="mt-3">{followersLength} followers</h3>}
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
