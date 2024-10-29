"use client";

import { AddShoppingCart } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import React, { useEffect } from "react";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import useCart from "@/hooks/useCart";

interface IQuantityButtonProps {
  storeProduct: IStoreProduct;
}

const QuantityButton: React.FC<IQuantityButtonProps> = (props) => {
  const { storeProduct } = props;

  const {
    currentQuantity,
    currentCart,
    handleAddToCart,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    getCartById,
    loading,
    handleRemoveProduct,
  } = useCart(storeProduct?.product);

  useEffect(() => {
    !currentCart && getCartById();
  }, []);

  return (
    <div className="flex items-center">
      {currentQuantity > 0 ? (
        <button
          className={`items-center rounded-full px-6 py-3 min-w-[300px] justify-center text-center w-fit flex hover:opacity-50 bg-white text-black border border-gray-800 font-semibold text-lg ${
            false ? "opacity-20" : ""
          }`}
        >
          <>
            {loading ? (
              <CircularProgress size={24} sx={{ color: "black" }} />
            ) : (
              <div className="w-full flex justify-between items-center">
                <IconButton
                  onClick={() => {
                    if (currentQuantity > 1) {
                      handleDecreaseQuantity();
                    } else {
                      handleRemoveProduct();
                    }
                  }}
                >
                  {currentQuantity > 1 ? (
                    <MinusIcon className="w-4 h-4 text-gray-800" />
                  ) : (
                    <TrashIcon className="w-4 h-4 text-gray-800" />
                  )}
                </IconButton>
                <span>{currentQuantity}</span>
                <IconButton onClick={handleIncreaseQuantity}>
                  <PlusIcon className="w-4 h-4 text-gray-800" />
                </IconButton>
              </div>
            )}
          </>
        </button>
      ) : (
        <button
          onClick={() => handleAddToCart()}
          className={`items-center rounded-full px-6 py-3 min-w-[300px] justify-center text-center w-fit flex hover:opacity-50 bg-gray-800 text-white font-semibold text-lg `}
        >
          <>
            {loading ? (
              <CircularProgress size={32} />
            ) : (
              <>
                <AddShoppingCart sx={{ marginRight: 1 }} />{" "}
                <p>Thêm vào giỏ hàng</p>
              </>
            )}
          </>
        </button>
      )}
    </div>
  );
};

export default QuantityButton;
