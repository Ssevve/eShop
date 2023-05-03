/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

const categories = [
  'Fruits & Vegetables',
  'Cleaning & Household',
  'Beverages',
  'Snacks & Branded Foods',
  'Beauty & Hygiene',
  'Gourmet & World Food',
] as const;

type Categories = typeof categories;
export type Category = Categories[number] | null;

interface FiltersState {
  categories: Categories;
  currentCategory: Category | null;
}

const initialState: FiltersState = {
  categories,
  currentCategory: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentCategory(state, action: PayloadAction<Category>) {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCurrentCategory } = filtersSlice.actions;

export const selectCurrentCategory = (state: RootState) =>
  state.filters.currentCategory;

export default filtersSlice.reducer;
