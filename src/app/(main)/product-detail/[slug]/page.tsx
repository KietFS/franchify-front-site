import React from "react";
import axios from "axios";
import ProductDetailTemplate from "@/components/template/ProductDetail";
import { apiURL } from "@/constanst";

const ProductDetailPage = async (props: any) => {
  const upc =props?.params?.slug?.split("-")[1]
  const storeId = props?.params?.slug?.split("-")[0];

  let product: IStoreProduct | null = null;
  let relatedProducts = null;

  try {
    const response = await axios.get(
      `${apiURL}/products/detail?upc=${upc}&storeId=8`
    );
    if (response?.data?.success) {
      product = response?.data?.data?.storeProduct;
      relatedProducts = response?.data?.data?.relatedProducts;
    } else {
      product = null;
    }
  } catch (error: any) {
    console.log("error", error);
    relatedProducts = [];
    product = null;
  }

  return (
    <>
      {product && (
        <ProductDetailTemplate
          product={product}
          relatedProduct={relatedProducts}
        />
      )}
    </>
  );
};

export default ProductDetailPage;
