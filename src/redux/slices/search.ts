import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, ICategory } from "@/types/models";
interface IInitialState {
  searchPredictions: IProduct[];
  products: IProduct[];
  productsLoading: boolean;
  isLoading: boolean;
  categoryFacets: ICategory[];
  keyword: string;
  categories: string[];
  currentPage: number;
  totalPage: number;
  onSale: boolean;
}

const initialState: IInitialState = {
  searchPredictions: [],
  products: [],
  productsLoading: false,
  isLoading: false,
  categoryFacets: [],
  keyword: "",
  categories: [],
  currentPage: 1,
  totalPage: 0,
  onSale: false,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setSearchPredictions: (state, actions: PayloadAction<any>) => {
      state.searchPredictions = actions.payload;
    },
    setLoading: (state, actions: PayloadAction<boolean>) => {
      state.isLoading = actions.payload;
    },
    setProducts: (state, actions: PayloadAction<IProduct[]>) => {
      state.products = actions.payload;
    },
    setProductsLoading: (state, actions: PayloadAction<boolean>) => {
      state.productsLoading = actions.payload;
    },
    setCategoryFacets: (state, actions: PayloadAction<ICategory[]>) => {
      state.categoryFacets = actions.payload;
    },
    setKeyword: (state, actions: PayloadAction<string>) => {
      state.keyword = actions.payload;
    },
    setCategories: (state, actions: PayloadAction<string[]>) => {
      state.categories = actions.payload;
    },
    setCurrentPage: (state, actions: PayloadAction<number>) => {
      state.currentPage = actions.payload;
    },
    setTotalPage: (state, actions: PayloadAction<number>) => {
      state.totalPage = actions.payload;
    },
    setOnSale: (state, actions: PayloadAction<boolean>) => {
      state.onSale = actions.payload;
    },
  },
});

export const {
  setSearchPredictions,
  setLoading,
  setProducts,
  setProductsLoading,
  setKeyword,
  setCategories,
  setCategoryFacets,
  setCurrentPage,
  setTotalPage,
  setOnSale,
} = searchSlice.actions;
export default searchSlice.reducer;
