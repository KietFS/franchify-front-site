import React from "react";
import ProductLeftSide from "../../organisms/ProductLeftSide";
import ProductRightSide from "../../organisms/ProductRightSide";
import { Divider } from "@mui/material";
import SimilarProduct from "@/components/organisms/SimilarProduct";
import ProductComments from "@/components/organisms/Comments";

interface IProductDetailTemplateProps {
  product: IStoreProduct;
  relatedProduct: IStoreProduct[];
}

const ProductDetailTemplate: React.FC<IProductDetailTemplateProps> = (
  props
) => {
  const { product, relatedProduct } = props;

  return (
    <>
      {!!product ? (
        <div className="py-16 bg-white desktop:min-w-[1200px] laptop:min-w-[960px] mx-auto min-h-[800px]">
          <div className="flex gap-y-8 gap-x-[80px] justify-center flex-col tablet:flex-row">
            <ProductLeftSide storeProduct={product} />
            {!!product ? <ProductRightSide storeProduct={product} /> : null}
          </div>

          <ProductComments productDetail={product} />

          <div className="mt-16 flex flex-col justify-center w-full">
            <h1 className="text-gray-600 font-bold text-3xl">
              Sản phẩm tương tự
            </h1>
            <Divider sx={{ marginY: 4 }} />
            {!!relatedProduct && (
              <SimilarProduct listProduct={relatedProduct} />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProductDetailTemplate;
