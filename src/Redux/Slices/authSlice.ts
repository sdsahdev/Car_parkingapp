import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../Store/store';

interface User {
  id: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

interface ChangeDataPayload {
  email: string;
  password: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeData(state, action: PayloadAction<ChangeDataPayload>) {
      if (state.user) {
        state.user.email = action.payload.email;
        state.user.password = action.payload.password;
      }
    },

    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{user: User; token: string}>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {loginStart, loginSuccess, loginFailure, logout, changeData} =
  authSlice.actions;

export const selectIsLoggedIn = (state: RootState): boolean =>
  state.auth.user !== null && state.auth.token !== null;

export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
