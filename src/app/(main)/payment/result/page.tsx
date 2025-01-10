import PaymentSuccessTemplate from "@/components/template/PaymentSuccess";
import React from "react";

const PaymentResultPage = (props: any) => {
  console.log("router", props.searchParams);

  return <PaymentSuccessTemplate />;
};

export default PaymentResultPage;
