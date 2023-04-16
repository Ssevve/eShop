/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import Status from 'types/Status';
import Product from 'types/Product';
import { selectCurrentCategory } from 'features/filters/filtersSlice';

const productsAdapter = createEntityAdapter<Product>();

const initialState = productsAdapter.getInitialState<{
  status: Status;
}>({
  status: 'IDLE',
});

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const res = await fetch(`http://localhost:3000/products`);
    const products = await res.json();
    return products;
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
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'ERROR';
      });
  },
});

export const selectProducts = (state: RootState) =>
  Object.values(state.products.entities);

export const selectDiscountedProducts = createSelector(
  [selectProducts],
  (products) => {
    if (!products.length) return [];
    return products.filter(
      (product) => product && product.discountPrice < product.price
    );
  }
);

export const selectFilteredProducts = createSelector(
  [selectProducts, selectDiscountedProducts, selectCurrentCategory],
  (products, discountedProducts, currentCategory) => {
    if (!currentCategory) return discountedProducts;
    if (!products.length) return [];
    return products.filter(
      (product) => product && product.category === currentCategory
    );
  }
);

export default productsSlice.reducer;
