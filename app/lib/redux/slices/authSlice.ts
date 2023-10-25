import { AxiosError } from 'axios';
import api from '../../../api/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type AuthState = {
  username: string | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null,
}

const initialState: AuthState = {
  username: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const loginAsync = createAsyncThunk<
  { username: string },
  { username: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const response = await api.post("login/", { username, password });

    return { username: response.data.username };
  } catch (error: any) {
    const axiosError = error as AxiosError;
    let errorMessage = "An error occurred. Please try again.";

    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 401:
          errorMessage = "Invalid username or password.";
          break;
        case 403:
          errorMessage = "Your account has been blocked. Please contact support.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = "An unexpected error occurred. Please try again.";
      }
    }

    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.username = action.payload.username;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
         state.error = action.payload || "An unexpected error occurred. Please try again.";
      });
  },
});

export default authSlice.reducer;
