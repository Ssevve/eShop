import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addCartProduct, removeCartProduct, setCartProductQuantity, clearCart } from '@/features/cart/cartSlice';
import { setUser } from '@/features/auth/authSlice';
import { RootState } from '../app/store';

export const cartLocalStorageMiddleware = createListenerMiddleware();
cartLocalStorageMiddleware.startListening({
  matcher: isAnyOf(addCartProduct, removeCartProduct, setCartProductQuantity, clearCart),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      'cart',
      JSON.stringify((listenerApi.getState() as RootState).cart.products)
    ),
});

export const userLocalStorageMiddleware = createListenerMiddleware();
userLocalStorageMiddleware.startListening({
  actionCreator: setUser,
  effect: async (action) => {
    if (action.payload) localStorage.setItem('user', JSON.stringify(action.payload));
    else localStorage.removeItem('user');
  }
});