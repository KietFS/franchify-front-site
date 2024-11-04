"use client";

import axios from "axios";
import useStore from "./useStore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreProducts } from "@/redux/slices/product";
import { apiURL } from "@/constanst";

const useProducts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { accessToken } = useSelector((state: any) => state.auth);
  const { currentStore } = useStore();

  const [storeProducts, setStoreProducts] = useState<any[]>([]);
  const dispatch = useDispatch();

  const getAllProducts = async (payload?: {
    categoryId?: number;
    page?: number;
  }) => {
    try {
      setLoading(true);

      let url = `${apiURL}/products/by-store?storeId=${currentStore?.id}&pageSize=8`;

      if (payload?.page) {
        url += `&page=${payload.page}`;
      }

      if (payload?.categoryId) {
        url += `&category=${payload.categoryId}`;
      }

      console.log("url", url);

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response) {
        console.log("GET PRODUCT RESPONSE", response);
      }

      if (response?.data?.success) {
        setStoreProducts(storeProducts?.concat(response?.data?.data?.results));
      } else {
        setStoreProducts(storeProducts || []);
      }
    } catch (error) {
      console.log("GET PRODUCT RESPONSE", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    storeProducts,
    getAllProducts,
    loading,
  };
};

export default useProducts;
