"use client";

import Button from "@/components/atom/Button";
import useAuth from "@/hooks/useAuth";
import useStore from "@/hooks/useStore";
import React from "react";

interface ICartMethodProps {}

const CartMethod: React.FC<ICartMethodProps> = (props) => {
  const { user, isAuthenticated } = useAuth();
  const { currentStore } = useStore();
  return (
    <div className="flex w-auto flex-col items-start justify-between gap-y-4 rounded-xl border border-secondary-600 px-4 py-6 laptop:flex-row laptop:px-8 laptop:py-6">
      <div className="flex w-fit flex-col gap-y-4">
        <h1 className="text-xl font-bold text-secondary-900">
          Nhận tại cửa hàng
        </h1>

        <div className="flex flex-col gap-y-2">
          <h3 className="text-md break-words font-semibold text-secondary-900">
            Nhận hàng tại cửa hàng {currentStore?.name} ( Store{" "}
            {currentStore?.id} )
          </h3>
          <p className="text-sm text-secondary-700">
            Available as soon as Tuesday, January 07 at 9:00 AM - 10:00 AM
          </p>
        </div>

        <div className="flex w-fit gap-x-4">
          <button className="w-max flex-wrap rounded-full border border-secondary-700 bg-white px-4 py-2 text-center font-semibold text-secondary-900">
            Đổi cừa hàng
          </button>
          <button className="w-max flex-wrap rounded-full bg-primary-500 px-4 py-2 text-center font-semibold text-secondary-500">
            Chọn giờ
          </button>
        </div>
      </div>
      <button className="w-max flex-wrap rounded-full border border-secondary-700 bg-white px-4 py-2 text-center font-semibold text-secondary-900">
        Đổi sang vận chuyển
      </button>
    </div>
  );
};

export default CartMethod;
