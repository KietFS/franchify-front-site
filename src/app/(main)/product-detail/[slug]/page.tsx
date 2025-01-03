import React from "react";
import ProductDetailTemplate from "@/components/template/ProductDetail";
<<<<<<< HEAD
import { apiURL } from "@/constanst";
import { IStoreProduct } from "@/types/models";

const ProductDetailPage = async (props: any) => {
  const length = props?.params?.slug?.split("-").length;
  const upc = props?.params?.slug?.split("-")[length - 2];
  const storeId = props?.params?.slug?.split("-")[length - 1];
=======
import { IStoreProduct } from "@/types/models";

const ProductDetailPage = async (props: any) => {
  const upc = props?.params?.slug?.split("-")[1];
  const storeId = props?.params?.slug?.split("-")[0];
>>>>>>> origin/main

  let product: IStoreProduct | null = null;
  let relatedProducts = null;

  console.log("storeId", storeId);
  console.log("upc", upc);

  try {
<<<<<<< HEAD
    const response = await axios.get(
      `${apiURL}/products/detail?upc=${upc}&storeId=${storeId}`,
=======
    const response = await fetch(
      `http://localhost:3000/api/product-detail?upc=${upc}&storeId=${storeId}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: "KIET",
        }),
      },
>>>>>>> origin/main
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("response data", data);

    // Assuming the response structure
    if (data.success) {
      product = data.data.storeProduct;
      relatedProducts = data.data.relatedProducts;
    } else {
      product = null;
      relatedProducts = [];
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
