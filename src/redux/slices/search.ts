import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  searchResults: any[];
}

const initialState: IInitialState = {
  searchResults: [],
};

const cartSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearchResults: (state, actions: PayloadAction<any>) => {
      state.searchResults = actions.payload;
    },
  },
});

export const { setSearchResults } = cartSlice.actions;
export default cartSlice.reducer;
