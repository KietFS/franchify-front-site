import { apiURL } from "@/constanst";
import { useState } from "react";

const usePayment = () => {
  const [bankList, setBankList] = useState([]);
  const [bankListLoading, setBankListLoading] = useState(false);

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

  return {
    // payment
    bankList,
    bankListLoading,
    getBankList,
  };
};

export default usePayment;
