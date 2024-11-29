"use client";

import axios from "axios";
import useStore from "./useStore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiURL } from "@/constanst";
import { setPopularProducts } from "@/redux/slices/product";

const useProducts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const { accessToken } = useSelector((state: any) => state.auth);
  const {popularProducts} = useSelector((state: any) => state.product);
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

  const getAllPopularProducts = async (payload: { page?: number }) => {
    if (popularProducts?.length > 0) {
      return Promise.resolve();
    }
    try {
      setLoading(true);
      let url = `${apiURL}/products/by-store/popular?storeId=${currentStore?.id}&pageSize=100`;
      if (payload?.page) {
        url += `&page=${payload.page}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response?.data?.success) {
        dispatch(setPopularProducts(response?.data?.data?.results))
      } else {
        dispatch(setPopularProducts([]))
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
    getAllPopularProducts,
    popularProducts,
  };
};

export default useProducts;
