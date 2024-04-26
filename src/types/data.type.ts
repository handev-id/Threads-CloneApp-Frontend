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
    username: string;
    avatar: string;
  };
};
