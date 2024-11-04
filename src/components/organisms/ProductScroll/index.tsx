"use client";

import Button from "@/components/atom/Button";
import ProductCard from "@/components/molecules/ProductCard";
import useProducts from "@/hooks/useProducts";
import useStore from "@/hooks/useStore";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useRef } from "react";

interface IProductScrollProps {}

const ProductScroll: React.FC<IProductScrollProps> = (props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { getAllProducts, storeProducts, loading, total } = useProducts();
  const { currentStore } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    currentStore && getAllProducts({ page: currentPage });
  }, [currentStore]);

  useEffect(() => {
    if (currentPage >= 1) {
      currentStore && getAllProducts({ page: currentPage });
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={scrollRef}>
      {storeProducts?.length > 0 && (
        <div>
          <h1 className="text-4xl font-bold text-gray-600 mb-16">
            Tất cả sản phẩm
          </h1>
          <div className="w-full grid tablet:grid-cols-2 laptop:grid-cols-4 gap-y-4 gap-x-4">
            {storeProducts?.map((item: any, index: number) => (
              <ProductCard
                key={`card-${index}`}
                handleItemClick={() => {}}
                item={item}
                index={index}
              />
            ))}
          </div>

          {loading && (
            <div className="w-full grid grid-cols-4 gap-4">
              {Array(8)
                .fill(1)
                ?.map((item, index) => (
                  <div
                    key={`loading-${index}`}
                    className="bg-gray-200 animate-pulse w-full h-[360px]"
                  ></div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductScroll;
