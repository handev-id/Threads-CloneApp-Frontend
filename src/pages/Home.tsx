import { AvatarImg } from "@/components/Avatar";
import { HiPlus } from "react-icons/hi";
import Tabs from "@/components/Tabs";
import PostCard from "@/components/post/PostCard";
import { useGetAllData } from "@/lib/hooks";
import { PostType } from "@/types/data.type";
import { PostsSkeleton } from "@/components/PostSkeleton";

const Home = () => {
  const { data, error, isLoading, status } = useGetAllData({
    endpoint: "/post/list",
  });

  console.log(data);

  return (
    <div className='text-white pt-20'>
      <Tabs />
      {data ? (
        <div className='grid grid-cols-1'>
          {data?.result?.map((post: PostType, index: number) => (
            <PostCard
              _id={post._id}
              key={index}
              index={index}
              avatar={post?.userId.avatar}
              caption={post?.caption}
              name={post?.userId.username}
              image={post?.image}
              createdAt={post.createdAt}
              totalReply={post.replies.length}
              userId={post.userId}
              likes={post.likes}
            />
          ))}
        </div>
      ) : (
        <PostsSkeleton />
      )}
    </div>
  );
};

export default Home;
