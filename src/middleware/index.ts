import { RootState } from '@/app/store';
import { setUser } from '@/features/auth';
// import { addCartProduct, clearCart, removeCartProduct, setCartProductQuantity } from '@/features/carts';
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

// export const cartLocalStorageMiddleware = createListenerMiddleware();
// cartLocalStorageMiddleware.startListening({
//   matcher: isAnyOf(addCartProduct, removeCartProduct, setCartProductQuantity, clearCart),
//   effect: (action, listenerApi) =>
//     localStorage.setItem(
//       'cart',
//       JSON.stringify((listenerApi.getState() as RootState).cart.products)
//     ),
// });

export const userLocalStorageMiddleware = createListenerMiddleware();
userLocalStorageMiddleware.startListening({
  actionCreator: setUser,
  effect: async (action) => {
    if (action.payload) localStorage.setItem('user', JSON.stringify(action.payload));
    else localStorage.removeItem('user');
  }
});