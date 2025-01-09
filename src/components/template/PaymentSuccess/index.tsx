"use client";
//@ts-ignore
import PaymentSuccessImage from "@/assets/images/PaymentSuccess.avif";
import Image from "next/image";

const PaymentSuccessTemplate = () => {
  return (
    <div className="mx-auto flex max-w-[1200px] justify-center">
      <Image src={PaymentSuccessImage} alt="Payment Success" />
    </div>
  );
};

export default PaymentSuccessTemplate;
