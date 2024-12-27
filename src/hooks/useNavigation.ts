"use client";

import { useRouter } from "next/navigation";
import useStore from "./useStore";
import { IStoreProduct } from "@/types/models";

interface IProduct extends Record<string, any> {}

const useNavigation = () => {
  const router = useRouter();
  const { currentStore } = useStore();

  const navigateToProductDetail = (item: IProduct) => {
    let splits = (item?.name as string)?.split(" ");
    let final = "";

    splits?.map((key: any, index: number) => {
      if (index == splits?.length - 1) {
        final = final + `${key}`;
      } else {
        final = final + `${key}-`;
      }
    });

    router.push(`/product-detail/${final}-${item?.upc}-${currentStore?.id}`);
  };

  const productDetailLink = (item: IStoreProduct) => {
    let splits = (item?.product?.name as string)?.split(" ");
    let final = "";

    splits?.map((key: any, index: number) => {
      if (index == splits?.length - 1) {
        final = final + `${key}`;
      } else {
        final = final + `${key}-`;
      }
    });

    return `/product-detail/${final}-${item?.product?.upc}-${currentStore?.id}`;
  };

  return {
    navigateToProductDetail,
    productDetailLink,
  };
};

export default useNavigation;
