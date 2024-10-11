"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import MenuCategoryItem from "./MenuCategoryItem";

function MenuCategory({ categories }) {
  return (
    <Swiper
      className="mt-[40px]"
      slidesPerView={1.2}
      spaceBetween={"12px"}
      breakpoints={{
        640: {
          slidesPerView: 2.2,
        },
        768: {
          slidesPerView: 3.2
        },
        1024: {
          slidesPerView: 4.2,
        },
        // 1280: {
        //   slidesPerView: 5.2,
        // },
      }}
    >
      {categories?.map((category) => (
        <SwiperSlide key={category?.id}>
          <MenuCategoryItem category={category} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MenuCategory;
