import React from "react";

function SectionHeader({ children }) {
  return (
    <div className="flex justify-center items-center relative">
      <span className="text-[14px] text-gray bg-white z-10 px-[12px]">{children}</span>
      <div className="w-full h-[3px] bg-gray absolute right-0 left-0 top-1/2" />
    </div>
  );
}

export default SectionHeader;
