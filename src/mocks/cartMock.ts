import { CartResponse } from "@/features/carts";
import { cartProductsMock } from "./cartProductsMock";
import { userWithReviewMock } from "./userMock";

export const cartMock: CartResponse = {
  _id: 'testCartId',
  userId: userWithReviewMock._id,
  createdAt: new Date(),
  products: [ ...cartProductsMock ],
  originalPrice: cartProductsMock.reduce((total, curr) => total + (curr.product.price - curr.product.price), 0),
  totalDiscount: cartProductsMock.reduce((total, curr) => total + (curr.product.price - curr.product.discountPrice), 0),
  finalPrice: cartProductsMock.reduce((total, curr) => total + curr.product.discountPrice, 0),
  totalProductAmount: cartProductsMock.reduce((total, curr) => total + curr.amount, 0),
}