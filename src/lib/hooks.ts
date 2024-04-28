import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axiosInstance";
import { useEffect, useState } from "react";
import { UserType } from "@/types/userType";

export const useGetAllData = ({ endpoint }: { endpoint: string }) => {
  const { data, isLoading, status, error } = useQuery({
    queryKey: ["ALL_DATA"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(endpoint);
      return data;
    },
  });

  return {
    data,
    isLoading,
    status,
    error,
  };
};

export const useMutateGetAllData = ({ endpoint }: { endpoint: string }) => {
  const { data, isPending, status, error, mutate } = useMutation({
    mutationKey: ["ALL_DATA"],
    mutationFn: async () => {
      const { data } = await axiosInstance.get(endpoint);
      return data;
    },
  });

  return {
    data,
    isPending,
    status,
    error,
    mutate,
  };
};

export const useSingleData = ({ endpoint }: { endpoint: string }) => {
  const { data, isLoading, status, error } = useQuery({
    queryKey: ["SINGLE_DATA"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(endpoint);
      return data;
    },
  });

  return {
    data,
    isLoading,
    status,
    error,
  };
};

export const useMutateSingleData = ({ endpoint }: { endpoint: string }) => {
  const { mutate, data, isPending, status, error } = useMutation({
    mutationKey: ["SINGLE_DATA"],
    mutationFn: async () => {
      const { data } = await axiosInstance.get(endpoint);
      return data;
    },
  });

  return {
    data,
    isPending,
    status,
    error,
    mutate,
  };
};

export const useCreateData = ({
  endpoint,
  data,
}: {
  endpoint: string;
  data: any;
}) => {
  const {
    mutate,
    data: response,
    isPending,
    status,
    error,
  } = useMutation({
    mutationKey: ["CREATE_DATA"],
    mutationFn: async () => {
      const res = await axiosInstance.post(endpoint, { ...data });
      return res.data;
    },
  });

  return {
    mutate,
    response,
    isPending,
    status,
    error,
  };
};

export const useGetLocalUser = () => {
  const [userData, setUserData] = useState<UserType>({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("threads_userdata") as any);

    setUserData(data?.user);
  }, []);

  return {
    userData,
  };
};

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("threads_userdata");
  window.location.reload();
};

export const usePostingTimeHistory = ({ inputTime }: { inputTime: string }) => {
  function formatTimeAgo(delta: number) {
    const intervals = [
      { label: "bulan", divisor: 2629800000 }, // approximately 1 month in milliseconds
      { label: "minggu", divisor: 604800000 },
      { label: "hari", divisor: 86400000 },
      { label: "jam", divisor: 3600000 },
      { label: "menit", divisor: 60000 },
      { label: "detik", divisor: 1000 },
    ];

    for (const { label, divisor } of intervals) {
      const value = Math.floor(delta / divisor);
      if (value >= 1) {
        return `${value} ${label}${value === 1 ? "" : ""} lalu`;
      }
    }

    return ""; // If the time difference is less than a second
  }

  const timeAgo = new Date(inputTime);
  const deltaTime = Date.now() - timeAgo.getTime();
  const postingTime = formatTimeAgo(deltaTime);
  return postingTime;
};
