import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  points: 0,
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.isAuthenticated = false;
      state.points = 0;
      state.user = null;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
  },
});

export const { setUser, removeUser, setPoints } = userSlice.actions;

export default userSlice.reducer;
