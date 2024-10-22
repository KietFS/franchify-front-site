"use client";

import { AddShoppingCart } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

interface IQuantityButtonProps {
  storeProduct: IStoreProduct;
}

const QuantityButton: React.FC<IQuantityButtonProps> = (props) => {
  const [currentQuantity, setCurrentQuantity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <div className="flex items-center">
      <button
        className={`items-center rounded-full px-6 py-3 min-w-[300px] justify-center text-center w-fit flex hover:opacity-50 bg-gray-800 text-white font-semibold text-lg ${
          false ? "opacity-20" : ""
        }`}
      >
        <>
          {isLoading ? (
            <CircularProgress size={32} />
          ) : (
            <>
              <AddShoppingCart sx={{ marginRight: 1 }} />{" "}
              <p>Thêm vào giỏ hàng</p>
            </>
          )}
        </>
      </button>
    </div>
  );
};

export default QuantityButton;
