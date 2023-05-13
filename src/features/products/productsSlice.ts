/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import Status from 'types/Status';
import Product from 'types/Product';
import Category from 'types/Category';

const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product._id,
});

const initialState = productsAdapter.getInitialState<{
  status: Status;
  totalProductCount: number;
  productsPerPage: number;
}>({
  status: 'IDLE',
  totalProductCount: 0,
  productsPerPage: 10,
});

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({
    page,
    category,
    sort,
    order,
    limit,
  }: {
    page: number;
    category: Category;
    sort: string;
    order: string;
    limit: number;
  }) => {
    const query = `page=${page}&category=${category}&sort=${sort}&order=${order}&limit=${limit}`;
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

export const selectProductsPerPage = (state: RootState) =>
  state.products.productsPerPage;

export default productsSlice.reducer;
