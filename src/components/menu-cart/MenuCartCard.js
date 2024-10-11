"use client";
import { formatCurrency } from "@/utils/formatters";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import CartItem from "../cartItem/CartItem";
import { useSubmitOrder } from "../../hooks/useSubmitOrder";

function MenuCartCard() {
  const [showCart, setShowCart] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  // const dispatch = useAppDispatch();
  const submitOrder = useSubmitOrder();

  const submitOrderHandler = () => {
    submitOrder(cart?.items);
  };

  useEffect(() => {
    setShowCart(cart.totalCount > 0);
  }, [cart]);

  return (
    <div
      className={`hidden ${
        showCart ? "xl:block" : ""
      } w-full h-fit sticky top-[14px]`}
    >
      <div className="mr-[80px]">
        {/* Cart Details Section */}
        <div className=" bg-onPrimary rounded-[10px] pb-[10px]">
          {/* Header */}
          <div className="bg-gray text-primary rounded-[10px] px-[12px] py-[16px] font-medium text-[18px]">
            جزییات سفارش
          </div>
          {/* Details List Wrapper */}
          <div className="px-[12px] py-[10px]">
            <DetailItem
              name="تعداد اقلام"
              value={cart.totalCount + " " + "عدد"}
            />
            <DetailItem
              name="قیمت کل"
              value={formatCurrency(cart.totalPrice) + " " + "ریال"}
            />
            <DetailItem name="تخفیف" value={"0 ریال"} />
          </div>
          {/* Dot Divider */}
          <div className="h-[50px] flex items-center justify-center relative">
            <div className="w-[90%] border border-dashed border-gray"></div>
            <div className="bg-white rounded-full w-[24px] h-[24px] absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"></div>
            <div className="bg-white rounded-full w-[24px] h-[24px] absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2"></div>
          </div>
          {/* Items Section */}
          <div className="px-[12px] py-[10px] max-h-[100px] tall:max-h-[300px] overflow-y-auto scrollbar scrollbar-thumb-gray scrollbar-w-1 scrollbar-thumb-rounded-full">
            {cart?.items?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        <button
          onClick={submitOrderHandler}
          className="rounded-[10px] w-full py-[12px] bg-primary text-onPrimary text-[18px] mt-[22px]"
        >
          ثبت سفارش
        </button>
      </div>
    </div>
  );
}

function DetailItem({ name, value }) {
  return (
    <div className="py-[6px] border-b text-gray border-gray flex justify-between items-center">
      <span className="text-[12px]">{name}</span>
      <span className="text-[14px] font-bold">{value}</span>
    </div>
  );
}

export default MenuCartCard;
