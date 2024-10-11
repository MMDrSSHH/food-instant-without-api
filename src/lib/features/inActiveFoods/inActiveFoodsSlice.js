import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isFetched: false,
};

export const inActiveFoodsSlice = createSlice({
  initialState,
  name: "inActiveFoods",
  reducers: {
    setInActiveFoods: (state, action) => {
      return action.payload;
    },
  },
});

export const { setInActiveFoods } = inActiveFoodsSlice.actions;
export default inActiveFoodsSlice.reducer;
