"use client";

import axios from "axios";
import useStore from "./useStore";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStoreProducts } from "@/redux/slices/product";

const useProducts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { accessToken } = useSelector((state: any) => state.auth);
  const { currentStore } = useStore();

  const dispatch = useDispatch();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `localhost:4000/products/by-store?storeId=${
          currentStore?.id
        }&page=${0}&pageSize=20`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response) {
        console.log("GET PRODUCT RESPONSE", response);
      }

      if (response?.data?.success) {
        dispatch(setStoreProducts(response?.data?.data?.results));
      } else {
        dispatch(setStoreProducts([]));
      }
    } catch (error) {
      console.log("GET PRODUCT RESPONSE", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllProducts,
  };
};

export default useProducts;
