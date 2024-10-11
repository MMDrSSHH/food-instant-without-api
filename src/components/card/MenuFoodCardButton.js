"use client";

import React from "react";
import PlusIcon from "../svgs/PlusIcon";
import MinusIcon from "../svgs/MinusIcon";
import TrashIcon from "../svgs/TrashIcon";

function MenuFoodCardButton({
  addHandler,
  removeHandler,
  cartItemCount,
  isActive,
}) {
  if (!isActive) {
    return (
      <div className="absolute bottom-0 right-0 w-full rounded-b-[12px] h-[50px] flex items-center justify-center text-[16px] text-gray">
        عدم موجودی
      </div>
    );
  }
  return (
    <>
      {cartItemCount > 0 ? (
        <div className="absolute bottom-0 right-0 w-full rounded-b-[12px] h-[50px] flex text-[16px]">
          <button
            className="flex-1 flex items-center justify-center border-2 bg-primary border-primary rounded-br-[12px]"
            onClick={addHandler}
          >
            <PlusIcon className="w-[16px] fill-gray" />
          </button>
          <span className="flex-1 flex items-center justify-center text-[18px]">
            {cartItemCount}
          </span>
          <button
            className="flex-1 flex items-center justify-center border-2 border-primary rounded-bl-[12px]"
            onClick={removeHandler}
          >
            {cartItemCount > 1 ? (
              <MinusIcon className="w-[16px] fill-gray" />
            ) : (
              <TrashIcon className="w-[16px] fill-gray" />
            )}
          </button>
        </div>
      ) : (
        <button
          className="bg-primary text-onPrimary absolute bottom-0 right-0 w-full rounded-b-[12px] h-[50px] flex items-center justify-center text-[16px]"
          onClick={addHandler}
        >
          سفارش غذا
        </button>
      )}
    </>
  );
}

export default MenuFoodCardButton;
