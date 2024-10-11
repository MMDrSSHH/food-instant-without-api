"use client";

import SectionHeader from "@/components/section-header/SectionHeader";
import { ErrorCode, getApiRoute } from "@/utils/constants";
import { setUser } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
// import OTPVerificationTimerBtn from ;
const OTPVerificationTimerBtn = dynamic(
  () => import("@/components/otpVerificationTimerBtn/OTPVerificationTimerBtn"),
  { ssr: false }
);
import momentJalaali from "moment-jalaali";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { string } from "yup";
import { flatYupValidationError } from "@/utils/flatYupValidationError";

function Verify() {
  //#region Hooks
  const [otp, setOtp] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [expiresAt, setExpiresAt] = useState(null);
  //#endregion

  //#region  Methods

  const verifyErrorHandler = (error) => {
    if (error.errorCode === ErrorCode.Expired) {
      toast.error("کد تایید منقضی شده.");
    } else {
      toast.error("کد تایید معتبر نمی‌باشد!");
    }
  };

  const otpValidation = async (otp) => {
    const otpSchema = string()
      .required("لطفا کد تایید خود را وارد کنید!")
      .matches(/^[0-9]{6}$/, { message: "لطفا کد تایید معتبر وارد کنید!" });

    await otpSchema.validate(otp);
  };

  const submit = async (e) => {
    e.preventDefault();

    let toastId = null;
    try {
      try {
        await otpValidation(otp);
      } catch (error) {
        toast.error(error.errors[0]);
        return;
      }

      setIsPending(true);
      toastId = toast.loading("در حال بررسی کد تایید ...");
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const phoneNumber = localStorage.getItem("phoneNumber");

      const res = await fetch(`${getApiRoute()}/auth/verify-otp`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          otp,
          phoneNumber,
        }),
      });

      if (res.status === 200) {
        const user = await res.json();
        dispatch(setUser({ ...user }));
        toast.update(toastId, {
          render: `خوش آمدید ${user.fullName ?? ""}`,
          type: "success",
          autoClose: null,
          closeButton: null,
          isLoading: false,
        });
        if (searchParams.has("returnUrl"))
          router.replace(searchParams.get("returnUrl"));
        else router.replace("/");
        // Navigate to returnUrl
      } else {
        const errorData = await res.json();
        toast.dismiss(toastId);

        verifyErrorHandler(errorData);
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.log(error.message);
    }

    setIsPending(false);
  };

  const resend = async () => {
    let toastId = null;
    try {
      const phoneNumber = localStorage.getItem("phoneNumber");

      if (!phoneNumber) {
        toast.error("شماره همراه یافت نشد. لطفا دوباره وارد شوید.");
      }

      toastId = toast.loading("در حال بازارسالی کد تایید ...");
      const res = await fetch(
        `${getApiRoute()}/auth/resend-otp?phoneNumber=${phoneNumber}`,
        {
          method: "POST",
        }
      );

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("otpExpiresAt", data);
        setExpiresAt(new Date(data));
        toast.update(toastId, {
          render: "کد تایید ارسال شد.",
          type: "success",
          autoClose: null,
          isLoading: false,
          closeButton: null,
        });
      } else {
        toast.update(toastId, {
          render: "خطایی رخ داده!",
          type: "error",
          autoClose: null,
          isLoading: false,
          closeButton: null,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "خطایی رخ داده!",
        type: "error",
        autoClose: null,
        isLoading: false,
        closeButton: null,
      });
    }
  };
  //#endregion

  //#region Effects
  useEffect(() => {
    setExpiresAt(new Date(localStorage.getItem("otpExpiresAt")));
  }, []);
  //#endregion

  return (
    <>
      <div className="w-[90%] mx-auto h-screen pt-[90px] lg:hidden">
        <h2 className="text-[24px] text-gray font-bold">
          به هپی‌فود خوش آمدید
        </h2>
        <form onSubmit={submit}>
          <div className="mt-[90px]">
            <SectionHeader>احراز هویت</SectionHeader>
            <div className="mt-[50px] flex flex-col gap-[20px]">
              <div className="flex items-center gap-[12px]">
                <span className="text-[18px] text-gray">
                  کد ارسال شده را وارد کنید.
                </span>
                <OTPVerificationTimerBtn
                  expiresAt={expiresAt}
                  onResend={resend}
                />
              </div>
              <div dir="ltr" className="mt-[24px]">
                <OTPInput
                  skipDefaultStyles={false}
                  containerStyle="w-full justify-between"
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="block !w-[46px] aspect-square pb-[10px] border-b-2 border-primary text-gray outline-none !text-[32px] font-medium"
                    />
                  )}
                />
              </div>

              <div className="w-full aspect-square relative">
                <Image
                  src="assets/images/verify-otp.svg"
                  alt="verify-otp"
                  fill
                  priority
                />
              </div>
            </div>
          </div>

          <div className="fixed bg-white w-full right-0 left-0 bottom-0 text-center h-[70px] flex items-center justify-center">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-[10px] bg-primary w-[90%] text-[18px] text-onPrimary h-[50px]"
            >
              تایید
            </button>
          </div>
        </form>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex gap-[200px] h-screen w-screen">
        <div className="w-full h-full relative overflow-auto">
          <div className="w-[80%] mx-auto pt-[90px]">
            <h2 className="text-[24px] text-gray font-bold">
              به هپی‌فود خوش آمدید
            </h2>
            <form onSubmit={submit}>
              <div className="mt-[90px]">
                <SectionHeader>احراز هویت</SectionHeader>
                <div className="mt-[50px] flex flex-col gap-[20px]">
                  <div className="flex items-center gap-[12px]">
                    <span className="text-[18px] text-gray">
                      کد ارسال شده را وارد کنید.
                    </span>
                    <OTPVerificationTimerBtn
                      expiresAt={expiresAt}
                      onResend={resend}
                    />
                  </div>

                  <div dir="ltr" className="mt-[24px]">
                    <OTPInput
                      skipDefaultStyles={false}
                      containerStyle="w-full justify-between"
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderInput={(props) => (
                        <input
                          {...props}
                          className="block !w-[46px] aspect-square pb-[10px] border-b-2 border-primary text-gray outline-none !text-[32px] font-medium"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="text-center mb-[40px]">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-[10px] mt-[80px] mx-auto bg-primary w-full text-[18px] text-onPrimary h-[50px]"
                >
                  تایید
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full h-full relative">
          <Image
            src="assets/images/verify-otp.svg"
            alt="verify-otp"
            fill
            priority
          />
        </div>
      </div>
    </>
  );
}

export default Verify;
