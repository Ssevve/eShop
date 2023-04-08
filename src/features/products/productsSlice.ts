/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DocumentData, getDocs } from 'firebase/firestore';
import { productsCollection } from 'firebaseConfig';
import ProductsState from 'types/ProductsState';

const initialState: ProductsState = {
  products: [],
  status: 'IDLE',
};

export const getProducts = createAsyncThunk('products/getProducts', () =>
  getDocs(productsCollection)
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
        state.products = action.payload.docs.map((doc: DocumentData) => ({
          ...doc.data(),
          id: doc.id,
        }));
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'ERROR';
      });
  },
});

export default productsSlice.reducer;
