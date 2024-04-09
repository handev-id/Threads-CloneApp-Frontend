import { AvatarImg } from "@/components/Avatar";
import { HiPlus } from "react-icons/hi";
import Tabs from "@/components/Tabs";
import PostCard from "@/components/post/PostCard";

const Home = () => {
  return (
    <div className='text-white pt-20'>
      <Tabs />
      <div className='grid grid-cols-1'>
        <PostCard />
      </div>
    </div>
  );
};

export default Home;
