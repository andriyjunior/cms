import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "business/user/UserService";
import { UserModel } from "models/user";
import { setIsAuth } from "./auth";
import { AxiosError } from "axios";

interface UserState {
  isLoading: boolean;
  data: UserModel | null;
}

const initialState: UserState = {
  isLoading: false,
  data: null,
};

export const tryGetUserInfo = createAsyncThunk(
  "user/info",
  async (_, { dispatch }) => {
    try {
      const response = await userService.getUserInfo();

      if (response) {
        dispatch(setIsAuth());
        return response;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  reducers: {
    resetUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tryGetUserInfo.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(tryGetUserInfo.fulfilled, (state, { payload }: any) => {
      return { isLoading: false, data: payload };
    });
    builder.addCase(tryGetUserInfo.rejected, () => {
      return initialState;
    });
  },
  initialState: initialState,
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
