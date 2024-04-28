import Layout from "@/components/Layout";
import Lists from "@/components/Lists";
import { PostsSkeleton, SingleSkeleton } from "@/components/PostSkeleton";
import PostCard from "@/components/post/PostCard";
import { useMutateSingleData } from "@/lib/hooks";
import { PostType } from "@/types/data.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface RepliesType {
  _id: string;
  reply: string;
  createdAt: string;
  userId: {
    _id: string;
    username: string;
    avatar: string;
  };
}

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<PostType | null>(null);

  const {
    mutate,
    data: replies,
    error,
  } = useMutateSingleData({
    endpoint: `/post/reply/${postId}`,
  });
  const {
    mutate: getPostById,
    data,
    error: errPost,
  } = useMutateSingleData({
    endpoint: `/post/${postId}`,
  });

  useEffect(() => {
    if (postId) {
      getPostById();
      mutate();
    }
  }, [postId]);

  useEffect(() => {
    if (data) {
      setPost({ ...data?.result });
    }
  }, [data]);
  console.log(post);

  return (
    <Layout>
      <div className="py-16 text-white">
        {post ? (
          <PostCard
            _id={post._id}
            avatar={post?.userId?.avatar}
            caption={post?.caption}
            name={post?.userId?.username}
            image={post?.image}
            createdAt={post?.createdAt}
            totalReply={post?.replies?.length}
            userId={post?.userId}
            likes={post?.likes}
            reposted={post?.reposted}
          />
        ) : (
          <SingleSkeleton />
        )}
        <div className="p-5 border-b border-white/20">
          <h3 className="text-lg font-semibold">Balasan</h3>
        </div>
        <div>
          {replies ? (
            <div className="grid grid-cols-1">
              {replies?.result?.map((reply: RepliesType, index: number) => (
                <Lists
                  key={index}
                  data={reply.reply}
                  avatar={reply.userId.avatar}
                  username={reply.userId.username}
                  createdAt={reply.createdAt}
                  userId={reply.userId._id}
                  replyId={reply._id}
                  isMorebutton
                />
              ))}
            </div>
          ) : (
            <PostsSkeleton />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Post;
