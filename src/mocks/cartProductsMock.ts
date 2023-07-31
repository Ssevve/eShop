import { CartProduct } from "@/features/carts";
import { productsMock } from "./productsMock";

export const cartProductsMock: CartProduct[] = [
  {
    amount: 1,
    product: { ...productsMock[0] }
  },
  {
    amount: 2,
    product: { ...productsMock[1] }
  },
  {
    amount: 3,
    product: { ...productsMock[2] }
  },
];
