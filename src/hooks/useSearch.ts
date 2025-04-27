"use client";

import { apiURL } from "@/constanst";
import {
  setLoading,
  setSearchPredictions,
  setProducts,
  setProductsLoading,
  setKeyword,
  setCategories,
  setCurrentPage,
  setTotalPage,
  setCategoryFacets,
  setOnSale,
} from "@/redux/slices/search";
import {
  fetchProductWithFilter,
  PRODUCT_FILTER_PAGE_SIZE,
} from "@/services/product-filter";
import { ICategory, IProduct } from "@/types/models";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const useSearch = () => {
  const {
    searchPredictions,
    isLoading,
    products,
    productsLoading,
    categoryFacets,
    categories,
    keyword,
    currentPage,
    onSale,
    totalPage,
  } = useSelector((state: any) => state.search);

  const dispatch = useDispatch();

  const dispatchSetSearchPredictions = (data: any) => {
    dispatch(setSearchPredictions(data));
  };
  const dispatchSetProducts = (data: IProduct[]) => {
    dispatch(setProducts(data));
  };
  const dispatchSetProductsLoading = (data: boolean) => {
    dispatch(setProductsLoading(data));
  };
  const dispatchSetKeyword = (data: string) => {
    dispatch(setKeyword(data));
  };
  const dispatchSetCategories = (data: string[]) => {
    dispatch(setCategories(data));
  };

  const dispatchSetOnSale = (data: boolean) => {
    dispatch(setOnSale(data));
  };

  const dispatchSetCategoryFacets = (
    data: (ICategory & { count: number })[],
  ) => {
    dispatch(setCategoryFacets(data));
  };

  const dispatchSetCurrentPage = (data: number) => {
    dispatch(setCurrentPage(data));
  };

  const dispatchSetTotalPage = (data: number) => {
    dispatch(setTotalPage(data));
  };

  const resetFilter = () => {
    dispatchSetCategories([]);
    dispatchSetOnSale(false);
    dispatchSetCurrentPage(1);
  };

  const getSearchPredictions = async (keyword: string) => {
    try {
      dispatch(setLoading(true));
      const searchResponse = await axios.post(`${apiURL}/products/search`, {
        keyword: keyword,
      });

      if (searchResponse) {
        // set loading state for getting search predictions
        dispatch(setLoading(false));
        if (searchResponse?.data?.data?.length > 0) {
          dispatchSetSearchPredictions(searchResponse?.data?.data);
        } else {
          dispatchSetSearchPredictions([]);
        }
      }
    } catch (error) {
      console.log("searching error", error);
      dispatchSetSearchPredictions([]);
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getProductsByParams = async (
    payload: {
      page?: number;
      pageSize?: number;
      keyword?: string;
      categories?: string[];
      onSale?: boolean;
    },
    showLoading?: boolean,
  ) => {
    try {
      if (showLoading) {
        dispatchSetProductsLoading(true);
      }
      const getProductResponse = await fetchProductWithFilter({
        keyword: payload?.keyword || keyword,
        categories: payload?.categories || categories,
        onSale: payload?.onSale == undefined ? onSale : payload?.onSale,
        page: payload?.page || currentPage,
        pageSize: payload?.pageSize || PRODUCT_FILTER_PAGE_SIZE,
      });
      if (getProductResponse?.success) {
        console.log("getProductResponse", getProductResponse);
        dispatchSetProductsLoading(false);
        if (!!getProductResponse?.data?.results) {
          dispatchSetProducts(getProductResponse?.data?.results);
          dispatchSetTotalPage(getProductResponse?.data?.totalPage);
          dispatchSetCategoryFacets(getProductResponse?.data?.categories);
        }
      }
    } catch (error) {
      console.log("searching error", error);
      dispatchSetProducts([]);
      dispatchSetProductsLoading(false);
    } finally {
      dispatchSetProductsLoading(false);
    }
  };

  return {
    /** get search predictions */
    getSearchPredictions,
    /** get products by params */
    getProductsByParams,
    /** dispatch set search result */
    dispatchSetSearchPredictions,
    /** products */
    products,
    /** set products */
    dispatchSetProducts,
    /** search predictions */
    searchPredictions,
    /** predictions loading */
    predictionsLoading: isLoading,
    /** products loading */
    productsLoading,
    /** keyword */
    keyword,
    /** set keyword */
    dispatchSetKeyword,
    /** categories */
    categories,
    /** set categories */
    dispatchSetCategories,
    /** current page */
    currentPage,
    /** set current page */
    dispatchSetCurrentPage,
    /** category facets */
    categoryFacets,
    /** set category facets */
    dispatchSetCategoryFacets,
    /** on sale */
    onSale,
    /** set on sale */
    dispatchSetOnSale,
    /** total page */
    totalPage,
    /** set total page */
    dispatchSetTotalPage,
    /** reset filter */
    resetFilter,
  };
};

export default useSearch;
