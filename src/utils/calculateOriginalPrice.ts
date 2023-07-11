import { CartProduct } from "features/cart/cartSlice";

function calculateOriginalPrice(products: CartProduct[]) {
  return products.reduce((total, entry) => total + entry.quantity * entry.product.price, 0);
}

export default calculateOriginalPrice;