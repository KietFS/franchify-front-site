"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import ProductCard from "@/components/molecules/StoreProductCard";
import "./style.css";
import Link from "next/link";
import { IStoreProduct } from "@/types/models";

interface ISimilarProduct {
  listProduct: IStoreProduct[];
}

const ProductCarousel: React.FC<ISimilarProduct> = ({ listProduct }) => {
  const router = useRouter();
  const [slidesToShow, setSlidesToShow] = useState<number>(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else if (window.innerWidth <= 1278) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    // Initial setup
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    dot: false,
    height: 540,
    speed: 500,
    dots: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const handleItemClick = (item: any) => {
    let final = "";

    router.push(`/product-detail/${final}-${item?.upc}`, { scroll: true });
    window.scrollTo(0, 0);
  };

  return (
    <div className="mx-auto mb-10 h-full max-w-[600px] tablet:max-w-[720px] laptop:max-w-[960px] desktop:max-w-[1200px]">
      {listProduct?.length > 0 && (
        <div className="grid h-full w-full grid-cols-1 rounded-lg bg-white px-8 pt-4">
          <Slider {...settings}>
            {listProduct.map((item, index) => (
              <div
                key={`card-${index}`}
                className="flex max-h-[540px] items-stretch border-r border-gray-300 p-2"
              >
                <ProductCard
                  item={item}
                  index={index}
                  key={`card-${index}`}
                  handleItemClick={() => {}}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
