import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import cart from "./slices/cart";
import search from "./slices/search";
import store from "./slices/store";
import product from "./slices/product";
import category from "./slices/category";

const rootReducer = combineReducers({
  auth: auth,
  cart: cart,
  search: search,
  store: store,
  product: product,
  category: category,
}) as any;

export default rootReducer;
