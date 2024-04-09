import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import MoreButton from "./MoreButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation().pathname;

  if (
    location.includes("/login") ||
    location.includes("/register") ||
    location.includes("/forgot-password") ||
    location.includes("/reset-password")
  )
    return <>{children}</>;

  return (
    <main className='w-full flex justify-center'>
      <div className='w-full sm:w-[400px]'>
        <div className='backdrop-blur-md p-3 bg-[#101010] z-40 fixed top-0 left-1/2 -translate-x-1/2 w-full sm:w-[400px]'>
          <div className='flex justify-between items-center'>
            <div></div>
            <div>
              <Logo color='white' size='35px' />
            </div>
            <div>
              <MoreButton />
            </div>
          </div>
        </div>
        <div className='backdrop-blur-md p-3 bg-[#101010] fixed bottom-0 left-1/2 -translate-x-1/2 w-full sm:w-[400px]'>
          Bottom Nav
        </div>
        {children}
      </div>
    </main>
  );
};

export default Layout;
