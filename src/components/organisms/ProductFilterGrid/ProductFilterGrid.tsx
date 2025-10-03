"use client";
import ProductCard from "@/components/molecules/ProductCard";
import useSearch from "@/hooks/useSearch";
import { IProduct } from "@/types/models";
import { InboxIcon } from "@heroicons/react/24/outline";

import React, { useEffect, useRef } from "react";

interface IProductScrollProps {
  products: IProduct[];
  productsLoading: boolean;
}

const ProductFilterGrid: React.FC<IProductScrollProps> = (props) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const { products } = props;
  const { keyword, categories, onSale } = useSearch();

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
        <>
          {(keyword && keyword?.length > 0) ||
          categories?.length > 0 ||
          onSale ? (
            <div className="flex h-full w-full flex-col">
              <h1 className="text-left text-2xl font-semibold text-secondary-900">
                Rất tiếc, không tìm thấy sản phẩm phù hợp
              </h1>
              <h4 className="mt-4 text-left text-sm text-gray-500">
                Sản phẩm mà bạn tìm kiếm không tồn tại
              </h4>

              <InboxIcon className="mt-8 h-40 w-40 text-gray-500" />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ProductFilterGrid;
