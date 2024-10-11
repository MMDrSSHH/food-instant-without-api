"use client";

import React, { useEffect, useState } from "react";
import MenuFoodsCategory from "./MenuFoodsCategory";
import MenuFoodCard from "../card/MenuFoodCard";
import { useAppSelector } from "@/lib/hooks";

function CategorySection({ category }) {
  const cart = useAppSelector((state) => state.cart);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // We get error from the classname being diffrent between server render and client hydration
    // so we set this state in the usestate to force the condition below in the classname checked only client-side
    setIsClient(true);
  }, []);

  return (
    <div>
      <MenuFoodsCategory category={category} />
      <div
        className={`grid grid-cols-1 gap-y-[58px] gap-x-[20px] sm:grid-cols-2 lg:grid-cols-3 ${
          isClient && cart.totalCount > 0 ? "xl:grid-cols-2" : "xl:grid-cols-4"
        }`}
      >
        {category?.foods?.map((food) => (
          <MenuFoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}

export default CategorySection;
