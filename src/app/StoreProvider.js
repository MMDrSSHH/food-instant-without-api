"use client";
import { setCart } from "@/lib/features/cart/cartSlice";
import { makeStore } from "@/lib/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";

function StoreProvider({ children }) {
  const storeRef = useRef();

  const getCart = function () {
    try {
      const cart = JSON.parse(sessionStorage.getItem("cart"));
      if (cart) storeRef.current.dispatch(setCart({ ...cart }));
    } catch (error) {
      // Error
    }
  };

  if (!storeRef.current) {
    storeRef.current = makeStore();
    // storeRef.current.dispatch(setUser({isAuthenticated: true, fullName: "محمدرضا شکوهی"}))
    getCart();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default StoreProvider;
