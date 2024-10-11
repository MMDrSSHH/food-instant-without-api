"use client";

import Input from "@/components/inputs/Input";
import SectionHeader from "@/components/section-header/SectionHeader";
import { getApiRoute } from "@/utils/constants";
import { setUser } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  // const submit = async (e) => {
  //   e.preventDefault();

  //   setIsPending(true);
  //   try {
  //     const headers = new Headers();

  //     headers.append("Content-Type", "application/json");

  //     const res = await fetch(`${getApiRoute()}/auth/login`, {
  //       method: "POST",
  //       headers,
  //       credentials: "include",
  //       body: JSON.stringify({
  //         username,
  //         password,
  //         phoneNumber,
  //       }),
  //     });

  //     if (res.status === 200) {
  //       const data = await res.json();

  //       if (data.isLoggedin) {
  //         dispatch(setUser({ ...data.body }));
  //         if (searchParams.has("returnUrl"))
  //           // Navigate to returnUrl
  //           router.replace(searchParams.get("returnUrl"));
  //         else router.replace("/");
  //       } else {
  //         localStorage.setItem("phoneNumber", phoneNumber);
  //         localStorage.setItem("otpExpiresAt", data.body);
  //         // Navigate to verify page
  //         if (searchParams.has("returnUrl"))
  //           router.replace(
  //             `/verify?returnUrl=${searchParams.get("returnUrl")}`
  //           );
  //         else router.replace("/verify");
  //       }
  //     } else {
  //       toast.error("خطایی رخ داده!");
  //     }
  //   } catch (error) {
  //     toast.error("خطایی رخ داده!");
  //   }

  //   setIsPending(false);
  // };

  const submit = (e) => {
    e.preventDefault();

    if (phoneNumber) {
      const id = toast.loading("درحال پردازش ...");
      setTimeout(() => {
        toast.update(id, {
          render: "کد احراز هویت شما: 123456",
          type: "success",
          isLoading: false,
          autoClose: null,
          closeButton: null,
        });

        if (searchParams.has("returnUrl"))
          router.replace(`/verify?returnUrl=${searchParams.get("returnUrl")}`);
        else router.replace("/verify");
      }, 2000);
    }
  };

  return (
    <>
      {/* Mobile */}
      <div className="w-[90%] mx-auto h-screen pt-[90px] lg:hidden">
        <h2 className="text-[24px] text-gray font-bold">
          به هپی‌فود خوش آمدید
        </h2>
        <form onSubmit={submit}>
          <div className="mt-[90px]">
            <SectionHeader>ورود با نام‌ کاربری و رمز عبور</SectionHeader>
            <div className="mt-[50px] flex flex-col gap-[20px]">
              <Input
                value={username}
                onChange={setUsername}
                placeholder="نام کاربری خود را وارد کنید ..."
                label="نام کاربری"
              />
              <Input
                value={password}
                onChange={setPassword}
                placeholder="رمز عبور خود را وارد کنید ..."
                label="رمز عبور"
                password
                showEyeToggle
              />
            </div>
          </div>
          <div className="mt-[90px]">
            <SectionHeader>ورود با شماره همراه</SectionHeader>
            <div className="mt-[50px] flex flex-col gap-[20px]">
              <Input
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="شماره همراه خود را وارد کنید ..."
                label="شماره همراه"
              />
            </div>
          </div>

          <div className="fixed bg-white w-full right-0 left-0 bottom-0 text-center h-[70px] flex items-center justify-center">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-[10px] bg-primary w-[90%] text-[18px] text-onPrimary h-[50px]"
            >
              وارد شوید
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
                <SectionHeader>ورود با نام‌ کاربری و رمز عبور</SectionHeader>
                <div className="mt-[50px] flex flex-col gap-[20px]">
                  <Input
                    value={username}
                    onChange={setUsername}
                    placeholder="نام کاربری خود را وارد کنید ..."
                    label="نام کاربری"
                  />
                  <Input
                    value={password}
                    onChange={setPassword}
                    placeholder="رمز عبور خود را وارد کنید ..."
                    label="رمز عبور"
                    password
                    showEyeToggle
                  />
                </div>
              </div>
              <div className="mt-[90px]">
                <SectionHeader>ورود با شماره همراه</SectionHeader>
                <div className="mt-[50px] flex flex-col gap-[20px]">
                  <Input
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    placeholder="شماره همراه خود را وارد کنید ..."
                    label="شماره همراه"
                  />
                </div>
              </div>

              <div className="text-center mb-[40px]">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-[10px] mt-[80px] mx-auto bg-primary w-full text-[18px] text-onPrimary h-[50px]"
                >
                  وارد شوید
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full h-full relative">
          <Image
            src="assets/images/computer-login.svg"
            alt="computer login"
            fill
            priority
          />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
