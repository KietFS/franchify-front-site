import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isGlobalLoading: boolean;
}

const initialState: IInitialState = {
  isGlobalLoading: false,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setGlobalLoading: (state, actions: PayloadAction<any>) => {
      state.isGlobalLoading = actions.payload;
    },
  },
});

export const { setGlobalLoading } = commonSlice.actions;
export default commonSlice.reducer;
