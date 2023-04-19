/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { SortValue } from './sortOptions';

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
export type Category = Categories[number];

interface FiltersState {
  categories: Categories;
  currentCategory: Category | null;
  bestDeals: boolean;
  sortBy: SortValue | undefined;
}

const initialState: FiltersState = {
  categories,
  currentCategory: null,
  bestDeals: true,
  sortBy: undefined,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentCategory(state, action: PayloadAction<Category>) {
      state.currentCategory = action.payload;
      state.bestDeals = false;
    },
    setSortBy(state, action: PayloadAction<SortValue>) {
      state.sortBy = action.payload;
    },
    showBestDeals(state) {
      state.currentCategory = null;
      state.bestDeals = true;
    },
  },
});

export const { setCurrentCategory, setSortBy, showBestDeals } =
  filtersSlice.actions;

export const selectCurrentCategory = (state: RootState) =>
  state.filters.currentCategory;

export const selectSortBy = (state: RootState) => state.filters.sortBy;

export const selectShowBestDeals = (state: RootState) =>
  state.filters.bestDeals;

export default filtersSlice.reducer;
