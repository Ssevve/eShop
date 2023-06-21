import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { addCartProduct, removeCartProduct, setCartProductQuantity, clearCart } from 'features/cart/cartSlice';
import type { RootState } from '../store';

const localStorageMiddleware = createListenerMiddleware();
localStorageMiddleware.startListening({
  matcher: isAnyOf(addCartProduct, removeCartProduct, setCartProductQuantity, clearCart),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      'cart',
      JSON.stringify((listenerApi.getState() as RootState).cart.products)
    )
});

export default localStorageMiddleware;