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

  const dispatchSetPaymentMethod = dispatch(setPaymentMethod);

  return {
    // payment
    bankList,
    bankListLoading,
    getBankList,
    paymentMethod,
    dispatchSetPaymentMethod,
  };
};

export default usePayment;
