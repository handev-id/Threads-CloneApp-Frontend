import Tabs from "@/components/Tabs";
import PostCard from "@/components/post/PostCard";
import { useGetAllData } from "@/lib/hooks";
import { PostType } from "@/types/data.type";
import { PostsSkeleton } from "@/components/PostSkeleton";
import Layout from "@/components/Layout";
import EditProfile from "@/components/EditProfile";
import { useEffect, useState } from "react";
import { useEditProfile } from "@/lib/zustand";

const Home = () => {
  const { setIsOpen } = useEditProfile();
  const { data, error } = useGetAllData({
    endpoint: "/post/list",
  });

  useEffect(() => {
    const isEdit = localStorage.getItem("isEdit");
    if (isEdit) {
      setIsOpen(true);
    }
  }, []);
  console.log(data);

  return (
    <Layout>
      <div className="text-white py-[70px]">
        <Tabs />
        {data ? (
          <div className="grid grid-cols-1">
            {data?.result?.map((post: PostType, index: number) => (
              <PostCard
                key={index}
                _id={post._id}
                index={index}
                avatar={post?.userId.avatar}
                caption={post?.caption}
                name={post?.userId.username}
                image={post?.image}
                createdAt={post.createdAt}
                totalReply={post.replies.length}
                userId={post.userId}
                likes={post.likes}
                reposted={post.reposted}
              />
            ))}
          </div>
        ) : (
          <PostsSkeleton />
        )}
        <EditProfile />
      </div>
    </Layout>
  );
};

export default Home;
