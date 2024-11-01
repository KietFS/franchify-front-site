"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import EmptyImage from "@/assets/images/EmptyImage.png";
import useNavigation from "@/hooks/useNavigation";

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
      className="flex h-fit flex-col items-center my-8 laptop:my-2 justify-center p-4 cursor-pointer"
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
      <p className="text-md text-gray-700 font-bold mt-4 text-left w-full">
        {item?.product?.name}
      </p>

      <p className="text-sm text-gray-500 font-bold text-left w-full">
        {item?.product?.price?.displayPrice}
      </p>
    </div>
  );
};

export default ProductCard;
