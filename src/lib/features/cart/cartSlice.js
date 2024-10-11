import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
  isSubmitted: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.count++;
      } else {
        state.items.push(action.payload);
      }
      state.isSubmitted = false;
      state.totalPrice += action.payload.price;
      state.totalCount++;

      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        if (item.count > 1) {
          item.count--;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload.id);
        }
        state.isSubmitted = false;
        state.totalPrice -= action.payload.price;
        state.totalCount--;
      }

      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    setCart: (state, action) => {
      sessionStorage.setItem("cart", JSON.stringify({ ...action.payload }));

      return { ...action.payload };
    },
  },
});

export const { addItem, removeItem, setCart } = cartSlice.actions;

export default cartSlice.reducer;
