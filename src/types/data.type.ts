export type PostType = {
  _id?: string;
  caption?: string;
  image?: string;
  name?: string;
  username?: string;
  avatar?: string;
  replies?: string[];
  createdAt: string;
  followers?: string[];
  following?: string[];
  likes?: string[];
  userId?: {
    _id?: string;
    username?: string;
    avatar?: string;
  };
  totalReply?: number;
  totalLikes?: number;
  index?: number;
  reposted?: {
    _id: string;
    username?: string;
    avatar?: string;
  };
  postId?: string;
};

export type ReplyType = {
  _id: string;
  userId?: {
    _id?: string;
    username?: string;
    avatar?: string;
  };
  postId?: {
    _id?: string;
    username?: string;
    avatar?: string;
    image?: string;
    caption?: string;
    createdAt?: string;
  };
  reply?: string;
  createdAt?: string;
};
