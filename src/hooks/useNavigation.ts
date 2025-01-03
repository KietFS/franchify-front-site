"use client";

import { IProduct } from "@/types/models";
import { useRouter } from "next/navigation";
import useStore from "./useStore";

const useNavigation = () => {
  const router = useRouter();
  const { currentStore } = useStore();

  const navigateToProductDetail = (item: IProduct) => {
    let splits = (item?.name as string)?.split(" ");
    let final = "";

    const prefix = splits?.map((key: any, index: number) => {
      if (index == splits?.length - 1) {
        final = final + `${key}`;
      } else {
        final = final + `${key}-`;
      }
    });

    router.push(`/product-detail/${final}-${item?.upc}`);
  };

  const productDetailLink = (item: IProduct) => {
    let splits = (item?.name as string)?.split(" ");
    let final = "";

    const prefix = splits?.map((key: any, index: number) => {
      if (index == splits?.length - 1) {
        final = final + `${key}`;
      } else {
        final = final + `${key}-`;
      }
    });

    return `/product-detail/${final}-${item?.upc}-${currentStore?.id}`;
  };

  return {
    navigateToProductDetail,
    productDetailLink,
  };
};

export default useNavigation;
