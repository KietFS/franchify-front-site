import {
  fetchProductWithFilter,
  PRODUCT_FILTER_PAGE_SIZE,
} from "@/services/product-filter";
import FilterTemplate from "@/components/template/Filter/FilterTemplate";
import { ICategory, IProduct } from "@/types/models";
import { Metadata } from "next";

interface Props {
  searchParams: {
    categories?: string;
    keyword?: string;
    onSale?: string;
    page?: string;
    pageSize?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: searchParams.keyword
      ? `Search: ${searchParams.keyword}`
      : "Filter Page",
  };
}

// Add export const dynamic = 'force-dynamic' to force dynamic rendering
export const dynamic = "force-dynamic";

const FilterPage = async ({ searchParams }: Props) => {
  const searchParamsCategory = searchParams?.categories || "";
  const keyword = searchParams?.keyword || "";
  const onSale = searchParams?.onSale || "";
  const categories = searchParamsCategory
    ? searchParamsCategory.split(",")
    : [];
  const page = searchParams?.page || 1;
  const pageSize = searchParams?.pageSize || PRODUCT_FILTER_PAGE_SIZE;

  let defaultData: {
    results: IProduct[];
    total: number;
    totalPage: number;
    categories: (ICategory & { count: number })[];
  } | null = null;

  try {
    const response = await fetchProductWithFilter({
      categories,
      keyword,
      onSale: onSale === "true",
      page: Number(page),
      pageSize: Number(pageSize),
    });
    defaultData = response?.data;
  } catch (error) {
    console.log(error);
    defaultData = null;
  }

  return (
    <>
      {defaultData && (
        <FilterTemplate
          defaultData={defaultData}
          keyword={keyword}
          categories={categories}
          onSale={onSale === "true"}
        />
      )}
    </>
  );
};

export default FilterPage;
