import InfoItem from "@/components/infoItem/InfoItem";
import CurrentOrderTimer from "@/components/current-order-timer/CurrentOrderTimer";
import OrderProgressIndicator from "@/components/order-progress-indicator/OrderProgressIndicator";
import SectionHeader from "@/components/section-header/SectionHeader";
import {
  getApiRoute,
  OrderStatus,
  OrderType,
  PaymentType,
} from "@/utils/constants";
import { formatCurrency } from "@/utils/formatters";
import React from "react";
import momentJalaali from "moment-jalaali";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import CurrentOrderItemCard from "@/components/card/CurrentOrderItemCard";

async function CurrentOrderPage() {
  const cookieHeader = cookies().toString();

  const currentOrderRes = await fetch(`${getApiRoute()}/orders/current`, {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader,
    },
  });

  let currentOrder = null;
  if (currentOrderRes.status === 200) {
    currentOrder = await currentOrderRes.json();
    currentOrder.createdAt = momentJalaali(currentOrder.createdAt);
  }

  return (
    <div className="w-[90%] mx-auto pb-[60px]">
      {currentOrder ? (
        <>
          {/* Order Status Section */}
          <div className="mt-[80px]">
            <SectionHeader>وضعیت سفارش</SectionHeader>
            <OrderProgressIndicator orderStatus={currentOrder.orderStatus} />
            {[OrderStatus.Accepted, OrderStatus.Delivering].includes(
              currentOrder.orderStatus
            ) && <CurrentOrderTimer />}
          </div>

          {/* Order Details */}
          <div className="mt-[60px]">
            <SectionHeader>اطلاعات سفارش</SectionHeader>
            <div className="grid grid-cols-2 gap-[20px] mt-[40px]">
              <InfoItem name="شماره سفارش :" value={currentOrder.orderNo} />
              <InfoItem
                name="نحوه پرداخت :"
                value={
                  currentOrder.paymentType === PaymentType.Online
                    ? "آنلاین"
                    : "حضوری"
                }
              />
              <InfoItem
                name="تاریخ :"
                value={currentOrder.createdAt.format("jYYYY/jMM/jDD")}
              />
              <InfoItem
                name="ساعت :"
                value={currentOrder.createdAt.format("HH:mm")}
              />
              <InfoItem
                name="هزینه سفارش :"
                value={`${formatCurrency(currentOrder.totalPrice)} ریال`}
              />
              <InfoItem
                name="هزینه ارسال :"
                value={`${formatCurrency(
                  currentOrder.address?.deliveryCost ?? 0
                )} ریال`}
              />
              <InfoItem name="تخفیف :" value={currentOrder.discountText} />
              <InfoItem
                name="میزان تخفیف :"
                value={`${formatCurrency(currentOrder.discountPrice)} ریال`}
              />
              <InfoItem
                name="اعتبار دریافتی :"
                value={`${formatCurrency(currentOrder.pointPrice)} ریال`}
                fullWidth
              />
            </div>
          </div>

          {/* Customer Details */}
          <div className="mt-[60px]">
            <SectionHeader>اطلاعات کاربر</SectionHeader>
            <div className="grid grid-cols-2 gap-[20px] mt-[40px]">
              <InfoItem
                name="نام :"
                value={currentOrder.user.fullName || "تعیین نشده"}
              />
              <InfoItem
                name="شماره تماس :"
                value={currentOrder.user.phoneNumber}
              />
              {currentOrder.note && (
                <InfoItem
                  name="یادداشت سفارش :"
                  value={currentOrder.note}
                  fullWidth
                  vertical
                />
              )}
            </div>
          </div>

          {/* Delivery Details */}
          <div className="mt-[60px]">
            <SectionHeader>تحویل سفارش</SectionHeader>
            <div className="grid grid-cols-2 gap-[20px] mt-[40px]">
              <InfoItem
                name="نوع تحویل :"
                value={
                  currentOrder.orderType === OrderType.Delivery
                    ? "درب منزل"
                    : "درب رستوران"
                }
              />
              {currentOrder.orderType === OrderType.Delivery ? (
                <>
                  <InfoItem
                    name="ناحیه :"
                    value={currentOrder.address?.zoneTitle}
                  />
                  <InfoItem
                    name="آدرس تحویل :"
                    value={currentOrder.address?.addressText}
                    fullWidth
                    vertical
                  />
                </>
              ) : (
                <>
                  <InfoItem
                    name="رستوران :"
                    value={currentOrder.address?.zoneTitle}
                  />
                  <InfoItem
                    name="آدرس رستوران :"
                    value="شهرک پرواز، میدان سرو، پلاک 107 "
                    fullWidth
                    vertical
                  />
                </>
              )}
            </div>
          </div>

          {/* Items Section */}
          <div className="mt-[60px]">
            <SectionHeader>اقلام سفارش</SectionHeader>
            <div className="flex flex-col gap-[20px] mt-[40px]">
              {currentOrder.orderItems.map((item) => (
                <CurrentOrderItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mt-[60px]">
          <div className="h-[300px] lg:h-[500px] relative">
            <Image
              fill
              src={"/assets/images/questions.svg"}
              alt="questions"
              priority
            />
          </div>
          <div className="mt-[24px] text-gray flex flex-col items-center gap-[12px]">
            <p className="text-[36px] font-bold">سفارش جاری ندارید!</p>
            <Link href="/" className="underline">
              بازگشت به منو
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentOrderPage;
