"use client";

import React from "react";

// @ts-ignore
import { CircularProgress } from "@mui/material";
import useNavigation from "@/hooks/useNavigation";
import useSearch from "@/hooks/useSearch";
import useCategory from "@/hooks/useCategories";
import Link from "next/link";

interface IPopularSearchesProps {
  open: boolean;
  onClose: () => void;
}

const SearchDropdown: React.FC<IPopularSearchesProps> = (props) => {
  const { open, onClose } = props;
  const { searchPredictions, predictionsLoading } = useSearch();
  const { listCategory } = useCategory();

  const { navigateToProductDetail } = useNavigation();

  return (
    <>
      {predictionsLoading ? (
        <div className="flex w-full justify-center">
          <CircularProgress size={30} sx={{ color: "black" }} />
        </div>
      ) : (
        <>
          {searchPredictions?.length > 0 ? (
            <div tabIndex={-1} className="flex flex-col gap-y-6">
              {searchPredictions?.map((item: any, index: number) => {
                return (
                  <div
                    tabIndex={0}
                    key={index}
                    onClick={(e) => {
                      navigateToProductDetail(item);
                      e?.preventDefault();

                      onClose();
                    }}
                    className="flex cursor-pointer items-center gap-x-4 hover:opacity-80"
                  >
                    <div>
                      <img
                        src={item?.thumbnail}
                        className="h-[40px] w-[40px]"
                        alt={item?.name}
                      />
                    </div>
                    <div>
                      <p className="text-regular text-sm text-secondary-900">
                        {item?.name}
                      </p>
                      <p className="mt-2 text-xs text-green-600">
                        {item?.price?.displayPrice}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <h2 className="text-md text-seconday-900 mb-4 font-bold">
                Các danh mục
              </h2>
              <div className="flex w-full flex-wrap gap-x-2 gap-y-4">
                {listCategory?.map((cat: any, index: number) => (
                  <Link href={`/filter?category=${cat?.id}`} key={index}>
                    <div
                      tabIndex={0}
                      key={`cat-${index}`}
                      className="text-seconday-900 text-regular rounded-full border border-secondary-600 px-4 py-2 text-sm"
                    >
                      {cat?.name}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default SearchDropdown;
