import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  paymentMethod: any | null;
}

const initialState: IInitialState = {
  paymentMethod: null,
};

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    setPaymentMethod: (state, actions: PayloadAction<any>) => {
      state.paymentMethod = actions.payload;
    },
  },
});

export const { setPaymentMethod } = paymentSlice.actions;
export default paymentSlice.reducer;
