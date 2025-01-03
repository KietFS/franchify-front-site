import React from "react";
import ProductDetailTemplate from "@/components/template/ProductDetail";
import { IStoreProduct } from "@/types/models";
import { fetchProductDetail } from "@/services/product-detail";

const ProductDetailPage = async (props: any) => {
  const length = props?.params?.slug?.split("-").length;
  const upc = props?.params?.slug?.split("-")[length - 2];
  const storeId = props?.params?.slug?.split("-")[length - 1];

  let product: IStoreProduct | null = null;
  let relatedProducts = null;

  const response = await fetchProductDetail(upc, storeId);

  if (response.success) {
    product = response?.data?.storeProduct;
    relatedProducts = response?.data?.relatedProducts;
    return (
      <>
        <ProductDetailTemplate
          product={product as any}
          relatedProduct={relatedProducts}
        />
      </>
    );
  } else {
    return null;
  }
};

export default ProductDetailPage;
