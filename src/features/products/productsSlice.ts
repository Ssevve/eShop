/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useLocation } from 'react-router-dom';
import ProductsState from 'types/ProductsState';

const getCurrentPage = () => {
  const params = new URLSearchParams(window.location.search); // Returns:'?q=123'
  const page = parseInt(params.get('page') || '1', 10);
  return page;
};

const initialState: ProductsState = {
  products: [],
  totalProductCount: null,
  productsPerPage: 10,
  currentPage: getCurrentPage(),
  totalPageCount: null,
  status: 'IDLE',
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (page: number) => {
    const res = await fetch(`http://localhost:3000/products?_page=${page}`);
    const products = await res.json();
    const productCount = Number(res.headers.get('x-total-count'));
    return { products, productCount };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number, string>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'PENDING';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.products = action.payload.products;
        state.totalProductCount = action.payload.productCount;
        state.totalPageCount = Math.ceil(
          action.payload.productCount / state.productsPerPage
        );
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'ERROR';
      });
  },
});

export const { setCurrentPage } = productsSlice.actions;

export default productsSlice.reducer;
