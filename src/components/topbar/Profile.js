"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CaretDownIcon from "../svgs/CaretDownIcon";
import ProfileMenuPopup from "./ProfileMenuPopup";
import { setPoints, setUser } from "@/lib/features/user/userSlice";
import { getAccessToken } from "@/utils/auth";
import { getApiRoute } from "@/utils/constants";

const getCookie = (cookieName) => {
  // Access all cookies
  const cookies = document.cookie
    .split("; ") // Split cookies by '; '
    .map((cookie) => cookie.split("=")); // Split each cookie into [name, value] pairs

  // Find the cookie with the specified name
  const foundCookie = cookies.find(([name]) => name === cookieName);

  // Return the cookie value or undefined if not found
  return foundCookie ? decodeURIComponent(foundCookie[1]) : undefined;
};

function Profile() {
  // const authData = useAppSelector((state) => state.user);
  const isLoggedIn = getCookie("isLoggedIn");

  const authData = {
    isAuthenticated: !!isLoggedIn,
    user: { fullName: "کاربر گرامی", phoneNumber: "09011111111" },
  };
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState(false);

  // const getUser = async function () {
  //   try {
  //     await getAccessToken();

  //     const res = await fetch(`${getApiRoute()}/auth/get-user`, {
  //       credentials: "include",
  //     });

  //     if (res.ok) {
  //       // set user here
  //       const user = await res.json();

  //       dispatch(setUser({ ...user }));
  //     } else {
  //       dispatch(removeUser());
  //       // containing error
  //     }
  //   } catch (error) {
  //     // error
  //   }
  // };
  // const getPoints = async function () {
  //   try {
  //     await getAccessToken();

  //     const res = await fetch(`${getApiRoute()}/orders/get-points`, {
  //       credentials: "include",
  //     });

  //     if (res.ok) {
  //       const data = await res.json();

  //       dispatch(setPoints(data));
  //     } else {
  //       // Error
  //     }
  //   } catch (error) {
  //     // Error
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  //   getPoints();
  // }, []);

  return (
    <div>
      {!authData?.isAuthenticated ? (
        <Link
          href="/login"
          className="px-[12px] py-[6px] border-2 bg-transparent border-primary rounded-[10px] text-primary text-[14px] lg:text-[18px]"
        >
          ثبت‌نام / ورود
        </Link>
      ) : (
        <div className="relative">
          <div
            onClick={() => setShowMenu((prev) => !prev)}
            className={`relative cursor-pointer select-none flex items-center gap-[10px] ${
              showMenu ? "z-50" : ""
            }`}
          >
            <span>
              <CaretDownIcon
                className={`${showMenu ? "fill-white" : "fill-gray"} w-[12px]`}
              />
            </span>
            <span
              className={`text-[14px] lg:text-[18px] text-ellipsis ${
                showMenu ? "text-white" : "text-gray"
              }`}
            >
              {authData?.user?.fullName || authData?.user?.phoneNumber}
            </span>
          </div>
          <ProfileMenuPopup
            show={showMenu}
            onClose={() => setShowMenu(false)}
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
