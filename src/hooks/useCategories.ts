"use client";

import { setListCategory } from "@/redux/slices/category";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { accessToken } = useSelector((state: any) => state.auth);
  const { listCategory } = useSelector((state: any) => state.category);

  const dispatch = useDispatch();

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/category`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response?.data?.success) {
        dispatch(setListCategory(response?.data?.data?.data));
      }
    } catch (error) {
      console.error("GET PRODUCT CATEGORY ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    getCategories,
    listCategory,
  };
};

export default useCategory;
