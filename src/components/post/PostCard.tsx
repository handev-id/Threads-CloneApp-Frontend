import { AvatarImg } from "../Avatar";
import { RiChat3Line, RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { LuSend } from "react-icons/lu";
import { BiRepost } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { useGetLocalUser, usePostingTimeHistory } from "@/lib/hooks";
import { PostType } from "@/types/data.type";
import { useEffect, useState } from "react";
import { createRepost, likePost } from "@/lib/apiService";
import { ModalReply } from "../ModalReply";
import { Muted } from "../ui/Typography";
import { toast } from "../ui/use-toast";
import { ModalUserData } from "./userDataCard";
import { Button } from "../ui/button";

const PostCard: React.FC<PostType> = ({
  avatar,
  caption,
  name,
  image,
  createdAt,
  totalReply,
  _id: postId,
  userId: recipientId,
  likes,
  reposted,
}) => {
  const [like, setLike] = useState<boolean>(false);
  const [totalLike, setTotalLike] = useState<number>(likes.length);
  const { userData } = useGetLocalUser();

  useEffect(() => {
    if (likes.includes(userData._id)) {
      setLike(true);
    }
  }, [userData._id]);

  const handleLike = async () => {
    setLike(!like);
    like ? setTotalLike(totalLike - 1) : setTotalLike(totalLike + 1);
    await likePost(postId, recipientId._id);
  };

  const handleRepost = async () => {
    const repost = await createRepost(postId, recipientId._id);
    toast({
      title: "repost berhasil",
      description: "repost ke timeline",
    });
    if (repost?.success) {
      window.location.reload();
    }
  };

  return (
    <div className="py-4 pl-3 pr-3 border-b border-white/20 flex gap-2 relative">
      <div className="flex items-center flex-col gap-2">
        <ModalUserData userId={recipientId._id}>
          <AvatarImg image={avatar} />
        </ModalUserData>
        <div className="w-[2px] bg-white/20 h-full"></div>
        {reposted && (
          <div>
            <img
              src={reposted.avatar}
              className="w-[30px] h-[30px] border-2 object-cover border-[#101010] rounded-full"
              alt="@threadhs - handev repost"
            />
          </div>
        )}
      </div>
      <div>
        <h3 className="font-semibold tracking-tight">
          {name}{" "}
          <span className="text-white/40 ml-1 font-light">
            {" "}
            {usePostingTimeHistory({ inputTime: createdAt })}
          </span>
        </h3>
        <p className="text-[14px] my-2">{caption}</p>
        {image && (
          <div className="w-full mb-3 overflow-hidden rounded-lg border border-white/20">
            <img src={image} alt={"@threads_clone - image"} />
          </div>
        )}
        <div className="flex gap-1 items-center text-[24px]">
          <span className="hover:scale-90 cursor-pointer duration-200 p-[6px] rounded-full hover:bg-zinc-900">
            {like ? (
              <RiHeart3Fill onClick={handleLike} className="text-red-500" />
            ) : (
              <RiHeart3Line onClick={handleLike} />
            )}
          </span>
          <ModalReply
            username={name}
            image={image}
            avatar={avatar}
            caption={caption}
            createdAt={createdAt}
            postId={postId}
            recipientId={recipientId._id}
          >
            <span className="hover:scale-90 cursor-pointer duration-200 p-[6px] rounded-full hover:bg-zinc-900">
              <RiChat3Line />
            </span>
          </ModalReply>
          <span
            onClick={handleRepost}
            className="text-[26px] cursor-pointer hover:scale-90 duration-200 p-[6px] rounded-full hover:bg-zinc-900"
          >
            <BiRepost />
          </span>
          <span className="text-[22px] cursor-pointer hover:scale-90 duration-200 p-[6px] rounded-full hover:bg-zinc-900">
            <LuSend />
          </span>
        </div>
        <div className="text-white/40 font-light">
          {totalReply} balasan •{" "}
          <span className="hover:underline cursor-pointer">
            {totalLike} suka
          </span>
        </div>
        {reposted && (
          <div className="mt-4">
            <Muted>
              <span>{reposted.username} Memposting Ulang</span>
            </Muted>
          </div>
        )}
      </div>
      <div className="absolute top-3 right-3">
        <div className="text-sm p-3 hover:bg-zinc-900 rounded-full cursor-pointer">
          <SlOptions />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
