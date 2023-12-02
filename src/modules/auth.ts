import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "business/auth/AuthService";
import { tokenService } from "business/shared/TokenService";
import { resetUser, tryGetUserInfo } from "./user";
import { AxiosError } from "axios";

interface AuthState {
  initialized: boolean;
  isLoading: boolean;
  isAuth: boolean;
  error?: any;
}

const initialState: AuthState = {
  initialized: false,
  isLoading: false,
  isAuth: false,
};

export const tryLogin = createAsyncThunk(
  "auth/login",
  async (payload: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.login(payload.email, payload.password);
      if (response) {
        tokenService.setTokenInfo(response);
        dispatch(tryGetUserInfo());
        return response;
      }
      return rejectWithValue("Login failed");
    } catch (error) {
      if (!(error instanceof AxiosError)) return;
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const tryRegister = createAsyncThunk(
  "auth/register",
  async (payload: any, { dispatch }) => {
    await authService.registration(payload.email, payload.password);
    dispatch(tryLogin(payload));
  }
);

export const tryLogout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    tokenService.removeUser();
    dispatch(resetUser());
  }
);

const authSlice = createSlice({
  name: "auth",
  reducers: {
    setIsAuth() {
      return { initialized: true, isLoading: false, isAuth: true };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tryLogin.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(tryLogin.fulfilled, () => {
      return { initialized: true, isLoading: false, isAuth: true };
    });
    builder.addCase(tryLogin.rejected, (state, { payload }) => {
      return {
        initialized: true,
        isLoading: false,
        isAuth: false,
        error: payload,
      };
    });

    builder.addCase(tryLogout.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(tryLogout.fulfilled, (state, action) => {
      return {
        initialized: true,
        isLoading: false,
        isAuth: false,
      };
    });
    builder.addCase(tryLogout.rejected, () => {
      return { ...initialState, initialized: true };
    });
  },
  initialState: initialState,
});

export const { setIsAuth } = authSlice.actions;
export default authSlice.reducer;
