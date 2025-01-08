import { IStoreProduct } from "@/types/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  storeProdutcs: IStoreProduct[];
  popularProducts: IStoreProduct[];
}

const initialState: IInitialState = {
  storeProdutcs: [],
  popularProducts: [],
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setStoreProducts: (state, actions: PayloadAction<any>) => {
      state.storeProdutcs = actions.payload;
    },
    setPopularProducts: (state, actions: PayloadAction<any>) => {
      state.popularProducts = actions.payload;
    },
  },
});

export const { setStoreProducts, setPopularProducts } = productSlice.actions;
export default productSlice.reducer;
