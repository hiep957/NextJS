import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface UserState {
  user: any;
  loaded: boolean;
}

const initialState: UserState = {
  user: null,
  loaded: false
};

export const requestVerifiToken = createAsyncThunk(
  "request_verifytoken",
  async () => {
    const response = await fetch("/api/auth/verify-token", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Để gửi cookie cùng với request
    });

    const data = await response.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(requestVerifiToken.pending, (state) => { 
        console.log("pending");
    })
    builder.addCase(requestVerifiToken.fulfilled, (state, action: PayloadAction<{
        isValid: boolean;
        message: string; 
        user: any      
    }>) => { 
        console.log("fullfilled");
        state.user = action.payload.user;
        state.loaded = true;
    })
    builder.addCase(requestVerifiToken.rejected, (state) => { 
        console.log("rejected");
    })
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
