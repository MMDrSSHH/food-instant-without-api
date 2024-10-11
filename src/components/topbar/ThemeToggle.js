"use client";
import React from "react";
// import SunFill from "../../assets/icons/SunFill.svg";
// import MoonFill from "../../assets/icons/MoonFill.svg";
import Image from "next/image";

function ThemeToggle() {
  return (
    <button>
      <Image src={"/assets/icons/MoonFill.svg"} alt="theme-icon-toggler" width={32} height={32} />
    </button>
  );
}

export default ThemeToggle;
