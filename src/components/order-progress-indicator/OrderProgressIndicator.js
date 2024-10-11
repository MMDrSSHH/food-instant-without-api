"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SandWatchIcon from "../svgs/SandWatchIcon";
import BbqIcon from "../svgs/BbqIcon";
import BikeFoodDeliveryIcon from "../svgs/BikeFoodDeliveryIcon";
import CheckMarkIcon from "../svgs/CheckmarkIcon";
import { OrderStatus } from "@/utils/constants";

const orderStatusToString = (orderStatus) => {
  switch (orderStatus) {
    case OrderStatus.PaymentSuccessful:
      return "در انتظار سفارش";
    case OrderStatus.Accepted:
      return "آماده‌سازی سفارش";
    case OrderStatus.Delivering:
      return "ارسال سفارش";
    case OrderStatus.Delivered:
      return "تحویل سفارش";
    default:
      return "وضعیت نامشخص";
  }
};

const OrderProgressIndicatorContext = createContext();

function OrderProgressIndicator({ orderStatus }) {
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  return (
    <OrderProgressIndicatorContext.Provider value={{ setProgressBarWidth }}>
      <div className="mt-[40px] md:hidden text-center text-[18px] font-bold text-gray">
        {orderStatusToString(orderStatus)}
      </div>
      <div className="w-full relative mt-[12px] md:mt-[40px]">
        <div className="w-full h-[12px] border-2 border-gray rounded-full absolute top-1/2 -translate-y-1/2 left-0">
          <div
            className="absolute top-[0px] -right-[1px] bg-gray h-full border-2 border-gray  rounded-full"
            style={{
              width: `${progressBarWidth + 1}px`,
            }}
          />
        </div>
        <div className="flex justify-between items-center mx-[20px]">
          <OrderProgressStep
            label="تایید سفارش"
            isCurrent={orderStatus === OrderStatus.PaymentSuccessful}
            isCompleted={[
              OrderStatus.Accepted,
              OrderStatus.Delivering,
              OrderStatus.Delivered,
            ].includes(orderStatus)}
            icon={<SandWatchIcon className="fill-inherit w-[16px]" />}
          />
          <OrderProgressStep
            isCurrent={orderStatus === OrderStatus.Accepted}
            isCompleted={[
              OrderStatus.Delivering,
              OrderStatus.Delivered,
            ].includes(orderStatus)}
            label="آماده‌سازی سفارش"
            icon={<BbqIcon className="fill-inherit w-[24px]" />}
          />
          <OrderProgressStep
            isCurrent={false}
            isCompleted={[
              OrderStatus.Delivering,
              OrderStatus.Delivered,
            ].includes(orderStatus)}
            label="ارسال سفارش"
            icon={<BikeFoodDeliveryIcon className="fill-inherit w-[24px]" />}
          />
          <OrderProgressStep
            isCurrent={orderStatus === OrderStatus.Delivering}
            isCompleted={[OrderStatus.Delivered].includes(orderStatus)}
            label="تحویل سفارش"
            icon={<CheckMarkIcon className="fill-inherit h-[18px]" />}
          />
        </div>
      </div>
    </OrderProgressIndicatorContext.Provider>
  );
}

function OrderProgressStep({
  icon,
  label,
  isCompleted = false,
  isCurrent = false,
}) {
  const ref = useRef(null);
  const { setProgressBarWidth } = useContext(OrderProgressIndicatorContext);

  const setProgressWidth = () => {
    if (ref.current && isCurrent) {
      const progressBarWidth =
        ref.current.parentElement.offsetWidth - ref.current.offsetLeft;
      setProgressBarWidth(progressBarWidth);
    }
  };

  useEffect(() => {
    setProgressWidth();
    window.addEventListener("resize", setProgressWidth);

    return () => {
      window.removeEventListener("resize", setProgressWidth);
    };
  }, []);

  useEffect(() => {
    setProgressWidth();
  }, [isCurrent]);

  return (
    <div ref={ref} className="relative">
      <div
        className={`w-[50px] h-[50px] border-2 ${
          isCompleted ? "bg-gray fill-primary" : "bg-white fill-gray"
        } border-gray rounded-full flex justify-center items-center`}
      >
        {icon}
      </div>
      <span className="hidden absolute right-1/2 translate-x-1/2 text-gray text-[14px] -bottom-[32px] text-nowrap md:block">
        {label}
      </span>
    </div>
  );
}

export default OrderProgressIndicator;
