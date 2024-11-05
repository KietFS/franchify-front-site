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
    <div className="mt-16 flex flex-col justify-center w-full">
      <h1 className="text-primary-600 font-bold text-3xl">Sản phẩm bán chạy</h1>
      <Divider sx={{ marginY: 4 }} />
      {!!popularProducts && <ProductCarousel listProduct={popularProducts} />}
    </div>
  );
};

export default PopularProducts;
