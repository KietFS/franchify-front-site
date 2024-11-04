"use client";

import HeroSection from "@/components/organisms/Hero";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductGrid from "@/components/organisms/ProductGrid";
import Carousel from "@/components/molecules/Carousel";
import useCategory from "@/hooks/useCategories";
import ProductScroll from "@/components/organisms/ProductScroll";

export default function Home() {
  const { listCategory } = useCategory();

  return (
    <div className="w-full flex flex-col items-center justify-center flex-wrap">
      <Carousel />

      <div className="w-full desktop:w-[1200px] mx-auto flex px-10 desktop:px-0 flex-col py-20 gap-y-20">
        {listCategory?.map((category: any) => (
          <ProductGrid category={category} key={category?.id} />
        ))}
        <ProductScroll />
      </div>
    </div>
  );
}
