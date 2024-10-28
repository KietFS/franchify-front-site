"use client";

import CartItem from "@/components/atom/CartItem";
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
      const response = await axios.get(`http://localhost:4000/cart`, {
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

  useEffect(() => {
    getCartById();
  }, []);

  return (
    <div className="w-full flex justify-center py-10 px-8">
      <div className="w-[1200px] h-[800px]">
        <h1 className="text-gray-600 font-bold text-3xl">Giỏ hàng của bàn</h1>
        <Divider sx={{ marginY: 4 }} />
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-y-4 w-1/2 max-h-[700px] overflow-auto ">
            {currentCart?.cartDetails?.map((item: any, index: number) => (
              <CartItem key={index} cartItem={item} />
            ))}
          </div>

          <div className="h-full w-[10px] bg-gray-200"></div>

          <div className="flex flex-col">
            <h1 className="text-gray-600 font-bold text-2xl">
              Thông tin đơn hàng
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
