import React from "react";

function InfoItem({ name, value, vertical = false, fullWidth = false }) {
  return (
    <div
      className={`flex ${
        vertical ? "flex-col gap-[12px]" : "justify-between items-center"
      } text-gray ${fullWidth ? "col-span-full" : "col-span-1"}`}
    >
      <span className="text-[10px] md:text-[14px]">{name}</span>
      <span className="text-[12px] font-bold md:text-[16px]">{value}</span>
    </div>
  );
}

export default InfoItem;
