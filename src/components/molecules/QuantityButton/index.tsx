"use client";

import { AddShoppingCart } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import React from "react";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { IStoreProduct } from "@/types/models";

enum Mode {
  card = "card",
  detail = "detail",
}

interface IQuantityButtonProps {
  storeProduct: IStoreProduct;
  mode?: Mode;
}

const QuantityButton: React.FC<IQuantityButtonProps> = (props) => {
  const { storeProduct, mode = Mode.detail } = props;

  const {
    currentQuantity,
    currentCart,
    handleAddToCart,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    getUserCart,
    loading,
    handleRemoveProduct,
  } = useCart(storeProduct?.product as any);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <div className="z-20 flex items-center">
      {currentQuantity > 0 ? (
        <button
          className={`items-center rounded-full ${
            mode == Mode.detail ? "px-6 py-3" : "px-2 py-1"
          } ${
            mode == Mode.detail ? "min-w-[300px]" : "min-w-[130px]"
          } opactiy-50 flex h-[44px] w-fit justify-center border border-secondary-800 bg-white text-center text-lg font-semibold text-black hover:opacity-50`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <>
            {loading ? (
              <CircularProgress size={12} sx={{ color: "black" }} />
            ) : (
              <div className="flex w-full items-center justify-between">
                <IconButton
                  onClick={(e) => {
                    e?.preventDefault();
                    e.stopPropagation();
                    if (currentQuantity > 1) {
                      handleDecreaseQuantity();
                    } else {
                      handleRemoveProduct();
                    }
                  }}
                >
                  {currentQuantity > 1 ? (
                    <MinusIcon className="h-4 w-4 text-secondary-800" />
                  ) : (
                    <TrashIcon className="h-4 w-4 text-secondary-800" />
                  )}
                </IconButton>
                <span>{currentQuantity}</span>
                <IconButton
                  className="z-20"
                  onClick={(e) => {
                    e?.preventDefault();
                    e.stopPropagation();
                    handleIncreaseQuantity();
                  }}
                >
                  <PlusIcon className="h-4 w-4 text-secondary-800" />
                </IconButton>
              </div>
            )}
          </>
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e?.preventDefault();
            if (isAuthenticated) {
              handleAddToCart();
            } else {
              router?.push("/login");
            }
          }}
          className={`items-center rounded-full disabled:opacity-50 ${
            mode == Mode.detail ? "px-6 py-3" : "px-2 py-2"
          } ${
            mode == Mode.detail ? "min-w-[300px]" : "min-w-[100px]"
          } flex w-fit justify-center bg-primary-500 text-center text-lg font-semibold text-white hover:opacity-50`}
        >
          <>
            {loading ? (
              <CircularProgress size={32} />
            ) : (
              <>
                {mode == Mode.detail && (
                  <AddShoppingCart sx={{ width: 24, height: 24 }} />
                )}
                <p>{mode == Mode.detail ? "Thêm vào giỏ hàng" : "+ Add"}</p>
              </>
            )}
          </>
        </button>
      )}
    </div>
  );
};

export default QuantityButton;
