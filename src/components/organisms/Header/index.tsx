"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import SearchBar from "../../molecules/SearchBar";
import Logo from "@/components/atom/Logo";
import FulfillmentMangement from "../FulfillmentMangement";
import useDebounce from "@/hooks/useDebounce";
import NextNProgress from "nextjs-progressbar";
import { setCurrentCart } from "@/redux/slices/cart";
import { useSelector } from "react-redux";
import useCart from "@/hooks/useCart";
import useNavigation from "@/hooks/useNavigation";
import SearchSheet from "@/components/molecules/SearchSheet";
import SearchDropdown from "@/components/molecules/SearchDropdown";
import useSearch from "@/hooks/useSearch";
import useCategory from "@/hooks/useCategories";

interface IHeaderV2Props {}

const HeaderV2: React.FC<IHeaderV2Props> = (props) => {
  const router = useRouter();

  //state
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [isGettingProductCategory, setIsGettingProductCategory] =
    useState<boolean>(false);
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false);

  const [openSearchDropDown, setOpenSearchDropdown] = useState<boolean>(false);
  const [openSearchSheet, setOpenSearchSheet] = useState<boolean>(false);

  const { currentCart, getCartById } = useCart();
  const { listCategory, getCategories } = useCategory();

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    !currentCart && getCartById();
    getCategories();
  }, []);

  return (
    <>
      <div className="w-full shadow-lg pb-4  bg-white laptop:pb-0 border-b border-gray-200">
        <div className="w-full flex space-x-4  tablet:space-x-6 laptop:space-x-6 desktop:space-x-8 items-center px-4 py-4  justify-between laptop:justify-around">
          <div className="flex laptop:hidden  w-1/3 laptop:w-0">
            <button
              className="bg-gray-100 p-2 rounded-lg active:bg-gray-300"
              onClick={() => setOpenMobileDrawer(true)}
            >
              <Bars3Icon className="text-gray-500 font-bold w-5 h-5" />
            </button>
          </div>
          <Logo />
          <div className="flex w-1/3 laptop:hidden laptop:w-0 flex-row-reverse">
            {false ? null : (
              <div className="flex flex-row-reverse laptop:hidden  w-full laptop:w-0">
                <FulfillmentMangement />
              </div>
            )}
          </div>
          <div className="laptop:w-[500px] desktop:w-[700px] hidden laptop:flex">
            <SearchBar
              key="desktop-search-bar"
              placeholder="Search for anything, any words"
              onBlur={() => setTimeout(() => setOpenSearchDropdown(false), 200)}
              onFocus={() => setOpenSearchDropdown(true)}
            />

            {openSearchDropDown ? (
              <div className="absolute min-h-[150px] z-50 max-h-[400px] overflow-auto bottom-auto top-[80px] left-auto ml-4 px-4 py-4 flex flex-col bg-white border-2 border-gray-50 shadow-md w-[600px] h-auto rounded-xl">
                <SearchDropdown
                  open={openSearchDropDown}
                  onClose={() => setOpenSearchDropdown(false)}
                />
              </div>
            ) : null}
          </div>

          <div className="hidden laptop:flex">
            <div className="hidden laptop:flex flex-end space-x-1 items-center justify-between w-fit">
              <button
                className=" rounded-xl px-4 py-2 text-center text-gray-600  text-sm w-fit flex space-x-1 items-center hover:bg-gray-100"
                onClick={() => router.replace("/login")}
              >
                <UserIcon className="w-8 h-8 text-gray-600" />
              </button>
              <FulfillmentMangement />
              <button
                className=" rounded-xl px-4 py-2 text-center text-gray-600  text-sm w-fit flex space-x-1 items-center hover:bg-gray-100"
                onClick={() => router.replace("/cart")}
              >
                <ShoppingCartIcon className="w-8 h-8 text-gray-600" />
                <div>{currentCart?.cartDetails?.length}</div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex laptop:hidden px-2">
          <SearchBar
            ref={searchInputRef}
            placeholder="Search for anything, any words"
            onChange={() => {}}
            onFocus={() => {
              if (!openSearchSheet) {
                setOpenSearchSheet(true);
                searchInputRef?.current?.blur();
              }
            }}
          />
        </div>
      </div>
      {openSearchSheet && (
        <SearchSheet
          open={openSearchSheet}
          onClose={() => setOpenSearchSheet(false)}
        />
      )}
    </>
  );
};

export default HeaderV2;
