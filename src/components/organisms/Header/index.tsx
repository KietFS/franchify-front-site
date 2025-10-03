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
import useCategory from "@/hooks/useCategories";
import useAuth from "@/hooks/useAuth";
import AccountButton from "../AccountButton";
import MobileDrawer from "@/components/molecules/MobileDrawer";
import Link from "next/link";
import MiddleBar from "@/components/molecules/MiddleBar";

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (props) => {
  const router = useRouter();

  //state
  const [openMobileDrawer, setOpenMobileDrawer] = useState<boolean>(false);

  const [openSearchDropDown, setOpenSearchDropdown] = useState<boolean>(false);
  const [openSearchSheet, setOpenSearchSheet] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentCart, getUserCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    !currentCart && isAuthenticated && getUserCart();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="w-full bg-primary-500">
      <div className="mx-auto max-w-[1560px] pb-4 laptop:pb-0">
        {/* <TopBar /> */}
        <div className="flex w-full items-center justify-between space-x-4 px-4 py-4 tablet:space-x-6 laptop:justify-around laptop:space-x-6 desktop:space-x-8">
          <div className="flex w-1/3 laptop:hidden laptop:w-0">
            <button className="" onClick={() => setOpenMobileDrawer(true)}>
              <Bars3Icon className="h-8 w-8 font-bold text-secondary-500" />
            </button>
          </div>
          <div className="flex w-full justify-center laptop:w-fit laptop:justify-start">
            <Logo variant="primary" />
          </div>
          <div className="flex w-1/3 flex-row-reverse laptop:hidden laptop:w-0">
            <FulfillmentMangement />
          </div>
          <div className="hidden laptop:flex laptop:w-[500px] desktop:w-[700px]">
            <SearchBar
              key="desktop-search-bar"
              placeholder="Search for anything, any words"
              onFocus={() => setOpenSearchDropdown(true)}
              onBlur={() => setOpenSearchDropdown(false)}
            />

            {openSearchDropDown ? (
              <div
                ref={dropdownRef}
                className="absolute bottom-auto left-auto top-[70px] z-50 flex h-auto max-h-[400px] min-h-[150px] w-[600px] flex-col overflow-auto rounded-xl border-2 border-secondary-50 bg-white px-4 py-4 shadow-md"
              >
                <SearchDropdown
                  open={openSearchDropDown}
                  onClose={() => setOpenSearchDropdown(false)}
                />
              </div>
            ) : null}
          </div>

          <div className="hidden laptop:flex">
            <div className="flex-end hidden w-fit items-center justify-between space-x-1 laptop:flex">
              <AccountButton />
              <FulfillmentMangement />
              <Link href="/cart">
                <button className="flex w-fit items-center space-x-1 rounded-xl px-4 py-2 text-center text-sm text-secondary-600">
                  <ShoppingCartIcon className="h-8 w-8 text-secondary-500" />
                  <div className="text-secondary-500">
                    {currentCart?.cartDetails?.length}
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex px-2 laptop:hidden">
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
      <MiddleBar />
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

export default Header;
