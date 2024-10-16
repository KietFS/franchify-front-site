import React from "react";

interface IProductDetailTemplateProps {
  product: any;
}

const ProductDetailTemplate: React.FC<IProductDetailTemplateProps> = (
  props
) => {
  const { product } = props;

  console.log("product", product);

  return (
    <div className="desktop:min-w-[1200px] laptop:min-w-[848px] phone:min-w-[400px] min-w-[300px] h-[400px] mx-auto flex gap-x-8 my-[24px]">
      <img
        src={product?.product?.thumbnail}
        className="w-[480px] h-[480px]"
        width={480}
        height={480}
      />

      <div></div>
    </div>
  );
};

export default ProductDetailTemplate;
