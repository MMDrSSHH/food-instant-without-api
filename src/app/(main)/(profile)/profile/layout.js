"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Children } from "react";

function ProfileLayout({ children }) {
  const pathName = usePathname();
  return (
    <>
      <div className="w-[90%] mx-auto mt-[40px]">
        <div className="flex border-b border-gray">
          <Link
            href="/profile"
            className={`text-gray text-[14px] px-[12px] py-[6px] transition-all rounded-t-[12px] ${
              pathName === "/profile" ? "bg-secondary font-bold" : "bg-transparent"
            }`}
          >
            جزییات حساب
          </Link>
          <Link
            href="/profile/addresses"
            className={`text-gray text-[14px] px-[12px] py-[6px] transition-all rounded-t-[12px] ${
              pathName === "/profile/addresses"
                ? "bg-secondary font-bold"
                : "bg-transparent"
            }`}
          >
            آدرس‌ها
          </Link>
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-[80px]">{children}</div>
    </>
  );
}

export default ProfileLayout;
