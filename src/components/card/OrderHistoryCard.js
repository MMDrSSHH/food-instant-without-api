import { OrderStatus } from "@/utils/constants";
import React from "react";
import momentJalaali from "moment-jalaali";
import InfoItem from "../infoItem/InfoItem";
import { formatCurrency } from "@/utils/formatters";

function OrderHistoryCard({ order }) {
  const orderDateObj = momentJalaali(order.createdAt);
  return (
    <div className="p-[20px] border border-gray/50 rounded-[12px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <OrderStatusChip orderStatus={order.orderStatus} />
        <span className="inline-flex items-center justify-center px-[12px] py-[6px] neutral font-bold text-[10px] md:text-[12px] rounded-full min-w-[36px] md:min-w-[46px]">
          {order.orderNo}
        </span>
      </div>
      {/* Body */}
      <div className="mt-[20px] grid grid-cols-2 gap-[20px]">
        <InfoItem name="تاریخ:" value={orderDateObj.format("jYYYY/jMM/jDD")} />
        <InfoItem name="ساعت:" value={orderDateObj.format("HH:mm")} />
        <InfoItem
          fullWidth
          name="هزینه سفارش:"
          value={`${formatCurrency(order.totalPrice)} ریال`}
        />
        <InfoItem
          fullWidth
          name="مبلغ تخفیف:"
          value={`${formatCurrency(order.discountPrice)} ریال`}
        />
        <InfoItem
          fullWidth
          name="مبلغ پرداختی:"
          value={`${formatCurrency(order.paymentPrice)} ریال`}
        />
        <InfoItem
          fullWidth
          name="اعتبار دریافتی:"
          value={`${formatCurrency(order.pointPrice)} ریال`}
        />
      </div>

      <button className="w-full bg-onPrimary text-primary text-[16px] md:text-[18px] font-bold text-center py-[12px] rounded-[10px] mt-[36px]">
        مشاهده جزییات
      </button>
    </div>
  );
}

const OrderStatusChip = ({ orderStatus }) => {
  let orderStatusClassName = "";
  let orderStatusLabelText = "";

  switch (orderStatus) {
    case OrderStatus.Accepted:
    case OrderStatus.Delivering:
      orderStatusClassName = "info";
      break;
    case OrderStatus.Delivered:
      orderStatusClassName = "success";
      break;
    case OrderStatus.PaymentSuccessful:
      orderStatusClassName = "warning";
      break;
    default:
      orderStatusClassName = "danger";
      break;
  }

  switch (orderStatus) {
    case OrderStatus.PaymentSuccessful:
      orderStatusLabelText = "در انتظار تایید";
      break;
    case OrderStatus.Accepted:
      orderStatusLabelText = "در حال آماده سازی";
      break;
    case OrderStatus.Delivering:
      orderStatusLabelText = "ارسال شده";
      break;
    case OrderStatus.Delivered:
      orderStatusLabelText = "تکمیل شده";
      break;
    case OrderStatus.Canceled:
      orderStatusLabelText = "باطل شده";
      break;
    case OrderStatus.PaymentFailure:
      orderStatusLabelText = "خطای پرداخت";
      break;
    default:
      orderStatusLabelText = "وضعیت نامشخص";
      break;
  }

  return (
    <span
      className={
        "inline-block rounded-full px-[12px] py-[6px] font-bold text-[10px] md:text-[12px]" +
        " " +
        orderStatusClassName
      }
    >
      {orderStatusLabelText}
    </span>
  );
};

export default OrderHistoryCard;
