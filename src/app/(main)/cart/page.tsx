"use client";

import Button from "@/components/atom/Button";
import CartItem from "@/components/atom/CartItem";
import { apiURL } from "@/constanst";
import { useToast } from "@/hooks/useToast";
import { setCurrentCart } from "@/redux/slices/cart";
import { Divider } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ICartProps {}

const Cart: React.FC<ICartProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { accessToken } = useSelector((state: any) => state.auth);
  const { currentCart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const toast = useToast();

  const getCartById = async () => {
    try {
      const response = await axios.get(`${apiURL}/cart`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response?.data?.success) {
        dispatch(setCurrentCart(response?.data?.data));
      }
    } catch (error) {
      console.log("GET CART BY ID ERROR", error);
    }
  };

  const totalPrice = () => {
    let total = 0;
    currentCart?.cartDetails?.map((item: any, index: number) => {
      total = total + item?.product?.price?.price * item?.quantity;
    });

    return `${total}000`?.prettyMoney();
  };

  useEffect(() => {
    getCartById();
  }, []);

  return (
    <div className="w-full flex justify-center py-20 px-8">
      <div className="w-[1200px] h-fit">
        <h1 className="text-gray-600 font-bold text-3xl">Giỏ hàng của bàn</h1>
        <Divider sx={{ marginY: 4 }} />
        <div className="flex gap-x-4 gap-y-4 flex-col laptop:flex-row">
          <div className="flex flex-col gap-y-4 w-full  laptop:w-2/3 max-h-[700px] overflow-auto ">
            {currentCart?.cartDetails?.map((item: any, index: number) => (
              <CartItem key={index} cartItem={item} />
            ))}
          </div>

          <div className="h-full w-[10px] bg-gray-200"></div>

          <div className="flex flex-col w-full gap-y-8 laptop:w-1/3 justify-between">
            <div className="flex flex-col">
              <h1 className="text-gray-600 font-bold text-2xl">
                Thông tin đơn hàng
              </h1>
              <div className="flex flex-col gap-y-4 mt-8">
                <div className="w-full justify-between flex items-center">
                  <p className="text-md text-gray-600 font-bold">Tạm tính</p>
                  <p className="text-md text-green-600 font-bold">
                    {totalPrice()}
                  </p>
                </div>
                <div className="w-full justify-between flex items-center">
                  <p className="text-md text-gray-600 font-bold">Giảm giá</p>
                  <p className="text-md text-red-600 font-bold">
                    -{0?.toString().prettyMoney()}
                  </p>
                </div>
                <Divider />

                <div className="w-full justify-between flex items-center">
                  <p className="text-md text-gray-600 font-bold">
                    Tạm tính sau giảm giá
                  </p>
                  <p className="text-md text-green-600 font-bold">
                    {totalPrice()}
                  </p>
                </div>

                <Divider />

                <div className="w-full justify-between flex items-center">
                  <p className="text-md text-gray-600 font-bold">
                    Phí giao hàng
                  </p>
                  <p className="text-md text-green-600 font-bold">
                    {totalPrice()}
                  </p>
                </div>

                <div className="w-full justify-between flex items-center">
                  <p className="text-md text-gray-600 font-bold">Phí dịch vụ</p>
                  <p className="text-md text-green-600 font-bold">
                    {1000?.toString()?.prettyMoney()}
                  </p>
                </div>

                <Divider />

                <div className="w-full justify-between flex items-center">
                  <p className="text-md text-gray-600 font-bold">
                    Tổng ước tính
                  </p>
                  <p className="text-md text-green-600 font-bold">
                    {200000?.toString()?.prettyMoney()}
                  </p>
                </div>
              </div>
            </div>

            <Button title="Tiếp tục thanh toán">Tiếp tục thanh toán</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
