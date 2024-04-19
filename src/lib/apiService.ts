import { axiosInstance } from "./axiosInstance";

export const likePost = async (postId: string, recipientId: string) => {
  try {
    const like = await axiosInstance.post(
      `/post/like/${postId}?recipientId=${recipientId}`
    );
    return like;
  } catch (error) {
    console.log(error);
  }
};
