import { Product } from '@/features/products';

export interface CartProduct {
  amount: number;
  product: Product;
}

export interface CartState {
  products: CartProduct[];
}