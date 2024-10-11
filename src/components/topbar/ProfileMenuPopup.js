"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext } from "react";
import UserProfileIcon from "../svgs/UserProfileIcon";
import ClockIcon from "../svgs/ClockIcon";
import IndexingPageIcon from "../svgs/IndexingPageIcon";
import ExitIcon from "../svgs/ExitIcon";
import { getApiRoute } from "@/utils/constants";
import { useAppSelector } from "@/lib/hooks";
import { formatCurrency } from "@/utils/formatters";

const menuContext = createContext();

function ProfileMenuPopup({ show, onClose }) {
  // const points = useAppSelector((state) => state.user.points);
  const points = 275000;

  return (
    <menuContext.Provider value={{ showMenu: show, closeMenu: onClose }}>
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              key="menu"
              className={`bg-white w-[240px] md:w-[300px] px-[16px] pt-[16px] pb-[8px] absolute top-full left-0 mt-[12px] z-50 rounded-[6px] ${show}`}
            >
              <div className="divide-y divide-gray/20 divide">
                <div className="pb-[6px] flex justify-between">
                  <span className="text-gray text-[12px]">اعتبار حساب</span>
                  <span className="text-primary text-[12px] font-bold">
                    {formatCurrency(points)} ریال
                  </span>
                </div>
                <div className="py-[6px]">
                  <MenuItem
                    href="/profile"
                    name="جزییات حساب"
                    icon={<UserProfileIcon className="fill-inherit" />}
                  />
                  <MenuItem
                    href="/orders/current"
                    name="سفارش جاری"
                    icon={<ClockIcon className="fill-inherit" />}
                  />
                  <MenuItem
                    href="/orders"
                    name="تاریخچه سفارشات"
                    icon={<IndexingPageIcon className="fill-inherit" />}
                  />
                </div>
                <div className="py-[6px]">
                  <MenuItem
                    name="خروج از حساب"
                    icon={<ExitIcon className="fill-inherit" />}
                    isExit
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-[4px] z-40"
            />
          </>
        )}
      </AnimatePresence>
    </menuContext.Provider>
  );
}

function MenuItem({ name, icon, href = "", isExit = false }) {
  const { closeMenu } = useContext(menuContext);
  const logout = () => {
    try {
      // const res = await fetch(`${getApiRoute()}/auth/logout`, {
      //   credentials: "include",
      //   cache: "no-store",
      // });

      document.cookie =
        "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // if (res.ok) {
      window.location.reload();
      // } else {
      //   // Error
      // }
      closeMenu();
    } catch (error) {
      // error
    }
  };
  return (
    <>
      {!isExit ? (
        <Link
          href={href}
          onClick={closeMenu}
          className={`flex items-center justify-between px-[4px] h-[36px] transition-all rounded-[4px] group ${
            isExit ? "hover:bg-red-500" : "hover:bg-primary"
          }`}
        >
          <span
            className={`text-[14px] text-gray transition-all ${
              isExit ? "group-hover:text-white" : "group-hover:text-onPrimary"
            }`}
          >
            {name}
          </span>
          <span
            className={`w-[18px] fill-gray transition-all ${
              isExit ? "group-hover:fill-white" : "group-hover:fill-onPrimary"
            }`}
          >
            {icon}
          </span>
        </Link>
      ) : (
        <button
          onClick={logout}
          className={`flex w-full items-center justify-between px-[4px] h-[36px] transition-all rounded-[4px] group 
            hover:bg-red-500
          `}
        >
          <span
            className={`text-[14px] text-gray transition-all group-hover:text-white`}
          >
            {name}
          </span>
          <span
            className={`w-[18px] fill-gray transition-all group-hover:fill-white`}
          >
            {icon}
          </span>
        </button>
      )}
    </>
  );
}

export default ProfileMenuPopup;
