import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { useIsLoading } from "./zustand";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

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

export const uploadImage = async (formData: FormData) => {
  try {
    const { data } = await axios.post(`${baseUrl}/upload-image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createRepost = async (postId: string, recipientId: string) => {
  try {
    const { data } = await axiosInstance.post(
      `/post/repost/${postId}?recipientId=${recipientId}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id: string, isReposted: boolean) => {
  try {
    const { data } = await axiosInstance.delete(
      `/post/delete/${id}?isReposted=${isReposted}`
    );
    if (data?.success) {
      window.location.reload();
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteReply = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/post/reply/delete/${id}`);
    if (data?.success) {
      window.location.reload();
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
