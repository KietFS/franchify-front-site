"use client";

import React, { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import SearchBar from "../../molecules/SearchBar";
import Logo from "@/components/atom/Logo";
import FulfillmentMangement from "../FulfillmentMangement";
import useCart from "@/hooks/useCart";

import SearchSheet from "@/components/molecules/SearchSheet";
import SearchDropdown from "@/components/molecules/SearchDropdown";
import useSearch from "@/hooks/useSearch";
import useCategory from "@/hooks/useCategories";
import useAuth from "@/hooks/useAuth";
import AccountButton from "../AccountButton";
import MobileDrawer from "@/components/molecules/MobileDrawer";
import Link from "next/link";
import TopBar from "@/components/molecules/TopBar";

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

  const { currentCart, getUserCart } = useCart();
  const { listCategory, getCategories } = useCategory();
  const { isAuthenticated } = useAuth();

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    !currentCart && getUserCart();
  }, []);

  return (
    <div className="w-full bg-primary-500">
      <div className="max-w-[1560px] mx-auto pb-4 laptop:pb-0">
        <TopBar />
        <div className="w-full flex space-x-4 tablet:space-x-6 laptop:space-x-6 desktop:space-x-8 items-center px-4 py-4  justify-between laptop:justify-around">
          <div className="flex laptop:hidden  w-1/3 laptop:w-0">
            <button className="" onClick={() => setOpenMobileDrawer(true)}>
              <Bars3Icon className="text-secondary-500 font-bold w-8 h-8" />
            </button>
          </div>
          <Logo variant="secondary" />
          <div className="flex w-1/3 laptop:hidden laptop:w-0 flex-row-reverse">
            <FulfillmentMangement />
          </div>
          <div className="laptop:w-[500px] desktop:w-[700px] hidden laptop:flex">
            <SearchBar
              key="desktop-search-bar"
              placeholder="Search for anything, any words"
              onBlur={() => setTimeout(() => setOpenSearchDropdown(false), 200)}
              onFocus={() => setOpenSearchDropdown(true)}
            />

            {openSearchDropDown ? (
              <div className="absolute min-h-[150px] z-50 max-h-[400px] overflow-auto bottom-auto top-[110px] left-auto px-4 py-4 flex flex-col bg-white border-2 border-secondary-50 shadow-md w-[600px] h-auto rounded-xl">
                <SearchDropdown
                  open={openSearchDropDown}
                  onClose={() => setOpenSearchDropdown(false)}
                />
              </div>
            ) : null}
          </div>

          <div className="hidden laptop:flex">
            <div className="hidden laptop:flex flex-end space-x-1 items-center justify-between w-fit">
              <AccountButton />
              <FulfillmentMangement />
              <button
                className=" rounded-xl px-4 py-2 text-center text-secondary-600  text-sm w-fit flex space-x-1 items-center"
                onClick={() => router.replace("/cart")}
              >
                <ShoppingCartIcon className="w-8 h-8 text-secondary-500" />
                <div className="text-secondary-500">
                  {currentCart?.cartDetails?.length}
                </div>
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

      <div className="w-full shadow-lg bg-primary-600 h-[50px] laptop:pb-0 border-b border-seconday-500 flex justify-center gap-x-4 items-center">
        {listCategory?.map((category: any) => (
          <Link href="/">
            <p className="text-md text-secondary-500 font-semibold">
              {category?.name}
            </p>
          </Link>
        ))}
      </div>
      {openSearchSheet && (
        <SearchSheet
          open={openSearchSheet}
          onClose={() => setOpenSearchSheet(false)}
        />
      )}
      {openMobileDrawer && (
        <MobileDrawer
          open={openMobileDrawer}
          onClose={() => setOpenMobileDrawer(false)}
        />
      )}
    </div>
  );
};

export default HeaderV2;
