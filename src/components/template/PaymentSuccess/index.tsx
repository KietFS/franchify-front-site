"use client";
//@ts-ignore
import PaymentSuccessImage from "@/assets/images/PaymentSuccess.svg";
import Image from "next/image";

const PaymentSuccessTemplate = () => {
  return (
    <div className="mx-auto flex min-h-[800px] max-w-[1200px] flex-col items-center px-8 py-10">
      <div className="flex w-full items-center gap-x-10 rounded-xl px-16 py-10">
        <div className="max-w-[50%] border-r border-secondary-700 pr-10">
          <h1 className="text-4xl font-bold text-secondary-900">
            Thanh toán thành công
          </h1>
          <Image
            src={PaymentSuccessImage}
            alt="Payment Success"
            width={400}
            height={400}
            color="blue"
            className="text-red-50"
          />
          <p className="text-center text-xl font-normal text-secondary-800">
            Bạn đã thanh toán đơn hàng hành công. Chúng tôi đã gửi một email đến
            hòm thư của bạn. Vui lòng kiểm tra email để xem thông tin chi tiết
            đơn hàng.
          </p>
        </div>

        <div className="flex max-w-[50%] flex-col justify-start gap-y-4">
          <h1 className="text-center text-4xl font-bold text-secondary-900">
            Thông tin đơn hàng
          </h1>

          <div className="w-fulll flex justify-between gap-y-10">
            <p className="text-xl font-semibold text-secondary-900">
              Phương thức thanh toán:
            </p>
            <p className="font-regular text-xl text-secondary-800">VNPAY</p>
          </div>
          <div className="w-fulll flex justify-between gap-y-10">
            <p className="text-xl font-semibold text-secondary-900">
              Phương thức thanh toán:
            </p>
            <p className="font-regular text-xl text-secondary-800">VNPAY</p>
          </div>
          <div className="w-fulll flex justify-between gap-y-10">
            <p className="text-xl font-semibold text-secondary-900">
              Phương thức thanh toán:
            </p>
            <p className="font-regular text-xl text-secondary-800">VNPAY</p>
          </div>
          <div className="w-fulll flex justify-between gap-y-10">
            <p className="text-xl font-semibold text-secondary-900">
              Phương thức thanh toán:
            </p>
            <p className="font-regular text-xl text-secondary-800">VNPAY</p>
          </div>
          <div className="w-fulll flex justify-between gap-y-10">
            <p className="text-xl font-semibold text-secondary-900">
              Phương thức thanh toán:
            </p>
            <p className="font-regular text-xl text-secondary-800">VNPAY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessTemplate;
