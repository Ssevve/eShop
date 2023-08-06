import { cartsApi } from "@/features/carts";
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const toastMiddleware = createListenerMiddleware();

toastMiddleware.startListening({
  matcher: isAnyOf(
    cartsApi.endpoints.addCartProduct.matchFulfilled,
    cartsApi.endpoints.addCartProduct.matchRejected,
    cartsApi.endpoints.updateCartProductAmount.matchFulfilled,
    cartsApi.endpoints.updateCartProductAmount.matchRejected
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