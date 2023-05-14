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
import SortOrder from 'types/SortOrder';

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

const sortQueries = {
  nameAscending: {
    sort: 'name',
    order: 1,
  },
  nameDescending: {
    sort: 'name',
    order: -1,
  },
  priceAscending: {
    sort: 'discountPrice',
    order: 1,
  },
  priceDescending: {
    sort: 'discountPrice',
    order: -1,
  },
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({
    page,
    category,
    limit,
    sortOrder,
  }: {
    page: number;
    category: Category;
    limit: number;
    sortOrder: SortOrder;
  }) => {
    let query = `products?page=${page}&category=${category}&limit=${limit}`;
    if (sortOrder && sortQueries[sortOrder]) {
      const { sort, order } = sortQueries[sortOrder];
      query += `&sort=${sort}&order=${order}`;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/${query}`);
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
