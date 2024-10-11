"use client";

import { addItem, removeItem } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function CartItem({ item }) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const addHandler = () => {
    dispatch(addItem({ ...item }));
  };

  const router = useRouter();

  const removeHandler = () => {
    dispatch(removeItem({ ...item }));
    if (cart.totalCount === 0) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <div className="flex justify-between items-center py-[12px]">
      <div className="flex items-center">
        <span className="flex items-center text-[14px] w-[36px]">
          {item.count}
          <span className="text-[10px]">x</span>
        </span>
        <span className="text-[16px]">{item.name}</span>
      </div>
      <div className="text-[18px] flex">
        <button
          onClick={addHandler}
          className="bg-primary w-[60px] h-[30px] flex items-center justify-center rounded-r-[6px] border border-primary"
        >
          <Image
            alt="plus"
            src="/assets/icons/PlusIcon.svg"
            width={14}
            height={14}
          />
        </button>
        <button
          onClick={removeHandler}
          className="bg-onPrimary w-[60px] h-[30px] flex items-center justify-center rounded-l-[6px] border border-primary"
        >
          {item.count > 1 ? (
            <Image
              alt="minus"
              src="/assets/icons/MinusIcon.svg"
              width={14}
              height={14}
            />
          ) : (
            <Image
              alt="minus"
              src="/assets/icons/TrashIcon.svg"
              width={14}
              height={14}
            />
          )}
        </button>
      </div>
    </div>
  );
}
