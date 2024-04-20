import { create } from "zustand";

type OtpCode = {
  code: string | null;
  setCode: (code: string) => void;
  userId: string | null;
  setUserId: (userId: string) => void;
};

export const useOtpCode = create<OtpCode>((set) => ({
  code: null,
  userId: null,
  setCode: (code) => set({ code }),
  setUserId: (userId) => set({ userId }),
}));
