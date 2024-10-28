"use client";

import { setSearchResults } from "@/redux/slices/search";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const useSearch = () => {
  const { searchResults } = useSelector((state: any) => state.search);
  const dispatch = useDispatch();

  const dispatchSetSearchResult = (data: any) => {
    dispatch(setSearchResults(data));
  };

  const searchingByKeyword = async (keyword: string) => {
    try {
      const searchResponse = await axios.post(
        "http://localhost:4000/products/search",
        {
          keyword: keyword,
        }
      );

      if (searchResponse) {
        if (searchResponse?.data?.data?.length > 0) {
          dispatchSetSearchResult(searchResponse?.data?.data);
        }
      }
    } catch (error) {
      console.log("searching error", error);
      dispatchSetSearchResult([]);
    }
  };

  return { searchingByKeyword, dispatchSetSearchResult, searchResults };
};

export default useSearch;
