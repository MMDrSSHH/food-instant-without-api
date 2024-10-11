"use client";

import OrderAddressCard from "@/components/card/OrderAddressCard";
import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
// import NewOrderAddressPopup from "@/components/new-order-address/NewOrderAddressPopup";
const CheckoutNewAddressPopup = dynamic(
  () => import("@/components/checkout-new-address/CheckoutNewAddressPopup"),
  { ssr: false }
);
import SubmitOrderButton from "@/components/checkout-cart/SubmitOrderButton";
import CheckoutFormCheckBox from "@/components/checkout-form/OrderFormCheckBox";
import SectionHeader from "@/components/section-header/SectionHeader";
import {
  ErrorCode,
  getApiRoute,
  OrderType,
  PaymentType,
} from "@/utils/constants";
import dynamic from "next/dynamic";
// import OrderCartCard from "@/components/order-cart/OrderCartCard";
const CheckoutCartCard = dynamic(
  () => import("@/components/checkout-cart/CheckoutCartCard"),
  { ssr: false }
);
import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { setPoints } from "@/lib/features/user/userSlice";
import { setCart } from "@/lib/features/cart/cartSlice";
import { toast } from "react-toastify";
import { array, number, object, string } from "yup";
import { flatYupValidationError } from "@/utils/flatYupValidationError";
import { getAccessToken } from "@/utils/auth";

