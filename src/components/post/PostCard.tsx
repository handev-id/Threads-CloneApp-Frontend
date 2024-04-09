import { AvatarImg } from "../Avatar";
import { RiChat3Line, RiHeart3Line } from "react-icons/ri";
import { LuSend } from "react-icons/lu";
import { BiRepost } from "react-icons/bi";
import { SlOptions } from "react-icons/sl";

const PostCard = () => {
  return (
    <div className='py-4 pl-3 pr-2 border-b border-white/20 flex gap-2'>
      <div className='flex items-center flex-col gap-2'>
        <AvatarImg />
        <div className='w-[2px] bg-white/20 h-full'></div>
        <div className='relative mr-3'>
          <img
            src='https://picsum.photos/200'
            className='w-[20px] border-2 border-[#101010] rounded-full'
            alt=''
          />
          <img
            src='https://picsum.photos/200'
            className='absolute right-[-60%] top-[10%] w-[20px] border-2 border-[#101010] rounded-full'
            alt=''
          />
        </div>
      </div>
      <div>
        <h3 className='font-semibold tracking-tight'>
          ranuraff <span className='text-white/40 font-light'> 1m</span>
        </h3>
        <p className='text-[14px] my-2'>
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Aliquid, ab? Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Illum, rerum esse ipsam alias corporis, accusantium
          incidunt distinctio ad quae voluptatem sed molestiae dignissimos nisi,
          nemo est eos enim impedit inventore.
        </p>
        <div className='flex gap-1 items-center text-[24px] my-3'>
          <span className='hover:scale-90 duration-200 p-[6px] rounded-full hover:bg-white/10'>
            <RiHeart3Line />
          </span>
          <span className='hover:scale-90 duration-200 p-[6px] rounded-full hover:bg-white/10'>
            <RiChat3Line />
          </span>
          <span className='text-[26px] hover:scale-90 duration-200 p-[6px] rounded-full hover:bg-white/10'>
            <BiRepost />
          </span>
          <span className='text-[22px] hover:scale-90 duration-200 p-[6px] rounded-full hover:bg-white/10'>
            <LuSend />
          </span>
        </div>
        <span className='text-white/40 font-light'>
          38 replies • <span className='hover:underline'>Lihat aktifitas</span>
        </span>
      </div>
      <div>
        <div className='text-sm p-3 hover:bg-zinc-900 rounded-full cursor-pointer'>
          <SlOptions />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
