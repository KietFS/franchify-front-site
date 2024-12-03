"use client";

import useProducts from "@/hooks/useProducts";
import React, { useEffect, useState } from "react";
import ProductCarousel from "@/components/molecules/ProductCarousel";
import useStore from "@/hooks/useStore";
interface IPopularProductProps {}

const PopularProducts: React.FC<IPopularProductProps> = (props) => {
  const { popularProducts, getAllPopularProducts, loading } = useProducts();
  const { currentStore } = useStore();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    if (!!currentStore){
      console.log('HI')
      getAllPopularProducts({ page: currentPage });
    }
  }, [currentStore]);

  console.log('HELLO', popularProducts)

  return (
    <>
    {popularProducts?.length > 0 &&       <div className="mt-16 flex w-full flex-col justify-center">
    <h1 className="mb-8 text-4xl font-bold text-secondary-900">
      Sản phẩm bán chạy
    </h1>
    <ProductCarousel listProduct={popularProducts} />
  </div>}
    </>
  );
};

export default PopularProducts;
