"use client";

import axios from "axios";
import React, { useEffect, useMemo } from "react";
import usePayment from "@/hooks/usePayment";

interface IPaymentPageProps {
  searchParams: IVnpayResponse;
}

interface IVnpayResponse {
  vnp_Amount: string;
  vnp_BankCode: string;
  vnp_BankTranNo: string;
  vnp_CardType: string;
  vnp_OrderInfo: string;
  vnp_PayDate: string;
  vnp_ResponseCode: string;
  vnp_TmnCode: string;
  vnp_TransactionNo: string;
  vnp_TransactionStatus: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
}

const PaymentPage: React.FC<IPaymentPageProps> = (props: {
  searchParams: IVnpayResponse;
}) => {
  const { createPaymentRecord } = usePayment();

  const initialize = async () => {
    const data = await createPaymentRecord({
      amount: payload.vnp_Amount,
      bankCode: payload.vnp_BankCode,
      bankTranNo: payload.vnp_BankTranNo,
      cardType: payload.vnp_CardType,
      orderInfo: payload.vnp_OrderInfo,
      payDate: payload.vnp_PayDate,
      responseCode: payload.vnp_ResponseCode,
      tmnCode: payload.vnp_TmnCode,
      transactionNo: payload.vnp_TransactionNo,
      transactionStatus: payload.vnp_TransactionStatus,
      txnRef: payload.vnp_TxnRef,
      secureHash: payload.vnp_SecureHash,
    });
    if (data) {
      window.close();
    } else {
      window.close();
    }
  };

  const payload = useMemo(() => {
    return props.searchParams;
  }, [props.searchParams]);

  useEffect(() => {
    if (!payload) return;

    initialize();
  }, [props.searchParams]);

  return <div></div>;
};

export default PaymentPage;
