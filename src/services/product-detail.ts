import { apiURL } from "@/constanst";

const fetchProductDetail = async (upc: string, storeId: string) => {
  try {
    const response = await fetch(
      `${apiURL}/products/detail?upc=${upc}&storeId=${storeId}`,
      {
        method: "GET",
        next: {
          revalidate: 10,
        },
      },
    );
    if (response.ok) {
      return response.json();
    }
  } catch (error: any) {
    console.log("error", error);
  }
};

export { fetchProductDetail };
