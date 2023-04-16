/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

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
type Category = Categories[number];

interface FiltersState {
  categories: Categories;
  currentCategory: Category | null;
  bestDeals: boolean;
}

const initialState: FiltersState = {
  categories,
  currentCategory: null,
  bestDeals: true,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentCategory(state, action) {
      state.currentCategory = action.payload;
      state.bestDeals = false;
    },
    showBestDeals(state) {
      state.currentCategory = null;
      state.bestDeals = true;
    },
  },
});

export const { setCurrentCategory, showBestDeals } = filtersSlice.actions;

export const selectCurrentCategory = (state: RootState) =>
  state.filters.currentCategory;

export const selectBestDeals = (state: RootState) => state.filters.bestDeals;

export default filtersSlice.reducer;
