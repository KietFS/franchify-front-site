"use client";

import React, { useState } from "react";
import PersonalInformationDialog from "@/components/molecules/PeronsalInformationDialog";
import AddressDialog from "@/components/molecules/AddressDialog";
import useAuth from "@/hooks/useAuth";
import useOrder from "@/hooks/useOrder";
import Button from "@/components/atom/Button";
import { useRouter } from "next/navigation";
import CartSummary from "@/components/organisms/CartSummary";
import { useToast } from "@/hooks/useToast";
import useStore from "@/hooks/useStore";
import useCart from "@/hooks/useCart";
import {
  ICreateOrderAddressDto,
  ICreateOrderDto,
  ICreateOrderUserInfoDto,
} from "@/types/dtos";
import PaymentDialog from "@/components/molecules/PaymentDialog";
import { setPaymentMethod } from "@/redux/slices/payment";
import { useSelector } from "react-redux";

interface ICreateOrderProps {}

const CreateOrder: React.FC<ICreateOrderProps> = (props) => {
  const [openUserInfo, setOpenUserInfo] = React.useState<boolean>(false);
  const [openAddress, setOpenAddress] = React.useState<boolean>(false);
  const [openPayment, setOpenPayment] = React.useState<boolean>(false);
  const { createOrder, actionLoading } = useOrder();
  const { user } = useAuth() || {};
  const router = useRouter();
  const toast = useToast();
  const { currentStore } = useStore();
  const { getUserCart } = useCart();
  const { paymentMethod } = useSelector((state: any) => state.payment);

  const [orderUserInfo, setOrderUserInfo] =
    useState<ICreateOrderUserInfoDto | null>(null);
  const [orderAddress, setOrderAddress] =
    useState<ICreateOrderAddressDto | null>(null);

  const handleClickCreateOrder = async (data: ICreateOrderDto) => {
    await createOrder(data, async (resData) => {
      if (resData?.paymentUrl) {
        toast.sendToast("Thành công", "Vui lòng thanh toán đơn hàng");
        window.open(resData.paymentUrl, "_blank");
      } else {
        toast.sendToast("Thành công", "Đặt hàng thành công");
        await getUserCart();
        router.push("/orders");
      }
    });
  };

  return (
    <>
      <div className="flex w-full flex-col gap-10 tablet:flex-row">
        <div className="flex w-full flex-col gap-y-4 tablet:w-[70%]">
          <div className="border-secodary-600 grid w-full grid-cols-3 rounded-2xl border px-8 py-4">
            <p className="text-xl font-semibold text-secondary-900">
              Thông tin người nhận
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">
                {orderUserInfo?.firstName || user?.firstName}
              </p>
              <p className="text-secondary-900">
                {orderUserInfo?.lastName || user?.lastName}
              </p>
              <p className="text-secondary-900">
                {orderUserInfo?.email || user?.email}
              </p>
              <p className="text-secondary-900">
                {orderUserInfo?.phoneNumber || user?.phoneNumber}
              </p>
              <button
                onClick={() => setOpenUserInfo(true)}
                border-none
                className="text-left font-bold text-primary-500"
              >
                Người khác nhận hàng giúp bạn?
              </button>
            </div>
          </div>

          <div className="border-secodary-600 grid w-full grid-cols-3 rounded-2xl border px-8 py-4">
            <p className="text-xl font-semibold text-secondary-900">
              Địa chỉ nhận hàng
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">
                {orderAddress?.province || "Tỉnh: Không rõ"}
              </p>
              <p className="text-secondary-900">
                {orderAddress?.district || "Huyện: Không rõ"}
              </p>
              <p className="text-secondary-900">
                {orderAddress?.ward || "Quận: Không rõ"}
              </p>
              <p className="text-secondary-900">
                {orderAddress?.address || "Địa chỉ: Không rõ"}
              </p>
            </div>

            <button
              onClick={() => setOpenAddress(true)}
              border-none
              className="text-right font-bold text-primary-500"
            >
              Chỉnh sửa
            </button>
          </div>

          <div className="border-secodary-600 grid w-full grid-cols-3 rounded-2xl border px-8 py-4">
            <p className="text-xl font-semibold text-secondary-900">
              Thanh toán
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">Thanh toán khi nhận hàng</p>
            </div>

            <button
              onClick={() => setOpenPayment(true)}
              className="border-none text-right font-bold text-primary-500"
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
        <div className="w-full cursor-pointer flex-col gap-y-4 rounded-lg border border-secondary-600 px-8 py-4 tablet:w-[30%] laptop:flex">
          <CartSummary shippingFee={orderAddress?.shippingFee} />

          <Button
            isLoading={actionLoading}
            onClick={() => {
              if (!orderAddress) {
                toast.sendToast(
                  "Thất bại",
                  "Vui lòng chọn địa chỉ nhận hàng",
                  "error",
                );
              } else {
                handleClickCreateOrder({
                  orderAddress: orderAddress,
                  storeId: currentStore?.id,
                  orderUserInfo: orderUserInfo || {
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber,
                  },
                  paymentMethod: paymentMethod?.id,
                } as any);
              }
            }}
            className="mt-12"
          >
            Đặt hàng
          </Button>
        </div>
      </div>

      {openUserInfo ? (
        <PersonalInformationDialog
          onSave={(data) => setOrderUserInfo(data)}
          open={openUserInfo}
          onClose={() => setOpenUserInfo(false)}
        />
      ) : null}

      {openAddress ? (
        <AddressDialog
          open={openAddress}
          onSubmited={(data) => {
            setOpenAddress(false);
            setOrderAddress(data);
          }}
          onClose={() => setOpenAddress(false)}
        />
      ) : null}

      {openPayment ? (
        <PaymentDialog
          onSelectPaymentMethod={(method) => {}}
          onClose={() => setOpenPayment(false)}
        />
      ) : null}
    </>
  );
};

export default CreateOrder;
