import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

// Temporary helper to load state from localStorage
const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return { isAuthenticated: false, username: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { isAuthenticated: false, username: null };
  }
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<{ username: string }>) {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      // Temporary persistence: Save to localStorage
      localStorage.setItem(
        "authState",
        JSON.stringify({
          isAuthenticated: true,
          username: action.payload.username,
        }),
      );
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.username = null;
      // Temporary persistence: Clear from localStorage
      localStorage.removeItem("authState");
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;

