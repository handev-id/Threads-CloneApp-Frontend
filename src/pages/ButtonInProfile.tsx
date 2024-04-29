import { useGetLocalUser } from "@/lib/hooks";
import React from "react";
import { useParams } from "react-router-dom";

const ButtonInProfile = () => {
  const { username } = useParams();
  const { userData } = useGetLocalUser();
  if (username === `@${userData?.username}`) {
    return (
      <button className="w-full text-white font-semibold bg-transparent py-1 border border-zinc-800 rounded-xl transition-all active:scale-95">
        Edit Profile
      </button>
    );
  } else {
    return (
      <button className="w-full text-[#101010] font-semibold bg-white border py-1  border-zinc-800  rounded-xl">
        follow
      </button>
    );
  }
};

export default ButtonInProfile;
