/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import SortValue from 'types/SortValue';

const categories = [
  'Fruits & Vegetables',
  'Eggs, Meat & Fish',
  'Foodgrains, Oil & Masala',
  'Cleaning & Household',
  'Beverages',
  'Bakery, Cakes & Dairy',
  'Snacks & Branded Foods',
  'Beauty & Hygiene',
  'Gourmet & World Food',
  'Kitchen, Garden & Pets',
] as const;

type Categories = typeof categories;
export type Category = Categories[number] | null;

interface FiltersState {
  categories: Categories;
  currentCategory: Category | null;
  sortBy: SortValue;
}

const initialState: FiltersState = {
  categories,
  currentCategory: null,
  sortBy: undefined,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentCategory(state, action: PayloadAction<Category>) {
      state.currentCategory = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortValue>) {
      state.sortBy = action.payload;
    },
  },
});

export const { setCurrentCategory, setSortBy } = filtersSlice.actions;

export const selectCurrentCategory = (state: RootState) =>
  state.filters.currentCategory;

export const selectSortBy = (state: RootState) => state.filters.sortBy;

export default filtersSlice.reducer;
