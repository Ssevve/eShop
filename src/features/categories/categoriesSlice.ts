/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import Category from 'types/Category';

interface CategoriesState {
  categories: Category[];
}

export const categories: Category[] = [
  'Discounts',
  'Fruits and Vegetables',
  'Cleaning and Household',
  'Beverages',
  'Snacks and Branded Foods',
  'Beauty and Hygiene',
  'Gourmet and World Food',
];

const initialState: CategoriesState = {
  categories,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
