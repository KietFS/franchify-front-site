"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import EmptyImage from "@/assets/images/EmptyImage.png";
import useNavigation from "@/hooks/useNavigation";
import QuantityButton from "../QuantityButton";

interface IProductCardProps {
  handleItemClick: (product: IProduct) => void;
  item: IStoreProduct;
  index: number;
}

const ProductCard: React.FC<IProductCardProps> = (props) => {
  const { handleItemClick, item, index } = props;

  const { navigateToProductDetail } = useNavigation();

  return (
    <div
      className="flex h-fit flex-col items-center my-8 laptop:my-2 justify-center p-4 cursor-pointer z-0"
      onClick={() => navigateToProductDetail(item?.product)}
    >
      {!!item?.product?.thumbnail ? (
        <img
          src={item.product?.thumbnail}
          className="w-full  h-auto desktop:h-[267px] desktop:max-w-[250px] rounded-xl object-cover"
          alt={`Product ${index + 1}`}
        />
      ) : (
        <Image
          src={EmptyImage}
          className="w-full h-auto desktop:h-[267px] desktop:max-w-[250px] rounded-xl object-cover"
          alt={`Product ${index + 1}`}
        />
      )}
      <div className="w-full grid grid-cols-2 gap-x-4 mt-6">
        <div>
          <p className="text-md text-gray-600 font-bold text-left w-full">
            {item?.product?.name}
          </p>
          <p
            className={`text-sm text-green-500 font-bold text-left w-full ${
              item?.price?.salePrice ? "line-through" : ""
            }`}
          >
            {item?.product?.price?.displayPrice}
          </p>
          {item.price?.salePrice && (
            <p
              className={`text-md text-red-500 font-bold text-left w-full mt-2`}
            >
              {item?.price?.displaySalePrice}
            </p>
          )}
        </div>
        <div className="max-w-1/2">
          <QuantityButton storeProduct={item} mode={"card" as any} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
