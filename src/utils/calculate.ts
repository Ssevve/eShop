import { CartProduct } from "@/features/carts";

export function calculateOriginalPrice(products: CartProduct[]) {
  return products.reduce((total, entry) => total + entry.amount * entry.product.price, 0);
}

export function calculateCartTotal(products: CartProduct[]) {
  return products.reduce((total, entry) => total + entry.amount * entry.product.discountPrice, 0);
}