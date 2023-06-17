/* eslint-disable no-param-reassign */
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import Product from 'types/Product';

interface CartProduct {
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
  initialState: initialState,
  reducers: {
    addCartProduct(state, action: PayloadAction<CartProduct>) {
      const duplicateIndex = state.products.findIndex((entry) => entry.product._id === action.payload.product._id);
      if (duplicateIndex !== -1) {
        state.products[duplicateIndex].quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeCartProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter((entry) => entry.product._id !== action.payload);
    },
    setCartProductQuantity(state, action: PayloadAction<{ productId: string; quantity: number; }>) {
      const index = state.products.findIndex((entry) => entry.product._id === action.payload.productId);
      state.products[index].quantity = action.payload.quantity;
    },
    clearCart(state) {
      state.products = [];
    }
  },
});

export const { addCartProduct, removeCartProduct, setCartProductQuantity, clearCart } = cartSlice.actions;

export const selectCartProductCount = (state: RootState) => {
  return state.cart.products.reduce((count, entry) => count + entry.quantity, 0);
};
export const selectTotalCartProductPrice = (state: RootState) => {
  return state.cart.products.reduce((total, entry) => total + entry.quantity * entry.product.discountPrice, 0);
};
export const selectTotalDiscountValue = (state: RootState) => {
  return state.cart.products.reduce((total, entry) => {
    const productDiscountValue = entry.product.price - entry.product.discountPrice;
    return total + productDiscountValue * entry.quantity;
  }, 0);
}

export default cartSlice.reducer;
