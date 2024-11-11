"use client";

import OrderDetailTemplate from "@/components/template/OrderDetail";
import useOrder from "@/hooks/useOrder";
import React, { useEffect } from "react";

interface IOrderDetailPageProps {}

const OrderDetailPage: React.FC<IOrderDetailPageProps> = (props) => {
  const { currentOrder, getOrderById } = useOrder();

  useEffect(() => {
    !currentOrder && getOrderById((props as any)?.params?.id);
  }, []);

  return <OrderDetailTemplate orderDetail={currentOrder} />;
};

export default OrderDetailPage;
