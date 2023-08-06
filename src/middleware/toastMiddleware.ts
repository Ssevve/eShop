import { cartsApi } from "@/features/carts";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const toastMiddleware = createListenerMiddleware();

toastMiddleware.startListening({
  matcher: isAnyOf(
    cartsApi.endpoints.addCartProduct.matchFulfilled,
    cartsApi.endpoints.addCartProduct.matchRejected,
    cartsApi.endpoints.updateCartProductAmount.matchFulfilled,
    cartsApi.endpoints.updateCartProductAmount.matchRejected,
    cartsApi.endpoints.removeCartProduct.matchFulfilled,
    cartsApi.endpoints.removeCartProduct.matchRejected,
    cartsApi.endpoints.clearCart.matchFulfilled,
    cartsApi.endpoints.clearCart.matchRejected
    ),
  effect: async () => {
    toast.dismiss();
  }
});

toastMiddleware.startListening({
  matcher: cartsApi.endpoints.addCartProduct.matchFulfilled,
  effect: async ({ meta }) => {
    toast.success(`${meta.arg.originalArgs.productName} added!`);
  }
});

toastMiddleware.startListening({
  matcher: cartsApi.endpoints.addCartProduct.matchRejected,
  effect: async({ meta }) => {
    toast.error(`Could not add ${meta.arg.originalArgs.productName}!`);
  }
});

toastMiddleware.startListening({
  matcher: cartsApi.endpoints.updateCartProductAmount.matchFulfilled,
  effect: async({ meta }) => {
    toast.success(`${meta.arg.originalArgs.productName} amount: ${meta.arg.originalArgs.amount}`);
  }
});

toastMiddleware.startListening({
  matcher: cartsApi.endpoints.updateCartProductAmount.matchRejected,
  effect: async({ meta }) => {
    toast.error(`Could not change ${meta.arg.originalArgs.productName}'s amount!`);
  }
});

toastMiddleware.startListening({
  matcher: cartsApi.endpoints.removeCartProduct.matchFulfilled,
  effect: async({ meta }) => {
    toast.success(`${meta.arg.originalArgs.productName} removed!`);
  }
});

toastMiddleware.startListening({
  matcher: cartsApi.endpoints.removeCartProduct.matchRejected,
  effect: async({ meta }) => {
    toast.error(`Could not remove ${meta.arg.originalArgs.productName}!`);
  }
});

toastMiddleware.startListening({
  matcher: cartsApi.endpoints.clearCart.matchFulfilled,
  effect: async() => {
    toast.success('Cart cleared!');
  }
});

toastMiddleware.startListening({
  matcher: cartsApi.endpoints.clearCart.matchRejected,
  effect: async() => {
    toast.error('Could not clear the cart!');
  }
});