"use client";

import React, { useState } from "react";
import PersonalInformationDialog from "@/components/molecules/PeronsalInformationDialog";
import AddressDialog from "@/components/molecules/AddressDialog";
import useAuth from "@/hooks/useAuth";
import useOrder from "@/hooks/useOrder";
import Button from "@/components/atom/Button";
import { useRouter } from "next/navigation";
import OrderSummary from "@/components/organisms/OrderSummary";
import CartSummary from "@/components/organisms/CartSummary";
import { useToast } from "@/hooks/useToast";
import { Radio } from "@mui/material";
import useStore from "@/hooks/useStore";
import useCart from "@/hooks/useCart";
import axios from "axios";
import { apiURL } from "@/constanst";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/auth";
import {
  ICreateOrderAddressDto,
  ICreateOrderDto,
  ICreateOrderUserInfoDto,
} from "@/types/dtos";

interface ICreateOrderProps {}

const CreateOrder: React.FC<ICreateOrderProps> = (props) => {
  const [openUserInfo, setOpenUserInfo] = React.useState<boolean>(false);
  const [openAddress, setOpenAddress] = React.useState<boolean>(false);
  const [isApplyUserSavePoints, setIsApplyUserSavePoints] =
    useState<boolean>(false);
  const { createOrder, actionLoading } = useOrder();
  const { user, accessToken } = useAuth() || {};
  const router = useRouter();
  const toast = useToast();
  const { currentStore } = useStore();
  const { getUserCart } = useCart();

  const [orderUserInfo, setOrderUserInfo] =
    useState<ICreateOrderUserInfoDto | null>(null);
  const [orderAddress, setOrderAddress] =
    useState<ICreateOrderAddressDto | null>(null);
  const dispatch = useDispatch();

  const updateUserSavePoints = async (points: number) => {
    try {
      const response = await axios.put(
        `${apiURL}/auth/profile`,
        {
          savePoints: user?.savePoints - (user?.savePoints * 70) / 100,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response?.data?.success) {
        dispatch(setUser(response?.data?.data));
      }
    } catch (error) {
      console.error("Get order detail error", error);
    } finally {
    }
  };

  const handleClickCreateOrder = async (data: ICreateOrderDto) => {
    await createOrder(data, async () => {
      await getUserCart();
      router.push("/orders");
      if (isApplyUserSavePoints) {
        await updateUserSavePoints(
          Number(user?.savePoints - (user?.savePoints * 70) / 100),
        );
      } else {
        await updateUserSavePoints(Number(user?.savePoints + 1));
      }
    });
  };

  return (
    <>
      <div className="flex w-full max-w-full flex-col gap-y-8 px-8 tablet:gap-x-4 laptop:flex-row laptop:gap-x-10 laptop:gap-y-4">
        <div className="flex w-full flex-col gap-y-4 laptop:w-[70%]">
          <div className="border-secodary-600 grid w-full grid-cols-3 gap-x-4 rounded-2xl border px-8 py-4">
            <p className="text-md font-semibold text-secondary-900 laptop:text-xl">
              Thông tin người nhận
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="laptop:text-md text-sm text-secondary-900">
                {orderUserInfo?.firstName || user?.firstName}
              </p>
              <p className="laptop:text-md text-sm text-secondary-900">
                {orderUserInfo?.lastName || user?.lastName}
              </p>
              <p className="laptop:text-md text-sm text-secondary-900">
                {orderUserInfo?.email || user?.email}
              </p>
              <p className="laptop:text-md text-sm text-secondary-900">
                {orderUserInfo?.phoneNumber || user?.phoneNumber}
              </p>
              <button
                onClick={() => setOpenUserInfo(true)}
                border-none
                className="laptop:text-md w-full text-left text-sm font-bold text-primary-500"
              >
                Người khác nhận hàng giúp bạn?
              </button>
            </div>
          </div>

          <div className="border-secodary-600 grid w-full grid-cols-3 gap-x-4 rounded-2xl border px-8 py-4">
            <p className="text-md font-semibold text-secondary-900 laptop:text-xl">
              Địa chỉ nhận hàng
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="laptop:text-md text-sm text-secondary-900">
                {orderAddress?.province || "Tỉnh: Không rõ"}
              </p>
              <p className="laptop:text-md text-sm text-secondary-900">
                {orderAddress?.district || "Huyện: Không rõ"}
              </p>
              <p className="laptop:text-md text-sm text-secondary-900">
                {orderAddress?.ward || "Quận: Không rõ"}
              </p>
              <p className="laptop:text-md text-sm text-secondary-900">
                {orderAddress?.address || "Địa chỉ: Không rõ"}
              </p>
            </div>

            <button
              onClick={() => setOpenAddress(true)}
              border-none
              className="laptop:text-md w-full text-left text-sm font-bold text-primary-500"
            >
              Chỉnh sửa
            </button>
          </div>

          <div className="border-secodary-600 grid w-full grid-cols-3 gap-x-4 rounded-2xl border px-8 py-4">
            <p className="text-md font-semibold text-secondary-900 laptop:text-xl">
              Thanh toán
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="laptop:text-md text-sm text-secondary-900">
                Thanh toán khi nhận hàng
              </p>
            </div>

            <button
              border-none
              className="laptop:text-md w-full text-left text-sm font-bold text-primary-500"
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
        <div className="w-full cursor-pointer flex-col gap-y-4 rounded-lg border border-secondary-600 px-8 py-4 laptop:flex laptop:w-[30%]">
          <CartSummary
            isApplyUserSavePoints={isApplyUserSavePoints}
            shippingFee={orderAddress?.shippingFee}
          />

          {user?.savePoints && (
            <button className="ml-[-4px] flex items-center text-left text-secondary-900">
              <Radio
                // onBlur={() => setIsApplyUserSavePoints(false)}
                checked={isApplyUserSavePoints}
                onChange={() =>
                  setIsApplyUserSavePoints(!isApplyUserSavePoints)
                }
              />
              Sử dụng điểm tích lũy:{" "}
              {((user?.savePoints * 70) / 100)?.toFixed(0) || 0} tương ứng{" "}
              {Number(((user?.savePoints * 70) / 100) * 1000)
                ?.toString()
                .prettyMoney()}
            </button>
          )}

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
                  isApplyUserSavePoints: isApplyUserSavePoints,
                });
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
    </>
  );
};

export default CreateOrder;
