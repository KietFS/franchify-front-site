import React from "react";
import ProductLeftSide from "../../organisms/ProductLeftSide";
import ProductRightSide from "../../organisms/ProductRightSide";
import ProductComments from "@/components/organisms/Comments";
import SimilarProducts from "@/components/organisms/SimilarProducts";
import { IStoreProduct } from "@/types/models";

interface IProductDetailTemplateProps {
  product: IStoreProduct;
  relatedProduct: IStoreProduct[];
}

const ProductDetailTemplate: React.FC<IProductDetailTemplateProps> = (
  props,
) => {
  const { product, relatedProduct } = props;

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col justify-center gap-x-[80px] gap-y-8 px-8 tablet:flex-row">
        <ProductLeftSide storeProduct={product} />
        <ProductRightSide storeProduct={product} />
      </div>

      <ProductComments productDetail={product} />
      <SimilarProducts listProduct={relatedProduct} />
    </>
  );
};

export default ProductDetailTemplate;
