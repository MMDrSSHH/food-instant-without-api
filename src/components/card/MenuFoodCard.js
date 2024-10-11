import { getStaticRoute } from "@/utils/constants";
import { formatCurrency } from "@/utils/formatters";
import { addItem, removeItem } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";
// import MenuFoodCardButton from "./MenuFoodCardButton";
const MenuFoodCardButton = dynamic(() => import("./MenuFoodCardButton"), {
  ssr: false,
  loading: () => (
    <div className="absolute bottom-0 right-0 w-full h-[50px] rounded-b-[12px] overflow-hidden">
      <Skeleton baseColor="#FFA62F" highlightColor="#FFC96F" className="!rounded-t-none !absolute h-full" />
    </div>
  ),
});

function MenuFoodCard({ food }) {
  const dispatch = useAppDispatch();
  const cartItemCount = useAppSelector(
    (state) => state.cart.items.find((i) => i.id === food.id)?.count || 0
  );
  const isInActive = !!useAppSelector((state) =>
    state.inActiveFoods.items.find((i) => i.foodId === food.id)
  );
  const isInActiveFetched = !!useAppSelector(
    (state) => state.inActiveFoods.isFetched
  );

  const addHandler = () => {
    // if (isInActive || !isInActiveFetched) return;
    dispatch(addItem({ ...food, count: 1 }));
  };

  const removeHandler = () => {
    dispatch(removeItem({ ...food }));
  };

  return (
    <div className="bg-onPrimary rounded-[12px] h-[260px] relative">
      <div
        onClick={addHandler}
        className={`relative mx-auto w-[90%] ${
          isInActive || !isInActiveFetched ? "cursor-default" : "cursor-pointer"
        } bg-red-500 rounded-[6px] overflow-hidden h-[150px] shadow-md -translate-y-[28px]`}
      >
        {/* <Image
          src={`${getStaticRoute()}\\${food?.image}`}
          alt={food?.name}
          className="object-cover"
          fill
        /> */}
      </div>
      <div className="flex items-center justify-between w-[90%] mx-auto text-gray">
        <span className="text-[18px]">{food?.name}</span>
        <span>
          <span className="font-bold text-[18px]">
            {formatCurrency(food?.price)}
          </span>{" "}
          <sup className="font-extralight">ریال</sup>
        </span>
      </div>
      <MenuFoodCardButton
        addHandler={addHandler}
        removeHandler={removeHandler}
        cartItemCount={cartItemCount}
        isActive={!isInActive}
      />
    </div>
  );
}

export default MenuFoodCard;
