"use client";

import OrderItem from "@/components/atom/OrderItem";
import useOrder from "@/hooks/useOrder";
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
    <div className="flex w-full gap-x-10">
      <div className="flex flex-col gap-y-4 w-full laptop:w-[70%]">
        {orders?.map((item: any, index: number) => (
          <Link href={`/orders/${item.id}`} key={index}>
            <OrderItem key={index} orderItem={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;
