import React from "react";
import { getStaticRoute } from "@/utils/constants";
import FetchSvg from "../fetch-svg/FetchSvg";

function MenuCategoryItem({ category }) {
  const CatClickHandler = () => {
    const catElem = document.getElementById(
      `${category?.id}-${category?.name}`
    );

    catElem.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <button
      className="bg-primary text-onPrimary flex items-center justify-center rounded-full w-full h-[60px] gap-[12px]"
      onClick={CatClickHandler}
    >
      {/* <FetchSvg
        url={`${getStaticRoute()}\\${category?.icon}`}
        className="fill-onPrimary w-[44px]"
      /> */}
      <span className="text-[18px]">{category?.name}</span>
    </button>
  );
}

export default MenuCategoryItem;
