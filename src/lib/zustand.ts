import { create } from "zustand";

type OtpCode = {
  code: string | null;
  setCode: (code: string) => void;
  userId: string | null;
  setUserId: (userId: string) => void;
};

type modalPost = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type action = {
  isPost: boolean;
  isRepost: boolean;
  isReply: boolean;
  setIsPost: (isPost: boolean) => void;
  setIsReply: (isReply: boolean) => void;
  setIsRepost: (isRepost: boolean) => void;
};

type LoadingType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};
type LoacationType = {
  location: string;
  setLocation: (location: string) => void;
};

type ImagePostType = {
  imageUrl: string | null;
  setImageUrl: (imageUrl: string | null) => void;
  selectedFile: File | null;
  setSelectedFile: (selectedFile: File | null) => void;
};

export const useOtpCode = create<OtpCode>((set) => ({
  code: null,
  userId: null,
  setCode: (code) => set({ code }),
  setUserId: (userId) => set({ userId }),
}));

export const useImagePost = create<ImagePostType>((set) => ({
  imageUrl: null,
  setImageUrl: (imageUrl: string) => set({ imageUrl }),
  selectedFile: null,
  setSelectedFile: (selectedFile) => set({ selectedFile }),
}));

export const useModalPost = create<modalPost>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export const useActionPost = create<action>((set) => ({
  isPost: false,
  isReply: false,
  isRepost: false,
  setIsRepost: (isRepost) => set({ isRepost }),
  setIsPost: (isPost) => set({ isPost }),
  setIsReply: (isReply) => set({ isReply }),
}));

export const useIsLoading = create<LoadingType>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export const useLocationTabs = create<LoacationType>((set) => ({
  location: "threads",
  setLocation: (location) => set({ location }),
}));

export const useEditProfile = create<modalPost>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));
