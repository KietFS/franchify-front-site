import React, { useState } from "react";
import {
  ICreateOrder,
  ICreateOrderAddress,
  ICreateOrderUserInfo,
  IOrder,
} from "@/@types";
import { Divider } from "@mui/material";
import PersonalInformationDialog from "@/components/molecules/PeronsalInformationDialog";
import AddressDialog from "@/components/molecules/AddressDialog";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import OrderSummary from "@/components/organisms/OrderSummary";
import useOrder from "@/hooks/useOrder";
import Button from "@/components/atom/Button";
import { useRouter } from "next/navigation";

interface ICreateOrderProps {}

const CreateOrder: React.FC<ICreateOrderProps> = (props) => {
  const [openUserInfo, setOpenUserInfo] = React.useState<boolean>(false);
  const [openAddress, setOpenAddress] = React.useState<boolean>(false);
  const { createOrder } = useOrder();
  const { user } = useAuth();
  const router = useRouter();

  const [orderUserInfo, setOrderUserInfo] =
    useState<ICreateOrderUserInfo | null>(null);
  const [orderAddress, setOrderAddress] = useState<ICreateOrderAddress | null>(
    null,
  );

  const handleClickCreateOrder = async (data: ICreateOrder) => {
    await createOrder(data, () => router.push("/orders"));
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
              <p className="text-secondary-900">Lucas Viera</p>
              <p className="text-secondary-900">heysir@yopmail.com</p>
              <p className="text-secondary-900">0819190227</p>
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
              <p className="text-secondary-900">Tỉnh Thanh Hóa</p>
              <p className="text-secondary-900">Thành phố Việt Trì</p>
              <p className="text-secondary-900">heysir@yopmail.com</p>
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
              border-none
              className="text-right font-bold text-primary-500"
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
        <div className="w-full cursor-pointer flex-col gap-y-4 rounded-lg border border-secondary-600 px-8 py-4 tablet:w-[30%] laptop:flex">
          <OrderSummary />

          <Button
            onClick={() => {
              handleClickCreateOrder({
                orderAddress: orderAddress,
                orderUserInfo: orderUserInfo,
              });
            }}
            className="mt-6"
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
