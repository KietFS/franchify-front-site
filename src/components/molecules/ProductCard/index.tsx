"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import EmptyImage from "@/assets/images/EmptyImage.png";
import useNavigation from "@/hooks/useNavigation";
import QuantityButton from "../QuantityButton";
import {
  Bars3BottomLeftIcon,
  Bars3Icon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { IProduct, IStoreProduct } from "@/@types";

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
      className="flex h-auto min-h-[500px]  border-gray-200 flex-col justify-between items-center my-8 laptop:my-2  p-4 cursor-pointer z-0"
      onClick={() => navigateToProductDetail(item?.product)}
    >
      <div className="h-[50px] ml-auto">
        <Bars3Icon className="text-secondary-800 w-8 h-8" />
      </div>
      {!!item?.product?.thumbnail ? (
        <img
          src={item.product?.thumbnail}
          className="w-full  h-auto desktop:min-h-[200px] desktop:max-w-[250px] rounded-xl object-cover"
          alt={`Product ${index + 1}`}
        />
      ) : (
        <Image
          src={EmptyImage}
          className="w-full h-auto desktop:h-[200px] desktop:max-w-[250px] rounded-xl object-cover"
          alt={`Product ${index + 1}`}
        />
      )}
      <div className="w-full flex flex-col gap-y-4 gap-x-4 mt-6">
        <div className="w-[200px]">
          <QuantityButton storeProduct={item} mode={"card" as any} />
        </div>
        <div className="h-[100px]">
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
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
