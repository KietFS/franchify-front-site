"use client";

import useStore from "@/hooks/useStore";
import {
  BuildingStorefrontIcon,
  ClockIcon,
  StopCircleIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

interface IStoreListProps {
  onSelectedStore: (store: any) => void;
}

const StoreList: React.FC<IStoreListProps> = ({ onSelectedStore }) => {
  const { listStore, dispatchSetCurrentStore, isStoreOpen } = useStore();

  const formatTime = (time: number): string => {
    const hours = time % 24;
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = "00";
    return `${formattedHours
      .toString()
      .padStart(2, "0")}:${formattedMinutes} ${period}`;
  };

  return (
    <div className="flex flex-col gap-y-4">
      {listStore?.map((store: any) => (
        <div
          onClick={() => {
            dispatchSetCurrentStore(store);
            onSelectedStore(store);
          }}
          key={store.id}
          className="flex flex-col gap-y-2 p-4 border border-primary-400 rounded-lg cursor-pointer hover:shadow-md"
        >
          <h1 className="text-lg font-bold text-primary-800">{store.name}</h1>

          <div className="w-full flex gap-x-2 items-center">
            <ClockIcon className="w-4 h-4 text-primary-800 font-bold" />
            <p className="text-sm text-primary-800 font-bold">Giờ hoạt động</p>
            <p className="text-sm text-primary-600">
              {formatTime(store?.openTime)}
            </p>
            -{" "}
            <p className="text-sm text-primary-600">
              {formatTime(store?.closeTime)}
            </p>
          </div>

          <div className="flex items-center gap-x-2">
            {isStoreOpen(store?.openTime, store?.closeTime) ? (
              <>
                <BuildingStorefrontIcon className="w-4 h-4 text-green-500" />
                <p className="text-sm text-green-600 font-bold">Đang mở cửa</p>
              </>
            ) : (
              <>
                <BuildingStorefrontIcon className="w-4 h-4 text-red-500" />
                <p className="text-sm text-red-600 font-bold">Đã đóng cửa</p>
              </>
            )}
          </div>

          <div className="w-full flex gap-x-2 items-center">
            <p className="text-sm text-primary-800 w-[80px] font-bold">
              Địa chỉ
            </p>
            <span className="text-primary-600 text-sm">
              124 Đường Hoàng Diệu 2, Lich Chiểu, Thủ Đức thành phố Hồ Chí Minh{" "}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
