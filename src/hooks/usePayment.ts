import { apiURL } from "@/constanst";
import { IRootState } from "@/redux";
import { setPaymentMethod } from "@/redux/slices/payment";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "./useAuth";

interface IPaymentVerifyPayload {
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

interface ICreatePaymentRecord {
  amount: string;
  bankCode: string;
  bankTranNo: string;
  cardType: string;
  orderInfo: string;
  payDate: string;
  responseCode: string;
  tmnCode: string;
  transactionNo: string;
  transactionStatus: string;
  txnRef: string;
  secureHash: string;
}

const usePayment = () => {
  const [bankList, setBankList] = useState([]);
  const [bankListLoading, setBankListLoading] = useState(false);
  const { paymentMethod } = useSelector((state: IRootState) => state.payment);
  const dispatch = useDispatch();
  const { accessToken } = useAuth();

  const getBankList = async () => {
    try {
      setBankListLoading(true);
      const response = await fetch(`${apiURL}/payment/vnpay-bank-list`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("response data", data);
        if (data.success) {
          setBankList(data.data);
        }
      } else {
        console.log("Failed to fetch bank list", response.statusText);
      }
    } catch (error) {
      console.log("Get bank list error", error);
    } finally {
      setBankListLoading(false);
    }
  };

  const createPaymentUrl = async (payload: {
    amount: number;
    orderId: number;
  }) => {
    try {
      const response = await fetch(`${apiURL}/payment/vnpay-create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log("Failed to create payment url", response.statusText);
        return null;
      }
    } catch (error) {
      console.log("Create payment url error", error);
      return null;
    }
  };

  const getPaymentStatus = async (payload: IPaymentVerifyPayload) => {
    try {
      const status = await axios.post(`${apiURL}/payment/verify`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (status) {
        return status;
      }
    } catch (error) {
      console.log("Get payment status error");
    }
  };

  const createPaymentRecord = async (payload: ICreatePaymentRecord) => {
    try {
      const createRecordRes = await axios.post(
        `${apiURL}/payment/create-record`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (createRecordRes?.data) {
        return createRecordRes.data;
      }
    } catch (error) {
      console.log("Create payment record error");
    }
  };

  const fetchPaymentStatus = async (orderId: string | number) => {
    try {
      const createRecordRes = await axios.post(
        `${apiURL}/payment/create-record`,
        {
          orderid: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log("createRecordRes", createRecordRes);
      if (createRecordRes?.data) {
        return createRecordRes.data;
      }
    } catch (error) {
      console.log("verify payment error");
    }
  };

  const dispatchSetPaymentMethod = (payload: any) =>
    dispatch(setPaymentMethod(payload));

  return {
    // payment
    bankList,
    bankListLoading,
    getBankList,
    paymentMethod,
    dispatchSetPaymentMethod,
    createPaymentUrl,
    getPaymentStatus,
    createPaymentRecord,
    fetchPaymentStatus,
  };
};

export default usePayment;
