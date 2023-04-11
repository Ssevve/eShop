/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface PaginationState {
  currentPage: number;
  productsPerPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  productsPerPage: 20,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;

export const selectProductsPerPage = (state: RootState) =>
  state.pagination.productsPerPage;

export const selectCurrentPage = (state: RootState) =>
  state.pagination.currentPage;

export default paginationSlice.reducer;
