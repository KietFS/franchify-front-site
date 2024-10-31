import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import cart from "./slices/cart";
import search from "./slices/search";
import store from "./slices/store";
import product from "./slices/product";

const rootReducer = combineReducers({
  auth: auth,
  cart: cart,
  search: search,
  store: store,
  product: product,
}) as any;

export default rootReducer;
