"use client";

import React from "react";
import TimeLapseIcon from "../svgs/TimeLapseIcon";

function CurrentOrderTimer({ time }) {
  return (
    <div className="mt-[24px] md:mt-[70px] flex justify-center items-center gap-[12px]">
      <span>
        <TimeLapseIcon className="w-[28px] md:w-[36px] fill-gray" />
      </span>
      <span className="text-gray text-[18px] md:text-[24px] font-bold">
        56:04
      </span>
    </div>
  );
}

export default CurrentOrderTimer;
