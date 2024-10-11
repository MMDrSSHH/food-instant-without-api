"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CustomDrawer from "../drawer/CustomDrawer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { formatCurrency } from "@/utils/formatters";
import CartItem from "../cartItem/CartItem";
import { useSubmitOrder } from "../../hooks/useSubmitOrder";

function MenuCartDrawer() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const submitOrder = useSubmitOrder();

  const submitOrderHandler = () => {
    submitOrder(cart?.items);
  };

  useEffect(() => {
    setShowCart(cart.totalCount > 0);

    if (showDrawer && cart.totalCount === 0) {
      setShowDrawer(false);
    }
  }, [cart]);

  return (
    <div className={`xl:hidden`}>
      <div
        className={`h-[70px] w-full transition-transform bg-white flex items-center shadow-md rounded-t-[12px] fixed bottom-0 right-0 ${
          showCart ? "translate-y-0" : "translate-y-[70px]"
        }`}
      >
        <div className="flex gap-[12px] w-[90%] mx-auto items-center justify-between">
          <button
            onClick={submitOrderHandler}
            className="flex-1 h-[50px] bg-primary text-onPrimary rounded-[10px]"
          >
            ثبت سفارش
          </button>
          <button
            onClick={() => setShowDrawer(true)}
            className="w-[50px] h-[50px] border-2 border-primary rounded-full flex justify-center items-center"
          >
            <Image
              src="/assets/icons/BasketFillIcon.svg"
              alt="basket icon"
              className="w-[24px] h-[24px]"
              width={100}
              height={100}
            />
          </button>
        </div>
      </div>

      <CustomDrawer
        open={showDrawer}
        // className="min-h-[400px] max-h-[80%] h-[60%]"
        onClose={() => setShowDrawer(false)}
      >
        <div className="w-[90%] mx-auto">
          <div className="flex gap-[12px] h-[70px] items-center justify-between">
            <button
              onClick={submitOrderHandler}
              className="flex-1 h-[50px] bg-primary text-onPrimary rounded-[10px]"
            >
              ثبت سفارش
            </button>
            <button
              onClick={() => setShowDrawer(false)}
              className="w-[50px] h-[50px] border-2 border-primary rounded-full flex justify-center items-center"
            >
              <Image
                src="/assets/icons/CrossCloseIcon.svg"
                alt="basket icon"
                className="w-[24px] h-[24px]"
                width={100}
                height={100}
              />
            </button>
          </div>
          <div className="mt-[40px] mb-[50px]">
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
          <div className="h-[300px] mb-[20px] overflow-y-auto">
            {cart?.items?.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </CustomDrawer>
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

export default MenuCartDrawer;
