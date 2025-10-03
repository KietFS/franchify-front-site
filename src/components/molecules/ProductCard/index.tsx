"use client";

import React, { useState } from "react";
import Image from "next/image";
// @ts-ignore
import EmptyImage from "@/assets/images/EmptyImage.png";
import QuantityButton from "../QuantityButton";
import { IconButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { IProduct } from "@/types/models";
import useNavigation from "@/hooks/useNavigation";
import useStore from "@/hooks/useStore";

interface IProductCardProps {
  handleItemClick: (product: IProduct) => void;
  item: IProduct;
  index: number;
}

const StoreProductCard: React.FC<IProductCardProps> = (props) => {
  const { item, index } = props;
  const { productDetailLink, navigateToProductDetail } = useNavigation();
  const [imageError, setImageError] = useState(false);

  const { currentStore } = useStore();

  return (
    <div
      onClick={(e) => {
        navigateToProductDetail(item as any);
        e?.preventDefault();
        e?.stopPropagation();
      }}
    >
      <div className="z-0 my-8 flex h-full min-h-[500px] cursor-pointer flex-col items-center justify-between border-gray-200 p-4 laptop:my-2">
        <div className="mb-4 ml-auto h-[50px]">
          <IconButton>
            <PlaylistAddIcon sx={{ width: 40, height: 40, color: "#4b5563" }} />
          </IconButton>
        </div>
        {!!item?.thumbnail && !imageError ? (
          <img
            src={item?.thumbnail}
            className="h-auto w-full rounded-xl object-cover desktop:min-h-[200px] desktop:max-w-[250px]"
            alt={`Product ${index + 1}`}
            onError={() => setImageError(true)}
          />
        ) : (
          <Image
            src={EmptyImage}
            className="h-auto w-full rounded-xl object-contain desktop:h-[200px] desktop:max-w-[250px]"
            alt={`Product ${index + 1}`}
            width={250}
            height={200}
          />
        )}
        <div className="mt-6 flex w-full flex-col gap-x-4 gap-y-4">
          <div className="w-[200px]">
            <QuantityButton
              storeProduct={{
                product: item,
                id: item.id,
                price: item?.price,
                store: currentStore as any,
                inventory: 0,
              }}
              mode={"card" as any}
            />
          </div>
          <div className="h-[100px]">
            <div className="flex flex-col gap-y-1">
              <p className="w-full text-left text-lg font-bold text-gray-600">
                {item?.name}
              </p>
              <p
                className={`text-sxs w-full text-left font-bold text-gray-600 ${
                  item?.isOnSale ? "text-red-500" : ""
                }`}
              >
                {item?.price?.displayPrice}
              </p>
              {item?.isOnSale && (
                <p className="text-sxs w-full text-left font-bold text-gray-500">
                  Đang giảm giá
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductCard;
