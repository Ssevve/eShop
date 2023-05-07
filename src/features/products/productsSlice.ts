/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import Status from 'types/Status';
import Product from 'types/Product';

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
});

const initialState = productsAdapter.getInitialState<{
  status: Status;
  totalProductCount: number;
}>({
  status: 'IDLE',
  totalProductCount: 0,
});

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({
    searchParams,
    limit,
  }: {
    searchParams: URLSearchParams;
    limit: number;
  }) => {
    searchParams.set('limit', limit.toString());
    const query = searchParams.toString();
    const res = await fetch(`http://localhost:5000/products?${query}`);
    const { products, totalResults } = await res.json();
    return { products, totalResults };
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
        state.totalProductCount = action.payload.totalResults;
        productsAdapter.setAll(state, action.payload.products);
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'ERROR';
      });
  },
});

export const selectProducts = (state: RootState) =>
  Object.values(state.products.entities);

export const selectTotalProductCount = (state: RootState) =>
  state.products.totalProductCount;

export default productsSlice.reducer;