function CheckoutPage() {
  //#region Hooks
  const [orderNote, setOrderNote] = useState("");
  const [orderType, setOrderType] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [showCreateAddress, setShowCreateAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(null);
  const cart = useAppSelector((state) => state.cart);
  const points = useAppSelector((state) => state.user.points);
  const [discountPrice, setDiscountPrice] = useState(0);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [paymentPrice, setPaymentPrice] = useState(0);
  const orderSubmitionToastId = useRef(null);
  //#endregion

  //#region Methods
  const getAddresses = async () => {
    try {
      await getAccessToken();

      const res = await fetch(`${getApiRoute()}/addresses/per-user`, {
        cache: "no-store",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
      }
    } catch (error) {
      toast.error("خطا در دریافت آدرس ‌ها رخ داده!");
      // error
    }
  };

  const submitOrderError = (data) => {
    if (data.errorCode === ErrorCode.RequiredData) {
      if (Array.isArray(data.value)) {
        data.value.forEach((i) => {
          if (i.toLowerCase() === "address") {
            toast.error("لطفا آدرس خود را تعیین کنید.");
          }
        });
      }
    }
    // toast.error();
  };

  const orderValidation = async (order) => {
    const orderSchema = object({
      items: array().min(1).required(),
      note: string().min(3).max(200).nullable(),
      orderType: number().required("لطفا نوع تحویل سفارش خود را تعیین کنید."),
      paymentType: number().required(
        "لطفا نوع پرداخت سفارش خود را تعیین کنید."
      ),
      addressId:
        order.orderType === OrderType.Delivery
          ? string().required("لطفا آدرس خود را تعیین کنید.")
          : string().nullable(),
    });

    const validatedOrder = await orderSchema.validate(order, {
      abortEarly: false,
    });

    return validatedOrder;
  };

  const submitOrder = async () => {
    try {
      await getAccessToken();

      const orderBody = {
        items: cart.items,
        note: orderNote || null,
        addressId: address?.id,
        orderType,
        paymentType,
      };

      let validatedOrder;

      try {
        validatedOrder = await orderValidation(orderBody);
      } catch (err) {
        if (err.name === "ValidationError") {
          const errorObject = flatYupValidationError(err);

          // console.log(errorObject);
          for (let key in errorObject) {
            toast.error(errorObject[key]);
          }
        } else {
          //General error
        }
        return;
      }

      const headers = new Headers();

      headers.append("Content-Type", "application/json");

      orderSubmitionToastId.current = toast.loading("در حال ثبت سفارش ...");
      const res = await fetch(`${getApiRoute()}/orders/checkout`, {
        body: JSON.stringify(orderBody),
        cache: "no-store",
        credentials: "include",
        method: "POST",
        headers,
      });

      if (res.status === 201) {
      } else if (res.status === 204) {
        toast.update(orderSubmitionToastId.current, {
          render: "سفارش با موفقیت ثبت شد.",
          type: "success",
          isLoading: false,
          autoClose: null,
          closeButton: null,
        });
        getPoints();
        router.push("/orders/current");
        router.refresh();
        dispatch(
          setCart({
            items: [],
            totalPrice: 0,
            totalCount: 0,
            isSubmitted: true,
          })
        );
        // // Initialize cart state
      } else {
        const errorResponse = await res.json();
        toast.update(orderSubmitionToastId.current, {
          render: "سفارش ثبت نشد!",
          type: "error",
          isLoading: false,
          autoClose: null,
          closeButton: null,
        });
        submitOrderError(errorResponse);
      }
    } catch (error) {
      console.log(error);
      toast.update(orderSubmitionToastId.current, {
        render: "سفارش ثبت نشد!",
        type: "error",
        isLoading: false,
        autoClose: null,
        closeButton: null,
      });
    }
  };

  const getPoints = async function () {
    try {
      await getAccessToken();

      const res = await fetch(`${getApiRoute()}/orders/get-points`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();

        dispatch(setPoints(data));
      } else {
        // Error
      }
    } catch (error) {
      // Error
    }
  };
  //#endregion

  //#region Effects

  useEffect(() => {
    getAddresses();
    getPoints();

    if (cart.totalCount === 0) {
      router.push("/");
      router.refresh();
    }
  }, []);

  //#region DeliveryCost
  useEffect(() => {
    if (address && orderType === OrderType.Delivery) {
      setDeliveryCost(address.deliveryCost);
    } else {
      setDeliveryCost(0);
    }
  }, [address, orderType]);
  //#endregion

  //#region PaymentPrice
  useEffect(() => {
    setPaymentPrice(cart.totalPrice + deliveryCost - discountPrice);
  }, [cart.totalPrice, deliveryCost, discountPrice]);
  //#endregion

  //#region DiscountPrice
  useEffect(() => {
    setDiscountPrice(points);
  }, [points]);
  //#endregion

  //#endregion

  return (
    <div className="w-[90%] mx-auto mt-[60px] pb-[100px]">
      <div className="flex flex-col xl:gap-x-[20px] xl:flex-row-reverse">
        <div className="w-full">
          <CheckoutCartCard
            deliveryCost={deliveryCost}
            paymentPrice={paymentPrice}
            discountPrice={discountPrice}
            onSubmit={submitOrder}
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-y-[32px] mt-[60px] xl:mt-0">
            <SectionHeader>تحویل سفارش</SectionHeader>
            <CheckoutFormCheckBox
              checked={orderType === OrderType.Delivery}
              onChange={() => setOrderType(OrderType.Delivery)}
              name="delivery"
              label="تحویل درب منزل"
            />
            <CheckoutFormCheckBox
              checked={orderType === OrderType.TakeAway}
              onChange={() => setOrderType(OrderType.TakeAway)}
              name="takeAway"
              label="تحویل درب رستوران"
            />
          </div>
          <div className="flex flex-col gap-y-[32px] mt-[60px]">
            <SectionHeader>پرداخت</SectionHeader>
            <CheckoutFormCheckBox
              checked={paymentType === PaymentType.Online}
              onChange={() => setPaymentType(PaymentType.Online)}
              name="online"
              label="پرداخت آنلاین"
            />
            <CheckoutFormCheckBox
              checked={paymentType === PaymentType.Cash}
              onChange={() => setPaymentType(PaymentType.Cash)}
              name="cash"
              label="پرداخت حضوری"
            />
          </div>
          {orderType === OrderType.Delivery && (
            <div className="flex flex-col gap-y-[32px] mt-[60px]">
              <SectionHeader>آدرس تحویل</SectionHeader>
              {addresses?.length ? (
                <div className="flex flex-col gap-y-[12px]">
                  <button
                    className="text-primary border-2 border-primary px-[12px] py-[6px] text-[10px] rounded-[10px] self-end"
                    onClick={() => setShowCreateAddress(true)}
                  >
                    آدرس جدید
                  </button>
                  {addresses?.map((a) => (
                    <OrderAddressCard
                      address={a}
                      key={a.id}
                      selected={address}
                      onSelect={setAddress}
                    />
                  ))}
                </div>
              ) : (
                <button
                  className="w-full py-[12px] rounded-[10px] border-2 border-primary text-primary"
                  onClick={() => setShowCreateAddress(true)}
                >
                  افزودن آدرس
                </button>
              )}
            </div>
          )}
          <div className="flex flex-col gap-y-[32px] mt-[60px]">
            <SectionHeader>تخفیف</SectionHeader>
            <Input
              label="کد تخفیف"
              value={discountCode}
              onChange={setDiscountCode}
              placeholder="کد تخفیف خود را وارد کنید..."
            >
              <button className="text-[12px] w-full py-[6px] px-[12px] border-2 border-primary text-primary rounded-[10px] text-nowrap">
                اعمال کد تخفیف
              </button>
            </Input>
          </div>
        </div>
        <SubmitOrderButton onSubmit={submitOrder} />
        <CheckoutNewAddressPopup
          open={showCreateAddress}
          onClose={() => setShowCreateAddress(false)}
          onSubmit={getAddresses}
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
