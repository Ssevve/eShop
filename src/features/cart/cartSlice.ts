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
import CartProduct from 'types/CartProduct';

interface CartState {
  products: CartProduct[];
}

const initialState: CartState = {
  products: localStorage['cart'] ? JSON.parse(localStorage['cart']) : [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addCartProduct(state, action: PayloadAction<CartProduct>) {
      const duplicateIndex = state.products.findIndex((entry) => entry.product._id === action.payload.product._id);
      if (duplicateIndex !== -1) {
        const duplicateProduct = state.products[duplicateIndex];
        const newQuantity = duplicateProduct.quantity + action.payload.quantity;
        duplicateProduct.quantity = newQuantity < productConstraints.quantity.max ? newQuantity : productConstraints.quantity.max;   
      } else {
        state.products.push(action.payload);
      }
    },
    removeCartProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((entry) => entry.product._id !== action.payload);
    },
    setCartProductQuantity(state, action: PayloadAction<{ productId: string; quantity: number; }>) {
      const index = state.products.findIndex((entry) => entry.product._id === action.payload.productId);
      const product = state.products[index];
      if (action.payload.quantity < productConstraints.quantity.min || !action.payload.quantity) {
        product.quantity = productConstraints.quantity.min;
      } else {
        product.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.products = [];
    }
  },
});

export const { addCartProduct, removeCartProduct, setCartProductQuantity, clearCart } = cartSlice.actions;

const selectCartProducts = (state: RootState) => state.cart.products;

export const selectCartProductCount = createSelector(selectCartProducts, products =>
  products.reduce((count, entry) => count + entry.quantity, 0)
);

export const selectCartOriginalPrice = createSelector(selectCartProducts, products => calculateOriginalPrice(products));

export const selectCartTotal = createSelector(selectCartProducts, products => calculateCartTotal(products));

export const selectCartDiscount = createSelector([selectCartOriginalPrice, selectCartTotal], (originalPrice, finalPrice) =>
  (originalPrice - finalPrice)
);

export default cartSlice.reducer;
