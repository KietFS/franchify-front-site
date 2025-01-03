"use client";

import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

//@ts-ignore
import EmptyImage from "@/assets/images/EmptyImage.png";
import { IStoreProduct } from "@/types/models";

interface ILeftSideProps {
  storeProduct?: IStoreProduct;
}

const ProductLeftSide: React.FC<ILeftSideProps> = ({ storeProduct }) => {
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const carouselImages = [
    storeProduct?.product?.thumbnail,
    ...(storeProduct?.product?.images || []),
  ];

  return (
    <div className="mx-auto max-w-[340px] tablet:max-w-[240px] laptop:max-w-[420px] desktop:max-w-[480px]">
      <div className="h-full w-full bg-white">
        {carouselImages?.length > 1 ? (
          <Slider ref={sliderRef} {...settings} className="mx-auto rounded-lg">
            {carouselImages?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex h-[420px] w-full cursor-pointer items-center justify-center rounded-lg hover:opacity-80"
              >
                {item ? (
                  <img
                    src={item}
                    className="h-full w-full rounded-xl object-cover"
                    alt={`Product image ${index + 1}`}
                  />
                ) : (
                  <Image
                    src={EmptyImage}
                    className="h-full w-full rounded-xl object-cover"
                    alt={`Product image ${index + 1}`}
                  />
                )}
              </div>
            ))}
          </Slider>
        ) : (
          <>
            {carouselImages[0] && !imageError ? (
              <Image
                width={400}
                onError={() => setImageError(true)}
                height={400}
                src={carouselImages[0] as string}
                className="h-full w-full rounded-xl object-cover"
                alt={`Product image`}
              />
            ) : (
              <Image
                src={EmptyImage}
                height={400}
                width={400}
                // className="h-full w-full rounded-xl object-cover"
                alt={`Product image empty`}
              />
            )}
          </>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {carouselImages?.length > 1 &&
            carouselImages?.map((item: any, index: number) => (
              <div
                key={`carousel-${index}`}
                className="cursor-pointer rounded-xl border border-secondary-700 p-2 hover:opacity-50"
                onClick={() => (sliderRef.current as any)?.slickGoTo(index)}
              >
                <img
                  src={item}
                  width="400"
                  height="400"
                  className="h-[40px] w-[40px] rounded-lg object-cover laptop:h-[80px] laptop:w-[80px]"
                  alt={`Thumbnail ${index + 1}`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLeftSide;
