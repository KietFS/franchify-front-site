import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import cart from "./cart";
import search from "./search";

export const reducer = combineReducers({
  auth,
  cart,
  search,
});
