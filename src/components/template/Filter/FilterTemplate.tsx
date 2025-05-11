"use client";

import React, { useEffect, useState } from "react";
import FilterBar from "@/components/organisms/FilterBar";
import ProductFilterGrid from "@/components/organisms/ProductFilterGrid/ProductFilterGrid";
import useSearch from "@/hooks/useSearch";
import useStore from "@/hooks/useStore";
import { ICategory, IProduct } from "@/types/models";
import FilterPageLoading from "@/components/organisms/FilterPageLoading";
import Button from "@/components/atom/Button";
import FilterDrawer from "@/components/organisms/FilterDrawer";
import OverlayLoading from "@/components/organisms/OverlayLoading";
import { useRouter } from "next/navigation";

interface IFilterTemplateProps {
  defaultData?: {
    results: IProduct[];
    total: number;
    totalPage: number;
    categories: (ICategory & { count: number })[];
  };
  keyword?: string;
  categories?: string[];
  onSale?: boolean;
}

const FilterTemplate: React.FC<IFilterTemplateProps> = (props) => {
  const { keyword, categories, onSale, defaultData } = props;
  const {
    categoryFacets,
    getProductsByParams,
    products,
    productsLoading,
    dispatchSetProducts,
    dispatchSetCurrentPage,
    dispatchSetCategoryFacets,
    currentPage,
    dispatchSetTotalPage,
    totalPage,
    dispatchSetCategories,
    dispatchSetOnSale,
  } = useSearch();
  const [openFilter, setOpenFilter] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (defaultData) {
      dispatchSetProducts(defaultData.results);
    }
  }, [defaultData]);

  const handleLoadMore = () => {
    const newCurrentPage = currentPage + 1;
    dispatchSetCurrentPage(newCurrentPage);
    getProductsByParams(
      {
        page: newCurrentPage,
      },
      true,
    );
    const url = new URL(window.location.href);
    url.searchParams.set("page", newCurrentPage.toString());
    window.history.pushState({}, "", url.toString());
  };

  // set the default data and facets
  useEffect(() => {
    if (!!defaultData) {
      dispatchSetProducts(defaultData?.results);
      dispatchSetCategoryFacets(defaultData?.categories);
      dispatchSetTotalPage(defaultData?.totalPage);
    }
  }, [defaultData]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const page = url.searchParams.get("page");
    const categories = url.searchParams.get("categories");
    const onSale = url.searchParams.get("onSale");
    dispatchSetCurrentPage(Number(page) || 1);
    dispatchSetCategories(categories?.split(",") || []);
    dispatchSetOnSale(onSale === "true");

    // Force dynamic refresh when back and forth with browser back and forth
    window.addEventListener("popstate", () => {
      router.refresh();
    });

    return () => {
      window.removeEventListener("popstate", () => {});
    };
  }, []);

  return (
    <>
      <>
        {productsLoading && <OverlayLoading />}
        <div className="flex w-full flex-col px-4 desktop:gap-16 desktop:px-8">
          <div className="mx-auto flex w-full justify-center">
            <div className="flex w-full flex-col justify-center gap-y-8 laptop:flex-row laptop:gap-x-[40px] desktop:gap-x-[40px]">
              <div className="max-w-auto hidden w-auto laptop:flex laptop:min-w-[360px] laptop:max-w-[400px]">
                <FilterBar />
              </div>
              <div className="max-w-auto w-full">
                <div className="mb-8 flex w-full items-center justify-between">
                  {products?.length > 0 && (
                    <h3 className="text-[24px] font-semibold text-secondary-900">
                      {keyword && keyword?.length > 0
                        ? `Hiển thị kết quả cho "${keyword}"`
                        : "Hiển thị tất cả kết quả"}
                    </h3>
                  )}

                  <button
                    onClick={() => setOpenFilter(true)}
                    className="block border-none bg-none text-[20px] font-semibold text-primary-500 laptop:hidden"
                  >
                    Lọc sản phẩm
                  </button>
                </div>

                <ProductFilterGrid
                  products={products}
                  productsLoading={productsLoading}
                />

                {currentPage < totalPage && (
                  <div className="mx-auto mt-8 flex w-[200px]">
                    <Button
                      variant="primary"
                      className="mt-4 w-[200px]"
                      onClick={handleLoadMore}
                    >
                      Xem thêm
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
      {openFilter && (
        <FilterDrawer open={openFilter} onClose={() => setOpenFilter(false)} />
      )}
    </>
  );
};

export default FilterTemplate;
