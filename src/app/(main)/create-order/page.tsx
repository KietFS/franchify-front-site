"use client";

import { IOrder } from "@/@types";
import CreateOrder from "@/components/template/CreateOrder";
import useOrder from "@/hooks/useOrder";
import React, { useEffect } from "react";

interface ICreateOrderPageProps {
  initalValue: Partial<IOrder>;
}

const CreateOrderPage: React.FC<ICreateOrderPageProps> = (props) => {
  return <CreateOrder initialValue={props?.initalValue} />;
};

export default CreateOrderPage;
