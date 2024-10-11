"use client";

import Input from "@/components/inputs/Input";
import SectionHeader from "@/components/section-header/SectionHeader";
import { setUser } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getAccessToken } from "@/utils/auth";
import { getApiRoute } from "@/utils/constants";
import React, { useEffect, useState } from "react";

function ProfilePage() {
  //#region States
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hasPassword, setHasPassword] = useState(false);

  const dispatch = useAppDispatch();
  //#endregion

  //#region functions
  const fetchUserDetails = async () => {
    try {
      await getAccessToken();

      const res = await fetch(`${getApiRoute()}/auth/get-user-details`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();

        setFullName(data.fullName || "");
        setPhoneNumber(data.phoneNumber || "");
        setUserName(data.userName || "");
        setHasPassword(data.hasPassword);

        const userAuthData = {
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
        };
        dispatch(setUser({ ...userAuthData }));
      } else {
        // error
      }
    } catch (error) {
      // error
    }
  };

  const updateUserDetails = async () => {
    try {
      const data = {
        fullName,
        phoneNumber,
        userName,
      };

      await getAccessToken();

      const res = await fetch(`${getApiRoute()}/auth`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        fetchUserDetails();
      } else {
        // error
      }
    } catch (error) {
      // error
    }
  };

  //#endregion

  //#region Effects
  useEffect(() => {
    fetchUserDetails();
  }, []);
  //#endregion

  return (
    <div>
      {/* User details section */}
      <div>
        <SectionHeader>اطلاعات کاربری</SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[32px] mt-[40px]">
          <Input
            label="نام و نام خانوادگی"
            placeholder="نام و نام خانوادگی خود را وارد کنید..."
            value={fullName}
            onChange={setFullName}
          />
          <Input
            label="شماره همراه"
            placeholder="شماره همراه خود را وارد کنید..."
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
        </div>
        <div className="text-left">
          <button
            className="bg-primary w-full py-[8px] text-onPrimary rounded-[10px] mt-[28px] md:w-fit md:px-[12px]"
            onClick={updateUserDetails}
          >
            ویرایش
          </button>
        </div>
      </div>

      {/* User accounts details section */}
      <div className="mt-[40px] md:mt-[18px]">
        <SectionHeader>اطلاعات حساب</SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[32px] mt-[40px]">
          <Input
            label="نام کاربری"
            placeholder="نام کاربری خود را وارد کنید..."
            value={userName}
            onChange={setUserName}
          />
          <div className="hidden md:block" />
          <Input
            label="رمز عبور"
            placeholder="رمز عبور خود را وارد کنید..."
            value={password}
            onChange={setPassword}
            password
            showEyeToggle
          />
          <Input
            label="تکرار رمز عبور"
            placeholder="رمز عبور خود را وارد کنید..."
            value={confirmPassword}
            onChange={setConfirmPassword}
            password
            showEyeToggle
          />
        </div>
        <div className="text-left">
          <button className="bg-primary w-full py-[8px] text-onPrimary rounded-[10px] mt-[28px] md:w-fit md:px-[12px]">
            ویرایش
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
