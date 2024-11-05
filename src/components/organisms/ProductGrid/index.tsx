"use client";

import Button from "@/components/atom/Button";
import ProductCard from "@/components/molecules/ProductCard";
import useProducts from "@/hooks/useProducts";
import useStore from "@/hooks/useStore";
import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";

interface IProductGridProps {
  category: any;
}

const ProductGrid: React.FC<IProductGridProps> = (props) => {
  const { category } = props;
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { getAllProducts, storeProducts, loading } = useProducts();
  const { currentStore } = useStore();

  useEffect(() => {
    currentStore &&
      getAllProducts({ categoryId: category.id, page: currentPage });
  }, [currentStore]);

  useEffect(() => {
    if (currentPage >= 1) {
      currentStore &&
        getAllProducts({ categoryId: category.id, page: currentPage });
    }
  }, [currentPage]);

  return (
    <>
      {storeProducts?.length > 0 && (
        <div>
          <h1 className="text-4xl font-bold text-gray-600 mb-16">
            Danh mục {category?.name}
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

          <div className="w-full flex justify-center mt-8">
            {loading ? (
              <CircularProgress size={36} sx={{ color: "black" }} />
            ) : (
              <Button
                variant="secondary"
                className="max-w-[130px]"
                onClick={() => {
                  setCurrentPage((page) => page + 1);
                }}
              >
                Xem thêm
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
