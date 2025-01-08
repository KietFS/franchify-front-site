"use client";

import ProductCarousel from "@/components/molecules/ProductCarousel";
import { IStoreProduct } from "@/types/models";
import { Divider } from "@mui/material";
import React from "react";

interface ISimilarProductProps {
  listProduct: IStoreProduct[];
}

const SimilarProducts: React.FC<ISimilarProductProps> = (props) => {
  const { listProduct: relatedProduct } = props;
  return (
    <div className="mt-16 flex w-full flex-col justify-center px-8">
      <h1 className="text-3xl font-bold text-secondary-900">
        Sản phẩm tương tự
      </h1>
      <Divider sx={{ marginY: 4 }} />
      {relatedProduct?.length > 0 && (
        <ProductCarousel listProduct={relatedProduct} />
      )}
    </div>
  );
};

export default SimilarProducts;
