"use client";

import React, { useEffect } from "react";
import Button from "@/components/atom/Button";
import CartItem from "@/components/atom/CartItem";
import CartMethod from "@/components/molecules/CartMethod";
import CartSummary from "@/components/organisms/CartSummary";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import useOrder from "@/hooks/useOrder";
import { CircularProgress, Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  InformationCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface ICartTemplateProps {}

const CartTemplate: React.FC<ICartTemplateProps> = (props) => {
  const { user, isAuthenticated } = useAuth();
  const { getUserCart, loading, currentCart } = useCart();
  const { actionLoading } = useOrder();
  const router = useRouter();

  useEffect(() => {
    !currentCart && user && getUserCart();
  }, []);

  const handleClickCreateOrder = async () => {
    router.push("/create-order");
  };

  return (
    <>
      <div className="flex min-h-[700px] w-full max-w-full justify-center px-8 py-20">
        {currentCart?.cartDetails?.length > 0 ? (
          <div className="flex h-fit w-[1200px] flex-col gap-y-8">
            <h1 className="text-3xl font-bold text-secondary-900">
              Giỏ hàng của bạn
            </h1>
            <CartMethod />
            <Divider />
            <div className="flex flex-col gap-x-4 gap-y-4 laptop:flex-row">
              <div className="flex max-h-[700px] w-full flex-col gap-y-4 overflow-auto laptop:w-2/3">
                <h2 className="break-words text-2xl font-bold text-gray-900">
                  {currentCart?.cartDetails?.length} items
                </h2>
                {currentCart?.cartDetails?.map((item: any, index: number) => (
                  <CartItem key={index} cartItem={item} />
                ))}
              </div>

              <div className="h-full w-[10px] bg-primary-200"></div>

              <div className="flex w-full flex-col justify-between gap-y-8 rounded-xl border border-secondary-600 px-6 py-8 laptop:w-1/3">
                <CartSummary />
                <Button
                  onClick={() => handleClickCreateOrder()}
                  isLoading={actionLoading}
                  title="Tiếp tục đặt hàng"
                >
                  Tiếp tục đặt hàng
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {isAuthenticated ? (
              <>
                {loading ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <CircularProgress size={24} />
                  </div>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <ShoppingBagIcon className="h-20 w-20 text-secondary-800" />
                    <h1 className="mt-4 text-3xl font-bold text-secondary-900">
                      Giỏ hàng đang trống
                    </h1>
                    <Link href="/">
                      <p className="text-md mt-4 font-bold text-secondary-900 underline">
                        Quay lại trang chủ
                      </p>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <InformationCircleIcon className="h-20 w-20 text-secondary-800" />
                  <h1 className="mt-4 text-3xl font-bold text-secondary-900">
                    Bạn chưa đăng nhập
                  </h1>
                  <Link href="/login">
                    <p className="text-md mt-4 font-bold text-secondary-900 underline">
                      Vui lòng đăng nhập để xem giỏ hàng
                    </p>
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CartTemplate;
