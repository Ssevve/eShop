/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface PaginationState {
  currentPage: number | null;
}

const initialState: PaginationState = {
  currentPage: null,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number | null>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = paginationSlice.actions;

export const selectCurrentPage = (state: RootState) =>
  state.pagination.currentPage;

export default paginationSlice.reducer;
