"use client";

interface IOrderSummaryProps {}

import useCart from "@/hooks/useCart";
import { Divider } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const OrderSummary: React.FC<IOrderSummaryProps> = (props) => {
  const { currentCart } = useCart();
  const { user } = useSelector((state: any) => state.auth);

  const totalPrice = () => {
    let total = 0;
    currentCart?.cartDetails?.map((item: any, index: number) => {
      total = total + item?.product?.price?.price * item?.quantity;
    });

    return `${total}000`?.prettyMoney();
  };

  const afterTotalPrice = () => {
    let afterTotal = 0;
    currentCart?.cartDetails?.map((item: any, index: number) => {
      afterTotal = afterTotal + item?.product?.price?.price * item?.quantity;
    });

    if (user.savePoints > 0) {
      afterTotal = afterTotal - user?.savePoints;
    }

    return `${afterTotal}000`?.prettyMoney();
  };

  const finalPrice = () => {
    let finalPrice = 0;
    currentCart?.cartDetails?.map((item: any, index: number) => {
      finalPrice = finalPrice + item?.product?.price?.price * item?.quantity;
    });

    if (user.savePoints > 0) {
      finalPrice = finalPrice - user?.savePoints;
    }

    finalPrice = finalPrice + 50 + 1;

    return `${finalPrice}000`?.prettyMoney();
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold text-secondary-900">
        Thông tin đơn hàng
      </h1>
      <div className="mt-8 flex flex-col gap-y-4">
        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">Tạm tính</p>
          <p className="text-md font-bold text-green-600">{totalPrice()}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">
            Giảm giá ( bằng điểm )
          </p>
          <p className="text-md font-bold text-red-600">
            -{(user?.savePoints * 1000)?.toString()?.prettyMoney()}
          </p>
        </div>
        <Divider />

        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">
            Tạm tính sau giảm giá
          </p>
          <p className="text-md font-bold text-green-600">
            {afterTotalPrice()}
          </p>
        </div>

        <Divider />

        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">Phí giao hàng</p>
          <p className="text-md font-bold text-green-600">
            +{(50000)?.toString().prettyMoney()}
          </p>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">Phí dịch vụ</p>
          <p className="text-md font-bold text-green-600">
            +{(1000)?.toString()?.prettyMoney()}
          </p>
        </div>

        <Divider />

        <div className="flex w-full items-center justify-between">
          <p className="text-md font-bold text-secondary-900">Tổng ước tính</p>
          <p className="text-md font-bold text-green-600">{finalPrice()}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
