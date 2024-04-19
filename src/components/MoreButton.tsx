import { Link } from "react-router-dom";
import { useState } from "react";
import { Logout } from "@/lib/hooks";

const MoreButton = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <div>
      <button
        onClick={() => setShowMenu(true)}
        className={`flex flex-col items-end hover:opacity-100 gap-[5px] opacity-50 ${
          showMenu && "opacity-100"
        } cursor-pointer`}
      >
        <div className='bg-white w-[22px] h-[2px]'></div>
        <div className='bg-white w-[12px] h-[2px]'></div>
      </button>
      {showMenu && (
        <div onClick={() => setShowMenu(false)}>
          <MoreMenu />
        </div>
      )}
    </div>
  );
};

export default MoreButton;

const MoreMenu = () => {
  return (
    <div className='bg-transparent fixed top-0 z-40 right-0 w-full h-screen'>
      <div className='bg-zinc-800 w-[200px] rounded-xl mr-3 mt-16 font-semibold ml-auto overflow-hidden'>
        {Menu.map((item, idx) => (
          <Link to={item.link}>
            <div
              className='text-white p-3 bg-zinc-900 hover:bg-zinc-950/80 border-b border-zinc-700'
              key={idx}
            >
              {item.name}
            </div>
          </Link>
        ))}
        <div
          onClick={() => Logout()}
          className='text-white p-3 bg-zinc-900 hover:bg-zinc-950/80'
        >
          Keluar
        </div>
      </div>
    </div>
  );
};

const Menu = [
  { name: "Pengaturan", link: "/settings" },
  { name: "Disimpan", link: "/saved" },
  { name: "Disukai", link: "/liked" },
  { name: "Feedback", link: "/feedback" },
];
