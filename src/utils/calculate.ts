import { CartProduct } from "@/features/cart";

export function calculateOriginalPrice(products: CartProduct[]) {
  return products.reduce((total, entry) => total + entry.quantity * entry.product.price, 0);
}

export function calculateCartTotal(products: CartProduct[]) {
  return products.reduce((total, entry) => total + entry.quantity * entry.product.discountPrice, 0);
}