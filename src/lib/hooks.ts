import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { useEffect, useState } from "react";

export const useGetPosts = () => {
  const {
    data: posts,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/post/list");
      return data;
    },
  });

  return {
    posts,
    isLoading,
    status,
  };
};

export const useGetLocalUser = () => {
  const [localUserData, setLocalUserData] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("threads_userdata") as any);

    setLocalUserData(data);
  }, []);

  return {
    localUserData,
  };
};

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("threads_userdata");
  window.location.reload();
};
