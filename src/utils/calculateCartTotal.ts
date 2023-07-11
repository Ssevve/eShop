import { CartProduct } from "features/cart/cartSlice";

function calculateCartTotal(products: CartProduct[]) {
  return products.reduce((total, entry) => total + entry.quantity * entry.product.discountPrice, 0);

}

export default calculateCartTotal;