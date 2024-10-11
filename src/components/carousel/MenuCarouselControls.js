"use client";
import Image from "next/image";
import React from "react";
import { useSwiper } from "swiper/react";

function MenuCarouselControls({ show }) {
  const swiper = useSwiper();
  return (
    <>
      {show && (
        <div className="hidden lg:flex items-center justify-center gap-[36px] mt-[24px]">
          <button onClick={() => swiper.slidePrev()}>
            <Image
              src={"assets/icons/RoundedChevronIcon.svg"}
              className="w-[24px] transition-transform active:scale-110"
              alt="swiper back button"
              width={100}
              height={100}
            />
          </button>
          <button onClick={() => swiper.slideNext()}>
            <Image
              src={"assets/icons/RoundedChevronIcon.svg"}
              alt="swiper forward button"
              width={100}
              height={100}
              className="rotate-180 w-[24px] transition-transform active:scale-110"
            />
          </button>
        </div>
      )}
    </>
  );
}

export default MenuCarouselControls;
