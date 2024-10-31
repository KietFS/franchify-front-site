"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import EmptyImage from "@/assets/images/EmptyImage.png";

interface IProductCardProps {
  handleItemClick: (product: IProduct) => void;
  item: IStoreProduct;
  index: number;
}

const ProductCard: React.FC<IProductCardProps> = (props) => {
  const { handleItemClick, item, index } = props;

  return (
    <div
      className="flex h-[400px] flex-col items-center gap-y-4 justify-center p-4 cursor-pointer"
      onClick={() => handleItemClick(item?.product)}
    >
      {!!item?.product?.thumbnail ? (
        <img
          src={item.product?.thumbnail}
          className="w-full h-[267px] desktop:max-w-[280px] rounded-xl object-cover"
          alt={`Product ${index + 1}`}
        />
      ) : (
        <Image
          src={EmptyImage}
          className="w-full h-[267px] desktop:max-w-[280px] rounded-xl object-cover"
          alt={`Product ${index + 1}`}
        />
      )}
      <p className="text-lg text-gray-600 font-bold mt-4">
        {item?.product?.name}
      </p>

      <p className="text-md text-green-600 font-bold mt-4">
        {item?.product?.price?.displayPrice}
      </p>
    </div>
  );
};

export default ProductCard;
