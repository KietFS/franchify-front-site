"use client";

import CreateOrder from "@/components/template/CreateOrder";
import useOrder from "@/hooks/useOrder";
import React, { useEffect } from "react";

interface IOrderDetailPageProps {}

const OrderDetailPage: React.FC<IOrderDetailPageProps> = (props) => {
  const { currentOrder, getOrderById } = useOrder();

  useEffect(() => {
    !currentOrder && getOrderById((props as any)?.params?.id);
  }, []);

  return <CreateOrder initialValue={currentOrder} />;
};

export default OrderDetailPage;
