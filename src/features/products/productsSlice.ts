/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductsState from 'types/ProductsState';

const initialState: ProductsState = {
  products: [],
  totalProductCount: null,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'PENDING';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.products = action.payload.products;
        state.totalProductCount = action.payload.productCount;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'ERROR';
      });
  },
});

export default productsSlice.reducer;
