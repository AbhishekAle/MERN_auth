import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.currentUser = token;
    },
  },
});

export const { setToken } = userSlice.actions;

export default userSlice.reducer;
