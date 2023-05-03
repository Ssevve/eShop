/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import Status from 'types/Status';
import Product from 'types/Product';
import {
  Category,
} from 'features/filters/filtersSlice';

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

export interface ProductsQueryParams {
  page: number;
  limit: number;
  category?: Category;
  sort: string;
  order: string;
}

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (searchParams: URLSearchParams) => {
    const query = searchParams.toString();
    const res = await fetch(`http://localhost:5000/products?${query}`);
    return await res.json();
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

export default productsSlice.reducer;
