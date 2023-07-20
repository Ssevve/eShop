import { Product } from '@/features/products';

export interface CartProduct {
  quantity: number;
  product: Product;
}

export interface CartState {
  products: CartProduct[];
}