import React, { useState } from "react";
import { IOrder } from "@/@types";
import { Divider } from "@mui/material";
import PersonalInformationDialog from "@/components/molecules/PeronsalInformationDialog";

interface IOrderDetailTemplateProps {
  orderDetail: IOrder;
}

const OrderDetailTemplate: React.FC<IOrderDetailTemplateProps> = (props) => {
  const [openUserInfo, setOpenUserInfo] = React.useState<boolean>(false);
  const { orderDetail } = props;

  return (
    <>
      <div className="flex flex-col tablet:flex-row w-full gap-10">
        <div className="flex flex-col gap-y-4 w-full tablet:w-[70%] ">
          <div className="border rounded-2xl border-secodary-600 w-full px-8 py-4 grid grid-cols-3">
            <p className="text-xl text-secondary-900 font-semibold">
              Thông tin người nhận
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">Lucas Viera</p>
              <p className="text-secondary-900">heysir@yopmail.com</p>
              <p className="text-secondary-900">0819190227</p>
              <button
                onClick={() => setOpenUserInfo(true)}
                border-none
                className="text-primary-500 font-bold text-left"
              >
                Người khác nhận hàng giúp bạn?
              </button>
            </div>
          </div>

          <div className="border rounded-2xl border-secodary-600 w-full px-8 py-4 grid grid-cols-3">
            <p className="text-xl text-secondary-900 font-semibold">
              Địa chỉ nhận hàng
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">Tỉnh Thanh Hóa</p>
              <p className="text-secondary-900">Thành phố Việt Trì</p>
              <p className="text-secondary-900">heysir@yopmail.com</p>
            </div>

            <button
              border-none
              className="text-primary-500 font-bold text-right"
            >
              Chỉnh sửa
            </button>
          </div>

          <div className="border rounded-2xl border-secodary-600 w-full px-8 py-4 grid grid-cols-3">
            <p className="text-xl text-secondary-900 font-semibold">
              Thanh toán
            </p>

            <div className="flex flex-col gap-y-2">
              <p className="text-secondary-900">Tiền mặt</p>
            </div>

            <button
              border-none
              className="text-primary-500 font-bold text-right"
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
        <div
          className="tablet:w-[30%] w-full laptop:flex 
      border-secondary-600 rounded-lg border cursor-pointer px-8 py-4 flex-col gap-y-4"
        >
          <h1 className="text-secondary-900 text-xl font-bold">
            Tóm tắt đơn hàng
          </h1>
          <Divider />
        </div>
      </div>

      {openUserInfo ? (
        <PersonalInformationDialog
          onSave={() => {}}
          open={openUserInfo}
          onClose={() => setOpenUserInfo(false)}
        />
      ) : null}
    </>
  );
};

export default OrderDetailTemplate;
