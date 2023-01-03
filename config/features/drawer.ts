import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React, { ReactNode } from "react";

interface DrawerPayload {
  content: ReactNode | null;
}

const initialState: { isOpen: boolean; content: ReactNode | null } = {
  isOpen: false,
  content: null,
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<DrawerPayload>) => {
      state.content = action.payload.content;
      state.isOpen = true;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
      state.content = null;
    },
  },
});

export default drawerSlice.reducer;

export const { openDrawer, closeDrawer } = drawerSlice.actions;
