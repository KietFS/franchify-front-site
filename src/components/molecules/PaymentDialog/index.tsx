"use client";

import React, { use, useEffect, useMemo, useState } from "react";
import CustomDialog from "../CustomDialog";
import usePayment from "@/hooks/usePayment";
import { Radio } from "@mui/material";
import useConfig from "@/hooks/useConfig";
import { useDispatch } from "react-redux";
import { setPaymentMethod } from "@/redux/slices/payment";
import Button from "@/components/atom/Button";

interface IPaymentDialogProps {
  onClose: () => void;
}

const PaymentDialog: React.FC<IPaymentDialogProps> = (props) => {
  const { onClose } = props;
  const { getBankList, bankList } = usePayment();
  const { paymentMethod, dispatchSetPaymentMethod } = usePayment();
  const { tenantConfigs } = useConfig();
  const dispatch = useDispatch();

  const paymentMethods = useMemo(() => {
    return [
      {
        id: 1,
        name: "Thanh toán khi nhận hàng",
        description: "Thanh toán khi nhận hàng",
        logo: null,
      },
      {
        id: 2,
        name: "Thanh toán qua VNPay",
        description: "Thanh toán qua VnPay",
        logo: null,
      },
    ];
  }, []);

  useEffect(() => {
    getBankList();
  }, []);

  const handleConfirmOrder = () => {};

  return (
    <CustomDialog
      open={true}
      onClose={onClose}
      title="Phương thức thanh toán"
      children={
        <div className="flex flex-col justify-between gap-y-10">
          <ul className="flex flex-col gap-y-6">
            {paymentMethods?.map((method, index) => (
              <li
                tabIndex={0}
                className="list-none"
                key={`payment-method-${index}`}
              >
                <button
                  onClick={() => dispatch(setPaymentMethod(method))}
                  className="flex w-full cursor-pointer items-start gap-x-4 rounded-xl border border-secondary-600 px-6 py-4 text-left"
                >
                  {/* <img
                  src={method?.logo || ""}
                  alt={method.name}
                  className="h-16 w-16"
                /> */}
                  <Radio
                    sx={{
                      color: tenantConfigs?.primaryColorScheme || "primary",
                      "&.Mui-checked": {
                        color: tenantConfigs?.primaryColorScheme || "primary",
                      },
                    }}
                    className="text-primary-500"
                    checked={method == paymentMethod}
                  />
                  <div>
                    <p className="text-xl font-bold text-primary-500">
                      {method.name}
                    </p>
                    <p className="text-secondary-900">{method.description}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex w-full flex-row-reverse gap-x-8">
            <Button onClick={() => onClose()} className="w-[200px]">
              Xác nhận
            </Button>
            {/* <Button className="w-fit">Xác nhận</Button> */}
          </div>
        </div>
      }
    />
  );
};

export default PaymentDialog;
