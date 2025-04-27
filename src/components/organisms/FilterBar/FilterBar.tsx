"use client";

import FilterFacets from "@/components/molecules/FilterFacets";
import useSearch from "@/hooks/useSearch";
import { IProduct } from "@/types/models";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";

interface IFilterBarProps {}

const FilterBar: React.FC<IFilterBarProps> = () => {
  const {
    getProductsByParams,
    categories,
    dispatchSetCategories,
    keyword,
    products,
    categoryFacets,
    dispatchSetOnSale,
    onSale,
    resetFilter,
  } = useSearch();

  const onSaleProducts = products.filter(
    (product: IProduct) => product.isOnSale,
  );

  const handleCategoryChange = (data: string[]) => {
    const categoryString = data.join(",");
    dispatchSetCategories(data);
    getProductsByParams(
      {
        categories: data,
      },
      true,
    );
    // Update URL params
    const url = new URL(window.location.href);
    if (categoryString) {
      url.searchParams.set("categories", categoryString);
    } else {
      url.searchParams.delete("categories");
    }
    window.history.pushState({}, "", url.toString());
  };

  const handleOnSaleChange = (data: string[]) => {
    const isOnSale = data.includes("on-sale") || false;
    dispatchSetOnSale(isOnSale);
    getProductsByParams(
      {
        onSale: isOnSale,
      },
      true,
    );
    const url = new URL(window.location.href);
    if (isOnSale) {
      url.searchParams.set("onSale", "true");
    } else {
      url.searchParams.delete("onSale");
    }
    window.history.pushState({}, "", url.toString());
  };

  return (
    <div className="block h-fit w-full flex-col gap-5 rounded-sm pr-4 md:flex-row">
      <div className="flex flex-col gap-y-6">
        <div className="flex w-full items-center justify-between">
          <h3 className="text-[24px] font-semibold text-secondary-900">
            Lọc bởi
          </h3>
          <button
            aria-label="Reset bộ lọc"
            className="border-none bg-none"
            onClick={resetFilter}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <FilterFacets
          selectedIds={categories}
          setSelectedIds={(data) => handleCategoryChange(data)}
          facets={categoryFacets}
          title="Danh mục"
        />

        {onSaleProducts.length > 0 && (
          <FilterFacets
            selectedIds={onSale ? ["on-sale"] : []}
            setSelectedIds={(data) => handleOnSaleChange(data)}
            facets={[
              {
                id: "on-sale",
                name: "Đang giảm giá",
                count: onSaleProducts.length,
              },
            ]}
            title="Giảm giá"
          />
        )}
      </div>
    </div>
  );
};

export default FilterBar;
