import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  loading: boolean;
  user: AdminUser | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user") || "null"),
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setAdminUser: (state, action: PayloadAction<AdminUser>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { logout, setAdminUser } = authSlice.actions;

export const selectAdminUser = (state: any) => state.user;

export const authReducer = authSlice.reducer;
export default authReducer;
