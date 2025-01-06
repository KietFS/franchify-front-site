"use client";

import React, { use, useEffect, useMemo } from "react";
import CustomDialog from "../CustomDialog";
import usePayment from "@/hooks/usePayment";

interface IPaymentDialogProps {
  onClose: () => void;
}

const PaymentDialog: React.FC<IPaymentDialogProps> = (props) => {
  const { onClose } = props;
  const { getBankList, bankList } = usePayment();

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

  return (
    <CustomDialog
      open={true}
      onClose={onClose}
      title="Phương thức thanh toán"
      children={
        <ul className="flex flex-col gap-y-6">
          {paymentMethods?.map((method, index) => (
            <li
              tabIndex={0}
              className="list-none"
              key={`payment-method-${index}`}
            >
              <div className="flex cursor-pointer items-center gap-x-4 rounded-xl border border-secondary-600 px-6 py-4">
                {/* <img
                  src={method?.logo || ""}
                  alt={method.name}
                  className="h-16 w-16"
                /> */}
                <div>
                  <p className="text-xl font-semibold text-secondary-900">
                    {method.name}
                  </p>
                  <p className="text-secondary-900">{method.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      }
    />
  );
};

export default PaymentDialog;
