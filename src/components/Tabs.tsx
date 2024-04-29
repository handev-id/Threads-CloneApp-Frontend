import { useLocationTabs } from "@/lib/zustand";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Tabs = () => {
  const location = useLocation().pathname;

  return (
    <div className="grid text-center grid-cols-2">
      <Link
        to={"/"}
        className={`font-semibold border-b pb-3 border-white hover:opacity-100 ${
          location !== "/" && "opacity-30"
        }`}
      >
        Untukmu
      </Link>
      <Link
        to={"/following"}
        className={`font-semibold border-b pb-3 border-white hover:opacity-100 ${
          location !== "/following" && "opacity-30"
        }`}
      >
        Mengikuti
      </Link>
    </div>
  );
};

export default Tabs;

export const ProfileTabs = () => {
  const { location, setLocation } = useLocationTabs();

  return (
    <div className="grid text-white py-4 text-center grid-cols-3">
      <button
        onClick={() => setLocation("threads")}
        className={`font-semibold border-b pb-3 border-white hover:opacity-100 ${
          location !== "threads" && "opacity-30"
        }`}
      >
        Threads
      </button>
      <button
        onClick={() => setLocation("replies")}
        className={`font-semibold border-b pb-3 border-white hover:opacity-100 ${
          location !== "replies" && "opacity-30"
        }`}
      >
        Balasan
      </button>
      <button
        onClick={() => setLocation("repost")}
        className={`font-semibold border-b pb-3 border-white hover:opacity-100 ${
          location !== "repost" && "opacity-30"
        }`}
      >
        Repost
      </button>
    </div>
  );
};
