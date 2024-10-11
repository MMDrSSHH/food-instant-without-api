"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import MenuCarouselControls from "./MenuCarouselControls";
import Image from "next/image";
import { getStaticRoute } from "@/utils/constants";

function MenuCarousel({ banners }) {
  return (
    <>
      {banners?.length > 0 && (
        <Swiper
          className="h-auto mt-[50px]"
          autoplay={{
            delay: 5000,
          }}
          modules={[Autoplay]}
          spaceBetween={12}
          loop
        >
          {banners?.map((banner) => (
            <SwiperSlide className="h-fit rounded-2xl" key={banner.id}>
              <div className="h-[200px] lg:h-[540px] flex justify-center items-center relative rounded-2xl">
                <Image
                  fill
                  src={`${getStaticRoute()}\\${banner.image}`}
                  alt={banner.description}
                  className="hidden lg:block rounded-2xl object-cover"
                />
                <Image
                  fill
                  src={`${getStaticRoute()}\\${banner.mobileImage}`}
                  alt={banner.description}
                  className="lg:hidden rounded-2xl object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
          <MenuCarouselControls show={banners?.length > 1} />
        </Swiper>
      )}
    </>
  );
}

export default MenuCarousel;
