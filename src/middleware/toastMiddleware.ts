import { cartsApi } from "@/features/carts";
import { reviewsApi } from "@/features/reviews";
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
    cartsApi.endpoints.clearCart.matchRejected,
    reviewsApi.endpoints.createReview.matchFulfilled,
    reviewsApi.endpoints.createReview.matchRejected,
    reviewsApi.endpoints.editReview.matchFulfilled,
    reviewsApi.endpoints.editReview.matchRejected,
    ),
  effect: async () => {
    toast.dismiss();
  }
});

// CART 
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

// REVIEWS
toastMiddleware.startListening({
  matcher: reviewsApi.endpoints.createReview.matchFulfilled,
  effect: async () => {
    toast.success('Review created!');
  }
});

toastMiddleware.startListening({
  matcher: reviewsApi.endpoints.createReview.matchRejected,
  effect: async () => {
    toast.error('Could not create review. Try again.');
  }
});

toastMiddleware.startListening({
  matcher: reviewsApi.endpoints.editReview.matchFulfilled,
  effect: async () => {
    toast.success('Review edited!');
  }
});

toastMiddleware.startListening({
  matcher: reviewsApi.endpoints.editReview.matchRejected,
  effect: async () => {
    toast.error('Could not edit the review. Try again.');
  }
});