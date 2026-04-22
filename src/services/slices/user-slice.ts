import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  updateUserError: string | null;
  authError: string | null;
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  updateUserError: null,
  authError: null
};

export const fetchUser = createAsyncThunk('user/fetch', getUserApi);

export const updateUser = createAsyncThunk(
  'user/update',
  (payload: Partial<TRegisterData>) => updateUserApi(payload)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (payload: TLoginData) => {
    const response = await loginUserApi(payload);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (payload: TRegisterData) => {
    const response = await registerUserApi(payload);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.authError = null;
      state.updateUserError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.authError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authError = action.error.message || 'Не удалось войти';
      })
      .addCase(registerUser.pending, (state) => {
        state.authError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authError =
          action.error.message || 'Не удалось зарегистрироваться';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authError = null;
        state.updateUserError = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserError =
          action.error.message || 'Не удалось обновить данные пользователя';
      });
  }
});

export const { clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
