import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import cart from "./slices/cart";
import search from "./slices/search";

const rootReducer = combineReducers({
  auth: auth,
  cart: cart,
  search: search,
}) as any;

export default rootReducer;
