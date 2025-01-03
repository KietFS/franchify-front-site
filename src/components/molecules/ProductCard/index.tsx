"use client";

import React from "react";
import Image from "next/image";
// @ts-ignore
import EmptyImage from "@/assets/images/EmptyImage.png";
import QuantityButton from "../QuantityButton";
import { IconButton } from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import useStore from "@/hooks/useStore";
import { IProduct, IStoreProduct } from "@/types/models";
import useNavigation from "@/hooks/useNavigation";

interface IProductCardProps {
  handleItemClick: (product: IProduct) => void;
  item: IStoreProduct;
  index: number;
}

const ProductCard: React.FC<IProductCardProps> = (props) => {
  const { handleItemClick, item, index } = props;
  const { currentStore } = useStore();
  const { productDetailLink } = useNavigation();

  return (
    <Link href={productDetailLink(item.product)}>
      <div className="z-0 my-8 flex h-full min-h-[500px] cursor-pointer flex-col items-center justify-between border-gray-200 p-4 laptop:my-2">
        <div className="mb-4 ml-auto h-[50px]">
          <IconButton>
            <PlaylistAddIcon sx={{ width: 40, height: 40, color: "#4b5563" }} />
          </IconButton>
        </div>
        {!!item?.product?.thumbnail ? (
          <img
            src={item.product?.thumbnail}
            className="h-auto w-full rounded-xl object-cover desktop:min-h-[200px] desktop:max-w-[250px]"
            alt={`Product ${index + 1}`}
          />
        ) : (
          <Image
            src={EmptyImage}
            className="h-auto w-full rounded-xl object-contain desktop:h-[200px] desktop:max-w-[250px]"
            alt={`Product ${index + 1}`}
          />
        )}
        <div className="mt-6 flex w-full flex-col gap-x-4 gap-y-4">
          <div className="w-[200px]">
            <QuantityButton storeProduct={item} mode={"card" as any} />
          </div>
          <div className="h-[100px]">
            <div>
              <p className="w-full text-left text-lg font-bold text-gray-600">
                {item?.product?.name}
              </p>
              <p
                className={`text-sxs w-full text-left font-bold text-gray-600 ${
                  item?.price?.salePrice ? "line-through" : ""
                }`}
              >
                {item?.product?.price?.displayPrice}
              </p>
              {item.price?.salePrice && (
                <p
                  className={`text-md mt-2 w-full text-left font-bold text-red-500`}
                >
                  {item?.price?.displaySalePrice}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
