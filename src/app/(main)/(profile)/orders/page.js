"use client";

import OrderHistoryCard from "@/components/card/OrderHistoryCard";
import { getAccessToken } from "@/utils/auth";
import { getApiRoute } from "@/utils/constants";
import { formatCurrency } from "@/utils/formatters";
import React, { useEffect, useState } from "react";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(null);

  // const fetchOrders = async () => {
  //   try {
  //     await getAccessToken();
  //     const res = await fetch(`${getApiRoute()}/orders/get-order-history`, {
  //       credentials: "include",
  //     });

  //     if (res.ok) {
  //       const data = await res.json();

  //       console.log(data);
  //       setOrders(data);
  //     }
  //   } catch (error) {
  //     // Error
  //   }
  // };

  // const fetchTotal = async () => {
  //   try {
  //     await getAccessToken();
  //     const res = await fetch(`${getApiRoute()}/orders/order-history-total`, {
  //       credentials: "include",
  //     });

  //     if (res.ok) {
  //       const data = await res.json();

  //       console.log(data);
  //       setTotal(data);
  //     }
  //   } catch (error) {
  //     // Error
  //   }
  // };

  // //#region Effects

  // useEffect(() => {
  //   fetchOrders();
  //   fetchTotal();
  // }, []);

  // //#endregion

  return (
    <div className="w-[90%] mx-auto mt-[60px] pb-[60px]">
      {/* Total Report Section */}
      <div className="grid gap-[20px] grid-cols-2">
        {/* total price */}
        <div className="col-start-1 col-span-2 row-start-1 row-span-1 md:col-span-1">
          <TotalItemCard
            title="مبلغ کل سفارشات"
            value={total?.totalPrice ?? 0}
          />
        </div>
        {/* total discount */}
        <div className="col-start-1 col-span-2 row-start-2 row-span-1 md:col-span-1">
          <TotalItemCard
            title="مبلغ کل تخفیفات"
            value={total?.totalDiscount ?? 0}
          />
        </div>
        {/* total payment */}
        <div className="col-start-1 col-span-2 row-start-3 row-span-1 md:col-start-2 md:row-start-1 md:row-span-2 md:col-span-1">
          <TotalItemCard
            title="مبلغ کل پرداهتی‌ها"
            value={total?.totalPayment ?? 0}
          />
        </div>
      </div>

      {/* Order History List Cards */}
      <div className="flex flex-col gap-[20px] mt-[40px]">
        {orders?.map((order) => (
          <OrderHistoryCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

const TotalItemCard = ({ icon, title, value }) => {
  return (
    <div className="flex flex-col gap-[16px] justify-center items-center bg-gray w-full h-full px-[12px] py-[24px] rounded-[10px]">
      <div className="flex gap-[6px]">
        {/* <div>Icon</div> */}
        <span className="font-bold text-[12px] text-zinc-200">{title}</span>
      </div>
      <span className="font-bold text-zinc-200 text-[16px]">
        {formatCurrency(value ?? 0)}
        <sup className="text-[10px] font-normal mr-[4px]">ریال</sup>
      </span>
    </div>
  );
};

export default OrdersPage;
