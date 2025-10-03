import React, { useEffect, useState } from "react";

//styles
interface ICartList {}

export interface ICartItem {
  id: number;
  product: {
    id: number;
    name: string;
    startPrice: 126;
    imagePath: string;
    userName: string;
    bidClosingDate: string;
  };
  priceWin: number;
  status: "PENDING" | "APPROVED";
}

const CartList: React.FC<ICartList> = (props) => {
  return (
    <div className="h-fit w-full rounded-lg border border-primary-200 bg-white px-8 py-4 shadow-lg laptop:min-h-[600px] laptop:w-4/5">
      <h3 className="text-xl font-bold text-blue-500 laptop:text-2xl">
        Giỏ hàng của bạn ()
      </h3>
      <div className="mt-10 flex flex-col gap-y-5">
        <div className="grid grid-cols-3 gap-x-10 rounded-lg border border-primary-200 px-4 py-2 laptop:grid-cols-4">
          <p className="text-xs font-semibold text-primary-600 laptop:text-lg">
            Tên
          </p>

          <p className="flex text-lg font-semibold text-primary-600 laptop:flex">
            Hình ảnh
          </p>
          <p className="hidden text-lg font-semibold text-primary-600 laptop:flex">
            Mua từ
          </p>
          <p className="text-xs font-semibold text-primary-600 laptop:text-lg">
            Giá
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartList;
