import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import initialState, { type TExtraState } from "./initState";

export const extraSlice = createSlice({
  name: "auth",
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
  },
});

export const { resetExtraState, toggleRightModal, toggleFileRelatedModal } =
  extraSlice.actions;

// exporting the reducer here, as we need to add this to the store
export default extraSlice.reducer;
