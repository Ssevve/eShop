/* eslint-disable no-param-reassign */
import {
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { productConstraints } from 'lib/constants';
import calculateCartTotal from 'utils/calculateCartTotal';
import calculateOriginalPrice from 'utils/calculateOriginalPrice';
import { Product } from 'app/services/products';


export interface CartProduct {
  quantity: number;
  product: Product;
}

interface CartState {
  products: CartProduct[];
}

const initialState: CartState = {
  products: localStorage['cart'] ? JSON.parse(localStorage['cart']) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartProduct(state, action: PayloadAction<CartProduct>) {
      const duplicate = state.products.find((entry) => entry.product._id === action.payload.product._id);
      if (duplicate) {
        const newQuantity = duplicate.quantity + action.payload.quantity;
        duplicate.quantity = newQuantity < productConstraints.quantity.max ? newQuantity : productConstraints.quantity.max;   
      } else {
        state.products.push(action.payload);
      }
    },
    removeCartProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((entry) => entry.product._id !== action.payload);
    },
    setCartProductQuantity(state, action: PayloadAction<{ productId: string; quantity: number; }>) {
      const product = state.products.find((entry) => entry.product._id === action.payload.productId);
      if (product) {
        if (action.payload.quantity < productConstraints.quantity.min || !action.payload.quantity) {
          product.quantity = productConstraints.quantity.min;
        } else {
          product.quantity = action.payload.quantity;
        }
      }
    },
    clearCart(state) {
      state.products = [];
    }
  },
});

export const { addCartProduct, removeCartProduct, setCartProductQuantity, clearCart } = cartSlice.actions;

const selectSelf = (state: RootState) => state.cart;

export const selectCartProducts = createSelector(selectSelf, cart => cart.products);

export const selectCartProductCount = createSelector(selectCartProducts, products =>
  products.reduce((count, entry) => count + entry.quantity, 0)
);

export const selectCartOriginalPrice = createSelector(selectCartProducts, products => calculateOriginalPrice(products));

export const selectCartTotal = createSelector(selectCartProducts, products => calculateCartTotal(products));

export const selectCartDiscount = createSelector([selectCartOriginalPrice, selectCartTotal], (originalPrice, finalPrice) =>
  (originalPrice - finalPrice)
);

export default cartSlice.reducer;
