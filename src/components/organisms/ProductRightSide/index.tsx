"use client";

import QuantityButton from "@/components/molecules/QuantityButton";
import { AddShoppingCart } from "@mui/icons-material";
import React from "react";

interface IProductRightSideProps {
  storeProduct: IStoreProduct;
}

const ProductRightSide: React.FC<IProductRightSideProps> = (props) => {
  const { storeProduct } = props;

  return (
    <div className="w-[320px] h-full tablet:w-[360px] laptop:w-[400px] laptop:h-full desktop:w-[480px] desktop:h-full flex flex-col gap-y-8">
      <h1 className="text-gray-600 font-bold text-3xl">
        {storeProduct?.product?.name}
      </h1>

      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="text-gray-400 text-lg">Giá bán: </h3>
          <h3 className="text-green-600 text-lg ml-2 cursor-pointer">
            {storeProduct?.price.displayPrice}
          </h3>
        </div>
        {storeProduct?.product?.properties &&
          Object.entries(storeProduct?.product?.properties).map(
            ([key, value]: [string, any]) => (
              <div key={key} className="flex items-center">
                <h3 className="text-gray-400 text-lg">
                  {storeProduct?.product?.category?.properties?.map(
                  (property: any) => {
                      if (property?.name == key) {
                        return `${property?.displayName} :`;
                      }
                    }
                  )}
                </h3>
                <h3 className="text-gray-500 ml-2 text-lg cursor-pointer">
                  {value}
                </h3>
              </div>
            )
          )}
      </div>

      <QuantityButton storeProduct={storeProduct} />

      <div className="flex flex-col gap-y-2">
        <h1 className="text-gray-600 font-bold text-lg">Mô tả về sản phẩm</h1>
        <p className="text-gray-400 text-sm">
          {storeProduct?.product?.fullDescription}
        </p>
      </div>
    </div>
  );
};

export default ProductRightSide;
