import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  profilePicture: "",
};

interface populateUserInfoPayload {
  username: string;
  profilePicture: string;
}

export const userInfoSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    handlePopulateUserInfo: (
      state,
      action: PayloadAction<populateUserInfoPayload>
    ) => {
      state.profilePicture = action.payload.profilePicture;
      state.username = action.payload.username;
    },
  },
});

export const { handlePopulateUserInfo } = userInfoSlice.actions

export default userInfoSlice.reducer;
