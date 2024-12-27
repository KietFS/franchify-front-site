import React from "react";
import axios from "axios";
import ProductDetailTemplate from "@/components/template/ProductDetail";
import { apiURL } from "@/constanst";
import { IStoreProduct } from "@/types/models";

const ProductDetailPage = async (props: any) => {
  const length = props?.params?.slug?.split("-").length;
  const upc = props?.params?.slug?.split("-")[length - 2];
  const storeId = props?.params?.slug?.split("-")[length - 1];

  let product: IStoreProduct | null = null;
  let relatedProducts = null;

  try {
    const response = await axios.get(
      `${apiURL}/products/detail?upc=${upc}&storeId=${storeId}`,
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
