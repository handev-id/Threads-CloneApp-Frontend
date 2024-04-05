import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    otp: "",
    userId: "",
  },
  reducers: {
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
});

export const { setOtp, setUserId } = otpSlice.actions;
export default otpSlice.reducer;
