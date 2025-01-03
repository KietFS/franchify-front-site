"use client";

import { IProduct } from "@/types/models";
import { useRouter } from "next/navigation";
import useStore from "./useStore";
import { IStoreProduct } from "@/types/models";

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

    router.push(`/product-detail/${final}-${item?.upc}`, { scroll: true });
  };

  return {
    navigateToProductDetail,
  };
};

export default useNavigation;
