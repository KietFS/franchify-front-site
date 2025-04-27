"use client";
import ProductCard from "@/components/molecules/ProductCard";
import useProducts from "@/hooks/useProducts";
import useSearch from "@/hooks/useSearch";
import useStore from "@/hooks/useStore";
import { IProduct } from "@/types/models";
import React, { useEffect, useRef } from "react";

interface IProductScrollProps {
  products: IProduct[];
  productsLoading: boolean;
}

const ProductFilterGrid: React.FC<IProductScrollProps> = (props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { products } = props;

  return (
    <div>
      {products?.length > 0 ? (
        <div>
          <div className="grid w-full grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-3 desktop:grid-cols-4">
            {products?.map((item: IProduct, index: number) => (
              <div
                key={`card-${index}`}
                className="border-[0.5px] border-gray-300 p-2"
              >
                <ProductCard
                  key={`card-${item?.id}`}
                  handleItemClick={() => {}}
                  item={item}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <h4 className="text-center text-gray-500">
            Không tìm thấy sản phẩm phù hợp
          </h4>
        </div>
      )}
    </div>
  );
};

export default ProductFilterGrid;
