import EditProfile from "@/components/EditProfile";
import { LoadingSmall } from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { useCreateData, useGetLocalUser } from "@/lib/hooks";
import { useEditProfile } from "@/lib/zustand";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ButtonInProfile = ({
  user,
  isFollow,
}: {
  user: any;
  isFollow: boolean;
}) => {
  const { username } = useParams();
  const { isOpen, setIsOpen } = useEditProfile();
  const [btnFollow, setBtnFollow] = useState(isFollow ? "Following" : "Follow");
  const [followersLength, setFollowersLength] = useState(
    user?.result?.followers?.length
  );

  const {
    response,
    isPending,
    mutate: follow,
    error,
  } = useCreateData({
    endpoint: `/follow/${user?.result?._id}`,
    data: {},
  });

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

  if (username === `@${user?.result?.username}`) {
    return (
      <div>
        <p className="text-white opacity-50 mb-5">{followersLength} pengikut</p>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full text-white font-semibold bg-transparent py-1 border border-zinc-800 rounded-xl transition-all active:scale-95"
        >
          Edit Profile
        </button>
        <div className="relative">
          <EditProfile />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <p className="text-white opacity-50 mb-5">{followersLength} pengikut</p>
        <button
          onClick={() => follow()}
          className={
            btnFollow === "Following"
              ? "w-full text-white font-semibold bg-[#101010] border py-1 flex justify-center  border-zinc-800  rounded-xl"
              : "w-full text-[#101010] font-semibold bg-white border py-1 flex justify-center  border-zinc-800  rounded-xl"
          }
        >
          {isPending ? <LoadingSmall /> : btnFollow}
        </button>
      </>
    );
  }
};

export default ButtonInProfile;
