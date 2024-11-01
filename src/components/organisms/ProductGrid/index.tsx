"use client";

import Button from "@/components/atom/Button";
import ProductCard from "@/components/molecules/ProductCard";
import useProducts from "@/hooks/useProducts";
import useStore from "@/hooks/useStore";
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
      {loading ? (
        <div>
          <div className="bg-gray-200 animate-pulse w-1/2 h-[60px] mb-8"></div>
          <div className="w-full grid grid-cols-4 gap-4">
            {Array(8)
              .fill(1)
              ?.map((item, index) => (
                <div className="bg-gray-200 animate-pulse w-full h-[360px]"></div>
              ))}
          </div>
        </div>
      ) : (
        <>
          {storeProducts?.length > 0 && (
            <div>
              <h1 className="text-4xl font-bold text-gray-600 mb-16">
                Danh mục {category?.name}
              </h1>
              <div className="w-full grid tablet:grid-cols-2 laptop:grid-cols-4 gap-y-4 gap-x-4">
                {storeProducts?.map((item: any, index: number) => (
                  <ProductCard
                    handleItemClick={() => {}}
                    item={item}
                    index={index}
                  />
                ))}
              </div>

              <div className="w-full flex justify-center mt-8">
                <Button
                  variant="secondary"
                  className="w-[200px]"
                  onClick={() => {
                    setCurrentPage((page) => page + 1);
                  }}
                >
                  Xem thêm
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductGrid;
