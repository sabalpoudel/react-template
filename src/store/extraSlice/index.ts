import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { updateLocalStorage } from "@/_utils";
import initialState, { type TExtraState } from "./initState";

export const extraSlice = createSlice({
  name: "extra",
  initialState,
  reducers: {
    resetExtraState: () => initialState,

    toggleRightModal: (
      state,
      action: PayloadAction<TExtraState["rightModalType"]>
    ) => {
      state.rightModalType = action.payload;
    },

    toggleFileRelatedModal: (
      state,
      action: PayloadAction<TExtraState["fileRelatedModal"]>
    ) => {
      state.fileRelatedModal = action.payload;
    },

    setLocaleValue: (state, action: PayloadAction<TExtraState["locale"]>) => {
      const localeValue = action.payload;
      document.documentElement.lang = localeValue;
      state.locale = localeValue;
      updateLocalStorage("locale", localeValue, "set");
    },
  },
});

export const {
  setLocaleValue,
  resetExtraState,
  toggleRightModal,
  toggleFileRelatedModal,
} = extraSlice.actions;

// exporting the reducer here, as we need to add this to the store
export default extraSlice.reducer;
