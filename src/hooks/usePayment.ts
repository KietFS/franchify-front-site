import { apiURL } from "@/constanst";
import { IRootState } from "@/redux";
import { setPaymentMethod } from "@/redux/slices/payment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const usePayment = () => {
  const [bankList, setBankList] = useState([]);
  const [bankListLoading, setBankListLoading] = useState(false);
  const { paymentMethod } = useSelector((state: IRootState) => state.payment);
  const dispatch = useDispatch();

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
  };
};

export default usePayment;
