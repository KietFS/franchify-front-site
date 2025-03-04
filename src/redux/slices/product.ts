import { IStoreProduct } from "@/types/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  storeProducts: IStoreProduct[];
  popularProducts: IStoreProduct[];
  [key: string]: any;
}

const initialState: IInitialState = {
  storeProducts: [],
  popularProducts: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setStoreProducts: (state, actions: PayloadAction<any>) => {
      state.storeProducts = actions.payload;
    },
    setPopularProducts: (state, actions: PayloadAction<any>) => {
      state.popularProducts = actions.payload;
    },
    setProductsWithCacheKey: (state, actions: PayloadAction<any>) => {
      const { key, value } = actions.payload;
      state[key] = value;
    },
  },
});

export const { setStoreProducts, setPopularProducts, setProductsWithCacheKey } =
  productSlice.actions;
export default productSlice.reducer;
