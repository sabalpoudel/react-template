import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import initialState from "./initState";
import type { TUserRedux, TUserToken } from "@api/interface";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: () => initialState,
    setUser: (state, action: PayloadAction<TUserRedux | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<TUserToken | null>) => {
      state.token = action.payload;
    },
    toggleAuthModal: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalOpen = action.payload;
    },
  },
});

export const { resetAuthState, setUser, setToken, toggleAuthModal } =
  authSlice.actions;

// exporting the reducer here, as we need to add this to the store
export default authSlice.reducer;
