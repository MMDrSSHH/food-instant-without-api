"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
import inActiveFoodsReducer from "./features/inActiveFoods/inActiveFoodsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      user: userReducer,
      inActiveFoods: inActiveFoodsReducer,
    },
  });
};
