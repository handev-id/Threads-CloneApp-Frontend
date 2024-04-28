import Layout from "@/components/Layout";
import Lists from "@/components/Lists";
import { PostsSkeleton } from "@/components/PostSkeleton";
import { useGetLocalUser, useMutateGetAllData } from "@/lib/hooks";
import React, { useEffect } from "react";

interface NotifType {
  _id: string;
  senderId: {
    username: string;
    avatar: string;
    _id: string;
  };
  postId: string;
  createdAt: string;
  userId: string;
  message: string;
}

const Activity = () => {
  const { userData } = useGetLocalUser();

  const { mutate, data, error } = useMutateGetAllData({
    endpoint: `/notifications/${userData._id}`,
  });

  useEffect(() => {
    if (userData) {
      mutate();
    }
  }, [userData]);
  console.log(data);
  console.log(error);

  return (
    <Layout>
      <div className="py-[70px]">
        {!data ? (
          <PostsSkeleton />
        ) : (
          <div className="grid grid-cols-1 text-white">
            {data?.result?.map((notif: NotifType) => (
              <Lists
                key={notif._id}
                avatar={notif?.senderId?.avatar}
                username={notif?.senderId?.username}
                createdAt={notif?.createdAt}
                userId={notif?.senderId?._id}
                data={notif.message}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Activity;
