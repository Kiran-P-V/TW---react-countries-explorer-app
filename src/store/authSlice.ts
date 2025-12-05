import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<{ username: string }>) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.username = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
