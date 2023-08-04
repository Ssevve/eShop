import { cartsApi } from "@/features/carts";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const toastMiddleware = createListenerMiddleware();
toastMiddleware.startListening({
  matcher: cartsApi.endpoints.addCartProduct.matchFulfilled,
  effect: async ({ meta }) => {
    toast.success(`${meta.arg.originalArgs.product.name} added!`)
  }
});

toastMiddleware.startListening({
  matcher: cartsApi.endpoints.addCartProduct.matchRejected,
  effect: async({ meta }) => {
    toast.error(`Could not add ${meta.arg.originalArgs.product.name}!`)
  }
});