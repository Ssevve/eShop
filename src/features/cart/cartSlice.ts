/* eslint-disable no-param-reassign */
import {
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { MAX_PRODUCT_QUANTITY } from 'lib/constants';
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
        const duplicateProduct = state.products[duplicateIndex];
        const newQuantity = duplicateProduct.quantity + action.payload.quantity;
        duplicateProduct.quantity = newQuantity < MAX_PRODUCT_QUANTITY ? newQuantity : MAX_PRODUCT_QUANTITY;   
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

const selectCartProducts = (state: RootState) => state.cart.products;

export const selectCartProductCount = createSelector(selectCartProducts, products =>
  products.reduce((count, entry) => count + entry.quantity, 0)
);

export const selectCartOriginalPrice = createSelector(selectCartProducts, products =>
 products.reduce((total, entry) => total + entry.quantity * entry.product.price, 0)
);

export const selectCartTotal = createSelector(selectCartProducts, products =>
  products.reduce((total, entry) => total + entry.quantity * entry.product.discountPrice, 0)
);

export const selectCartDiscount = createSelector([selectCartOriginalPrice, selectCartTotal], (originalPrice, finalPrice) =>
  (originalPrice - finalPrice)
);

export default cartSlice.reducer;
