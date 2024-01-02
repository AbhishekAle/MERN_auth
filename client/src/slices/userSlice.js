import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      state.currentUser = token;
    },
    setUsername: (state, action) => {
      const username = action.payload;
      state.username = username;
    },
  },
});

export const { setToken, setUsername } = userSlice.actions;

export default userSlice.reducer;
