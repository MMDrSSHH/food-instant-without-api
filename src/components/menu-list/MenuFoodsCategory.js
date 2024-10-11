import React from "react";

function MenuFoodsCategory({ category, icon }) {
  return (
    <div
      className="flex items-center gap-[12px] mb-[48px] h-[55px]"
      id={`${category?.id}-${category?.name}`}
    >
      {/* <FetchSvg
        url={`${getStaticRoute()}\\${category?.icon}`}
        className="w-[50px] fill-primary"
      /> */}
      {/* <span className="w-[50px] fill-primary">{icon}</span> */}
      <h4 className="text-[26px] text-gray">{category?.name}</h4>
    </div>
  );
}

export default MenuFoodsCategory;
