import { apiURL } from "@/constanst";

export const PRODUCT_FILTER_PAGE_SIZE = 20;

const fetchProductWithFilter = async (payload: {
  keyword?: string;
  categories?: string[];
  onSale?: boolean;
  page?: number;
  pageSize?: number;
}) => {
  const { keyword, categories, onSale, page, pageSize } = payload;

  try {
    const response = await fetch(`${apiURL}/products/filter `, {
      method: "POST",
      body: JSON.stringify({
        keyword: keyword,
        categories: categories,
        onSale: onSale,
        page: page || 1,
        pageSize: pageSize || PRODUCT_FILTER_PAGE_SIZE,
      }),
      next: {
        revalidate: 10,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error: any) {
    console.log("error", error);
  }
};

export { fetchProductWithFilter };
