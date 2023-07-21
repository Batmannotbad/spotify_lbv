// userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {}, // You can also use null if you prefer
  isloggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isloggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isloggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
