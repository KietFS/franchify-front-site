"use client";

import useProducts from "@/hooks/useProducts";
import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCarousel from "@/components/molecules/ProductCarousel";
import useStore from "@/hooks/useStore";

interface IPopularProductProps {}

const PopularProducts: React.FC<IPopularProductProps> = (props) => {
  const { popularProducts, getAllPopularProducts } = useProducts();
  const { currentStore } = useStore();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    currentStore && getAllPopularProducts({ page: currentPage });
  }, []);

  return (
    <>
      {popularProducts?.length > 0 ? (
        <div className="mt-16 flex flex-col justify-center w-full">
          <h1 className="text-secondary-900 font-bold text-3xl">
            Sản phẩm bán chạy
          </h1>
          <Divider sx={{ marginY: 4 }} />
          <ProductCarousel listProduct={popularProducts} />
        </div>
      ) : (
        <>
          <div className="h-[40px] w-[300px] bg-secondary-600 animate-pulse"></div>
          <div className="grid gap-x-4 gap-y-8 grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4">
            {Array(4)
              .fill(1)
              ?.map((item) => (
                <div className="w-full h-[200px] animate-pulse bg-secondary-600"></div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default PopularProducts;
