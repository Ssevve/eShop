/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import Status from 'types/Status';
import Product from 'types/Product';

const productsAdapter = createEntityAdapter<Product>();

const initialState = productsAdapter.getInitialState<{
  totalProductCount: number;
  status: Status;
}>({
  totalProductCount: 0,
  status: 'IDLE',
});

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await fetch(
      `http://localhost:3000/products?_page=${page}&_limit=${limit}`
    );
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
        productsAdapter.setAll(state, action.payload.products);
        state.totalProductCount = action.payload.productCount;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'ERROR';
      });
  },
});

export const { selectEntities: selectProducts } = productsAdapter.getSelectors(
  (state: RootState) => state.products
);

export default productsSlice.reducer;
