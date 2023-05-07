/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

export const categories = [
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
}

const initialState: FiltersState = {
  categories,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
  },
});

export default filtersSlice.reducer;
