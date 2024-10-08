import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import MoreButton from "./MoreButton";
import {
  RiHeart3Fill,
  RiHeart3Line,
  RiHome4Fill,
  RiHome5Line,
  RiPencilFill,
  RiPencilLine,
  RiSearchFill,
  RiSearchLine,
  RiUser3Fill,
  RiUser3Line,
} from "react-icons/ri";
import { useGetLocalUser, useMutateSingleData } from "@/lib/hooks";
import { ModalPost } from "./ModalPost";
import { useModalPost } from "@/lib/zustand";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation().pathname;
  const { userData } = useGetLocalUser();
  const navigate = useNavigate();
  const { data: user, mutate } = useMutateSingleData({
    endpoint: `/users/user/${userData?._id}`,
  });

  useEffect(() => {
    if (userData) {
      mutate();
    }
  }, [userData]);

  const { setIsOpen } = useModalPost();

  if (
    location.includes("/login") ||
    location.includes("/register") ||
    location.includes("/forgot-password") ||
    location.includes("/reset-password")
  )
    return <>{children}</>;

  return (
    <main className="w-full flex justify-center">
      <div className="w-full sm:w-[400px]">
        <div className="backdrop-blur-md p-3 px-6 bg-[#101010]/80 z-40 fixed top-0 left-1/2 -translate-x-1/2 w-full sm:w-[400px]">
          <div className="flex justify-between items-center">
            <div></div>
            <div>
              <Logo color="white" size="35px" />
            </div>
            <div>
              <MoreButton />
            </div>
          </div>
        </div>
        <div className="backdrop-blur-md p-3 bg-[#101010]/80 z-40 fixed bottom-0 left-1/2 -translate-x-1/2 w-full sm:w-[400px]">
          <div className="grid grid-cols-5 text-white gap-3">
            {btmMenu.map((menu, index) => (
              <button
                className="active:scale-95 transition-all"
                key={index}
                onClick={() =>
                  index === 2
                    ? setIsOpen(true)
                    : navigate(
                        menu.link === "/profile"
                          ? `/@${user?.result?.username}`
                          : menu.link
                      )
                }
              >
                <div className="text-[30px] p-3 hover:bg-zinc-800 flex items-center justify-center rounded-lg">
                  {location === menu.link ? (
                    <span>{menu.activeIcon}</span>
                  ) : (
                    <span className="opacity-50">{menu.icon}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
        {children}
      </div>
      <ModalPost />
    </main>
  );
};

export default Layout;

const btmMenu = [
  { link: "/", icon: <RiHome5Line />, activeIcon: <RiHome4Fill /> },
  { link: "/search", icon: <RiSearchLine />, activeIcon: <RiSearchLine /> },
  { link: "#", icon: <RiPencilLine />, activeIcon: <RiPencilFill /> },
  { link: "/activity", icon: <RiHeart3Line />, activeIcon: <RiHeart3Fill /> },
  {
    link: "/profile",
    icon: <RiUser3Line />,
    activeIcon: <RiUser3Fill />,
  },
];
