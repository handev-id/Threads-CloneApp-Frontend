import Layout from "@/components/Layout";
import { H2, P } from "@/components/ui/Typography";
import { useMutateGetAllData, useMutateSingleData } from "@/lib/hooks";
import { UserType } from "@/types/userType";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ButtonInProfile from "./ButtonInProfile";
import UserSkeleton, { ProfileSkeleton } from "@/components/UserSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileTabs } from "@/components/Tabs";
import { useLocationTabs } from "@/lib/zustand";
import { PostType, ReplyType } from "@/types/data.type";
import PostCard from "@/components/post/PostCard";
import { PostsSkeleton } from "@/components/PostSkeleton";
import Lists from "@/components/Lists";

const Profile = () => {
  const { username } = useParams();
  const { location } = useLocationTabs();
  const [user, setUser] = useState<UserType | null>(null);
  const {
    mutate: getUser,
    data,
    isPending: isPendingUser,
  } = useMutateSingleData({
    endpoint: `/users/profile/${username.split("@").pop()}`,
  });

  const {
    mutate: getPosts,
    data: posts,
    isPending,
  } = useMutateGetAllData({
    endpoint: `/post/profile/${user?._id}`,
  });

  const {
    mutate: getReplies,
    data: replies,
    error,
  } = useMutateGetAllData({
    endpoint: `/post/reply/profile/${user?._id}`,
  });

  useEffect(() => {
    if (username) {
      getUser();
    }
  }, [username]);

  useEffect(() => {
    if (data) {
      setUser(data?.result);
    }
  }, [data]);

  useEffect(() => {
    if (user) {
      getPosts();
      getReplies();
    }
  }, [user]);

  return (
    <Layout>
      <div className="py-16 text-white">
        {isPendingUser ? (
          <div className="flex px-4 mt-5 justify-center flex-col items-center">
            <ProfileSkeleton />
            <Skeleton className="h-7 w-full mt-5 rounded-xl" />
          </div>
        ) : (
          <>
            <div className="flex justify-between p-4">
              <div>
                <H2 color="text-white">{user?.fullname}</H2>
                <p className="text-white">@{user?.username}</p>
                <p className="text-white my-4">{user?.bio}</p>
                <p className="text-white opacity-50">
                  {user?.followers?.length} pengikut
                </p>
              </div>
              <div className="w-[70px] rounded-full overflow-hidden h-[70px]">
                <img
                  src={user?.avatar}
                  className="object-cover w-full h-full"
                  alt=""
                />
              </div>
            </div>
            <div className="px-4 my-3">
              <ButtonInProfile />
            </div>
            <ProfileTabs />
          </>
        )}

        {isPending ? (
          <PostsSkeleton />
        ) : (
          <>
            {location === "threads"
              ? posts?.result?.threads?.map((thread: PostType) => (
                  <PostCard
                    createdAt={thread.createdAt}
                    key={thread._id}
                    _id={thread._id}
                    avatar={thread?.userId.avatar}
                    caption={thread?.caption}
                    name={thread?.userId.username}
                    image={thread?.image}
                    totalReply={thread.replies.length}
                    userId={thread.userId}
                    likes={thread.likes}
                    reposted={thread.reposted}
                  />
                ))
              : location === "repost"
              ? posts?.result?.repost?.map((repost: PostType) => (
                  <PostCard
                    createdAt={repost.createdAt}
                    key={repost._id}
                    _id={repost._id}
                    avatar={repost?.userId.avatar}
                    caption={repost?.caption}
                    name={repost?.userId.username}
                    image={repost?.image}
                    totalReply={repost.replies.length}
                    userId={repost.userId}
                    likes={repost.likes}
                    reposted={repost.reposted}
                  />
                ))
              : replies?.result?.map((reply: ReplyType) => (
                  <div key={reply._id} className="relative">
                    <Lists
                      avatar={reply?.userId?.avatar}
                      username={reply.userId?.username}
                      data={reply.reply}
                      createdAt={reply.createdAt}
                      replyId={reply._id}
                      userId={reply.userId._id}
                      isMorebutton
                    />
                    <Link
                      to={`/post/${reply?.postId?._id}`}
                      className="text-sm absolute bottom-3 right-3 opacity-50 text-white"
                    >
                      Detail
                    </Link>
                  </div>
                ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
