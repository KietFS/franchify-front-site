"use client";

import axios from "axios";
import useStore from "./useStore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreProducts } from "@/redux/slices/product";
import { apiURL } from "@/constanst";

const useProducts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
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

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response?.data?.success) {
        setStoreProducts(storeProducts?.concat(response?.data?.data?.results));
        setTotal(response?.data?.data?.total);
      } else {
        setStoreProducts(storeProducts || []);
      }
    } catch (error) {
      console.warn("GET PRODUCT RESPONSE", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    storeProducts,
    getAllProducts,
    loading,
    total,
  };
};

export default useProducts;
