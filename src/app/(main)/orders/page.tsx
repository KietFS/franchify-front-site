"use client";

import { IOrder } from "@/@types";
import OrderItem from "@/components/atom/OrderItem";
import useOrder from "@/hooks/useOrder";
import { Divider } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";

interface IOrderPageProps {}

const Orders: React.FC<IOrderPageProps> = (props) => {
  const {} = props;
  const { getAllOrders, orders } = useOrder();

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="flex flex-col tablet:flex-row w-full gap-10">
      <div className="flex flex-col gap-y-4 w-full tablet:w-[70%] ">
        {orders?.map((item: any, index: number) => (
          <Link href={`/orders/${item.id}`} key={index}>
            <OrderItem key={index} orderItem={item} />
          </Link>
        ))}
      </div>
      <div
        className="tablet:w-[30%] w-full laptop:flex 
      border-secondary-600 rounded-lg border cursor-pointer px-8 py-4 flex-col gap-y-4"
      >
        <h1 className="text-secondary-900 text-2xl font-bold">Thống kê</h1>
        <Divider />
        <div className="flex w-full justify-between">
          <p className="text-green-600 font-semibold">Số đơn hàng đã mua</p>
          <p className="text-gray-600 font-regular">{orders?.length}</p>
        </div>

        <div className="flex w-full justify-between">
          <p className="text-yellow-600 font-semibold">Đang đợi</p>
          <p className="text-gray-600 font-regular">
            {
              orders.filter((order: IOrder) => order?.status === "processing")
                ?.length
            }
          </p>
        </div>

        <div className="flex w-full justify-between">
          <p className="text-blue-600 font-semibold">Cửa hàng đã nhận</p>
          <p className="text-gray-600 font-regular">
            {
              orders.filter((order: IOrder) => order?.status === "received")
                ?.length
            }
          </p>
        </div>

        <div className="flex w-full justify-between">
          <p className="text-red-600 font-semibold">Đang xử lý</p>
          <p className="text-gray-600 font-regular">
            {
              orders.filter((order: IOrder) => order?.status === "processing")
                ?.length
            }
          </p>
        </div>

        <div className="flex w-full justify-between">
          <p className="text-cyan-600 font-semibold">Đang vận chuyển</p>
          <p className="text-gray-600 font-regular">
            {
              orders.filter((order: IOrder) => order?.status === "shipping")
                ?.length
            }
          </p>
        </div>

        <div className="flex w-full justify-between">
          <p className="text-green-600 font-semibold">Đã giao hàng</p>
          <p className="text-gray-600 font-regular">
            {
              orders.filter((order: IOrder) => order?.status === "delivered")
                ?.length
            }
          </p>
        </div>

        <div className="flex w-full justify-between">
          <p className="text-cyan-600 font-semibold">Đã hủy</p>
          <p className="text-gray-600 font-regular">
            {
              orders.filter((order: IOrder) => order?.status === "cacelled")
                ?.length
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
