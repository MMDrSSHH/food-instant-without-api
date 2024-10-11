"use client";

import React, { useEffect, useRef } from "react";
import CategorySection from "./CategorySection";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { inActiveFoodsHubConncetion } from "@/signalR/connections";
import { setInActiveFoods } from "@/lib/features/inActiveFoods/inActiveFoodsSlice";
// import MenuCartCard from "../menu-cart/MenuCartCard";
const MenuCartCard = dynamic(() => import("../menu-cart/MenuCartCard"), {
  ssr: false,
});

function MenuFoods({ foods }) {
  //#region Hooks
  // const connection = useRef(null);
  // const dispatch = useAppDispatch();
  // const isFetched = useAppSelector((state) => state.inActiveFoods.isFetched);
  //#endregion

  //#region Methods
  // const connect = async () => {
  //   try {
  //     const hubConnection = inActiveFoodsHubConncetion();
  //     hubConnection.on("getInActiveFoods", (inActiveFoods) => {
  //       console.log(inActiveFoods);
  //       dispatch(
  //         setInActiveFoods({
  //           items: inActiveFoods,
  //           isFetched: isFetched || true,
  //         })
  //       );
  //     });

  //     await hubConnection.start();

  //     connection.current = hubConnection;
  //   } catch (error) {
  //     console.log(error);
  //     console.error("hub didn't connect");
  //   }
  // };
  //#endregion

  //#region Effects
  // useEffect(() => {
  //   connect();

  //   return () => {
  //     if (connection.current) connection.current.stop();
  //   };
  // }, []);
  //#endregion
  return (
    <div className="mt-[90px] flex gap-x-[20px]">
      <div className="flex flex-col gap-[60px] w-full">
        {foods?.map((catFood) => (
          <CategorySection key={catFood.id} category={catFood} />
        ))}
      </div>
      <MenuCartCard />
    </div>
  );
}

export default MenuFoods;
