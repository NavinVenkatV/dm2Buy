import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CollabState {
  isCollabPressed: boolean;
}

const initialState: CollabState = {
  isCollabPressed: false,
};

const collabSlice = createSlice({
  name: "collab",
  initialState,
  reducers: {
    toggleCollab(state) {
      state.isCollabPressed = !state.isCollabPressed;
    },
    setCollab(state, action: PayloadAction<boolean>) {
      state.isCollabPressed = action.payload;
    },
  },
});

export const { toggleCollab, setCollab } = collabSlice.actions;
export default collabSlice.reducer;
