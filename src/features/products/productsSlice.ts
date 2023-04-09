/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import Status from 'types/Status';

interface Product {
  id: string;
  productName: string;
  brand: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
  quantity: string;
  category: string;
  subCategory: string;
}

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
        productsAdapter.setAll(state, action.payload.products);
        state.totalProductCount = action.payload.productCount;
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'ERROR';
      });
  },
});

export const { selectEntities } = productsAdapter.getSelectors(
  (state: RootState) => state.products
);

export default productsSlice.reducer;
