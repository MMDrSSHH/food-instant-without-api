import React from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import dynamic from "next/dynamic";
import Link from "next/link";
// import Profile from "./Profile";
const Profile = dynamic(() => import("./Profile"), { ssr: false });

function MenuTopbar() {
  return (
    <nav className="flex items-center justify-between mt-[14px]">
      <Link href="/" className="flex items-center gap-[8px]">
        <div>
          <Image
            alt="Logo"
            src={"/assets/icons/Logo.svg"}
            className="w-[45px] h-[45px] lg:w-[80px] lg:h-[80px]"
            width={100}
            height={100}
          />
        </div>
        <h1 className="font-extrabold text-primary text-lg lg:text-[32px]">
          هپی فود
        </h1>
      </Link>
      <div className="flex items-center gap-[16px]">
        {/* <ThemeToggle /> */}
        <Profile />
      </div>
    </nav>
  );
}

export default MenuTopbar;
