"use client";

import Image from "next/image";
import React, { useState } from "react";
import Accordion from "../accordion/Accordion";

function MenuFilter() {
  const [showSearch, setShowSearch] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  return (
    <>
      <div className="flex items-center gap-[24px] mt-[60px] h-[38px]">
        <div className="flex w-full items-center gap-[12px]">
          <Image
            src={"/assets/icons/SearchIcon.svg"}
            alt="search food"
            className="cursor-pointer"
            width={35}
            height={100}
            onClick={() => setShowSearch((prev) => !prev)}
          />
          <input
            placeholder="جست‌وجوی غذا ..."
            className={`bg-secondary px-[8px] py-[8px] w-full placeholder:text-gray text-gray rounded-[8px] ${
              showSearch ? "block" : "hidden"
            } max-w-[300px]`}
          />
        </div>
        <Image
          onClick={() => setShowFilterMenu((prev) => !prev)}
          className="cursor-pointer"
          src={"/assets/icons/FilterIcon.svg"}
          alt="filter food"
          width={35}
          height={100}
        />
      </div>
      <div className="mt-[12px]">
        <Accordion open={showFilterMenu}>
          <div className="py-[12px]">{/* Menu filter goes here */}</div>
        </Accordion>
      </div>
    </>
  );
}

export default MenuFilter;
