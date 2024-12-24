"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Image from "next/image";

//@ts-ignore
import FirstCarousel from "@/assets/images/FirstCarousel.jpg";
//@ts-ignore
import SecondCarousel from "@/assets/images/SecondCarousel.jpg";
//@ts-ignore
import ThirdCarousel from "@/assets/images/ThirdCarousel.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

interface ISimilarProduct {}

const Carousel: React.FC<ISimilarProduct> = ({}) => {
  const router = useRouter();
  const [slidesToShow, setSlidesToShow] = useState<number>(1);

  const settings = {
    nextArrow: (
      <ChevronRight
        sx={{
          color: "black",
          ":hover": {
            color: "black",
          },
        }}
      />
    ),
    prevArrow: (
      <ChevronLeft
        sx={{
          color: "black",
          ":hover": {
            color: "black",
          },
        }}
      />
    ),
    arrows: true,
    dots: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    adaptiveHeight: true,
    infinite: true,
  };

  return (
    <div className="mt-16 w-full laptop:max-w-[1200px]">
      <h1 className="mb-8 text-4xl text-left font-bold text-secondary-900 px-4">
          Tết đến rồi, mua sắm thôi
      </h1>
      <div className="h-full w-auto max-w-[1200px] overflow-hidden rounded-lg bg-white px-8 pt-4">
      <Slider {...settings}>
        <div>
          <Image
            src={FirstCarousel}
            className="h-full w-full rounded-xl object-cover"
            alt={`Product `}
            layout="responsive"
            width={1200}
            height={400}
          />
        </div>
        <div>
          <Image
            src={SecondCarousel}
            className="h-[400px] w-full rounded-xl object-cover"
            alt={`Product `}
            layout="responsive"
            width={1200}
            height={400}
          />
        </div>
        <div>
          <Image
            src={ThirdCarousel}
            className="h-[400px] w-full rounded-xl object-cover"
            alt={`Product `}
            layout="responsive"
            width={1200}
            height={400}
          />
        </div>
      </Slider>
    </div>
    </div>
  );
};

export default Carousel;
